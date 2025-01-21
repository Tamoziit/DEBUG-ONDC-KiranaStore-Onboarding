/* eslint-disable react/prop-types */
const Badge = ({ 
    children, 
    variant = 'default', 
    className = '' 
  }) => {
    const variants = {
      default: 'bg-blue-100 text-blue-800',
      secondary: 'bg-gray-100 text-gray-800',
    };
  
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
        {children}
      </span>
    );
  };
  
  export default Badge;