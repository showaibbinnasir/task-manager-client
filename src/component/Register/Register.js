import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../Context/AuthProvider';

const Register = () => {
    const {createUser, updateUser} = useContext(authContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleFormData = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        createUser(email, password)
        .then(data => {
            console.log(data)
            handleUser(name)
            toast.success('user created successfully')
            form.reset()
            navigate(from, {replace : true})
        })
        .catch(err => toast.error(err.message))
    }
    const handleUser = name => {
        const profile = {
            displayName : name

        }
        updateUser(profile)
        .then(()=>{})
        .catch(err => console.log(err.message))
    }
    return (
        <div>
            <div>
                <div className='flex h-[90vh] justify-center items-center mx-6'>
                    <div className='overFlow h-[70vh] bg-[#23B586] w-[450px] rounded-xl shadow-2xl'>
                        <h1 className='text-white text-2xl font-semibold m-2'>Register</h1>
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
                                        name='email'
                                        placeholder="name@flowbite.com"
                                        required={true}
                                        shadow={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="name2"
                                            value="Your Name"
                                        />
                                    </div>
                                    <TextInput
                                        id="name2"
                                        type="text"
                                        name='name'
                                        placeholder="enter name"
                                        required={true}
                                        shadow={true}
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

                                <div className="flex items-center gap-2">
                                    <Checkbox id="agree" />
                                    <Label htmlFor="agree">
                                        I agree with the{' '}
                                        <a
                                           
                                            className="text-blue-600 hover:underline dark:text-blue-500"
                                        >
                                            terms and conditions
                                        </a>
                                    </Label>
                                </div>
                                <Button type="submit">
                                    Register new account
                                </Button>
                            </form>
                            
                        </div>
                        <h1 className='text-white'>Already have an account? <Link className='text-red-700' to='/login'>Login Now</Link></h1>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;