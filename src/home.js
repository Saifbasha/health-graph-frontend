import React from 'react'
import HImage from  './Assets/HealthUpdate-Logo.png';
import './Home.css';
import { Link } from 'react-router-dom';

function Home(props) {
  return (
    <div id='body'>
      <div id="back">
        <main>
        <figure>
          <img src={HImage} alt="Health Graph Logo" />
          <figcaption>
            Maintain your Health Graph consistently in normal leavel
          </figcaption>
        </figure>
        <div id="btns">
          <button id="signup"><Link to="/register" className='btn'>Are you new user...?</Link></button>
          <button id="login"><Link to="/login" className='btn'>Login</Link></button>
        </div>
      </main>
      </div>
    </div>
  )

}

export default Home;
