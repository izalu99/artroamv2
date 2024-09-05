import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-neutral text-primary p-4 md:p-6 lg:p-8 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold neon-text">
          Art Roam
        </h1>
      </Link>
      <button className="text-secondary border border-primary p-2 rounded-lg hover:bg-primary hover:text-neutral transition-colors duration-300">
        Toggle Theme
      </button>
    </header>
  );
};

export default Header;
