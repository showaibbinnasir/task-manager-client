import { Button } from 'flowbite-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Completed = ({data}) => {
    const navigate = useNavigate();
    const navigation = id => {
        navigate(`/task/${id}`)
    }
    return (
        <div className='bg-white mx-3 my-2 p-2 rounded-lg justify-center items-center'>
            <div className='flex justify-between items-center'>
                <img className='w-12 rounded-full' src={data.thumbnail} alt="" />
                <h1>{data.task_name}</h1>
                <div className='flex'>
                    <Button onClick={() => { navigation(data.task_id) }} className='bg-[#23B586] shadow-md scale-75'>Details</Button>
                    
                </div>

            </div>
        </div>
    );
};

export default Completed;