import React from 'react';
import { Clipboard, Check } from 'react-feather';
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
      className="not-prose group w-full m-0 px-1 pb-1 border-none rounded-md bg-chungking-grey-800 shadow-single overflow-hidden disabled:cursor-not-allowed"
      type="button"
      disabled={!!copySuccess}
      onClick={copyToClipboard(color)}
    >
      <div className="flex items-center w-full text-left py-2 space-x-2">
        <span className="block text-sm leading-normal font-semibold text-chungking-white">
          {title}
        </span>
        <span className="block text-sm leading-normal text-chungking-grey-300">{color}</span>
      </div>
      <div
        className={clsx(
          'flex items-center justify-center align-middle space-x-1 w-full h-[36px] text-xs rounded-[4px] px-4 py-2 group-focus:opacity-70 cursor-pointer border',
          darkText
            ? 'text-chungking-black border-chungking-black border-opacity-20'
            : 'text-chungking-white border-chungking-white border-opacity-20'
        )}
        style={{ backgroundColor: color }}
      >
        {copySuccess ? <Check size={16} /> : <Clipboard size={16} />}{' '}
        <span>{copySuccess ?? 'Copy to clipboard'}</span>
      </div>
    </button>
  );
};
