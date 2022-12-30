import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../Context/AuthProvider';

const Login = () => {
    const {login} = useContext(authContext)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const handleFormData = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        login(email, password)
        .then(data => {
            console.log(data)
            toast.success('user logged in successfully')
            form.reset()
            navigate(from, {replace : true})
        })
        .catch(err => toast.error(err.message))
    }
    return (
        <div>
            <div className='flex h-[90vh] justify-center items-center mx-6'>
                <div className='overFlow h-[70vh] bg-[#23B586] w-[450px] rounded-xl shadow-2xl'>
                    <h1 className='text-white text-2xl font-semibold m-2'>Login</h1>
                    <div className='flex items-center justify-center h-96'>
                        <form onSubmit={handleFormData} className="flex flex-col gap-4 mx-6">
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email2"
                                        value="Your email"
                                    />
                                </div>
                                <TextInput
                                    id="email2"
                                    type="email"
                                    placeholder="name@flowbite.com"
                                    required={true}
                                    shadow={true}
                                    name='email'
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="password2"
                                        value="Your password"
                                    />
                                </div>
                                <TextInput
                                    id="password2"
                                    type="password"
                                    required={true}
                                    shadow={true}
                                    name='password'
                                />
                            </div>

                            
                            <Button type="submit">
                                Login Now
                            </Button>
                        </form>
                       
                    </div>
                    <h1 className='text-white'>Dont have an account? <Link className='text-red-700' to='/register'>Register Now</Link></h1>

                </div>
            </div>
        </div>
    );
};

export default Login;