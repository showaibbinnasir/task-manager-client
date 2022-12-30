import { Button, Dropdown, Navbar } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../Context/AuthProvider';

const Navigationbar = () => {
    const { user, logOut } = useContext(authContext);

    const handleLogOut = ()=>{
        logOut();
        
    }
    return (
        <div>
            <Navbar
                fluid={true}
                rounded={true}
                className=' bg-[#23B585]'
            >
                <Navbar.Brand>

                    <span className="self-center whitespace-nowrap text-xl text-white font-semibold dark:text-white">
                        Task Manager
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">

                    <Dropdown
                        
                        label={user?.email ? user?.displayName : 'Login'}
                        dismissOnClick={false}
                    >

                        {
                            user?.email ? <>
                            <Dropdown.Item>
                                <Link>{user?.email}</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link onClick={handleLogOut}>Logout</Link>
                            </Dropdown.Item>
                        </> : 
                        <>
                        <Dropdown.Item>
                            <Link to='/login'>Login</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to='/register'>Register</Link>
                        </Dropdown.Item>
                    </>
                        }
                    </Dropdown>

                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse className='bg-[#23B586]'>
                    <Link to='/addtask' className='text-white mt-2 lg:mt-1 border lg:border-none'>
                        Add Task
                    </Link>
                    <Link to='/' className='text-white mt-2 lg:mt-1 border lg:border-none'>
                        My Tasks
                    </Link>
                    <Link to='/completedtask' className='text-white mt-2 lg:mt-1 border lg:border-none'>
                        Completed Task
                    </Link>

                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navigationbar;