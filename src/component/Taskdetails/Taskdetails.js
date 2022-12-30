import { Button } from 'flowbite-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const Taskdetails = () => {
    const data = useLoaderData();
    console.log(data)
    const handleVerifyBtn = id =>{
        const completion = 'true';
        const verify = {completion};
        fetch(`https://task-manager-server-psi.vercel.app/task/update/${id}`, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(verify)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            
            window.location.reload();
            toast.success('completed successfully')
           
        })
    }
    return (
        <div className='flex h-[90vh] justify-center items-center mx-6'>
            <div className='overFlow h-[70vh] flex items-center justify-center bg-[#23B586] w-[450px] rounded-xl text-white text-xl font-semibold shadow-2xl'>
                <div>
                    <h1 className='text-[#3747d4] text-2xl font-semibold m-2'>{data.task_name}</h1>
                    <h1>{data.task_details}</h1>
                    <h1>Starting date : {data.starting_date}</h1>
                    <h1>Endind date : {data.ending_date}</h1>
                    <h1>Email : {data?.email}</h1>
                    <div className='flex justify-center my-5'>
                        <img src={data.thumbnail} className="w-48 rounded-lg" alt="" />
                    </div>
                    <div className='flex justify-center my-2'>
                        {
                            data?.completion===false ? <Button onClick={()=>{handleVerifyBtn(data._id)}}>Complete</Button> 
                            : <Button disabled className='bg-green-500'>Completed</Button>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Taskdetails;