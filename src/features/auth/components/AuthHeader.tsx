import { ArrowLeft } from "lucide-react";

function AuthHeader() {
    return (
        <>
            <div className="h-16 flex items-center py-1 px-6">
                <button>
                    <ArrowLeft />
                </button>
            </div>
        </>
    );
}

export default AuthHeader;
