# EmailJS Setup Guide

To enable email functionality for the quote form, you need to set up EmailJS:

## Steps:

1. **Create an EmailJS account** at https://www.emailjs.com/

2. **Create Email Service:**
   - Go to Email Services
   - Add a new service (Gmail, Outlook, etc.)
   - Note your Service ID

3. **Create Email Templates:**
   
   **Template 1: Admin Notification** (to rahulktiwari12@gmail.com)
   - Template ID: `template_admin`
   - Subject: `New Painting Quote Request from {{customer_name}}`
   - Body:
   ```
   New quote request received:
   
   Customer Details:
   Name: {{customer_name}}
   Email: {{customer_email}}
   Phone: {{customer_phone}}
   Message: {{message}}
   
   Project Details:
   {{project_details}}
   
   Total Estimated Cost: {{total_cost}}
   ```

   **Template 2: Customer Confirmation** (to customer email)
   - Template ID: `template_customer`
   - Subject: `Your Painting Quote from bhavan Alankar`
   - Body:
   ```
   Dear {{customer_name}},
   
   Thank you for your interest in our painting services.
   
   Your Quote Details:
   {{project_details}}
   
   Total Estimated Cost: {{total_cost}}
   
   We will contact you shortly to discuss your project.
   
   Best regards,
   bhavan Alankar
   The Best Showroom in Jamshedpur with Nerolac Branding
   ```

4. **Get your Public Key:**
   - Go to Account > API Keys
   - Copy your Public Key

5. **Add Environment Variables:**
   Create a `.env` file in the root directory:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_admin
   VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_customer
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

6. **Restart your development server** after adding environment variables.

## Alternative: Backend API

If you prefer not to use EmailJS, you can:
1. Create a backend API endpoint to send emails
2. Update the `sendEmails` function to call your API instead
3. Send the form data and PDF as base64 to your backend

