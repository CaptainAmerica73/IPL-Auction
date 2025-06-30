import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../store/store";
import { setUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import { login } from "../services/login";

export default function Login() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch<DispatchType>();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !justLoggedIn) {
      navigate("/", {
        state: {
          message: "You are already logged in!",
        },
      });
    }
  }, [isAuthenticated, navigate, justLoggedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = await login(formData);
      if (data.error) {
        throw new Error(data.error);
      } else {
        setJustLoggedIn(true);
        dispatch(setUser(data.user));
        navigate("/", {
          state: {
            message: "Login successful!",
          },
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-[#19398a]">
      <form
        className="bg-black/40 p-[2rem] rounded-[1rem] translate-y-[2rem] pb-[3rem] px-[4rem] flex flex-col gap-[2rem] justify-center items-center max-w-[90vw] min-w-[40vw]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[clamp(2rem,4vw,4rem)] font-bold my-[1rem] tracking-[1rem]">
          LOGIN
        </h1>
        <div className="relative h-[5vh] w-full my-[.5rem]">
          <input
            name="userName"
            id="username"
            className="peer border-b-2 border-white bg-transparent outline-none h-full w-full"
            type="text"
            onChange={handleChange}
            value={formData.userName}
            required
            placeholder=""
          />
          <label
            htmlFor="username"
            className="absolute -top-1 left-0 text-sm -translate-y-1/2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg"
          >
            Username
          </label>
        </div>
        <div className="relative h-[5vh] w-full my-[.5rem]">
          <input
            name="password"
            id="password"
            className="peer border-b-2 border-white bg-transparent outline-none h-full w-full"
            type="password"
            onChange={handleChange}
            value={formData.password}
            minLength={6}
            required
            placeholder=""
          />
          <label
            htmlFor="password"
            className="absolute -top-1 left-0 text-sm -translate-y-1/2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg"
          >
            Password
          </label>
        </div>
        <p className="text-lg text-white">
          Already have an account?
          <Link
            to="/auth/signup"
            className="text-cyan-600 font-medium hover:underline hover:text-cyan-400 transition-all ml-1"
          >
            Signup
          </Link>
        </p>
        <button
          className="bg-cyan-700 rounded-xl text-[clamp(0.8rem,1.3vw,1.3rem)] py-[clamp(.5rem,.5vw,.8rem)] px-[clamp(1rem,1.7vw,2.2rem)] hover:text-black hover:bg-cyan-600 transition-all mx-auto disabled:cursor-not-allowed cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
