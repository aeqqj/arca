import { User } from "lucide-react";

function Header() {
    return (
        <>
            <div className="h-16 flex justify-end items-center py-1 px-6">
                <button className="cursor-pointer">
                    <User />
                </button>
            </div>
        </>
    );
}

export default Header;
