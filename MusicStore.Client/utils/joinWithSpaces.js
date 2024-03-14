export default function joinWithSpaces(...classes) {
  return classes.filter(Boolean).join(" ");
}
