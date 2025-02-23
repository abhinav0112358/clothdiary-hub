
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription logic here
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white mt-16">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-display mb-6">SIGN UP AND BE A PART OF COSTERBOX FAMAILY.</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-4">
          <Input 
            type="email" 
            placeholder="Your Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black"
            required
          />
          <Button type="submit" className="bg-[#E86C3E] hover:bg-[#d55d32] text-white px-8">
            I'm In
          </Button>
        </form>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Need Help */}
        <div>
          <h3 className="text-[#E86C3E] font-semibold text-lg mb-4">Need Help</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-[#E86C3E]">About Us</Link></li>
            <li><Link to="/refund-policy" className="hover:text-[#E86C3E]">Refund Policy</Link></li>
            <li><Link to="/terms" className="hover:text-[#E86C3E]">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-[#E86C3E]">Privacy Policy</Link></li>
            <li><Link to="/shipping" className="hover:text-[#E86C3E]">Shipping Policy</Link></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-[#E86C3E] font-semibold text-lg mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li><Link to="/stories" className="hover:text-[#E86C3E]">Costerbox Stories</Link></li>
            <li><Link to="/track-order" className="hover:text-[#E86C3E]">Track Your Order</Link></li>
            <li><Link to="/faqs" className="hover:text-[#E86C3E]">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-[#E86C3E]">Contact Us</Link></li>
            <li><Link to="/sitemap" className="hover:text-[#E86C3E]">Site Map</Link></li>
          </ul>
        </div>

        {/* MORE INFO */}
        <div>
          <h3 className="text-[#E86C3E] font-semibold text-lg mb-4">MORE INFO</h3>
          <ul className="space-y-2">
            <li><Link to="/our-family" className="hover:text-[#E86C3E]">Our Family</Link></li>
            <li><Link to="/custom" className="hover:text-[#E86C3E]">Create Your Own</Link></li>
            <li><Link to="/upcycled" className="hover:text-[#E86C3E]">Upcycled</Link></li>
            <li><Link to="/career" className="hover:text-[#E86C3E]">Career</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#E86C3E] font-semibold text-lg mb-4">Contact</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-[#E86C3E] shrink-0" />
              <span>B-89,Aanandpuri, Adarsh Nagar, Jaipur</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#E86C3E]" />
              <a href="mailto:support@costerbox.in" className="hover:text-[#E86C3E]">support@costerbox.in</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-[#E86C3E]" />
              <a href="tel:08003388722" className="hover:text-[#E86C3E]">08003388722</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Payment and Social Media */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Payment Methods */}
          <div>
            <h3 className="text-2xl font-display mb-4">100% Secure Payment</h3>
            <div className="flex flex-wrap gap-4">
              <img src="/payment-logos/paytm.png" alt="Paytm" className="h-8" />
              <img src="/payment-logos/phonepay.png" alt="PhonePe" className="h-8" />
              <img src="/payment-logos/upi.png" alt="UPI" className="h-8" />
              <img src="/payment-logos/cod.png" alt="Cash on Delivery" className="h-8" />
            </div>
          </div>

          {/* Social Media */}
          <div className="text-right">
            <h3 className="text-2xl font-display mb-4">Let's Be Friends</h3>
            <div className="flex gap-4 justify-end">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="bg-[#3b5998] p-2 rounded-full hover:opacity-80">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="bg-[#E1306C] p-2 rounded-full hover:opacity-80">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="bg-[#1DA1F2] p-2 rounded-full hover:opacity-80">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="bg-[#0077b5] p-2 rounded-full hover:opacity-80">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <button className="w-full text-left flex items-center gap-2 text-lg font-semibold">
            <span className="text-2xl">+</span> Why Choose Costerbox ?
          </button>
        </div>
      </div>
    </footer>
  );
};
