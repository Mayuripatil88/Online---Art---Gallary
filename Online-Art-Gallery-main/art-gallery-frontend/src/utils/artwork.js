export const getArtworkImage = (artwork) => {
  if (!artwork) return "";
  return artwork.imageUrl || artwork.image_url || artwork.image || "";
};


