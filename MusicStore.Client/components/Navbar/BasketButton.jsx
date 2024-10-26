import BasketIcon from "icons/BasketIcon";
import Link from "next/link";
import clsx from "clsx";

export default function BasketButton({ className }) {
  return (
    <Link href="/basket" className={clsx("flex items-center gap-1", className)}>
      <BasketIcon />
      <span className="fill-fg font-bold">7</span>
    </Link>
  );
}
