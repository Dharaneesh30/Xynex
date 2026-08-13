import React from 'react';
import Starfield from '../../components/animations/Starfield';
import BlurReveal from '../../components/animations/BlurReveal';

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="flex-grow pt-32 pb-20 px-6 w-full relative z-10">
      {/* Background */}
      <div className="fixed inset-0 z-[-1] bg-[#050507]">
        <Starfield speed={0.5} color="#A78BFA" className="opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.1),transparent_50%)] pointer-events-none" />
      </div>

      {/* Hero Section */}
      <section className="text-center mb-16 pt-10">
        <BlurReveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#06B6D4] mb-4 uppercase">LEGAL</p>
          <h1 className="text-4xl md:text-5xl font-display font-medium mb-6 text-[#F8FAFC] tracking-tight">Privacy Policy</h1>
          <p className="text-lg text-[#CBD5E1] max-w-2xl mx-auto mb-4 leading-relaxed">
            Your privacy matters. This policy explains how information is collected, used, and protected when you use XYNEX.
          </p>
          <p className="text-sm text-[#94A3B8]">Last Updated: {currentDate}</p>
        </BlurReveal>
      </section>

      {/* Legal Content */}
      <section className="max-w-[800px] mx-auto bg-[rgba(13,13,20,0.65)] backdrop-blur-xl border border-[#272333] rounded-[24px] p-8 md:p-16 shadow-[0_0_30px_rgba(124,58,237,0.05)] mb-10">
        <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:font-medium prose-h2:text-2xl prose-h2:text-[#F8FAFC] prose-h2:mb-4 prose-h2:mt-10 prose-p:text-[#CBD5E1] prose-p:leading-relaxed prose-li:text-[#CBD5E1] prose-a:text-[#A78BFA] hover:prose-a:text-[#22D3EE] transition-colors">
          
          <p className="text-[#94A3B8] italic mb-8">
            Note: This Privacy Policy is provided as a draft for the XYNEX platform and should be reviewed by a qualified legal professional.
          </p>

          <h2 className="mt-0">1. Information We Collect</h2>
          <p>When you use XYNEX, we may collect the following information:</p>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, and authentication credentials when you register for an account.</li>
            <li><strong>Design & Project Information:</strong> Data related to the spaces, dimensions, and experiences you build, save, or generate using the platform.</li>
            <li><strong>Contact Information:</strong> Information you provide when using our contact forms or communicating with us.</li>
          </ul>

          <h2>2. How We Use Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>Providing, maintaining, and improving the XYNEX platform and its design generation features.</li>
            <li>Managing your user account and securely storing your design history.</li>
            <li>Processing your requests and responding to your inquiries.</li>
            <li>Ensuring the security and integrity of our systems.</li>
          </ul>

          <h2>3. User-Created Designs & Content</h2>
          <p>
            XYNEX allows you to imagine and generate spatial designs. Designs saved to your profile are private to your account unless you explicitly choose to share or showcase them. We do not claim ownership of the underlying concepts of your user-created designs.
          </p>

          <h2>4. Data Storage</h2>
          <p>
            Your information, including account details and saved designs, is securely stored in our database infrastructure (powered by MongoDB). We do not expose or share internal database credentials or server configurations.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We take reasonable measures designed to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no internet-based service can guarantee absolute security, and you use the platform at your own risk.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your account information and design data for as long as your account remains active or as needed to provide you with the XYNEX services. You may request account deletion by contacting us.
          </p>

          <h2>7. User Rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct, or delete the personal information we hold about you. You can update your account information directly within your profile or contact us for assistance.
          </p>

          <h2>8. Changes</h2>
          <p>
            We may update this Privacy Policy from time to time. The latest version will always be available on this page, and the "Last Updated" date at the top will reflect the most recent revisions.
          </p>

          <h2>9. Contact</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at:
            <br />
            <a href="mailto:dharaneesh0530@gmail.com">dharaneesh0530@gmail.com</a>
          </p>

        </div>
      </section>
    </main>
  );
}
