import { useState } from "react";
import { ProductFilters } from "@/types/product";
import { RangeSlider } from "@/components/ui/range-slider";

interface CategoryCount {
  name: string;
  count: number;
}

interface FilterSidebarProps {
  filters: ProductFilters;
  categories: CategoryCount[];
  onFiltersChange: (filters: ProductFilters) => void;
  onReset: () => void;
  onApply: () => void;
}

export function FilterSidebar({
  filters,
  categories,
  onFiltersChange,
  onReset,
  onApply
}: FilterSidebarProps) {
  // Local state to track current filter selections
  const [localFilters, setLocalFilters] = useState<ProductFilters>(filters);
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    setLocalFilters(prev => {
      const categories = [...prev.categories];
      const index = categories.indexOf(category);
      
      if (index > -1) {
        categories.splice(index, 1);
      } else {
        categories.push(category);
      }
      
      return {
        ...prev,
        categories
      };
    });
  };
  
  // Handle price range change
  const handlePriceRangeChange = (priceRange: { min: number; max: number }) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange
    }));
  };
  
  // Toggle size selection
  const toggleSize = (size: string) => {
    setLocalFilters(prev => {
      const sizes = [...prev.sizes];
      const index = sizes.indexOf(size);
      
      if (index > -1) {
        sizes.splice(index, 1);
      } else {
        sizes.push(size);
      }
      
      return {
        ...prev,
        sizes
      };
    });
  };
  
  // Apply local filters to parent component
  const applyFilters = () => {
    onFiltersChange(localFilters);
    onApply();
  };
  
  // Reset filters
  const resetFilters = () => {
    // Reset local state first
    setLocalFilters({
      categories: [],
      priceRange: { min: 0, max: 1000 },
      sizes: [],
      colors: []
    });
    
    // Notify parent
    onReset();
  };
  
  // Available sizes
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  
  // Available colors
  const availableColors = [
    { name: "Black", value: "bg-black" },
    { name: "White", value: "bg-white" },
    { name: "Red", value: "bg-red-500" },
    { name: "Blue", value: "bg-blue-500" },
    { name: "Green", value: "bg-green-500" },
    { name: "Yellow", value: "bg-yellow-500" },
    { name: "Purple", value: "bg-purple-500" },
    { name: "Pink", value: "bg-pink-500" }
  ];
  
  return (
    <div className="w-full md:w-64 pr-8">
      <div className="sticky top-24">
        {/* Categories filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                    checked={localFilters.categories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                  />
                  <span className="ml-2 text-sm">{category.name}</span>
                </label>
                <span className="text-xs text-gray-500">({category.count})</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Price range filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Price Range</h3>
          <RangeSlider
            min={0}
            max={1000}
            step={5}
            value={localFilters.priceRange}
            onChange={handlePriceRangeChange}
          />
        </div>
        
        {/* Size filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Size</h3>
          <div className="grid grid-cols-4 gap-2">
            {availableSizes.map(size => (
              <button
                key={size}
                className={`border ${
                  localFilters.sizes.includes(size) 
                    ? 'border-secondary text-secondary' 
                    : 'border-gray-300 hover:border-secondary hover:text-secondary'
                } rounded-md py-1 text-sm`}
                onClick={() => toggleSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        {/* Color filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Color</h3>
          <div className="flex flex-wrap gap-2">
            {availableColors.map(color => (
              <button 
                key={color.name}
                className={`w-6 h-6 rounded-full ${color.value} border ${
                  localFilters.colors.includes(color.name) 
                    ? 'border-secondary focus:ring-2 focus:ring-offset-2 focus:ring-secondary' 
                    : 'border-gray-300 focus:outline-none'
                }`}
                onClick={() => {
                  setLocalFilters(prev => {
                    const colors = [...prev.colors];
                    const index = colors.indexOf(color.name);
                    
                    if (index > -1) {
                      colors.splice(index, 1);
                    } else {
                      colors.push(color.name);
                    }
                    
                    return {
                      ...prev,
                      colors
                    };
                  });
                }}
                aria-label={`Filter by ${color.name} color`}
              />
            ))}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-4">
          <button 
            className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none"
            onClick={resetFilters}
          >
            Reset
          </button>
          <button 
            className="flex-1 bg-secondary text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-secondary/90 focus:outline-none"
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
