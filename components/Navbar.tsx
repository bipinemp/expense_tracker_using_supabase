import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-200 py-4 flex items-center justify-center gap-x-5">
      <Link href={"/"}>Home</Link>
      <Link href={"/signin"}>signin</Link>
      <Link href={"/private"}>private</Link>
    </nav>
  );
};

export default Navbar;
