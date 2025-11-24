import Layout from "../../features/home/components/Layout";
import SearchBar from "../../features/home/components/SearchBar.tsx";
import SchoolContainer from "../../features/home/components/SchoolContainer.tsx";

import type { School } from "../../features/home/types/School.tsx";

import { User, Wrench } from "lucide-react";

function HomePage() {
    const x: School = {
        name: "School of Engineering",
        acronym: "SOE",
        icon: Wrench,
    };

    return (
        <>
            <Layout>
                <div className="flex flex-col gap-6">
                    <h1 className="font-outfit font-semibold text-shadow-lg">
                        arca
                    </h1>
                    <SearchBar />
                </div>
                <div className="flex gap-10">
                    <SchoolContainer school={x} />
                    <SchoolContainer school={x} />
                    <SchoolContainer school={x} />
                    <SchoolContainer school={x} />
                </div>
                {/* fix this later */}
            </Layout>
        </>
    );
}

export default HomePage;
