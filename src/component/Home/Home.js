import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../Context/AuthProvider';
import Task from '../Task/Task';

const Home = () => {
    // const [data, setData] = useState([])
    // useEffect(()=>{
    //     fetch('https://task-manager-server-psi.vercel.app/tasks')
    //     .then(res => res.json())
    //     .then(data => setData(data))
    // },[])
    const [loader, isLoader] = useState(false)

    const { user } = useContext(authContext)
    const uri = `https://task-manager-server-psi.vercel.app/tasks?email=${user?.email}`

    const { data: alltask = [], refetch, isLoading } = useQuery({
        queryKey: ['alltask'],
        queryFn: async () => {
            isLoader(true)
            const res = await fetch(uri)
            const data = await res.json();
            isLoader(false)
            return data;
        }
    })

    if (isLoading) {
        <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
        </div>
    }
    return (
        <>
            {
                loader ? <div className="text-center">
                    <Spinner aria-label="Center-aligned spinner example" />
                </div> : <div className='flex h-[90vh] justify-center items-center mx-6'>
                    <div className='overFlow h-[70vh] bg-[#23B586] w-[450px] rounded-xl shadow-2xl'>
                        <h1 className='text-white text-2xl font-semibold m-2'>My Tasks</h1>

                        <div>
                            {
                                alltask.map((task, i) => <Task refetch={refetch} key={i} data={task} ></Task>)
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Home;