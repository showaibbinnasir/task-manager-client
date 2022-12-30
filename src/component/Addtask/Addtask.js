import { Button, FileInput, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { authContext } from '../Context/AuthProvider';

const Addtask = () => {
    const { user } = useContext(authContext)
    const [loading, isLoading] = useState(false)

    const alltask = useLoaderData();
    const alltasklength = alltask.length;
    const navigate = useNavigate()
    // alert(alltasklength)

    const formData = (event) => {
        isLoading(true)
        event.preventDefault();

        const form = event.target;
        toast.success('wait a second')
        const task_name = form.taskname.value;
        const task_id = "0" + (alltasklength + 1);
        const task_details = form.taskdetails.value;
        const starting_date = form.taskstart.value;
        const ending_date = form.taskend.value;
        const email = user?.email;
        const completion = false;
        const image = form.thumbnail.files[0];
        let formData = new FormData();
        formData.append('image', image)


        fetch("https://api.imgbb.com/1/upload?key=63ff49e7f3a9f352605525982cb4b330", {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                console.log(imageData)

                const formdata = { task_name, task_id, task_details, thumbnail: imageData.data?.url, starting_date, ending_date, completion, email }
                console.log(formdata)
                const formdataTwo = { task_name, task_id, email, thumbnail: imageData.data?.url }
                console.log(formdataTwo)
                fetch('https://task-manager-server-psi.vercel.app/tasks', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(formdata)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })

                fetch('https://task-manager-server-psi.vercel.app/task', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(formdataTwo)
                })
                    .then(res => res.json())
                    .then(data => {
                        form.reset();
                        toast.success("Added Succesfully")
                        isLoading(false)
                        navigate('/')

                    })
            })






    }


    return (
        <div>
            <div className='flex h-[90vh] justify-center items-center mx-6'>
                <div className='h-[70vh] bg-[#23B586] w-[450px] rounded-xl shadow-2xl'>
                    <h1 className='text-white text-2xl font-semibold m-2'>Add Task</h1>
                    <form onSubmit={formData}>
                        <div className='mx-6'>
                            <div className="mb-2 block text-white">
                                <Label
                                    className='text-white'
                                    htmlFor="email3"
                                    value="Task Name:"
                                />
                            </div>
                            <TextInput
                                id="email3"
                                type="text"
                                name='taskname'
                                placeholder="Enter Task name"
                                required={true}
                            />
                        </div>
                        <br />
                        <div className='mx-6'>
                            <div className="mb-2 block text-white">
                                <Label
                                    className='text-white'
                                    htmlFor="email3"
                                    value="Task Details:"
                                />
                            </div>
                            <TextInput
                                id="email3"
                                type="text"
                                name='taskdetails'
                                placeholder="Enter Task details"
                                required={true}
                            />
                        </div>
                        <br />
                        <div className='mx-6'>
                            <div className="mb-2 block text-white">
                                <Label
                                    className='text-white'
                                    htmlFor="email3"
                                    value="Starting Date:"
                                />
                            </div>
                            <TextInput
                                id="email3"
                                type="date"
                                name='taskstart'
                                placeholder="Enter Starting date"
                                required={true}
                            />
                        </div>
                        <br />
                        <div className='mx-6'>
                            <div className="mb-2 block text-white">
                                <Label
                                    className='text-white'
                                    htmlFor="email3"
                                    value="Ending date:"
                                />
                            </div>
                            <TextInput
                                id="email3"
                                type="date"
                                name='taskend'
                                placeholder="Enter ending date"
                                required={true}
                            />
                        </div>
                        <br />
                        <div id="fileUpload">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="file"
                                    value="Upload file"
                                />
                            </div>
                            <input
                                id="file"
                                type="file"
                                name='thumbnail'

                            />
                        </div>

                        <div>
                            {
                                loading ? <div className="text-center mt-5">
                                    <Spinner aria-label="Center-aligned spinner example" />
                                </div> : <div className='flex justify-center mt-5'>
                                    <Button className='bg-[#23B586] shadow-md' type='submit'>Submit</Button>

                                </div>
                            }
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Addtask;