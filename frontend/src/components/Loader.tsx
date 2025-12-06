type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeMap = {
  sm: 'w-6 h-6',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export const Loader = ({ size = 'md', className = '' }: LoaderProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`loader ${sizeMap[size]}`}>
        <div className="loader-pulse" />
        <div className="loader-spinner" />
      </div>
    </div>
  );
};

