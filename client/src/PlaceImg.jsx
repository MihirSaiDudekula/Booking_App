import Image from "./Image.jsx"; // Importing Image component

// Functional component 'PlaceImg'
export default function PlaceImg({ place, index = 0, className = null }) {
  // If place has no photos, return empty string
  if (!place.photos?.length) {
    return '';
  }
  // If className is not provided, set it to 'object-cover'
  if (!className) {
    className = 'object-cover';
  }
  // Rendering Image component with specified className, source, and alt text
  return (
    <Image className={className} src={place.photos[index]} alt="" />
  );
}
