import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Addtask from "../component/Addtask/Addtask";
import Completedtask from "../component/Completedtask/Completedtask";
import Home from "../component/Home/Home";
import Login from "../component/Login/Login";
import PrivateRouter from "../component/PrivateRouter/PrivateRouter";
import Register from "../component/Register/Register";
import Taskdetails from "../component/Taskdetails/Taskdetails";
import Default from "../default/Default";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Default></Default>,
        children: [
            {
                path: '/',
                element : <PrivateRouter><Home></Home></PrivateRouter>
            },
            {
                path : '/addtask',
                element: <PrivateRouter><Addtask></Addtask></PrivateRouter>,
                loader : ()=>fetch('https://task-manager-server-psi.vercel.app/alltasks')
            },
            {
                path : '/task/:id',
                element: <PrivateRouter><Taskdetails></Taskdetails></PrivateRouter>,
                loader : ({params})=> fetch(`https://task-manager-server-psi.vercel.app/task?task_id=${params.id}`)
            },
            {
                path : '/completedtask',
                element : <PrivateRouter><Completedtask></Completedtask></PrivateRouter>,
                loader : ()=> fetch('https://task-manager-server-psi.vercel.app/completedtask?completion=true')
            },
            {
                path : '/login',
                element: <Login></Login>
            },
            {
                path : '/register',
                element: <Register></Register>
            }
        ]
    }
])

export default router;