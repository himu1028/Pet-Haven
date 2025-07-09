import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div className='max-w-8xl'>
             {/* Left: Form */}
        <div className="p-10 ">
          <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">Please Login</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
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