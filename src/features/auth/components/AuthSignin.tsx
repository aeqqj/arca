import AuthLayout from "./AuthLayout.tsx";

function AuthSignIn() {
    return (
        <>
            <AuthLayout>
                <h3 className="font-outfit font-semibold text-shadow-lg">
                    welcome back!
                </h3>
                <div className="flex flex-col gap-8">
                    <form id="sign-in" className="flex flex-col gap-8">
                        <div className="flex flex-col justify-start text-left gap-1">
                            <label>Email</label>
                            <input
                                type="email"
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
                            <button className="text-sm text-right opacity-60">
                                Forgot password?
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col gap-4 text-sm">
                        <button
                            form="sign-in"
                            className="w-80 px-5 py-3 bg-foreground0 text-background0 rounded-xl shadow-xl"
                        >
                            Sign in
                        </button>
                        <p className="opacity-60">
                            Don't have an account?&nbsp;
                            <button className="underline">Sign up</button>
                        </p>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}

export default AuthSignIn;
