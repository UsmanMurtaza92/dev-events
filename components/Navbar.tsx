import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/clock.svg" alt="logo" width={24} height={24} className="shrink-0 " />
          <p>DevEvent</p>
        </Link>

        <ul>
          <Link href="/">Home</Link>
          <Link href="/">Events</Link>
          <Link href="#contact">Create Event</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
