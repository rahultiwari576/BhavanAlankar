import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsConditions = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="section-spacing">
        <div className="container-custom max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">TERMS AND CONDITIONS</h1>
          </div>

          <div className="prose prose-lg max-w-none space-y-6">
            <p>
              Thank you for visiting our website (the 'Website'). Please read these terms and conditions carefully before you start to use the Website. By using our Website, you express to accept (unconditionally and irrevocably) these terms and conditions (the 'Agreement'). If you do not agree to these terms and conditions, please refrain from using our Website and exit immediately.
            </p>

            <p>
              You authorize the legal right and ability to enter into this Agreement to use this Website in accordance with all terms and conditions specified. You also acknowledge and confirm that, unless we specifically provide otherwise, this Agreement only applies to this site and our online activities, restraining all our offline activities.
            </p>

            <p>
              You agree to indemnify us from and against any and all liabilities, expenses and damages due to claims resulting from your use of this Website, including without limitation any claims alleging facts that if true would constitute a breach by you of these T&Cs.
            </p>

            <p>
              You agree to use this website only to determine the availability of goods and services and make legitimate reservations or transact business with us. You agree to use the Website only for personal, non-commercial use. You agree to all of our terms and conditions of purchase, including, but not limited to, full and timely payment of all amounts due and compliance with all rules concerning availability of products, or services. All fees, assessments, charges, taxes and duties arising out of use of the Website are your sole obligations.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">User Restrictions</h2>
            <p>
              You comply to use the Website only for personal, non-commercial use. You agree to use the Website's services to make only legal purchases. You agree to all of our terms and conditions of purchase, including, but not limited to, full and timely payment of all amounts due and compliance with all rules concerning availability of products, or services. All fees, assessments, charges, taxes and duties arising out of use of the Website are your sole responsibility. You agree to not abuse the Website. 'Abuse' includes, without limitation, using the Website to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Damage or interfere with the operation of others' computers and software in any respect, including, without limitation, by uploading, downloading or transmitting corrupt files or computer viruses.</li>
              <li>Breach applicable intellectual property, publicity or privacy rights, including, without limitation, by uploading, downloading or transmitting materials or software.</li>
              <li>Harass, stalk, threaten, defame, abuse or otherwise violate others' rights as defined by applicable law.</li>
              <li>Misrepresent the origin of, or rights in, any file you download or upload, including, without limitation, by omitting proprietary language, author identifications, or notices of patent, copyright or trademark.</li>
              <li>Disseminate, post, or otherwise disclose trade secrets, or other confidential or protected proprietary material or information.</li>
              <li>Download or upload unlawful files to distribute through the Website.</li>
              <li>Relay any information or software obtained through the Website, or copy, create, display, distribute, license, perform, publish, recreate, reproduce, sell, or transfer works deriving from the Website.</li>
              <li>Unscrupulously use a password or personal identification number during logging into the Website, or misrepresent one's identity or authority to act on behalf of another. Violate this Agreement in any other manner.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
            <p>
              All content on this Website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Bhavan Alankar or its content suppliers and is protected by Indian and international copyright laws. The compilation of all content on this site is the exclusive property of Bhavan Alankar and protected by Indian and international copyright laws.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Product Information</h2>
            <p>
              We strive to provide accurate product descriptions, pricing, and availability information. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
            <p>
              Bhavan Alankar shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the Website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Modifications to Terms</h2>
            <p>
              We reserve the right to make changes to our Website, policies, and these Terms and Conditions at any time. Your continued use of the Website after any changes indicates your acceptance of the new Terms and Conditions.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts of Jamshedpur, Jharkhand, India.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> info@bhavanalankar.com<br />
              <strong>Phone:</strong> 76678 25974<br />
              <strong>Address:</strong> C/123, Dispensary Road/ Gudri Bazaar, Sonari, Jamshedpur - 831011
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;

