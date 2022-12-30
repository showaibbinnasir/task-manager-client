import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { authContext } from '../Context/AuthProvider';
import Task from '../Task/Task';
import Completed from './Completed';

const Completedtask = () => {
    const {user} = useContext(authContext)
    const [loader, setLoader] = useState(false)

    
    const uri = `https://task-manager-server-psi.vercel.app/completedtask?completion=true&email=${user?.email}`
    // const data = useLoaderData();
    const { data: completedtasks = [], refetch, isLoading } = useQuery({
        queryKey: ['completedtasks'],
        queryFn: async () => {
            setLoader(true)
            const res = await fetch(uri)
            const data = await res.json();
            setLoader(false);
            return data;
        }
    })

    if (loader) {
        <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
        </div>
    }
    
    return (
        <>
        {
            loader ? <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
        </div>  : <div className='flex h-[90vh] justify-center items-center mx-6'>
            <div className='overFlow h-[70vh] bg-[#23B586] w-[450px] rounded-xl shadow-2xl'>
                <h1 className='text-white text-2xl font-semibold m-2'>Completed Tasks</h1>
                <div>
                    {
                        completedtasks.map((task, i) => <Completed refetch={refetch} key={i} data={task} ></Completed>)
                    }
                </div>
                
            </div>
        </div>
        }
        </>
    );
};

export default Completedtask;