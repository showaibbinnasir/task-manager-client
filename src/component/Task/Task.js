import { Button } from 'flowbite-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Task = ({ data, refetch }) => {
    const navigate = useNavigate();
    const navigation = id => {
        navigate(`/task/${id}`)
    }
    const handleDeleteBtn = id =>{
        fetch(`https://task-manager-server-psi.vercel.app/task?id=${id}`, {
            method : 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            toast.success("Deleted Successfully")
            refetch();
        })
    }
    return (
        <div className='bg-white mx-3 my-2 p-2 rounded-lg justify-center items-center'>
            <div className='flex justify-between items-center'>
                <img className='w-12 rounded-full' src={data.thumbnail} alt="" />
                <h1>{data.task_name}</h1>
                <div className='flex'>
                    <Button onClick={() => { navigation(data.task_id) }} className='bg-[#23B586] shadow-md scale-75'>Details</Button>
                    <Button onClick={()=> handleDeleteBtn(data._id)} className='bg-red-500 scale-50'>Delete</Button>
                </div>

            </div>
        </div>
    );
};

export default Task;