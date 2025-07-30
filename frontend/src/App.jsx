import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Root from './utils/Root';
import Login from './pages/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Categories from './components/Categories';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoutes requiredRole={['admin']}>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route index element={<h1>Summary of dashboard</h1>} />

          <Route path='categories' element={<Categories />}/>

          <Route path='products' element=
            {<h1>Products</h1>} />

          <Route path='suppliers' element=
            {<h1>Suppliers</h1>} />

          <Route path='orders' element=
            {<h1>Orders</h1>} />

          <Route path='users' element=
            {<h1>Users</h1>} />


        </Route>

        <Route path="/customer/dashboard" element={<h1>customer dashboard</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<p className='font-bold text-3xl mt-20 ml-20'>Unauthorized</p>} />
      </Routes>
    </Router>
  )
}

export default App;





































