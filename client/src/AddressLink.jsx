// This component accepts 'children' and 'className' props
// this 'children' comes from every child component that is enclosed inside the <AddressLink>...</AddressLink> component, found in PlacePage.jsx
export default function AddressLink({ children, className = null }) {
  // selective styling
  // Check if 'className' prop is not provided
  if (!className) {
    // If 'className' is not provided, set it to default value 'my-3 block'
    className = 'my-3 block';
  }
  // Append additional classes to 'className' string
  className += ' flex gap-1 font-semibold underline';
  
  // Return JSX for the AddressLink component
  return (
    // Anchor element with specified class and target
    <a className={className} target="_blank" href={`https://maps.google.com/?q=${encodeURIComponent(children[0] + children[1])}`} style={{ textDecoration: 'none' }} >
{/*
    children[0] + children[1]: This concatenates the first and second child elements passed to the AddressLink component.

    encodeURIComponent(...): This function converts the concatenated string into a URL-encoded format, ensuring that special characters are properly encoded for use in a URL.*/}
      {/* SVG icon for the link */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        {/* Path for the map icon */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        {/* Path for the map icon */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
      {/* Render the children passed to the component , with comma seperation, etc*/}
      <span>{children[0]}</span>
      <span>, {children[1]}</span>
    </a>
  );
}
