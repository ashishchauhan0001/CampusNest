import React from 'react';

function Footer() {
  return (
    <>
      <footer className="mt-64 footer footer-center p-10 text-white bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 ">
        
        {/* Brand Name */}
        <div className="font-bold text-lg md:text-3xl text-center mb-6 tracking-wide">
          <span className="text-red-500">Campus</span>
          <span className="text-white">Nest</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 mb-5 text-lg">
          {['Home', 'About Us', 'Properties', 'Blog', 'Contact Us', 'FAQ'].map((link, index) => (
            <a
              key={index}
              className="link link-hover no-underline text-white hover:text-blue-400 transition-colors duration-300"
              href={`#${link.replace(' ', '').toLowerCase()}`}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Social Media Links with Icons */}
        <nav className="flex justify-center gap-6 mb-6 text-xl">
          {[
            { name: 'Twitter', color: 'text-sky-400', icon: 'fab fa-twitter' },
            { name: 'YouTube', color: 'text-red-600', icon: 'fab fa-youtube' },
            { name: 'Facebook', color: 'text-blue-600', icon: 'fab fa-facebook' },
            { name: 'Instagram', color: 'text-pink-500', icon: 'fab fa-instagram' },
            { name: 'LinkedIn', color: 'text-blue-700', icon: 'fab fa-linkedin' },
          ].map((social, index) => (
            <a
              key={index}
              href="#"
              aria-label={social.name}
              className={`hover:${social.color} transition-colors duration-300`}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </nav>

        {/* Contact Information */}
        <div className="text-center mb-5 space-y-1">
          <p className="text-gray-400 hover:text-white transition-colors duration-300">📞 +91 8171065385</p>
          <p className="text-gray-400 hover:text-white transition-colors duration-300">✉️ asch20080@gmail.com</p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col md:flex-row justify-center gap-72 mb-6 text-left">
          <div className="space-y-2">
            <h4 className="font-semibold text-white mb-3 mx-9">Company</h4>
            {['About   ', 'Careers  ', 'Press'].map((item, index) => (
              <a
                key={index}
                className="link link-hover text-gray-400 hover:text-blue-400 transition-colors duration-300"
                href="#"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-white mb-3 mx-28">Support</h4>
            {['Help Center', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
              <a
                key={index}
                className="link link-hover text-gray-400 hover:text-blue-400 transition-colors duration-300"
                href="#"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <aside className="text-center text-gray-400 hover:text-white transition-colors duration-300">
          <p>© 2024 CampusNest. All rights reserved.</p>
        </aside>
      </footer>
    </>
  );
}

export default Footer;
