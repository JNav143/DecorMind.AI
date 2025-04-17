'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function UpgradeModal({ show, onClose, currentPlan = "free" }) {
    const router = useRouter();

    if (!show) return null;

    let upgradeTo = "premium"; // Default upgrade
    let message = "You've used all your free credits! Upgrade to Premium for 10 AI designs.";
    let planDetails = {
        price: "₹1",
        features: "10 designs per month",
        tag: "POPULAR"
    };

    // Customize based on current plan
    if (currentPlan === "premium") {
        upgradeTo = "pro";
        message = "Upgrade to Pro for unlimited AI designs and priority support!";
        planDetails = {
            price: "₹999",
            features: "Unlimited designs + priority support",
            tag: "UNLIMITED"
        };
    }

    const handleUpgrade = () => {
        router.push(`/pricing?plan=${upgradeTo}`);
        onClose();
    };
    
    const handleContinue = () => {
        onClose();
        // Reset the entire design process by simulating a click on start over
        window.location.href = '/redesign';
    };

    return (
        <div className="fixed inset-0 backdrop-blur-md bg-black/60 flex items-center justify-center z-50 p-4 transition-all duration-300 animate-fadeIn">
            <div
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full shadow-xl animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Upgrade Your Plan</h3>
                    <p className="text-zinc-400">{message}</p>
                </div>

                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-white">{upgradeTo.charAt(0).toUpperCase() + upgradeTo.slice(1)} Plan</h4>
                        <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-1 rounded">{planDetails.tag}</span>
                    </div>
                    <div className="flex items-baseline mb-2">
                        <span className="text-2xl font-bold text-white">{planDetails.price}</span>
                        <span className="text-zinc-400 ml-1">/month</span>
                    </div>
                    <p className="text-zinc-400 text-sm">{planDetails.features}</p>
                </div>

                <div className="flex flex-col space-y-3">
                    <button
                        onClick={handleUpgrade}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium py-2.5 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-600/20"
                    >
                        Upgrade Now
                    </button>
                    <button
                        onClick={handleContinue}
                        className="w-full bg-zinc-800 text-zinc-300 font-medium py-2.5 px-4 rounded-lg hover:bg-zinc-700 transition-all duration-300"
                    >
                        Continue with {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={onClose}
                        className="text-zinc-500 text-sm hover:text-zinc-400 transition-colors"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
}