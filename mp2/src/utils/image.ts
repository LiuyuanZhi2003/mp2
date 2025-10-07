export const iiifImage = (imageId?: string | null, width: number = 400) =>
  imageId ? `https://www.artic.edu/iiif/2/${imageId}/full/${width},/0/default.jpg` : '';