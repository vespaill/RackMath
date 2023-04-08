export const limitPlateHeight = (height, min_px, max_px, unit) => {
   height *= (unit==='kg'? 2.204 : 1);
  if (height >= max_px) return max_px;
  if (height <= min_px) return min_px;
  return height;
};