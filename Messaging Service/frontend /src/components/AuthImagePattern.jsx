const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-md text-center">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="w-full h-24 mb-8"
          >
            <path
              d="M0.00,49.98 C150.00,150.00 349.52,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              className="fill-primary/10"
            />
          </svg>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;