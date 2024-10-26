import clsx from "clsx";

export default function AddSoundSkeleton({ onClick }) {
  return (
    <article
      className={clsx(
        "h-52 m-2 lg:m-4 p-4 flex flex-col items-center rounded-3xl hover:-translate-y-1 duration-300 cursor-pointer",
        "border-4 border-gray-400 border-dashed text-9xl text-gray-400"
      )}
      onClick={onClick}
    >
      +
    </article>
  );
}
