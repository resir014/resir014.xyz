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
    <div className="not-prose group flex flex-row h-[72px] m-0 py-1 pl-4 pr-1 border-none rounded-md bg-chungking-grey-800 shadow-single overflow-hidden">
      <div className="flex items-center flex-1">
        <div>
          <span className="block text-md leading-tight font-semibold text-chungking-white">
            {title}
          </span>
          <span className="block text-sm leading-normal text-chungking-grey-300">{color}</span>
        </div>
      </div>
      <button
        className={clsx(
          'flex items-center justify-center h-[64px] w-[64px] text-xs rounded-[4px] group-focus:opacity-70 cursor-pointer',
          darkText ? 'text-chungking-black' : 'text-chungking-white'
        )}
        style={{ backgroundColor: color }}
        type="button"
        onClick={copyToClipboard(color)}
      >
        {copySuccess ?? 'Copy'}
      </button>
    </div>
  );
};
