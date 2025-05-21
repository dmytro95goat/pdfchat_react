import React, { useState, useRef } from "react";

type UploadBtnProps = {
  handleFileChange: (file: File | undefined) => void;
  loading?: boolean;
};

const UploadBtn: React.FC<UploadBtnProps> = ({
  handleFileChange,
  loading = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div>
      <button
        className="px-20 py-2 rounded-lg bg-sky-400 hover:bg-sky-500 flex items-cente text-shadow-yellow-800 font-bold"
        type="button"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <svg
            className="mr-3 size-5 animate-spin text-white"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          ""
        )}
        {"Upload"}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />
    </div>
  );
};

export default UploadBtn;
