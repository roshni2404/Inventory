// // import './App.css'
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// // import Root from './utils/Root';
// // import Login from './pages/Login';
// // import ProtectedRoutes from './utils/ProtectedRoutes';
// // import Dashboard from './pages/Dashboard';
// // import Categories from './components/Categories';
// // import Suppliers from './components/Suppliers';
// // import Products from './components/Products';
// // import Logout from './components/Logout';
// // import Users from './components/Users';

// // function App() { 
// //     return (
// //         <Router>
// //             <Routes>
// //                 {/* Root page */}
// //                 <Route path="/" element={<Root />} />

// //                 {/* ================= ADMIN DASHBOARD ================= */}
// //                 <Route
// //                     path="/admin-dashboard"
// //                     element={
// //                         <ProtectedRoutes requiredRole={['admin']}>
// //                             <Dashboard />
// //                         </ProtectedRoutes>
// //                     }
// //                 >
// //                     <Route index element={<h1>Summary of Admin Dashboard</h1>} />
// //                     <Route path="categories" element={<Categories />} />
// //                     <Route path="products" element={<Products />} />
// //                     <Route path="suppliers" element={<Suppliers />} />
// //                     <Route path="orders" element={<h1>Orders</h1>} />
// //                     <Route path="users" element={<Users />} />
// //                     <Route path="logout" element={<Logout />} />
// //                 </Route>

// //                 {/* ================= CUSTOMER DASHBOARD (PUBLIC) ================= */}
// //                 <Route
// //                     path="/customer-dashboard"
// //                     element={<Dashboard />}
// //                 >
// //                     <Route index element={<Products />} />
// //                     <Route path="products" element={<Products />} />
// //                     <Route path="orders" element={<h1>Customer Orders</h1>} />
// //                     <Route path="profile" element={<h1>Customer Profile</h1>} />
// //                     <Route path="logout" element={<Logout />} />
// //                 </Route>

// //                 {/* ================= LOGIN PAGE ================= */}
// //                 <Route path="/login" element={<Login />} />

// //                 {/* ================= UNAUTHORIZED PAGE ================= */}
// //                 <Route
// //                     path="/unauthorized"
// //                     element={
// //                         <p className="font-bold text-3xl mt-20 ml-20">Unauthorized</p>
// //                     }
// //                 />
// //             </Routes>
// //         </Router>
// //     )
// // }

// // export default App






// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Root from './utils/Root';
// import Login from './pages/Login';
// import ProtectedRoutes from './utils/ProtectedRoutes';
// import Dashboard from './pages/Dashboard';
// import Categories from './components/Categories';
// import Suppliers from './components/Suppliers';
// import Products from './components/Products';
// import Logout from './components/Logout';
// import Users from './components/Users';
// import CustomerProducts from './components/CustomerProducts';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 {/* Root page */}
//                 <Route path="/" element={<Root />} />

//                 {/* ================= ADMIN DASHBOARD ================= */}
//                 <Route
//                     path="/admin-dashboard"
//                     element={
//                         <ProtectedRoutes requiredRole={['admin']}>
//                             <Dashboard />
//                         </ProtectedRoutes>
//                     }
//                 >
//                     <Route index element={<h1>Summary of Admin Dashboard</h1>} />
//                     <Route path="categories" element={<Categories />} />
//                     <Route path="products" element={<Products />} />
//                     <Route path="suppliers" element={<Suppliers />} />
//                     <Route path="orders" element={<h1>Orders</h1>} />
//                     <Route path="users" element={<Users />} />
//                     <Route path="logout" element={<Logout />} />
//                 </Route>

//                 {/* ================= CUSTOMER DASHBOARD (PUBLIC) ================= */}
//                 <Route
//                     path="/customer-dashboard"
//                     element={<Dashboard />}
//                 >
//                     {/* Default index route → sirf text dikhayega */}
//                     <Route index element={<CustomerProducts/>} />

//                     {/* Sidebar se click karne par actual Products component khulega */}
//                     <Route path="products" element={<Products />} />
//                     <Route path="orders" element={<h1>Customer Orders</h1>} />
//                     <Route path="profile" element={<h1>Customer Profile</h1>} />
//                     <Route path="logout" element={<Logout />} />
//                 </Route>

//                 {/* ================= LOGIN PAGE ================= */}
//                 <Route path="/login" element={<Login />} />

//                 {/* ================= UNAUTHORIZED PAGE ================= */}
//                 <Route
//                     path="/unauthorized"
//                     element={
//                         <p className="font-bold text-3xl mt-20 ml-20">Unauthorized</p>
//                     }
//                 />
//             </Routes>
//         </Router>
//     )
// }

// export default App












import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Root from './utils/Root';
import Login from './pages/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Categories from './components/Categories';
import Suppliers from './components/Suppliers';
import Products from './components/Products';
import Logout from './components/Logout';
import Users from './components/Users';
import CustomerProducts from './components/CustomerProducts';
import Orders from './components/Orders';
import Profile from './components/Profile';
import Summary from './components/Summary';

function App() {
    return (
        <Router>
            <Routes>
                {/* Root page */}
                <Route path="/" element={<Root />} />

                {/* ================= ADMIN DASHBOARD ================= */}
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoutes requiredRole={['admin']}>
                            <Dashboard />
                        </ProtectedRoutes>
                    }
                >
                    <Route index element={<Summary />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="products" element={<Products />} />
                    <Route path="suppliers" element={<Suppliers />} />
                    <Route path="orders" element={<h1>Orders</h1>} />
                    <Route path="users" element={<Users />} />
                    <Route path="logout" element={<Logout />} />
                </Route>

                {/* ================= CUSTOMER DASHBOARD (PUBLIC) ================= */}
                <Route
                    path="/customer-dashboard"
                    element={<Dashboard />}
                >
                    <Route index element={<CustomerProducts />}></Route>  
                    <Route path="orders" element={< Orders/>}></Route>
                    <Route path="logout" element={<Logout />}></Route>
                </Route> 
                 <Route path="profile" element={<Profile />}></Route>
             
            
        
                    
                   

                {/* ================= LOGIN PAGE ================= */}
                <Route path="/login" element={<Login />} />

                {/* ================= UNAUTHORIZED PAGE ================= */}
                <Route
                    path="/unauthorized"
                    element={
                        <p className="font-bold text-3xl mt-20 ml-20">Unauthorized</p>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App;






