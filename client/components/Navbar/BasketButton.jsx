import Link from "next/link";
import classNames from "@/utils/classNames";

export default function BasketButton({className}) {
  return (
    <Link href="/basket" className={classNames("flex items-center gap-1", className)}>
      <svg id="layer-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 902.86 748.42" className='h-7 fill-primary'>
        <path d="M231.36,577.83H828.11L902.86,178.7l-703.13.5-26-102H0v68H120.87L231.36,577.83ZM820.93,246.76,771.66,509.83H284.17L217.09,247.19Z" transform="translate(0 -77.22)"/>
        <path d="M433.19,716.9a108.32,108.32,0,0,0-7.93-40.75H633.33a108.74,108.74,0,1,0,100.81-68H324.44A108.75,108.75,0,1,0,433.19,716.9Zm301-40.75A40.75,40.75,0,1,1,693.4,716.9,40.8,40.8,0,0,1,734.14,676.15Zm-409.7,0A40.75,40.75,0,1,1,283.7,716.9,40.79,40.79,0,0,1,324.44,676.15Z" transform="translate(0 -77.22)"/>
      </svg>
      <span className=" fill-primary font-bold">7</span>
    </Link>
  );
}