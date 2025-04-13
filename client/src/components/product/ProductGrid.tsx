import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Product, SortOption, ViewMode } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onToggleMobileFilters: () => void;
}

export function ProductGrid({
  products,
  totalProducts,
  currentPage,
  onPageChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  onToggleMobileFilters
}: ProductGridProps) {
  // Calculate total pages based on products per page (12 per page)
  const productsPerPage = 12;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  
  // Generate pagination array for rendering
  const getPaginationItems = () => {
    // Show at most 5 pages
    const items = [];
    
    // Always show first page
    items.push(1);
    
    // Calculate start and end of pagination window
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (start > 2) {
      items.push('ellipsis-start');
    }
    
    // Add pages in the window
    for (let i = start; i <= end; i++) {
      items.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      items.push('ellipsis-end');
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      items.push(totalPages);
    }
    
    return items;
  };
  
  return (
    <div className="w-full">
      {/* Header with sorting and view controls */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">All Products</h2>
          <p className="text-gray-500 mt-1"><span>{totalProducts}</span> products</p>
        </div>
        
        {/* Mobile filters button */}
        <button 
          className="mt-4 md:hidden w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={onToggleMobileFilters}
        >
          <i className="fas fa-sliders-h mr-2"></i> Filter & Sort
        </button>
        
        {/* Desktop sorting */}
        <div className="hidden md:flex items-center space-x-3 mt-4 md:mt-0">
          <span className="text-sm text-gray-700">Sort by:</span>
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <i className="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <button 
              className={`p-1.5 ${viewMode === 'grid' ? 'text-secondary' : 'text-gray-500'} bg-white rounded border border-gray-300 hover:text-secondary`}
              onClick={() => onViewModeChange('grid')}
              aria-label="Grid view"
            >
              <i className="fas fa-th-large"></i>
            </button>
            <button 
              className={`p-1.5 ${viewMode === 'list' ? 'text-secondary' : 'text-gray-500'} bg-white rounded border border-gray-300 hover:text-secondary`}
              onClick={() => onViewModeChange('list')}
              aria-label="List view"
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className={`grid ${viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
        : 'grid-cols-1 gap-4'}`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="py-16 text-center">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center">
          <nav className="flex items-center space-x-1" aria-label="Pagination">
            {/* Previous button */}
            <button 
              className="px-3 py-1 rounded-md text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            {/* Page numbers */}
            {getPaginationItems().map((item, index) => {
              if (item === 'ellipsis-start' || item === 'ellipsis-end') {
                return (
                  <span key={item} className="px-3 py-1 text-sm text-gray-500">...</span>
                );
              }
              
              return (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === item 
                      ? 'bg-secondary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => onPageChange(item as number)}
                >
                  {item}
                </button>
              );
            })}
            
            {/* Next button */}
            <button 
              className="px-3 py-1 rounded-md text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
