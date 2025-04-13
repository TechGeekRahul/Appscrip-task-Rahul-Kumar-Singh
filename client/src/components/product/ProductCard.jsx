import { Link } from "wouter";

export function ProductCard({ product }) {
  // Generate SEO-friendly URL
  const productUrl = `/products/${product.title.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Format product rating for display
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    // Half star if applicable
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };
  
  // Split the product title to get a shorter display name
  const displayTitle = product.title.length > 30 
    ? `${product.title.substring(0, 30)}...` 
    : product.title;
  
  // Determine if product is new (placeholder implementation - in real app would compare with actual dates)
  const isNew = product.id % 5 === 0;
  
  // Determine if product is on sale (placeholder implementation - in real app would have a sale flag)
  const isOnSale = product.id % 4 === 0;
  
  // Calculate sale price for display (placeholder implementation)
  const originalPrice = isOnSale ? (product.price * 1.25).toFixed(2) : null;
  
  // Generate SEO-friendly alt text
  const altText = `${product.title} - ${product.category}`;
  
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={productUrl} className="block relative pb-[125%] overflow-hidden">
        <img 
          src={product.image} 
          alt={altText} 
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Product tags */}
        {(isNew || isOnSale) && (
          <div className="absolute top-3 left-3">
            {isNew && (
              <span className="bg-secondary text-white text-xs font-medium px-2 py-1 rounded">New</span>
            )}
            {isOnSale && (
              <span className="bg-accent text-white text-xs font-medium px-2 py-1 rounded">Sale</span>
            )}
          </div>
        )}
        
        {/* Wishlist button */}
        <button 
          className="absolute right-3 top-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-secondary"
          aria-label="Add to wishlist"
        >
          <i className="far fa-heart"></i>
        </button>
      </Link>
      
      <div className="p-4">
        <h3 className="text-sm font-medium mb-1 text-primary">
          <Link href={productUrl} className="hover:text-secondary">{displayTitle}</Link>
        </h3>
        
        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex text-xs text-yellow-400">
            {renderRating(product.rating.rate)}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.rating.count})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold text-primary">${product.price.toFixed(2)}</span>
            {isOnSale && originalPrice && (
              <span className="text-xs text-gray-500 line-through ml-1">${originalPrice}</span>
            )}
          </div>
          <button 
            className="text-secondary hover:text-secondary/80"
            aria-label="Add to cart"
          >
            <i className="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}