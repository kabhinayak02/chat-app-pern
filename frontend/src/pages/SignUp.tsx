import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import React, { useState } from "react";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullname: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});
	const {loading, signup} = useSignup();

	const handleChecBoxChange = (gender: "male" | "female") => {
		setInputs({ ...inputs, gender});
	} 

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// console.log(inputs);
		signup(inputs);
	}
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-gray-900'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input type='text' placeholder='Full Name' className='w-full input input-bordered  h-10' 
							value={inputs.fullname}
							onChange={(e) => setInputs({...inputs, fullname: e.target.value})}
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' placeholder='Username' className='w-full input input-bordered h-10' 
							value={inputs.username}
							onChange={(e) => setInputs({...inputs, username: e.target.value})}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({...inputs, password: e.target.value})}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
						/>
					</div>

					<GenderCheckbox
						selectedGender = {inputs.gender}
						onCheckBoxChange = {handleChecBoxChange}
					/>

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700'
							disabled={loading}
						>
							{loading ? "Loading..." : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
