import { useState } from "react";
import { Link } from "wouter";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-gray-700"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
            LUXE
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/collection" className="text-sm font-medium hover:text-secondary transition">
            New Arrivals
          </Link>
          <Link href="/collection" className="text-sm font-medium hover:text-secondary transition">
            Clothing
          </Link>
          <Link href="/collection" className="text-sm font-medium hover:text-secondary transition">
            Accessories
          </Link>
          <Link href="/collection" className="text-sm font-medium text-accent hover:text-accent/80 transition">
            Sale
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-secondary transition" aria-label="Search">
            <i className="fas fa-search"></i>
          </button>
          <button className="text-gray-700 hover:text-secondary transition" aria-label="Account">
            <i className="fas fa-user"></i>
          </button>
          <button className="text-gray-700 hover:text-secondary transition relative" aria-label="Shopping bag">
            <i className="fas fa-shopping-bag"></i>
            <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container py-2 space-y-1">
            <Link href="/collection" className="block py-2 px-4 text-sm hover:bg-gray-50">
              New Arrivals
            </Link>
            <Link href="/collection" className="block py-2 px-4 text-sm hover:bg-gray-50">
              Clothing
            </Link>
            <Link href="/collection" className="block py-2 px-4 text-sm hover:bg-gray-50">
              Accessories
            </Link>
            <Link href="/collection" className="block py-2 px-4 text-sm text-accent hover:bg-gray-50">
              Sale
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
