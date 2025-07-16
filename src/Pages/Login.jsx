import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { googleSignIn, SignInUser, loginWithgithub } = useAuth();
  const navigate = useNavigate();

  const saveUserIfNotExists = async (user) => {
    const userData = {
      name: user.displayName || "No Name",
      email: user.email,
      role: 'user',
      image: user.photoURL || '',
      createdAt: new Date()
    };

    try {
      const res = await axios.get(`https://pet-adoption-server-kohl.vercel.app/users/${user.email}`);
      if (!res.data?.email) {
        await axios.post("https://pet-adoption-server-kohl.vercel.app/users", userData);
      }
    } catch (err) {
      console.error("User DB Save Error:", err);
    }
  };

 
  const handleGoogle = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;
      await saveUserIfNotExists(user);
      Swal.fire("Login Successful with Google!");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        Swal.fire({
          icon: "error",
          title: "Account Exists",
          text: "This email is already registered with a different login provider. Please try with that provider.",
        });
      } else {
        console.log("Google Sign In Error:", error);
      }
    }
  };


  const handleGithub = async () => {
    try {
      await signOut(auth); 
      const result = await loginWithgithub();
      const user = result.user;
      await saveUserIfNotExists(user);
      Swal.fire("Login Successful with GitHub!");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        Swal.fire({
          icon: "error",
          title: "Account Exists",
          text: "This email is already registered with a different login provider. Please try with that provider.",
        });
      } else {
        console.log("GitHub Sign In Error:", error);
      }
    }
  };

  // ✅ Email/Password Login Submit
  const onSubmit = data => {
    SignInUser(data.email, data.password)
      .then(result => {
        Swal.fire("You Have Successfully Logged In!");
        navigate("/");
      })
      .catch(error => {
        Swal.fire("Email or Password is incorrect!");
        console.log(error);
      });
  };

  return (
    <div className='max-w-8xl'>
      <div className="p-10 ">
        <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">Please Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Email *</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
            {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters long</p>}
          </div>

          <div className="text-right">
            <button className="text-sm text-blue-600 hover:underline">Forgot Password?</button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Log In
          </button>
        </form>

        {/* OR separator */}
        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
          <span className="text-sm font-medium text-gray-700">Continue with Google</span>
        </button>

        {/* GitHub Login */}
        <button
          type="button"
          onClick={handleGithub}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition mt-2"
        >
          <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="h-5 w-5" />
          <span className="text-sm font-medium text-gray-700">Continue with GitHub</span>
        </button>

        <p className="mt-6 text-center text-sm">
          New to here?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Please Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
