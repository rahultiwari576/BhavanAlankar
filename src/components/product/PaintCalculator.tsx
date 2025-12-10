import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, ArrowRight, ArrowLeft, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import emailjs from "@emailjs/browser"; // Commented out - email sending disabled for now
import Swal from "sweetalert2";

interface PaintCalculatorProps {
  pricePerLiter?: number;
  coveragePerLiter?: number;
}

type PaintingType = "fresh" | "repaint" | null;
type ServiceType = "popular" | "premium" | "luxury" | null;

// Rate ranges per sq ft based on paint quality
const rateRanges = {
  fresh: {
    popular: { min: 18, max: 22 },
    premium: { min: 23, max: 25 },
    luxury: { min: 26, max: 29 },
  },
  repaint: {
    popular: { min: 16, max: 18 },
    premium: { min: 19, max: 21 },
    luxury: { min: 22, max: 26 },
  },
};

const PaintCalculator = ({ pricePerLiter, coveragePerLiter }: PaintCalculatorProps) => {
  const [step, setStep] = useState<number>(1);
  const [paintingType, setPaintingType] = useState<PaintingType>(null);
  const [builtUpArea, setBuiltUpArea] = useState(1000);
  const [puttyCoats, setPuttyCoats] = useState<number | null>(null);
  const [primerCoats, setPrimerCoats] = useState<number | null>(null);
  const [paintCoats, setPaintCoats] = useState<number | null>(null);
  const [serviceType, setServiceType] = useState<ServiceType>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Calculate coverage area (3 times of built-up area)
  const coverageArea = Math.round(builtUpArea * 3);

  // Calculate cost based on selections
  const calculateCost = () => {
    if (!paintingType || !serviceType) return null;

    const rates = rateRanges[paintingType][serviceType];
    const minCost = Math.round(coverageArea * rates.min);
    const maxCost = Math.round(coverageArea * rates.max);

    return { min: minCost, max: maxCost };
  };

  const cost = calculateCost();

  const handleNext = () => {
    if (step === 1 && paintingType) {
      setStep(2);
    } else if (step === 2) {
      if (paintingType === "fresh" && puttyCoats && primerCoats && paintCoats) {
        setStep(3);
      } else if (paintingType === "repaint" && primerCoats && paintCoats === 2) {
        setStep(3);
      }
    } else if (step === 3 && serviceType) {
      // Open form dialog instead of going to step 4
      setIsDialogOpen(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    if (step === 1) return paintingType !== null;
    if (step === 2) {
      // Built-up area is mandatory (must be at least 200)
      if (builtUpArea < 200) return false;
      if (paintingType === "fresh") {
        return puttyCoats !== null && primerCoats !== null && paintCoats !== null;
      } else {
        return primerCoats !== null && paintCoats === 2;
      }
    }
    if (step === 3) return serviceType !== null;
    return false;
  };

  const resetCalculator = () => {
    setStep(1);
    setPaintingType(null);
    setPuttyCoats(null);
    setPrimerCoats(null);
    setPaintCoats(null);
    setServiceType(null);
    setBuiltUpArea(1000);
    // Reset form data
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setFormErrors({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        errors.phone = "Please enter a valid phone number (10-15 digits)";
        isValid = false;
      }
    }

    // Message is no longer mandatory - removed validation

    setFormErrors(errors);
    return isValid;
  };

  const generatePDF = (returnBlob = false): Blob | void => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("bhavan Alankar", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 8;

    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100);
    doc.text("Painting Cost Estimate", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 15;

    // Customer Details
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Customer Details", 20, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    // Show customer details only if provided, otherwise show "Not provided"
    const customerName = formData.name.trim() || "Not provided";
    const customerEmail = formData.email.trim() || "Not provided";
    const customerPhone = formData.phone.trim() || "Not provided";
    const customerMessage = formData.message.trim() || "Not provided";

    doc.text(`Name: ${customerName}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Email: ${customerEmail}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Phone: ${customerPhone}`, 20, yPosition);
    yPosition += 6;

    // Handle long messages with text wrapping
    const messageLines = doc.splitTextToSize(`Message: ${customerMessage}`, pageWidth - 40);
    doc.text(messageLines, 20, yPosition);
    yPosition += messageLines.length * 6;
    yPosition += 6;

    // Project Details Table (Excel-like format)
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Project Details", 20, yPosition);
    yPosition += 8;

    // Prepare table data
    const tableData: string[][] = [];

    // Built-up Area
    tableData.push(["Built-up Area", `${builtUpArea} sq ft`]);

    // Coverage Area
    tableData.push(["Coverage Area", `${coverageArea} sq ft`]);

    // Coats information
    if (paintingType === "fresh") {
      tableData.push(["Putty Coats", `${puttyCoats} coat${puttyCoats! > 1 ? "s" : ""}`]);
      tableData.push(["Primer Coats", `${primerCoats} coat${primerCoats! > 1 ? "s" : ""}`]);
      tableData.push(["Paint Coats", `${paintCoats} coat${paintCoats! > 1 ? "s" : ""}`]);
    } else {
      tableData.push(["Primer Coats", `${primerCoats} coat${primerCoats! > 1 ? "s" : ""}`]);
      tableData.push(["Paint Coats", `${paintCoats} coat${paintCoats! > 1 ? "s" : ""} (Fixed)`]);
    }

    // Paint Quality
    tableData.push(["Paint Quality", serviceType?.charAt(0).toUpperCase() + serviceType?.slice(1) || ""]);

    // Rate per sq ft
    if (cost) {
      const minRate = rateRanges[paintingType!][serviceType!].min;
      const maxRate = rateRanges[paintingType!][serviceType!].max;
      tableData.push([
        "Rate per sq ft",
        `Rs ${minRate} - Rs ${maxRate}`
      ]);
    }

    // Create table using autoTable
    autoTable(doc, {
      startY: yPosition,
      head: [["Item", "Details"]],
      body: tableData,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 4,
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [0, 100, 200],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        0: { cellWidth: 60, fontStyle: "bold" },
        1: { cellWidth: "auto" },
      },
      margin: { left: 20, right: 20 },
    });

    // Get the final Y position after table
    const finalY = (doc as any).lastAutoTable?.finalY || yPosition;
    yPosition = finalY + 10;

    // Total Cost Table
    if (cost) {
      yPosition += 5;

      // Format numbers without locale string to avoid encoding issues
      const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      const costTableData: string[][] = [
        ["Total Estimated Cost", `Rs ${formatNumber(cost.min)} - Rs ${formatNumber(cost.max)}`],
      ];

      autoTable(doc, {
        startY: yPosition,
        body: costTableData,
        theme: "grid",
        styles: {
          fontSize: 12,
          cellPadding: 6,
          textColor: [0, 0, 0],
          fontStyle: "bold",
        },
        bodyStyles: {
          fillColor: [230, 240, 255],
        },
        columnStyles: {
          0: { cellWidth: 60, fontStyle: "bold" },
          1: { cellWidth: "auto", fontStyle: "bold", textColor: [0, 100, 200] },
        },
        margin: { left: 20, right: 20 },
      });

      const finalYCost = (doc as any).lastAutoTable?.finalY || yPosition;
      yPosition = finalYCost + 10;
    }

    // Footer
    yPosition = pageHeight - 30;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("The Best Showroom in Jamshedpur with Nerolac Branding", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 5;
    doc.text("Phone: 76678 25974 | Email: info@bhavanalankar.com", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 5;
    doc.text(`Generated on: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`, pageWidth / 2, yPosition, { align: "center" });

    // Disclaimer
    yPosition += 8;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("*Prices are approximate and may vary based on location, surface condition, and specific requirements.", 20, yPosition, { maxWidth: pageWidth - 40 });

    // Generate PDF blob or download
    const customerNameForFile = formData.name.trim() ? formData.name.replace(/\s+/g, "_") : "Quote";
    const fileName = `Painting_Quote_${customerNameForFile}_${Date.now()}.pdf`;

    if (returnBlob) {
      // Use arraybuffer and convert to Blob for better compatibility with jsPDF v3
      const arrayBuffer = doc.output("arraybuffer");
      return new Blob([arrayBuffer], { type: "application/pdf" });
    } else {
      doc.save(fileName);
    }
  };

  // Email sending function - commented out for now
  // To re-enable: uncomment this function and the emailjs import, then uncomment the sendEmails call in handleFormSubmit
  /*
  const sendEmails = async (pdfBlob: Blob): Promise<{ success: boolean; method: string }> => {
    return new Promise((resolve) => {
      // Convert PDF to base64 for email
      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);
      
      reader.onloadend = async () => {
        try {
          const pdfBase64 = reader.result as string;
          const fileName = `Painting_Quote_${formData.name.replace(/\s+/g, "_")}_${Date.now()}.pdf`;

          // Prepare email data
          const projectDetails = `
Painting Type: ${paintingType === "fresh" ? "Fresh Painting" : "Re-painting"}
Built-up Area: ${builtUpArea} sq ft
Coverage Area: ${coverageArea} sq ft
${paintingType === "fresh" ? `Putty Coats: ${puttyCoats}\n` : ""}Primer Coats: ${primerCoats}
Paint Coats: ${paintCoats}
Paint Quality: ${serviceType?.charAt(0).toUpperCase() + serviceType?.slice(1)}
${cost ? `Rate per sq ft: Rs ${rateRanges[paintingType!][serviceType!].min} - Rs ${rateRanges[paintingType!][serviceType!].max}\n` : ""}${cost ? `Total Estimated Cost: Rs ${cost.min.toLocaleString()} - Rs ${cost.max.toLocaleString()}` : ""}
          `.trim();

          // Email template parameters for admin
          const adminEmailParams = {
            to_email: "rahulktiwari12@gmail.com",
            to_name: "Admin",
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            project_details: projectDetails,
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
            total_cost: cost ? `Rs ${cost.min.toLocaleString()} - Rs ${cost.max.toLocaleString()}` : "N/A",
            reply_to: formData.email,
          };

          // Email template parameters for customer
          const customerEmailParams = {
            to_email: formData.email,
            to_name: formData.name,
            customer_name: formData.name,
            project_details: projectDetails,
            total_cost: cost ? `Rs ${cost.min.toLocaleString()} - Rs ${cost.max.toLocaleString()}` : "N/A",
            pdf_data: pdfBase64,
            pdf_filename: fileName,
          };

          // Check if EmailJS is configured
          const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
          const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
          const customerTemplateId = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;
          const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

          if (serviceId && adminTemplateId && customerTemplateId && publicKey) {
            // Initialize EmailJS
            emailjs.init(publicKey);

            let adminSent = false;
            let customerSent = false;

            // Send email to admin (rahulktiwari12@gmail.com)
            try {
              await emailjs.send(
                serviceId,
                adminTemplateId,
                adminEmailParams
              );
              adminSent = true;
              console.log("Admin email sent successfully");
            } catch (error) {
              console.error("Error sending admin email:", error);
            }

            // Send email to customer
            try {
              await emailjs.send(
                serviceId,
                customerTemplateId,
                customerEmailParams
              );
              customerSent = true;
              console.log("Customer email sent successfully");
            } catch (error) {
              console.error("Error sending customer email:", error);
            }

            if (adminSent && customerSent) {
              resolve({ success: true, method: "EmailJS" });
            } else if (adminSent || customerSent) {
              resolve({ success: true, method: "EmailJS (partial)" });
            } else {
              // Fallback to mailto if EmailJS fails
              const mailtoSubject = encodeURIComponent(`New Painting Quote Request from ${formData.name}`);
              const mailtoBody = encodeURIComponent(
                `Customer Details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}\n\nProject Details:\n${projectDetails}\n\nTotal Cost: ${cost ? `Rs ${cost.min.toLocaleString()} - Rs ${cost.max.toLocaleString()}` : "N/A"}`
              );
              window.open(`mailto:rahulktiwari12@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`);
              resolve({ success: false, method: "mailto (EmailJS failed)" });
            }
          } else {
            // Fallback: Use mailto links if EmailJS is not configured
            console.warn("EmailJS not configured. Using mailto fallback.");
            
            const mailtoSubject = encodeURIComponent(`New Painting Quote Request from ${formData.name}`);
            const mailtoBody = encodeURIComponent(
              `Customer Details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}\n\nProject Details:\n${projectDetails}\n\nTotal Cost: ${cost ? `Rs ${cost.min.toLocaleString()} - Rs ${cost.max.toLocaleString()}` : "N/A"}`
            );
            window.open(`mailto:rahulktiwari12@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`);
            resolve({ success: false, method: "mailto (EmailJS not configured)" });
          }
        } catch (error) {
          console.error("Error preparing email:", error);
          resolve({ success: false, method: "error" });
        }
      };

      reader.onerror = () => {
        resolve({ success: false, method: "error" });
      };
    });
  };
  */

  const handleDirectDownload = async () => {
    if (step === 4 && cost) {
      try {
        // Generate PDF with empty form data (will show "Not provided" for customer details)
        const pdfBlob = generatePDF(true) as Blob;

        // Validate blob
        if (!pdfBlob || pdfBlob.size === 0) {
          throw new Error("Failed to generate PDF. The PDF blob is empty or invalid.");
        }

        // Download PDF for user - use form data if available
        const customerNameForFile = formData.name.trim() ? formData.name.replace(/\s+/g, "_") : "Quote";
        const fileName = `Painting_Quote_${customerNameForFile}_${Date.now()}.pdf`;
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Show success message
        await Swal.fire({
          icon: "success",
          title: "PDF Downloaded!",
          html: `
            <p>Quote PDF has been downloaded successfully!</p>
            <p>Your quotation is ready.</p>
          `,
          confirmButtonText: "OK",
          confirmButtonColor: "#0066cc",
        });
      } catch (error) {
        console.error("Error generating PDF:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          html: `
            <p>There was an error generating or downloading the PDF.</p>
            <p>${error instanceof Error ? error.message : "Please try again or contact us directly at rahulktiwari12@gmail.com"}</p>
          `,
          confirmButtonText: "OK",
          confirmButtonColor: "#0066cc",
        });
      }
    }
  };

  const handleGetQuote = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (step === 4 && cost) {
      // Generate and download PDF directly without form
      handleDirectDownload();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSendingEmail(true);

      try {
        // Close dialog first
        setIsDialogOpen(false);

        // Proceed to step 4 (results)
        // Keep form data for PDF generation
        setStep(4);

        // Clear form errors only
        setFormErrors({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // Email sending messages - commented out for now
        // if (emailResult.success && emailResult.method === "EmailJS") {
        //   await Swal.fire({
        //     icon: "success",
        //     title: "Success!",
        //     html: `
        //       <p>Quote PDF has been downloaded successfully!</p>
        //       <p>Emails have been sent to:</p>
        //       <ul style="text-align: left; display: inline-block;">
        //         <li>Admin: rahulktiwari12@gmail.com</li>
        //         <li>Customer: ${formData.email}</li>
        //       </ul>
        //     `,
        //     confirmButtonText: "OK",
        //     confirmButtonColor: "#0066cc",
        //   });
        // } else if (emailResult.success && emailResult.method === "EmailJS (partial)") {
        //   await Swal.fire({
        //     icon: "warning",
        //     title: "Partially Sent",
        //     html: `
        //       <p>Quote PDF has been downloaded successfully!</p>
        //       <p>Some emails may not have been sent. Please check your EmailJS configuration.</p>
        //     `,
        //     confirmButtonText: "OK",
        //     confirmButtonColor: "#0066cc",
        //   });
        // } else {
        //   await Swal.fire({
        //     icon: "info",
        //     title: "PDF Downloaded",
        //     html: `
        //       <p>Quote PDF has been downloaded successfully!</p>
        //       <p><strong>Note:</strong> EmailJS is not configured. Your email client will open to send the quote details to rahulktiwari12@gmail.com</p>
        //       <p>To enable automatic email sending, please configure EmailJS. See EMAILJS_SETUP.md for instructions.</p>
        //     `,
        //     confirmButtonText: "OK",
        //     confirmButtonColor: "#0066cc",
        //   });
        // }
      } catch (error) {
        console.error("Error generating PDF or downloading:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          html: `
            <p>There was an error generating or downloading the PDF.</p>
            <p>${error instanceof Error ? error.message : "Please try again or contact us directly at rahulktiwari12@gmail.com"}</p>
          `,
          confirmButtonText: "OK",
          confirmButtonColor: "#0066cc",
        });
      } finally {
        setIsSendingEmail(false);
      }
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="border-border relative overflow-hidden shadow-2xl">
      {/* Colorful background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-400/5 to-purple-400/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 via-purple-400 to-pink-400"></div>

      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center animate-fade-in-up">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mr-3 shadow-lg">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xl font-bold">Painting Cost Calculator</div>
            <div className="text-xs text-muted-foreground font-normal">Labour + Material</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Step {step} of 4</span>
            <span className="text-xs font-medium text-primary">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Select Painting Type */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in-up">
            <Label className="text-base font-semibold flex items-center">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary font-bold">1</span>
              Select Painting Type:
            </Label>
            <RadioGroup
              value={paintingType || ""}
              onValueChange={(value) => {
                setPaintingType(value as PaintingType);
                // Auto-set paint coats to 2 for repaint
                if (value === "repaint") {
                  setPaintCoats(2);
                } else {
                  setPaintCoats(null);
                }
              }}
            >
              <div className={`flex items-center space-x-3 p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 group ${paintingType === "fresh"
                  ? "border-primary bg-primary/10 shadow-lg scale-[1.02]"
                  : "border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-md"
                }`}>
                <RadioGroupItem value="fresh" id="fresh" className="group-hover:scale-110 transition-transform" />
                <Label htmlFor="fresh" className="flex-1 cursor-pointer">
                  <div className="font-semibold text-lg group-hover:text-primary transition-colors">Fresh Painting</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    New construction or complete renovation
                  </div>
                </Label>
                {paintingType === "fresh" && (
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                )}
              </div>
              <div className={`flex items-center space-x-3 p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 group ${paintingType === "repaint"
                  ? "border-primary bg-primary/10 shadow-lg scale-[1.02]"
                  : "border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-md"
                }`}>
                <RadioGroupItem value="repaint" id="repaint" className="group-hover:scale-110 transition-transform" />
                <Label htmlFor="repaint" className="flex-1 cursor-pointer">
                  <div className="font-semibold text-lg group-hover:text-primary transition-colors">Re-painting</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Repainting existing walls (2 coat painting fixed)
                  </div>
                </Label>
                {paintingType === "repaint" && (
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                )}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 2: Select Coats */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4 p-4 bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-lg border border-primary/20">
              <h3 className="font-semibold flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-primary font-bold">2</span>
                {paintingType === "fresh" ? "Fresh Painting" : "Re-painting"} - Select Coats
              </h3>
              <Badge variant="secondary" className="animate-scale-in">Step 2 of 3</Badge>
            </div>

            {/* Built-up Area */}
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <Label className="text-base mb-4 block flex items-center">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-primary text-xs font-bold">📐</span>
                Built-up Area: <span className="font-bold text-primary ml-2 text-lg">{builtUpArea.toLocaleString()} sq ft</span> <span className="text-destructive ml-1">*</span>
              </Label>
              <Slider
                value={[builtUpArea]}
                onValueChange={(value) => setBuiltUpArea(value[0])}
                min={200}
                max={10000}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>200 sq ft</span>
                <span>10,000 sq ft</span>
              </div>
              {/* Coverage Area Hidden as per request
              <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-medium">
                  Coverage Area: <span className="font-bold text-primary text-lg">{coverageArea.toLocaleString()} sq ft</span>
                </p>
              </div>
              */}
            </div>

            {paintingType === "fresh" && (
              <>
                {/* Putty Coats */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Putty Coats:</Label>
                  <RadioGroup
                    value={puttyCoats?.toString() || ""}
                    onValueChange={(value) => setPuttyCoats(parseInt(value))}
                  >
                    <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 group ${puttyCoats === 1
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm"
                      }`}>
                      <RadioGroupItem value="1" id="putty-1" className="group-hover:scale-110 transition-transform" />
                      <Label htmlFor="putty-1" className="flex-1 cursor-pointer group-hover:text-primary transition-colors font-medium">1 Coat Putty</Label>
                    </div>
                    <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 group ${puttyCoats === 2
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm"
                      }`}>
                      <RadioGroupItem value="2" id="putty-2" className="group-hover:scale-110 transition-transform" />
                      <Label htmlFor="putty-2" className="flex-1 cursor-pointer group-hover:text-primary transition-colors font-medium">2 Coat Putty</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Primer Coats */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Primer Coats:</Label>
                  <RadioGroup
                    value={primerCoats?.toString() || ""}
                    onValueChange={(value) => setPrimerCoats(parseInt(value))}
                  >
                    <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 group ${primerCoats === 1
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm"
                      }`}>
                      <RadioGroupItem value="1" id="primer-1" className="group-hover:scale-110 transition-transform" />
                      <Label htmlFor="primer-1" className="flex-1 cursor-pointer group-hover:text-primary transition-colors font-medium">1 Coat Primer</Label>
                    </div>
                    <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 group ${primerCoats === 2
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm"
                      }`}>
                      <RadioGroupItem value="2" id="primer-2" className="group-hover:scale-110 transition-transform" />
                      <Label htmlFor="primer-2" className="flex-1 cursor-pointer group-hover:text-primary transition-colors font-medium">2 Coat Primer</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Paint Coats */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Paint Coats:</Label>
                  <RadioGroup
                    value={paintCoats?.toString() || ""}
                    onValueChange={(value) => setPaintCoats(parseInt(value))}
                  >
                    <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 group ${paintCoats === 1
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm"
                      }`}>
                      <RadioGroupItem value="1" id="paint-1" className="group-hover:scale-110 transition-transform" />
                      <Label htmlFor="paint-1" className="flex-1 cursor-pointer group-hover:text-primary transition-colors font-medium">1 Coat Painting</Label>
                    </div>
                    <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 group ${paintCoats === 2
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm"
                      }`}>
                      <RadioGroupItem value="2" id="paint-2" className="group-hover:scale-110 transition-transform" />
                      <Label htmlFor="paint-2" className="flex-1 cursor-pointer group-hover:text-primary transition-colors font-medium">2 Coat Painting</Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}

            {paintingType === "repaint" && (
              <>
                {/* Primer Coats for Re-painting */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Primer Coats:</Label>
                  <RadioGroup
                    value={primerCoats?.toString() || ""}
                    onValueChange={(value) => setPrimerCoats(parseInt(value))}
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="1" id="primer-repaint-1" />
                      <Label htmlFor="primer-repaint-1" className="flex-1 cursor-pointer">1 Coat Primer</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="2" id="primer-repaint-2" />
                      <Label htmlFor="primer-repaint-2" className="flex-1 cursor-pointer">2 Coat Primer</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Paint Coats for Re-painting (Fixed at 2) */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Paint Coats:</Label>
                  <div className="p-3 border rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      </div>
                      <Label className="flex-1 cursor-pointer">
                        2 Coat Painting (Fixed for Re-painting)
                      </Label>
                    </div>
                  </div>
                  {paintCoats !== 2 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setPaintCoats(2)}
                    >
                      Confirm 2 Coat Painting
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3: Select Paint Quality */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4 p-4 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-lg border border-primary/20">
              <h3 className="font-semibold flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-primary font-bold">3</span>
                Select Paint Quality:
              </h3>
              <Badge variant="secondary" className="animate-scale-in">Step 3 of 3</Badge>
            </div>

            <RadioGroup
              value={serviceType || ""}
              onValueChange={(value) => setServiceType(value as ServiceType)}
            >
              <div className="space-y-4">
                <div
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 group relative overflow-hidden ${serviceType === "popular"
                      ? "border-primary bg-gradient-to-br from-primary/10 to-blue-400/10 shadow-lg scale-[1.02]"
                      : "border-border hover:border-primary/50 hover:shadow-md hover:scale-[1.01]"
                    }`}
                  onClick={() => setServiceType("popular")}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="flex items-center justify-between relative z-10 gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-xl group-hover:text-primary transition-colors">Popular</div>
                      <div className="text-sm text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors whitespace-nowrap">
                        {paintingType === "fresh" ? "₹18-22" : "₹16-18"} per sq ft
                      </div>
                    </div>
                    <RadioGroupItem value="popular" id="popular" className="group-hover:scale-110 transition-transform flex-shrink-0" />
                  </div>
                </div>

                <div
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 group relative overflow-hidden ${serviceType === "premium"
                      ? "border-primary bg-gradient-to-br from-blue-400/10 to-purple-400/10 shadow-lg scale-[1.02]"
                      : "border-border hover:border-primary/50 hover:shadow-md hover:scale-[1.01]"
                    }`}
                  onClick={() => setServiceType("premium")}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="flex items-center justify-between relative z-10 gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-xl group-hover:text-primary transition-colors">Premium</div>
                      <div className="text-sm text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors whitespace-nowrap">
                        {paintingType === "fresh" ? "₹23-25" : "₹19-21"} per sq ft
                      </div>
                    </div>
                    <RadioGroupItem value="premium" id="premium" className="group-hover:scale-110 transition-transform flex-shrink-0" />
                  </div>
                </div>

                <div
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 group relative overflow-hidden ${serviceType === "luxury"
                      ? "border-primary bg-gradient-to-br from-purple-400/10 to-pink-400/10 shadow-lg scale-[1.02]"
                      : "border-border hover:border-primary/50 hover:shadow-md hover:scale-[1.01]"
                    }`}
                  onClick={() => setServiceType("luxury")}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="flex items-center justify-between relative z-10 gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-xl group-hover:text-primary transition-colors">Luxury</div>
                      <div className="text-sm text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors whitespace-nowrap">
                        {paintingType === "fresh" ? "₹26-29" : "₹22-26"} per sq ft
                      </div>
                    </div>
                    <RadioGroupItem value="luxury" id="luxury" className="group-hover:scale-110 transition-transform flex-shrink-0" />
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && cost && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 via-blue-400/10 to-purple-400/10 rounded-xl border border-primary/20">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-lg animate-scale-in">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Estimated Cost</h3>
              <p className="text-muted-foreground">Based on your selections</p>
            </div>

            <div className="space-y-4 p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border border-border/50 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Built-up Area</span>
                <span className="font-semibold">{builtUpArea} sq ft</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Coverage Area (3x)</span>
                <span className="font-semibold">{coverageArea} sq ft</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Painting Type</span>
                <span className="font-semibold capitalize">
                  {paintingType === "fresh" ? "Fresh Painting" : "Re-painting"}
                </span>
              </div>
              {paintingType === "fresh" && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Coats Selected</span>
                  <span className="font-semibold">
                    {puttyCoats} Putty + {primerCoats} Primer + {paintCoats} Paint
                  </span>
                </div>
              )}
              {paintingType === "repaint" && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Coats Selected</span>
                  <span className="font-semibold">
                    {primerCoats} Primer + {paintCoats} Paint
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Paint Quality</span>
                <span className="font-semibold capitalize">{serviceType}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="text-center p-6 bg-background rounded-xl border-2 border-primary/30 shadow-lg">
                <div className="text-sm text-muted-foreground mb-3 font-medium">Total Estimated Cost</div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent mb-3 animate-fade-in-up whitespace-nowrap">
                  ₹{cost.min.toLocaleString()} - ₹{cost.max.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground mt-2 p-2 bg-background/50 rounded-lg inline-block whitespace-nowrap">
                  Rate: ₹{rateRanges[paintingType!][serviceType!].min} - ₹{rateRanges[paintingType!][serviceType!].max} per sq ft
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border">
          {step > 1 && step < 4 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 hover:scale-105 transition-transform duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          {step < 4 && (
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {step === 3 ? "Calculate" : "Next"}
              {step < 3 && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          )}
          {step === 4 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={resetCalculator}
                className="flex-1 hover:scale-105 transition-transform duration-300"
              >
                Calculate Again
              </Button>
              <Button
                type="button"
                variant="hero"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleGetQuote(e);
                }}
                className="flex-1 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF Quote
              </Button>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          *Prices are approximate and may vary based on location, surface condition, and specific requirements.
        </p>
      </CardContent>

      {/* Quote Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {/* Colorful background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-400/5 to-purple-400/5 pointer-events-none rounded-lg"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 via-purple-400 to-pink-400 rounded-t-lg"></div>

          <DialogHeader className="relative z-10">
            <DialogTitle className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mr-3 shadow-lg">
                <Download className="w-5 h-5 text-white" />
              </div>
              Get Your Quote
            </DialogTitle>
            <DialogDescription className="mt-2">
              Please fill in your details to proceed with the cost calculation. Name, Email, and Phone are required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4 relative z-10">
            <div className="space-y-2 animate-fade-in-up">
              <Label htmlFor="name" className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                Name <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`transition-all duration-300 ${formErrors.name
                    ? "border-destructive focus:border-destructive focus:ring-destructive"
                    : "focus:border-primary focus:ring-primary"
                  }`}
              />
              {formErrors.name && (
                <p className="text-sm text-destructive animate-fade-in">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Label htmlFor="email" className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                Email <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`transition-all duration-300 ${formErrors.email
                    ? "border-destructive focus:border-destructive focus:ring-destructive"
                    : "focus:border-primary focus:ring-primary"
                  }`}
              />
              {formErrors.email && (
                <p className="text-sm text-destructive animate-fade-in">{formErrors.email}</p>
              )}
            </div>

            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Label htmlFor="phone" className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                Phone <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`transition-all duration-300 ${formErrors.phone
                    ? "border-destructive focus:border-destructive focus:ring-destructive"
                    : "focus:border-primary focus:ring-primary"
                  }`}
              />
              {formErrors.phone && (
                <p className="text-sm text-destructive animate-fade-in">{formErrors.phone}</p>
              )}
            </div>

            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Label htmlFor="message" className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                Message <span className="text-muted-foreground text-xs ml-1">(Optional)</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Enter your message or additional requirements (optional)"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="transition-all duration-300 focus:border-primary focus:ring-primary"
                rows={4}
              />
            </div>

            <DialogFooter className="relative z-10">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="hover:scale-105 transition-transform duration-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="hero"
                disabled={isSendingEmail}
                className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 hover:from-primary/90 hover:via-blue-500/90 hover:to-purple-500/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Calculator className="w-4 h-4 mr-2" />
                {isSendingEmail ? "Processing..." : "Calculate Cost"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PaintCalculator;
