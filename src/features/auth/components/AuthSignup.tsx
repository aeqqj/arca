import AuthLayout from "./AuthLayout.tsx";

function AuthSignUp() {
    return (
        <>
            <AuthLayout>
                <h3 className="font-outfit font-semibold text-shadow-lg">
                    come along!
                </h3>
                <div className="flex flex-col gap-8">
                    <form id="sign-in" className="flex flex-col gap-8">
                        <div className="flex flex-col justify-start text-left gap-1">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="w-80 px-5 py-3 bg-background1 rounded-xl shadow-xl"
                            />
                        </div>
                        <div className="flex flex-col justify-start text-left gap-1">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-80 px-5 py-3 bg-background1 rounded-xl shadow-xl"
                            />
                        </div>
                        <div className="flex flex-col justify-start text-left gap-1">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your email"
                                className="w-80 px-5 py-3 bg-background1 rounded-xl shadow-xl"
                            />
                        </div>
                    </form>
                    <button
                        form="sign-in"
                        className="w-80 px-5 py-3 bg-foreground0 text-background0 rounded-xl shadow-xl"
                    >
                        Sign in
                    </button>
                </div>
            </AuthLayout>
        </>
    );
}

export default AuthSignUp;
