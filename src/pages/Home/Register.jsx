import React, { use, useState } from 'react';
import barger from '../../assets/brg.png'
import chiken from '../../assets/chiken.png'
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Register = () => {
    const { createUser, google, updateUser, setUser } = use(AuthContext);
        const [show, setShow] = useState(false)

    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.photo.value;

       // console.log({ name, email, password })


       const regExp=/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/

        if(!regExp.test(password)){
            toast.error('Password must be at least 6 characters long and include both uppercase and lowercase letters');
            return;
        }








        createUser(email, password)
            .then(result => {
                const user = (result.user)
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo })
                        toast.success('User created successful!')
                        navigate('/')
                    })
                    .catch(error => {
                        console.log(error)
                        setUser(user)
                    })


            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;

                toast.error(errorMessage)
            });











    }


    const handlegoogle = () => {

        google()
            .then((result) => {

                console.log(result.user);
                toast.success('User created successful!')

            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });

    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className='w-[1200px] mx-auto'>
                <div className='flex flex-col md:flex-row justify-between items-center md:items-start gap-8'>

                    {/* Images */}
                    <div>
                        <div className='flex justify-center items-center gap-4'>
                            <img className='h-[100px] w-[100px]' src={barger} alt="" />
                            <img className='h-[300px] w-[300px]' src={chiken} alt="" />
                        </div>
                        <h1 className='font-bold text-3xl text-center'>Create your account and <br />start shaping better local food.</h1>
                    </div>



                    {/* register Card */}
                    <div className="card bg-base-100 w-full max-w-sm shadow-2xl border border-gray-200">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-center">Register</h1>
                            <form onSubmit={handleRegister}>
                                <fieldset className="fieldset">

                                    <label className="label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="input rounded-full focus:border-0 focus:outline-gray-200"
                                        placeholder="User name"
                                    />



                                    <label className="label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input rounded-full focus:border-0 focus:outline-gray-200"
                                        placeholder="Email"
                                    />
                                    <label className="label">Photo URL</label>
                                    <input
                                        type="text"
                                        name="photo"
                                        className="input rounded-full focus:border-0 focus:outline-gray-200"
                                        placeholder="Past your photo url here"
                                    />

                                   


                                    <div className="relative">
                                        <label className="block text-sm mb-1">Password</label>
                                        <input
                                            type={show ? "text" : "password"}
                                            name="password"
                                            placeholder="••••••••"
                                            required
                                             className="input rounded-full focus:border-0 focus:outline-gray-200"
                                        />
                                        <span onClick={() => setShow(!show)} className="absolute right-[28px] top-[38px]  cursor-pointer z-50">
                                            {show ? <FaEye /> : <FaEyeSlash />
                                            }
                                        </span>
                                    </div>



                                    <button className="btn text-white mt-4 rounded-full customBtn">
                                        Register
                                    </button>
                                </fieldset>
                            </form>



                            {/* google login */}
                            <button onClick={handlegoogle} className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Register with Google
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;