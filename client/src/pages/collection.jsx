import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { MobileFilterDrawer } from "@/components/filters/MobileFilterDrawer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { defaultFilters } from "@/types/product";

export default function Collection() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // State for sorting
  const [sortOption, setSortOption] = useState("popular");
  
  // State for view mode (grid or list)
  const [viewMode, setViewMode] = useState("grid");
  
  // State for mobile filters drawer
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // State for filters
  const [filters, setFilters] = useState(defaultFilters);
  
  // Fetch all products
  const { data: allProducts, isLoading, error } = useQuery({
    queryKey: ['/api/products'],
  });
  
  // Get categories with counts
  const categories = allProducts
    ? Array.from(new Set(allProducts.map(p => p.category)))
        .map(category => ({
          name: category,
          count: allProducts.filter(p => p.category === category).length
        }))
        .sort((a, b) => b.count - a.count)
    : [];
  
  // Apply filters and sorting to products
  const filteredAndSortedProducts = allProducts
    ? allProducts
        // Apply category filter
        .filter(product => 
          filters.categories.length === 0 || 
          filters.categories.includes(product.category)
        )
        // Apply price range filter
        .filter(product => 
          product.price >= filters.priceRange.min && 
          product.price <= filters.priceRange.max
        )
        // Apply size filter (simulated since FakeStore API doesn't have size data)
        .filter(product => {
          // Skip filtering if no sizes are selected
          if (filters.sizes.length === 0) return true;
          
          // Simulate size availability based on product id
          // In a real app, this would use actual size data from the API
          const availableSizes = [];
          
          // Assign sizes based on product ID
          if (product.id % 2 === 0) {
            availableSizes.push("S", "M", "L");
          }
          if (product.id % 3 === 0) {
            availableSizes.push("XS", "XL");
          }
          if (product.id % 5 === 0) {
            availableSizes.push("XXL");
          }
          
          // If no sizes were assigned, add some default sizes
          if (availableSizes.length === 0) {
            availableSizes.push("M");
            if (product.id % 3 === 1) availableSizes.push("S");
            if (product.id % 3 === 2) availableSizes.push("L");
          }
          
          console.log(`Product ${product.id} has sizes:`, availableSizes);
          
          // Check if any of the selected sizes are available for this product
          const result = filters.sizes.some(size => availableSizes.includes(size));
          return result;
        })
        // Apply color filter (simulated since FakeStore API doesn't have color data)
        .filter(product => {
          // Skip filtering if no colors are selected
          if (filters.colors.length === 0) return true;
          
          // Simulate color availability based on product id
          // In a real app, this would use actual color data from the API
          const availableColors = [];
          
          // Assign colors based on product ID 
          if (product.id % 2 === 0) {
            availableColors.push("Black", "White");
          }
          if (product.id % 3 === 0) {
            availableColors.push("Red", "Blue");
          }
          if (product.id % 5 === 0) {
            availableColors.push("Green");
          }
          if (product.id % 7 === 0) {
            availableColors.push("Yellow", "Purple", "Pink");
          }
          
          // If no colors were assigned, add some default colors
          if (availableColors.length === 0) {
            availableColors.push("Black");
            if (product.id % 4 === 1) availableColors.push("White");
            if (product.id % 4 === 2) availableColors.push("Blue");
            if (product.id % 4 === 3) availableColors.push("Red");
          }
          
          console.log(`Product ${product.id} has colors:`, availableColors);
          
          // Check if any of the selected colors are available for this product
          const result = filters.colors.some(color => availableColors.includes(color));
          return result;
        })
        // Apply sorting
        .sort((a, b) => {
          switch (sortOption) {
            case "popular":
              return b.rating.count - a.rating.count;
            case "newest":
              // Simulating newest by using id (higher id = newer)
              return b.id - a.id;
            case "priceAsc":
              return a.price - b.price;
            case "priceDesc":
              return b.price - a.price;
            default:
              return 0;
          }
        })
    : [];
  
  // Paginate products (12 per page)
  const paginatedProducts = filteredAndSortedProducts
    ? filteredAndSortedProducts.slice((currentPage - 1) * 12, currentPage * 12)
    : [];
  
  // Reset to first page when filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOption]);
  
  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    console.log("Collection - Received new filters:", newFilters);
    setFilters(newFilters);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters(defaultFilters);
  };
  
  return (
    <main>
      {/* Page Banner */}
      <div className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Our Collection</h1>
          <p className="text-gray-300 max-w-2xl">
            Explore our curated selection of premium clothing and accessories. 
            From everyday essentials to statement pieces, find your perfect style.
          </p>
        </div>
      </div>
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="text-sm text-gray-500">
          <a href="/" className="hover:text-secondary">Home</a> / 
          <span className="font-medium text-primary"> Collection</span>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-16">
        {/* Show loading state */}
        {isLoading && (
          <div className="py-16 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-secondary"></div>
            <p className="mt-4 text-gray-500">Loading products...</p>
          </div>
        )}
        
        {/* Show error state */}
        {error && (
          <div className="py-16 text-center">
            <p className="text-red-500 font-medium">Error loading products. Please try again later.</p>
          </div>
        )}
        
        {/* Show content when loaded */}
        {!isLoading && !error && (
          <div className="flex flex-col md:flex-row">
            {/* Desktop filter sidebar */}
            <div className="hidden md:block">
              <FilterSidebar
                filters={filters}
                categories={categories}
                onFiltersChange={handleFiltersChange}
                onReset={resetFilters}
                onApply={() => {}}
              />
            </div>
            
            {/* Mobile filter drawer */}
            <MobileFilterDrawer
              isOpen={mobileFiltersOpen}
              onClose={() => setMobileFiltersOpen(false)}
              filters={filters}
              categories={categories}
              onFiltersChange={handleFiltersChange}
              onReset={resetFilters}
            />
            
            {/* Product grid */}
            <ProductGrid
              products={paginatedProducts}
              totalProducts={filteredAndSortedProducts?.length || 0}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              sortOption={sortOption}
              onSortChange={setSortOption}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onToggleMobileFilters={() => setMobileFiltersOpen(true)}
            />
          </div>
        )}
      </div>
    </main>
  );
}