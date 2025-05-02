
export const addToWishlist = (product: any): boolean => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const existingItemIndex = wishlist.findIndex((item: any) => item.id === product.id);
  
  let isAdded = true;
  
  if (existingItemIndex >= 0) {
    // Remove from wishlist if already exists (toggle functionality)
    wishlist.splice(existingItemIndex, 1);
    isAdded = false;
  } else {
    // Add to wishlist
    wishlist.push(product);
    isAdded = true;
  }
  
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  return isAdded;
};

export const isInWishlist = (productId: string): boolean => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  return wishlist.some((item: any) => item.id === productId);
};
