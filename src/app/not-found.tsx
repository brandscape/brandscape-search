import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen py-24 px-4">
      <h2 className="text-[--color-text-normal] text-nowrap">Not Found</h2>
      <p className="text-[--color-text-normal] text-nowrap">Could not find requested resource</p>
      <Link href="/" className="text-blue-500 underline cursor-pointer">
        Return Home
      </Link>
    </main>
  );
}
