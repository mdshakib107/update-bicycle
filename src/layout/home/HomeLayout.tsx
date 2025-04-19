//import React from 'react';
import Home from '../../pages/home/Home';
import Footer from '../../components/shared/Footer';
const HomeLayout = () => {
    return (
        <div className='w-full space-y-16'>
            <Home/>
            <Footer/>
        </div>
    );
};

export default HomeLayout;