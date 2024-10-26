import clsx from "clsx";

export default function Button({ type, onClick, children, className, style = "main" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "px-4 py-2 text-sm font-semibold rounded-xl focusable",
        style == "main" && "text-bg2 bg-primary/80 hover:bg-primary",
        style == "secondary" && "text-primary hover:text-bg2 hover:bg-primary border-2 border-primary",
        className
      )}
    >
      {children}
    </button>
  );
}
