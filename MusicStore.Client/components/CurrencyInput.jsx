import clsx from "clsx";

export default function CurrencyInput({ id, label, required }) {
  return (
    <label className="mb-2 font-medium">
      {label}
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none text-fg/50">
          £
        </div>
        <input
          id={id}
          type="number"
          required={required}
          placeholder="0"
          pattern="^\d+(\.\d{2})?$"
          className={clsx(
            "mt-2 block p-2 w-full z-20 ps-9 bg-bg1 border-2 border-gray-300 dark:border-fg/50 rounded-lg focusable",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" // Remove up/down arrows
          )}
        />
      </div>
    </label>
  );
}
