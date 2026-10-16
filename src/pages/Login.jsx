
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validation";
import { getUserByEmail } from "../services/UserService";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";



function Login() {
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const location =useLocation();

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
                id:user.id,
                name:user.name,
                email:user.email
            }))

            navigate(location.state?.from?.pathname || "/",{replace:true});
        }
        catch (error) {
            setApiError("Something went wrong")
        }


    }

    return (
        <div className="min-h-screen bg-stone-50 px-6 py-8">
            <div className="mx-auto mt-20 max-w-md">
                <h1 className="font-serif text-4xl">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setApiError("");
                            setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        className="w-full border border-gray-300 bg-transparent px-4 py-3"
                        required
                    />
                    {
                        errors.email && <p>{errors.email}</p>
                    }

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value);
                            setErrors((prev) => ({...prev, password: "" }));
                        }}
                    className="w-full border border-gray-300 bg-transparent px-4 py-3"
                    required
                    />
                    {errors.password && <p>{errors.password}</p>

                    }

                    {
                        ApiError && <p>{ApiError}</p>
                    }
                    <button
                        type="submit"
                        className="w-full bg-neutral-900 px-4 py-4 text-white"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="underline text-black">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
