import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">LUXE</h4>
            <p className="text-gray-400 text-sm mb-4">
              Discover the finest collection of premium fashion and accessories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Pinterest">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/collection" className="hover:text-white">New Arrivals</Link></li>
              <li><Link href="/collection" className="hover:text-white">Clothing</Link></li>
              <li><Link href="/collection" className="hover:text-white">Accessories</Link></li>
              <li><Link href="/collection" className="hover:text-white">Sale</Link></li>
              <li><Link href="/collection" className="hover:text-white">Lookbook</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Customer Service</a></li>
              <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white">Size Guide</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 text-white px-3 py-2 text-sm flex-grow focus:outline-none focus:ring-1 focus:ring-secondary rounded-l-md"
                />
                <button
                  type="submit"
                  className="bg-secondary text-white px-4 py-2 text-sm font-medium rounded-r-md hover:bg-secondary/90 focus:outline-none"
                  aria-label="Subscribe"
                >
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-500 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
