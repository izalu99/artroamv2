import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons

const SearchBar = ({query, handleSearch, handleSubmit}:any) => {
  return (
    <div className="animate-slideIn flex justify-center w-full p-4 ">
        <form onSubmit={handleSubmit} className="flex w-full justify-center">
            <div className="form-control w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <div className="relative">
                <input
                type="text"
                placeholder="Search for art and explore..."
                value={query}
                onChange={handleSearch}
                className="input input-bordered w-full bg-neutral text-secondary placeholder-secondary pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="absolute inset-y-0 right-2 flex items-center">
                <FaSearch className="text-primary" />
                </span>
            </div>
            </div>
      </form>
    </div>
  );
};

export default SearchBar;
