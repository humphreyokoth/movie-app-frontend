import React from 'react';
import './App.css';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login'
import AuthWrapper from './components/AuthWrapper/AuthWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
   
     <Router>
      <Routes>
        <Route path = "/login" element={<Login/>}/>
        <Route  path = "/register" element={<Register/>}/>
        <Route  path = "/auth" element={<AuthWrapper/>}/>
        {/* <PrivateRoute exact component={Dashboard} path="/"/> */}

        
      </Routes>
     </Router>
  ) 
}

export default App;
