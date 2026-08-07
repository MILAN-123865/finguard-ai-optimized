import React from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'Avatar', 
  initials, 
  size = 'md', 
  className = '' 
}) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl"
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-[#00daf3]/20 to-[#6001d1]/30 border border-white/10 ${sizes[size]} ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-bold text-[#00daf3]">{initials || getInitials(alt)}</span>
      )}
    </div>
  );
};
