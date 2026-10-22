
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validation";
import { getUserByEmail } from "../services/UserService";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";



function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [ApiError, setApiError] = useState("");




    async function handleSubmit(e) {
        e.preventDefault();
        setApiError("");

        const emailError = validateEmail(email);

        const newErrors = {};

        if (emailError) {
            newErrors.email = emailError;

        }
        if (!password.trim()) {
            newErrors.password = "Password is required";
        }



        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }
        try {
            const user = await getUserByEmail(email)
            if (!user) {
                setApiError("user doesnt exist");
                return;
            }
            if (user.password !== password) {
                setApiError("Paassword Not Match");
                return;
            }
            localStorage.setItem("userId", String(user.id));

            dispatch(login({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }))

            navigate(location.state?.from?.pathname || "/", { replace: true });
        }
        catch (error) {
            setApiError("Something went wrong")
        }


    }

    return (
        <main className="min-h-screen bg-[#f5f1eb] text-[#171614]">

            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

                {/* Left visual panel */}
                <section className="relative hidden min-h-screen overflow-hidden bg-[#d8c5b0] lg:block">

                    <img
                        src="/images/login/login-hero.png"
                        alt="Luxury fragrance surrounded by natural stone and roses"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5" />

                    <div className="absolute left-[11%] top-[14%] z-10 text-[#211b16]">
                        <div className="mb-4 h-px w-8 bg-[#211b16]" />

                        <h2 className="font-serif text-4xl leading-[1.1] tracking-[-0.04em] xl:text-5xl">
                            A World
                            <br />
                            of Fragrance
                        </h2>

                        <p className="mt-5 text-[9px] uppercase leading-[1.9] tracking-[0.35em]">
                            Timeless scents.
                            <br />
                            Modern stories.
                        </p>
                    </div>

                    <div className="absolute bottom-7 left-[11%] z-10 text-[9px] uppercase tracking-[0.25em] text-[#352b22]">
                        BLUME · Eau de Parfum
                    </div>
                </section>

                {/* Right login panel */}
                <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-16">

                    <div className="w-full max-w-[420px]">

                        {/* Heading */}
                        <div className="mb-8">
                            <div className="mb-4 h-px w-7 bg-[#171614]" />

                            <h1 className="font-serif text-5xl leading-tight tracking-[-0.045em] sm:text-6xl">
                                Login
                            </h1>

                            <p className="mt-3 text-[9px] uppercase tracking-[0.42em] text-[#756e66]">
                                Welcome back
                            </p>
                        </div>

                        {/* Login form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="login-email"
                                    className="mb-2 block text-[11px] text-[#38342f]"
                                >
                                    Email Address
                                </label>

                                <div className="flex h-12 items-center gap-3 border border-[#dcd6ce] px-3 transition-colors focus-within:border-[#777067]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17"
                                        height="17"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="shrink-0"
                                    >
                                        <rect x="3" y="5" width="18" height="14" rx="1" />
                                        <path d="m3 7 9 6 9-6" />
                                    </svg>

                                    <input
                                        id="login-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setApiError("");
                                            setErrors((prev) => ({
                                                ...prev,
                                                email: ""
                                            }));
                                        }}
                                        className="h-full w-full bg-transparent text-xs outline-none placeholder:text-[#aaa39a]"
                                        required
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="login-password"
                                    className="mb-2 block text-[11px] text-[#38342f]"
                                >
                                    Password
                                </label>

                                <div className="flex h-12 items-center gap-3 border border-[#dcd6ce] px-3 transition-colors focus-within:border-[#777067]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17"
                                        height="17"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="shrink-0"
                                    >
                                        <rect x="4" y="10" width="16" height="11" rx="1" />
                                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                    </svg>

                                    <input
                                        id="login-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setErrors((prev) => ({
                                                ...prev,
                                                password: ""
                                            }));
                                            setApiError("");
                                        }}
                                        className="h-full w-full bg-transparent text-xs outline-none placeholder:text-[#aaa39a]"
                                        required
                                    />

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17"
                                        height="17"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="shrink-0 text-[#777067]"
                                    >
                                        <path d="M3 3l18 18" />
                                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                        <path d="M9.9 5.2A11 11 0 0 1 12 5c5 0 8.3 4.5 9 6-.3.7-1.3 2.1-2.8 3.4" />
                                        <path d="M6.2 6.2C4.1 7.6 2.6 9.7 2 11c.7 1.5 4 6 10 6 1 0 2-.2 2.9-.5" />
                                    </svg>
                                </div>

                                {errors.password && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* API error */}
                            {ApiError && (
                                <p className="border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                                    {ApiError}
                                </p>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                className="group mt-2 flex h-[52px] w-full items-center justify-between bg-[#171614] px-5 text-xs text-white transition-colors duration-300 hover:bg-[#37332e]"
                            >
                                <span className="flex-1 text-center">
                                    Login
                                </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="19"
                                    height="19"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m13 6 6 6-6 6" />
                                </svg>
                            </button>

                        </form>

                        {/* Register link */}
                        <div className="mt-8 flex items-center gap-3">
                            <div className="h-px flex-1 bg-[#dcd6ce]" />

                            <p className="shrink-0 text-[10px] text-[#625c54]">
                                Don't have an account?
                            </p>

                            <Link
                                to="/register"
                                className="shrink-0 text-[11px] text-[#171614] underline underline-offset-4 transition-opacity hover:opacity-60"
                            >
                                Register
                            </Link>

                            <div className="h-px flex-1 bg-[#dcd6ce]" />
                        </div>

                        {/* Mobile branding */}
                        <p className="mt-12 text-center text-[9px] uppercase tracking-[0.35em] text-[#91877b] lg:hidden">
                            BLUME · The art of fragrance
                        </p>

                    </div>
                </section>

            </div>

        </main>
    );
}

export default Login;
