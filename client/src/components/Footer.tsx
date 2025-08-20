import {Mail, Phone, MapPin, Instagram, Linkedin, Youtube} from 'lucide-react';
import logo from '@/assets/fostifest_logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <img
                src={logo}
                alt="UniCompete Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold tracking-wider">FOSTIFEST</h3>
                <p className="text-sm text-gray-400">{new Date().getFullYear()} Championships</p>
              </div>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed max-w-md">
              Empowering students through competitive excellence and innovative challenges that shape the future.
            </p>
            <div className="flex space-x-6 mb-12">
              <a href={'https://www.instagram.com/fosti_ums'} target={'_blank'}>
                <Instagram className="w-6 h-6 text-gray-400 hover:text-teal-500 cursor-pointer transition-colors"/>
              </a>
              <a href={'#'} target={"_blank"}>
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-teal-500 cursor-pointer transition-colors"/>
              </a>
              <a href={'#'} target={"_blank"}>
                <Youtube className="w-6 h-6 text-gray-400 hover:text-teal-500 cursor-pointer transition-colors"/>
              </a>
            </div>

            <div className="text-gray-400 text-sm mb-6 md:mb-0">
              © {new Date().getFullYear()} FOSTIFEST by FOSTI UMS. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-300 hover:text-teal-500 transition-colors">Home</a></li>
              <li><a href="#categories" className="text-gray-300 hover:text-teal-500 transition-colors">Categories</a>
              </li>
              <li><a href="#competitions"
                     className="text-gray-300 hover:text-teal-500 transition-colors">Competitions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-8">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0"/>
                <div>
                  <p className="text-gray-300">Gedung J Lantai 3 sayap Kanan Fakultas Komunikasi dan Informatika
                    Universitas Muhammadiyah Surakarta, Surakarta 57169</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-teal-500 flex-shrink-0"/>
                <p className="text-gray-300">+62 8232-5427-416</p>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-teal-500 flex-shrink-0"/>
                <p className="text-gray-300">fostiums@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;