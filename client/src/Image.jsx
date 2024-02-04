// Define a functional component named Image with props 'src' and '...rest'
export default function Image({ src, ...rest }) {
  // Check if the 'src' prop is provided and if it includes 'https://'
  src = src && src.includes('https://') 
    // If 'src' includes the text 'https://',it means its already in the required server format, so dont edit, use the provided 'src'
    ? src 
    // If 'src' doesn't include 'https://', construct a URL using a local server address and the provided 'src'
    : 'http://localhost:3000/uploads/' + src;

  // Return an <img> element with spread attributes and the modified 'src' prop
  // Set 'alt' to an empty string to satisfy accessibility requirements
  return (
    <img {...rest} src={src} alt={''} />
  );
}
