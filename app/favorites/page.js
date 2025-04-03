'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Button } from "../../components/ui/button";
import { useRouter, useSearchParams } from 'next/navigation';
import useGoogleAnalytics from '../_hooks/useGoogleAnalytics';

// Create a client component that uses useSearchParams
function FavoritesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { event } = useGoogleAnalytics();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Load favorites from localStorage on component mount
  useEffect(() => {
    // Track page view
    event({
      action: 'page_view',
      category: 'favorites',
      label: 'favorites_page'
    });
    
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteDesigns') || '[]');
      setFavorites(storedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }, [event]);
  
  // Remove a design from favorites
  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteDesigns', JSON.stringify(updatedFavorites));
    
    // Track removal event
    event({
      action: 'design_removed_from_favorites',
      category: 'favorites',
      label: 'removed_from_favorites_page'
    });
  };
  
  // Open image in new tab
  const handleOpenImage = (imageUrl) => {
    if (!imageUrl) {
      console.error('Image URL is missing');
      // Show an error message to the user
      alert('Sorry, the image URL is missing or invalid. Please try again or create a new design.');
      return;
    }
    
    // Verify if image URL is valid before opening in new tab
    const img = new Image();
    img.onload = function() {
      // Image loaded successfully, open in new tab
      window.open(imageUrl, '_blank');
    };
    img.onerror = function() {
      // Image failed to load
      console.error('Failed to load image:', imageUrl);
      alert('Sorry, the image could not be loaded. It may no longer be available or the URL might be invalid.');
    };
    img.src = imageUrl;
  };
  
  // Open detailed view modal
  const handleViewDesign = (design) => {
    setSelectedDesign(design);
    setShowModal(true);
    
    // Track view event
    event({
      action: 'view_design_detail',
      category: 'favorites',
      label: 'design_detail_viewed'
    });
  };
  
  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  // Add a new function to download images
  const handleDownloadImage = (imageUrl, roomType) => {
    if (!imageUrl) {
      console.error('Image URL is missing');
      alert('Sorry, the image URL is missing or invalid.');
      return;
    }
    
    // Create a download link
    const link = document.createElement('a');
    link.href = imageUrl;
    
    // Generate a filename based on the room type and date
    const fileName = `${roomType.toLowerCase().replace(/\s+/g, '-')}-design-${Date.now()}.jpg`;
    link.download = fileName;
    
    // Append to body, click programmatically, then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download event
    event({
      action: 'design_downloaded',
      category: 'favorites',
      label: 'design_download'
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e3a5c] via-[#22d3ee] to-[#4ade80] text-transparent bg-clip-text">
            My Favorite Designs
          </h1>
          
          <div className="flex gap-3">
            <Button
              onClick={() => router.push('/dashboard')}
              className="bg-zinc-800 hover:bg-zinc-700 text-white transition-colors duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Button>
            
            <Button
              onClick={() => router.push('/redesign')}
              className="bg-gradient-to-r from-[#1e3a5c] via-[#22d3ee] to-[#4ade80] text-white hover:opacity-90 transition-all duration-300"
            >
              Create New Design
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#22d3ee] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center shadow-xl">
            <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">No favorite designs yet</h2>
            <p className="text-zinc-400 mb-6 max-w-md mx-auto">
              Start creating designs and save them to your favorites to see them here.
            </p>
            <Button
              onClick={() => router.push('/redesign')}
              className="bg-gradient-to-r from-[#1e3a5c] via-[#22d3ee] to-[#4ade80] text-white hover:opacity-90 transition-all duration-300"
            >
              Create Your First Design
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:border-[#22d3ee]/50">
                <div 
                  key={`image-container-${favorite.id}`}
                  className="relative cursor-pointer h-48 overflow-hidden"
                  onClick={() => handleViewDesign(favorite)}
                >
                  <img 
                    src={favorite.imageUrl} 
                    alt={`${favorite.roomType} design`} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div key={`overlay-${favorite.id}`} className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div key={`caption-${favorite.id}`} className="p-4 w-full">
                      <p className="text-white font-medium">Click to view full image</p>
                    </div>
                  </div>
                </div>
                
                <div key={`content-${favorite.id}`} className="p-4">
                  <div key={`header-${favorite.id}`} className="flex justify-between items-start mb-3">
                    <div key={`info-${favorite.id}`}>
                      <h3 className="text-lg font-medium text-white">{favorite.roomType} Design</h3>
                      <p className="text-zinc-400 text-sm">{favorite.style} Style</p>
                    </div>
                    <button 
                      key={`remove-btn-${favorite.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(favorite.id);
                      }}
                      className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full transition-colors duration-300"
                      title="Remove from favorites"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  <p key={`date-${favorite.id}`} className="text-zinc-500 text-xs">
                    Saved on {new Date(favorite.date).toLocaleDateString()}
                  </p>
                  
                  <div key={`actions-${favorite.id}`} className="mt-4 flex justify-between">
                    <Button
                      key={`view-btn-${favorite.id}`}
                      onClick={() => handleViewDesign(favorite)}
                      className="bg-zinc-800 hover:bg-zinc-700 text-white transition-colors duration-300 text-sm"
                    >
                      View Design
                    </Button>
                    
                    <Button
                      key={`similar-btn-${favorite.id}`}
                      onClick={() => router.push('/redesign')}
                      className="bg-[#22d3ee] text-black hover:bg-[#22d3ee]/90 transition-all duration-300 text-sm"
                    >
                      Create Similar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Detailed View Modal */}
      {showModal && selectedDesign && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-zinc-800">
              <h3 className="text-xl font-bold text-white">{selectedDesign.roomType} Design</h3>
              <button 
                onClick={handleCloseModal}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto flex-grow">
              <div className="relative">
                <img 
                  src={selectedDesign.imageUrl} 
                  alt={`${selectedDesign.roomType} design`}
                  className="w-full h-auto max-h-[70vh] object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
                  }}
                />
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-zinc-400 text-sm mb-1">Style</h4>
                    <p className="text-white text-lg">{selectedDesign.style}</p>
                  </div>
                  <div>
                    <h4 className="text-zinc-400 text-sm mb-1">Saved On</h4>
                    <p className="text-white">{new Date(selectedDesign.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button
                    onClick={() => handleDownloadImage(selectedDesign.imageUrl, selectedDesign.roomType)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </Button>
                  
                  <Button
                    onClick={() => {
                      router.push('/redesign');
                      handleCloseModal();
                    }}
                    className="bg-[#22d3ee] text-black hover:bg-[#22d3ee]/90 transition-all duration-300"
                  >
                    Create Similar Design
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Server component (page.js)
export default function FavoritesPage() {
  return (
    <Suspense fallback={<div>Loading favorites...</div>}>
      <FavoritesContent />
    </Suspense>
  );
} 