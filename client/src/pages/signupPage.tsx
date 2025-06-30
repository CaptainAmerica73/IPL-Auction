import { useEffect, useState } from "react";
import { signup } from "../services/signup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../store/store";
import { setUser } from "../slices/authSlice";
import { toast } from "react-toastify";

export default function Signup() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch<DispatchType>();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [justSignedUp, setJustSignedUp] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !justSignedUp) {
      navigate("/", {
        state: {
          message: "You are already logged in!",
        },
      });
    }
  }, [isAuthenticated, navigate, justSignedUp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = await signup(formData);
      if (data.error) {
        throw new Error(data.error);
      } else {
        setJustSignedUp(true);
        dispatch(setUser(data.user));
        navigate("/", {
          state: {
            message: "Signup successful!",
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
        className="bg-black/40 p-[2rem] rounded-lg translate-y-[2rem] pb-[3rem] px-[4rem] flex flex-col gap-[2rem] justify-center items-center max-w-[90vw] min-w-[40vw]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[clamp(2rem,4vw,4rem)] font-bold my-[1rem] tracking-[1rem]">
          SIGN UP
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
            name="email"
            id="email"
            className="peer border-b-2 border-white bg-transparent outline-none h-full w-full"
            type="email"
            onChange={handleChange}
            value={formData.email}
            required
            placeholder=""
          />
          <label
            htmlFor="email"
            className="absolute -top-1 left-0 text-sm -translate-y-1/2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg"
          >
            Email
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
        <div className="flex justify-around w-full">
          <div className="flex gap-[.5rem]">
            <input
              type="radio"
              id="user"
              name="role"
              value="user"
              onChange={handleChange}
              checked={formData.role === "user"}
              className="scale-125 accent-[#19398a]"
            />
            <label htmlFor="user" className="cursor-pointer text-lg">
              User
            </label>
          </div>
          <div className="flex gap-[.5rem]">
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              onChange={handleChange}
              checked={formData.role === "admin"}
              className="scale-125 accent-[#19398a]"
            />
            <label htmlFor="admin" className="cursor-pointer text-lg">
              Admin
            </label>
          </div>
        </div>
        <p className="text-lg text-white">
          Already have an account?
          <Link
            to="/auth/login"
            className="text-cyan-600 font-medium hover:underline hover:text-cyan-400 transition-all ml-1"
          >
            Login
          </Link>
        </p>
        <button
          className="bg-cyan-700 rounded-xl text-[clamp(0.8rem,1.3vw,1.3rem)] py-[clamp(.5rem,.5vw,.8rem)] px-[clamp(1rem,1.7vw,2.2rem)] hover:text-black hover:bg-cyan-600 transition-all mx-auto disabled:cursor-not-allowed cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
