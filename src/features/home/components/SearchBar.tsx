import { LucideSearch } from "lucide-react";

function SearchBar() {
    return (
        <>
            <div className="h-16 w-4xl p-6 flex justify-between items-center bg-background1 shadow-xl rounded-4xl">
                <LucideSearch />
            </div>
        </>
    );
}

export default SearchBar;
