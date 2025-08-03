import { useEffect, useState } from 'react';
import './App.css';
import Display from './Display.js';
import Graph from './Graph.js';
import Home from "./home.js"
import Login from './Login.js';
import NewData from './NewData.js';
import Register from './Register';

import { BrowserRouter, Routes,Route } from 'react-router-dom';

function App() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (
      /mobile|android|iphone|ipad|tablet|ipod|blackberry|phone/i.test(userAgent)
    ) {
      setIsDesktop(false);
    }
  }, []);
   return(
    <div>
      {
        isDesktop ? ( 
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/display" element={<Display />} />
              <Route path='/edit' element={<NewData />} />
              <Route path='/graph' element={<Graph />} />
            </Routes>
          </BrowserRouter>
        ):( 
        <h2 style={{ color: "red", textAlign: "center" }}>
          Device Not Supported. Please use Desktop or Laptop.
        </h2>
        )
      }
    </div>
   );
  
}
export default App;
