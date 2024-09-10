import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 p-4 md:p-6 lg:p-8 flex justify-between items-center bg-transparent">
      <Link href="/">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-neon-magenta via-neon-cyan to-neon-pink">
          Art Roam
        </h1>
      </Link>
      <Link 
      className="animate-fadeIn font-semibold text-secondary p-2 rounded-lg hover:bg-primary hover:text-neutral transition-colors duration-300"
      href="/compare">
        <div className="">Compare List</div>
      </Link>
    </header>
  );
};

export default Header;
