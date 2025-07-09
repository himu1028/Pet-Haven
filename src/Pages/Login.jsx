import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
const {register,handleSubmit,formState: { errors }}=useForm();
  const {googleSignIn,SignInUser}= useAuth();
 const navigate = useNavigate()
const handleGoogle = () =>{
  googleSignIn()
  .then(result =>{
  console.log(result)
   navigate("/");
})
.catch(error =>{
  console.log(error)
})
}

const onSubmit = data => {
  // Create user
SignInUser(data.email,data.password)
.then(result =>{
  Swal.fire("You Have Successfully Log In !");
  navigate("/");
    
  console.log(result)
})
.catch(error =>{
  Swal.fire("Email or Password is incorrrect !");
  console.log(error)
})
}

    return (
        <div className='max-w-8xl'>
             {/* Left: Form */}
        <div className="p-10 ">
          <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">Please Login</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}
           className="space-y-4">


            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Email *</label>
              <input
                type="email"
                {...register("email",{required:true})}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                
              />
            </div>
            {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                 {...register("password",{required
                  :true,minLength:6
                 })}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
               
              />
            </div>

            {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
            {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 charecters long</p>}

            <div className="text-right">
              <button className="text-sm text-blue-600 hover:underline">Forgot Password?</button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition"
            >Log In
            </button>
          </form>

          {/* OR separator */}
      <div className="my-4 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
        <span className="text-sm font-medium text-gray-700">Continue with Google</span>
      </button>

          <p className="mt-6 text-center text-sm ">
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