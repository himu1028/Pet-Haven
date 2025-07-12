import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = useNavigate()
    const {createUser,googleSignIn,loginWithgithub}= useAuth();
const {register,handleSubmit,formState: { errors }}=useForm();


const handleGithub = () => {

  loginWithgithub()
    .then(result => {
       navigate("/");
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
};


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
  console.log(data)
   // Create user
  createUser(data.email, data.password)
.then((userCredential)=>{
  const user = userCredential.user;

})

    .then((result) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You Have Successfully Registered",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      }).then(() => {
        navigate("/");
      });
      console.log(result);
    })
    .catch((error) => {
       Swal.fire("please try again !");
      console.log(error);
    });
}

    return (
        <div className='max-w-8xl'>
             {/* Left: Form */}
        <div className="p-10 ">
          <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">Please Register</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}
           className="space-y-4">


   <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Your Name *</label>
              <input
                type="text"
                {...register("name",{required:true})}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                
              />
            </div>
            {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}



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

         

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition"
            >Register
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

{/* GitHub Login Button */}
<button
  type="button"
  onClick={handleGithub}
  className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition mt-2"
>
  <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="h-5 w-5" />
  <span className="text-sm font-medium text-gray-700">Continue with Github</span>
</button>


          <p className="mt-6 text-center text-sm ">
            Already Register?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Please Login
            </Link>
          </p>


        </div>
        </div>
    );
};

export default Register;