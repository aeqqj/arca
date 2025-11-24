import AuthHeader from "./AuthHeader.tsx";

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <section className="w-screen h-screen flex flex-col text-center">
                <AuthHeader />
                <div className="h-full flex flex-col gap-8 justify-center items-center">
                    {children}
                </div>
            </section>
        </>
    );
}

export default AuthLayout;
