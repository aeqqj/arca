import Header from "./Header.tsx";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <section className="w-screen h-screen flex flex-col text-center">
                <Header />
                <div className="h-full flex flex-col gap-18 justify-center items-center">
                    {children}
                </div>
            </section>
        </>
    );
}

export default Layout;
