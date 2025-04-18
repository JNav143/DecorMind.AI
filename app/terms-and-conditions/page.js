'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TermsAndConditions() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => router.push('/')}>
          <div className="bg-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-slate-800 text-xs font-bold">DM</div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-slate-800 via-cyan-400 to-green-400 text-transparent bg-clip-text">DecorMind</h1>
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-lg">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-cyan-400 to-green-400 text-transparent bg-clip-text">Terms and Conditions</h1>
          
          <div className="text-zinc-300 space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <p className="text-sm text-zinc-500">Effective Date: April 2, 2025</p>
            </div>

            <p>Welcome to DecorMind AI. These Terms and Conditions govern your access to and use of our AI-powered interior design services. By using our website, you agree to comply with these terms.</p>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-white">1. Use of Services</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Our AI-generated interior designs are for personal and commercial use, subject to applicable copyright laws.</li>
                <li>You agree not to misuse the services, attempt unauthorized access, or disrupt website functionality.</li>
                <li>The designs generated by AI are suggestions and may not be suitable for all interior spaces. Users should verify feasibility before implementation.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-white">2. User Accounts</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You may need to create an account to access certain features.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>We reserve the right to suspend or terminate accounts that violate our policies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-white">3. Payment & Refund Policy</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>All payments for AI-generated designs or premium services are non-refundable.</li>
                <li>Subscription-based services will auto-renew unless canceled before the billing cycle.</li>
                <li>In case of payment disputes, contact us at <a href="mailto:ai.decormind@gmail.com" className="text-cyan-400 hover:underline">ai.decormind@gmail.com</a>.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-white">4. Intellectual Property</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>All AI-generated designs remain the property of DecorMind AI.</li>
                <li>Users may use designs for personal or business purposes but cannot claim ownership over AI-generated outputs.</li>
                <li>Unauthorized reproduction, redistribution, or resale of AI-generated content is prohibited.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-white">5. Limitations of Liability</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>DecorMind AI provides design suggestions based on AI algorithms. We are not liable for inaccuracies or unsatisfactory results.</li>
                <li>We do not guarantee that our services will always be available, uninterrupted, or error-free.</li>
                <li>We are not responsible for any damages resulting from reliance on AI-generated designs.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-white">6. Changes to Terms</h2>
              <p>We may update these Terms and Conditions periodically. Continued use of our services constitutes acceptance of the revised terms.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-white">7. Contact Us</h2>
              <p>If you have any questions regarding these Terms and Conditions, please contact us at <a href="mailto:ai.decormind@gmail.com" className="text-cyan-400 hover:underline">ai.decormind@gmail.com</a>.</p>
            </div>

            <p>By using our website, you acknowledge and agree to abide by these Terms and Conditions.</p>

            <div className="border-t border-zinc-800 pt-4 mt-8">
              <p className="font-semibold">DecorMind AI</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-cyan-400 hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}