export default function Footer() {
  return (
    <footer className="w-full h-12 flex justify-center items-center text-center sticky top-[100vh]">
      <h5 className="m-1 text-sm">
        &copy; {new Date().getFullYear()} Matt Cassinelli
      </h5>
    </footer>
  );
}