import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons

const SearchBar = ({query, handleSearch, handleSubmit}:any) => {
  return (
    <div className="animate-slideIn flex justify-center p-4 md:p-6 lg:p-8">
        <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-md">
            <div className="relative">
                <input
                type="text"
                placeholder="Search Art Roam..."
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
