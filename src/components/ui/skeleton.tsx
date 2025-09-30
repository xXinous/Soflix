import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'movie-poster' | 'movie-continue';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse'
}) => {
  const baseClasses = 'bg-gray-700 rounded';
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%]',
    none: ''
  };

  const variantClasses = {
    text: 'h-4 w-full',
    rectangular: 'w-full h-20',
    circular: 'rounded-full w-12 h-12',
    'movie-poster': 'aspect-[2/3] w-full',
    'movie-continue': 'aspect-video w-full'
  };

  const style = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height })
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

// Componentes específicos para diferentes tipos de conteúdo
export const MoviePosterSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    <Skeleton variant="movie-poster" />
    <Skeleton variant="text" width="80%" />
  </div>
);

export const MovieContinueSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Skeleton variant="movie-continue" className={className} />
);

export const SectionSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    <Skeleton variant="text" width="200px" height="24px" />
    <div className="flex space-x-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <MoviePosterSkeleton key={index} className="w-1/5" />
      ))}
    </div>
  </div>
);

