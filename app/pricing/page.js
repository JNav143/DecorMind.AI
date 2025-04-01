'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

export default function Pricing() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Add CSS animations
  useEffect(() => {
    // Set mounted state to true
    setMounted(true);
    
    // Add CSS for animations
    let style;
    if (typeof window !== 'undefined') {
      style = document.createElement('style');
      style.innerHTML = `
        @keyframes highlightSection {
          0% { background-color: rgba(34, 211, 238, 0.1); }
          50% { background-color: rgba(34, 211, 238, 0.2); }
          100% { background-color: transparent; }
        }
        
        .highlight-section {
          animation: highlightSection 1.5s ease-out;
        }

        /* Special animation for contact section */
        @keyframes highlightContactSection {
          0% { background-color: rgba(34, 211, 238, 0.15); }
          50% { background-color: rgba(34, 211, 238, 0.3); }
          100% { background-color: rgba(24, 24, 27, 1); } /* bg-zinc-900 */
        }
        
        #contact.highlight-section {
          animation: highlightContactSection 1.5s ease-out;
        }

        /* Contact form highlight animation */
        @keyframes highlightContactForm {
          0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.3); }
          50% { box-shadow: 0 0 20px 5px rgba(34, 211, 238, 0.5); }
          100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
        }
        
        #contact.highlight-section form {
          animation: highlightContactForm 2s ease-out;
        }

        /* Section scroll animation */
        @keyframes sectionFadeIn {
          0% { 
            opacity: 0.7; 
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .section-fade-in {
          animation: sectionFadeIn 0.8s ease-out forwards;
        }

        /* Heading highlight animation */
        @keyframes headingHighlight {
          0% { 
            background-size: 100% 0%;
          }
          100% { 
            background-size: 100% 100%;
          }
        }
        
        .heading-highlight {
          background-image: linear-gradient(transparent 60%, rgba(34, 211, 238, 0.2) 40%);
          background-size: 100% 0%;
          background-repeat: no-repeat;
          animation: headingHighlight 0.8s ease-out forwards;
        }

        /* Icon animation */
        @keyframes iconPulse {
          0% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.7);
          }
          70% { 
            transform: scale(1.1);
            box-shadow: 0 0 0 10px rgba(34, 211, 238, 0);
          }
          100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 211, 238, 0);
          }
        }
        
        .icon-pulse {
          animation: iconPulse 1.5s ease-out;
        }

        /* Navigation link click animation */
        @keyframes navLinkClick {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        .nav-link-clicked {
          animation: navLinkClick 0.3s ease-out;
          color: #22d3ee !important;
        }

        /* Navigation link hover animation */
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #22d3ee;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }

        /* Navigation links fade-in animation on page load */
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-link:nth-child(1) {
          animation: fadeInDown 0.5s ease-out 0.1s forwards;
          opacity: 0;
        }

        .nav-link:nth-child(2) {
          animation: fadeInDown 0.5s ease-out 0.2s forwards;
          opacity: 0;
        }

        .nav-link:nth-child(3) {
          animation: fadeInDown 0.5s ease-out 0.3s forwards;
          opacity: 0;
        }

        .nav-link:nth-child(4) {
          animation: fadeInDown 0.5s ease-out 0.4s forwards;
          opacity: 0;
        }

        .nav-link:nth-child(5) {
          animation: fadeInDown 0.5s ease-out 0.5s forwards;
          opacity: 0;
        }

        /* Navigation bar slide-down animation */
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .nav-slide-down {
          animation: slideDown 0.5s ease-out forwards;
        }

        /* Global smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `;
      document.head.appendChild(style);
    }

    // Function to add animations to a section
    const animateSection = (section) => {
      if (!section) return;
      
      // Add highlight animation to the section
      section.classList.add("highlight-section");
      
      // Add fade-in animation to section elements
      const sectionElements = section.querySelectorAll('h2, h3, h4, p, .grid, .flex');
      sectionElements.forEach((element, index) => {
        // Stagger the animations
        setTimeout(() => {
          element.classList.add('section-fade-in');
          
          // Remove the animation class after it completes
          setTimeout(() => {
            element.classList.remove('section-fade-in');
          }, 800);
        }, index * 100); // Stagger by 100ms
      });
      
      // Add special highlight to headings
      const headings = section.querySelectorAll('h2, h3');
      headings.forEach((heading, index) => {
        setTimeout(() => {
          heading.classList.add('heading-highlight');
          
          // Remove the animation class after some time
          setTimeout(() => {
            heading.classList.remove('heading-highlight');
          }, 2000);
        }, 300 + (index * 150)); // Stagger with delay
      });
      
      // Add pulse animation to icons
      const icons = section.querySelectorAll('.w-10, .w-12, svg');
      icons.forEach((icon, index) => {
        setTimeout(() => {
          icon.classList.add('icon-pulse');
          
          // Remove the animation class after it completes
          setTimeout(() => {
            icon.classList.remove('icon-pulse');
          }, 1500);
        }, 500 + (index * 200)); // Stagger with delay
      });
      
      // Remove the highlight animation after some time
      setTimeout(() => {
        section.classList.remove("highlight-section");
      }, 1500);
    };

    // Function to highlight active section based on scroll position
    const highlightActiveSection = () => {
      // This is a placeholder function since we don't need this functionality on this page
      // But we need to define it to avoid the error when removing the event listener
    };

    // Smooth scroll function with delay animation
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      
      // Add a visual feedback to the clicked link
      if (e.currentTarget.classList && e.currentTarget.classList.add) {
        e.currentTarget.classList.add("nav-link-clicked");
      }
      
      // Delay the scroll action for a better visual effect
      setTimeout(() => {
        // If it's not a hash link, navigate to the page
        if (!href || !href.startsWith("#")) {
          router.push(href);
          return;
        }
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Special case for top - scroll to top
          if (targetId === 'top') {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          } else {
            // Add extra offset for contact section
            const offset = targetId === 'contact' ? 100 : 80;
            
            // Calculate the position to scroll to
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            
            // Use the native smooth scrolling
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            
            // Add animations to the target section after scrolling
            setTimeout(() => {
              animateSection(targetElement);
            }, 1000); // Wait for the scroll to complete
          }
        }
        
        // Remove the visual feedback class
        if (e.currentTarget.classList && e.currentTarget.classList.remove) {
          setTimeout(() => {
            e.currentTarget.classList.remove("nav-link-clicked");
          }, 300);
        }
      }, 300); // 300ms delay before scrolling
    };

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener("click", handleSmoothScroll);
    });

    // Cleanup
    return () => {
      if (style && style.parentNode) {
        document.head.removeChild(style);
      }
      
      // Get all navigation links again for cleanup
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.removeEventListener("click", handleSmoothScroll);
      });
      
      // Remove scroll event listener
      window.removeEventListener('scroll', highlightActiveSection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center py-4 px-6 bg-zinc-900 sticky top-0 z-50 shadow-md border-b border-zinc-800 rounded-bl-3xl rounded-br-3xl nav-slide-down">
        <div className="flex items-center gap-2">
          <div className="bg-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-slate-800 text-xs font-bold">DM</div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-slate-800 via-cyan-400 to-green-400 text-transparent bg-clip-text">DecorMind</h1>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8 text-sm">
          <Link href="/dashboard" className="nav-link hover:text-cyan-400 text-white transition-colors duration-300">Home</Link>
          <Link href="/redesign" className="nav-link hover:text-cyan-400 text-white transition-colors duration-300">Redesign</Link>
          <Link href="/decormind" className="nav-link hover:text-cyan-400 text-white transition-colors duration-300">DecorMind</Link>
          <Link href="/pricing" className="nav-link text-cyan-400 transition-colors duration-300">Pricing</Link>
        </div>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 py-16 bg-black flex flex-col items-center">
        <div className="max-w-3xl text-center z-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-cyan-400 to-green-400 text-transparent bg-clip-text mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-white mb-6">
            Choose the plan that works best for your design needs
          </p>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-16 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-black border border-zinc-800 p-8 rounded-lg relative overflow-hidden">
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-2 text-white">Free</h4>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">$0</span>
                  <span className="text-white text-opacity-70 mb-1">/month</span>
                </div>
                <p className="text-white text-opacity-70 text-sm mb-6">Perfect for trying out our platform</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>5 AI design credits</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Basic room designs</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Standard resolution images</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-transparent text-white border border-white hover:bg-white/10"
                onClick={() => router.push('/dashboard')}
              >
                Get Started
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-black border-2 border-cyan-400 p-8 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0">
                <div className="bg-cyan-400 text-slate-800 text-xs font-bold py-1 px-3 rounded-bl-lg">
                  POPULAR
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-2 text-white">Premium</h4>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">$19</span>
                  <span className="text-white text-opacity-70 mb-1">/month</span>
                </div>
                <p className="text-white text-opacity-70 text-sm mb-6">For regular home designers</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>50 AI design credits</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Advanced room designs</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>High resolution images</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>DecorMind AI assistant</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Priority support</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-cyan-400 text-slate-800 hover:bg-cyan-500"
                onClick={() => router.push('/dashboard')}
              >
                Get Premium
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-black border border-zinc-800 p-8 rounded-lg relative overflow-hidden">
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-2 text-white">Pro</h4>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">$49</span>
                  <span className="text-white text-opacity-70 mb-1">/month</span>
                </div>
                <p className="text-white text-opacity-70 text-sm mb-6">For professional designers</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Unlimited AI design credits</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Premium room designs</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Ultra HD resolution images</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Advanced DecorMind AI assistant</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>24/7 priority support</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>White-label exports</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-transparent text-white border border-white hover:bg-white/10"
                onClick={() => router.push('/dashboard')}
              >
                Get Pro
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-slate-800 via-cyan-400 to-green-400 text-transparent bg-clip-text mb-12">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <h4 className="text-lg font-bold mb-2 text-white">Can I switch plans later?</h4>
              <p className="text-white text-opacity-80">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <h4 className="text-lg font-bold mb-2 text-white">What happens when I run out of credits?</h4>
              <p className="text-white text-opacity-80">You can purchase additional credits or upgrade to a higher plan to get more credits. Free users can also earn credits by referring friends.</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <h4 className="text-lg font-bold mb-2 text-white">Do unused credits roll over?</h4>
              <p className="text-white text-opacity-80">Yes, your credits will roll over each month as long as your subscription remains active.</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <h4 className="text-lg font-bold mb-2 text-white">Is there a refund policy?</h4>
              <p className="text-white text-opacity-80">We offer a 7-day money-back guarantee for all new subscriptions. If you're not satisfied, contact our support team for a full refund.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-6 text-center bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-cyan-400 to-green-400 text-transparent bg-clip-text mb-4">Ready to Transform Your Space?</h3>
          <p className="text-white mb-8">
            Join thousands of happy customers who have reimagined their homes with DecorMind.
          </p>
          <Button 
            className="bg-cyan-400 text-slate-800 hover:bg-cyan-500"
            onClick={() => router.push('/dashboard')}
          >
            Get Started Today
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-10 px-6 border-t border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-slate-800 text-xs font-bold">DM</div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-slate-800 via-cyan-400 to-green-400 text-transparent bg-clip-text">DecorMind</h1>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-white">Company</h5>
            <ul className="space-y-2 text-sm text-white">
              <li><Link href="#" className="hover:text-white text-white">About Us</Link></li>
              <li><Link href="#" className="hover:text-white text-white">Careers</Link></li>
              <li><Link href="#" className="hover:text-white text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-white">Resources</h5>
            <ul className="space-y-2 text-sm text-white">
              <li><Link href="#" className="hover:text-white text-white">Blog</Link></li>
              <li><Link href="#" className="hover:text-white text-white">Design Tips</Link></li>
              <li><Link href="#" className="hover:text-white text-white">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-white">Legal</h5>
            <ul className="space-y-2 text-sm text-white">
              <li><Link href="#" className="hover:text-white text-white">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white text-white">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center pt-8 border-t border-zinc-800 text-sm text-white">
          <p>© 2025 DecorMind. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transform transition-transform duration-300 hover:-translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2aa4f4"></stop><stop offset="1" stopColor="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
              </svg>
            </Link>
            <Link href="#" className="hover:text-white transform transition-transform duration-300 hover:-translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                <radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fd5"></stop><stop offset=".328" stopColor="#ff543f"></stop><stop offset=".348" stopColor="#fc5245"></stop><stop offset=".504" stopColor="#e64771"></stop><stop offset=".643" stopColor="#d53e91"></stop><stop offset=".761" stopColor="#cc39a4"></stop><stop offset=".841" stopColor="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4168c9"></stop><stop offset=".999" stopColor="#4168c9" stopOpacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
              </svg>
            </Link>
            <Link href="#" className="hover:text-white transform transition-transform duration-300 hover:-translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                <path fill="#212121" fillRule="evenodd" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z" clipRule="evenodd"></path><path fill="#fff" d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"></path><polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon><polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 