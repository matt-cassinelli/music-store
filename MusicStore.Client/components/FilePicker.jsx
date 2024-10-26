import clsx from "clsx";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FilePicker({ id, required, setFile }) {

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    multiple: false,
    maxFiles: 1,
    onDrop: (acceptedFiles) =>{
      const blob = new Blob([acceptedFiles[0]]);
      setFile(blob);
    }
  });

  const truncateFilename = useCallback((length) => {
    const raw = acceptedFiles[0].name;
    const ext = raw.split(".").pop();
    const noExt = raw.substring(0, raw.length - ext.length - 1);
    if (noExt.length > length) {
      return noExt.substring(0, length) + "..." + ext;
    }
    else {
      return raw;
    }
  }, [acceptedFiles]);

  return (
    <label className="font-medium text-fg">
      File
      <div
        {...getRootProps()}
        className={clsx(
          "mt-2 p-2 flex flex-col h-10.5 justify-center border-2 border-dashed border-gray-400 dark:border-fg/50 rounded-lg cursor-pointer focusable",
          isDragActive && "ring-2 ring-primary",
          (isDragActive || acceptedFiles[0] == null) && "bg-bg1 items-center text-gray-400",
          acceptedFiles[0] != null && "truncate text-left bg-green-100 dark:bg-green-900 text-fg"
        )}>
        <input {...getInputProps()} />
        {
          isDragActive ? <p>Drop...</p>
          : (acceptedFiles[0] != null) ? <p>{truncateFilename(14)}</p>
          : <p>Browse or drop</p>
        }
      </div>
    </label>
  );
}
