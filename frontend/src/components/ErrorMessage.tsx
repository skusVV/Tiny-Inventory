type ErrorMessageProps = {
  message: string;
  centered?: boolean;
  className?: string;
};

export const ErrorMessage = ({ message, centered = true, className = '' }: ErrorMessageProps) => {
  if (centered) {
    return (
      <div className={`flex flex-col items-center justify-center py-20 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-500"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="text-red-500 font-medium">{message}</p>
      </div>
    );
  }

  return (
    <p className={`text-red-500 text-sm ${className}`}>{message}</p>
  );
};

