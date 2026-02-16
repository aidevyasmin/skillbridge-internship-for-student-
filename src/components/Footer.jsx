import { Github, Linkedin, Facebook, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-deep-navy text-slate-grey mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & About Blurb */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-action-blue to-slate-grey bg-clip-text text-transparent">SkillBridge</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              SkillBridge is dedicated to connecting students with valuable internship opportunities, fostering growth and career development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-action-blue transition">Home</a></li>
              <li><a href="/browse" className="hover:text-action-blue transition">Browse Internships</a></li>
              <li><a href="/about" className="hover:text-action-blue transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-action-blue transition">Contact</a></li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-action-blue transition">Create Profile</a></li>
              <li><a href="#" className="hover:text-action-blue transition">Find Internships</a></li>
              <li><a href="#" className="hover:text-action-blue transition">Career Tips</a></li>
            </ul>
          </div>

          {/* For Companies */}
          <div>
            <h4 className="font-semibold mb-4">For Companies</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-action-blue transition">Post Internship</a></li>
              <li><a href="#" className="hover:text-action-blue transition">Find Talent</a></li>
              <li><a href="#" className="hover:text-action-blue transition">Pricing</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-body-sm flex items-center">
            Built by Yasmin Nisar <span className="ml-1 mr-1">©</span> {new Date().getFullYear()} SkillBridge. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 items-center">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-action-blue transition">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-action-blue transition">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-action-blue transition">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="mailto:contact@skillbridge.com" className="text-gray-400 hover:text-action-blue transition">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer