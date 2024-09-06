// Global
import dynamic from 'next/dynamic';
import React from 'react';
import { tv } from 'tailwind-variants';

/**
 * Standardize SVG icons on a 48x48 grid to allow
 * for consistent use across the project
 *
 * Icon contents should be stored in the icons subdirectory
 * using the naming scheme 'icon--[name].tsx'
 */

export type IconTypes =
  | undefined
  | 'arrow-right'
  | 'arrow-left'
  | 'pause'
  | 'play'
  | 'download'
  | 'chevron-down'
  | 'chevron-up'
  | 'outline-search'
  | 'close'
  | 'magnifier'
  | 'sorting'
  | 'refine'
  | 'plus';

export type SvgIconSize = 'xs' | 'sm' | 'md' | 'em' | 'lg';

export type SVGFill = 'currentColor' | 'none';

export interface SvgIconProps {
  className?: string;
  icon: IconTypes;
  size?: SvgIconSize;
  viewBox?: string;
  fill?: SVGFill;
}

const svgIconClasses = tv({
  base: [],
  variants: {
    size: {
      xs: ['!h-4', '!w-4'],
      sm: ['!h-8', '!w-8'],
      md: ['!h-16', '!w-16'],
      lg: ['!h-24', '!w-24'],
      em: ['!h-em', '!w-em'],
    },
  },
});

const SvgIcon = ({
  icon,
  size = 'sm',
  className,
  viewBox = '0 -960 960 960',
  fill = 'currentColor',
}: SvgIconProps): JSX.Element => {
  const IconContent = dynamic(() => import(`./icons/icon--${icon}`));
  return (
    <svg
      className={svgIconClasses({ className, size })}
      fill={fill}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <IconContent />
    </svg>
  );
};

export default React.memo(SvgIcon);
