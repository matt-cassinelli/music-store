export default function Spinner() {
  return (
    <svg
      alt="loading"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-12 my-8 mx-auto animate-spin fill-primary"
    >
      <path 
        fill="currentColor"
        fillRule="evenodd"
        d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0 3a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
        clipRule="evenodd"
        opacity=".2"
      />
      <path fill="currentColor" d="M2 12A10 10 0 0 1 12 2v3a7 7 0 0 0-7 7H2Z"/>
    </svg>
  );
}