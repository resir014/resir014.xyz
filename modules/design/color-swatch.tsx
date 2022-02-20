import React from 'react';
import { toClipboard } from 'copee';
import clsx from 'clsx';

export interface ColorSwatchProps {
  color: string;
  title?: string;
  darkText?: boolean;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, title, darkText }) => {
  const [copySuccess, setCopySuccess] = React.useState<string | undefined>(undefined);

  function copyToClipboard(str: string) {
    return () => {
      const success = toClipboard(str);

      if (success) {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(undefined), 3000);
      }
    };
  }

  return (
    <button
      className="group not-prose inline-block w-[92px] m-0 mr-6 mb-6 p-2 border-none rounded-md bg-chungking-grey-800 cursor-pointer"
      type="button"
      onClick={copyToClipboard(color)}
    >
      <div
        className={clsx(
          'flex items-center justify-center h-[76px] w-[76px] text-xs rounded-sm group-focus:opacity-70',
          darkText ? 'text-chungking-black' : 'text-chungking-white'
        )}
        style={{ backgroundColor: color }}
      >
        {copySuccess ?? title ?? color}
      </div>
    </button>
  );
};
