
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import Root from '.components/Root';


function App() {
  return ( 
    <Router>
      <Routes>
      <Route path="/" element={<h1>Home</h1>}/>
      <Route path="/admin/dashboard" element={<h1>About</h1>}/>
      <Route path="/customer/dashboard" element={<h1>Contact</h1>}/>
      </Routes>
    </Router>

  )
}

export default App
