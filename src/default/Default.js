import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigationbar from '../component/Navigationbar/Navigationbar';

const Default = () => {
    return (
        <div>
            <Navigationbar></Navigationbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Default;