import clsx from "clsx";

export default function TextInput({ label, id, placeholder, required, pattern, className, cols }) {

  const commonStyles = "mt-2 p-2 border-2 w-full bg-bg1 border-gray-300 dark:border-fg/50 rounded-lg focusable";

  return (
    <label className={clsx(
      "font-medium text-fg",
      className)}
    >
      {label}
      {cols > 1 ?
        <textarea
          id={id}
          required={required}
          placeholder={placeholder}
          cols={cols}
          className={commonStyles}
        />
        :
        <input
          id={id}
          type="text"
          pattern={pattern}
          required={required}
          placeholder={placeholder}
          className={commonStyles}
        />
      }
    </label>
  );
}
