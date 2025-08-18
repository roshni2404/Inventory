// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import { Outlet } from 'react-router-dom';
// const Dashboard = () => {
//     return (
//         <div>
//             <div className='flex'>
//                 <Sidebar />
//                 <div className='flex-1 ml-16 md:ml-64 bg-gray-100 min-h-screen'>
//                     <Outlet />
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default Dashboard






import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 ml-64">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

