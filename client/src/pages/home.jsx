import { useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Home() {
  const [_, navigate] = useLocation();
  
  // Redirect to collection page
  useEffect(() => {
    navigate("/collection");
  }, [navigate]);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to LUXE</h1>
        <p className="text-xl mb-8">Discover our premium fashion collection</p>
        <Link 
          href="/collection" 
          className="inline-block bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary/90 transition"
        >
          Browse Collection
        </Link>
      </div>
    </div>
  );
}