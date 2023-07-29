import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <h1>An unexpected error has occurred</h1>
      <p>
        {error.statusText || error.message}
      </p>
    </>
  );
}