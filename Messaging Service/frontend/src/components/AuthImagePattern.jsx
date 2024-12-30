const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 p-12 min-h-screen">
      <div className="text-center text-white max-w-md">
        <div className="mb-8 space-y-4">
          <div className="flex justify-center space-x-4">
            {/* Large placeholder circles for the image pattern */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`w-20 h-20 rounded-full bg-primary/30 ${i % 2 === 0 ? "animate-pulse" : ""}`}
              />
            ))}
          </div>
        </div>
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <p className="text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
