import React, { useState } from "react";
import clsx from "clsx";

interface TextAreaFieldWithAutoHeightResizeProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  value: string;
  label: string;
  placeholder: string;
  name: string;
  size?: string;
  disabled?: boolean;
  error?: string;
  width?: number;
  isRequired?: boolean;
  rows?: number;
}

const TextAreaFieldWithAutoHeightResize: React.FC<
  TextAreaFieldWithAutoHeightResizeProps
> = ({
  onChange = () => { },
  onBlur = () => { },
  value,
  label,
  placeholder,
  size,
  name,
  disabled = false,
  error,
  width,
  isRequired,
  rows = 3
}) => {
    const [minimumRows, setMinimumRows] = useState(rows);
    const computedRootStyle = () => {
      const style: { [key: string]: number | string } = {};

      if (width) {
        style.width = `${width}px`;
      }

      return style;
    };

    return (
      <div
        className={clsx({
          "w-full flex flex-col": true,
          "md:w-1/2": size === "half"
        })}
        style={computedRootStyle()}
      >
        <span className="flex">
          <label
            className="text-[#141921] font-medium mb-2 text-xs"
            htmlFor={`grid-${name}`}
          >
            {label}
          </label>
          {isRequired && <p className="text-yellow-500 text-xs ml-[3px]">*</p>}
        </span>
        <div>
          <div className="overflow-hidden h-fit w-full pb-3">
            <textarea
              className={clsx({
                "textarea w-full p-0 text-gray-400 resize-none rounded-none bg-transparent flex-1 focus:outline-none dark:text-gray-dark-400 placeholder:text-inherit":
                  true,
                "resize-none": minimumRows !== undefined,
                "h-fit": !minimumRows
              })}
              rows={minimumRows}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              onKeyUp={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                const lineBreakCount = (value.match(/\n/g) || []).length;
                if (event.key === "Enter") {
                  if (lineBreakCount >= 3) {
                    setMinimumRows(minimumRows + 1);
                  }
                }
                if (event.key === "Backspace") {
                  if (minimumRows > 3 && lineBreakCount + 1 !== minimumRows) {
                    setMinimumRows(minimumRows - 1);
                  }
                }
              }}
            />
          </div>
          {error && (
            <p className="mt-2 text-xs text-red-600 capitalize">{error}</p>
          )}
        </div>
      </div>
    );
  };

export default TextAreaFieldWithAutoHeightResize;
