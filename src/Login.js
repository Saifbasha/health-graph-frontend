 import React, { useState } from 'react'
 import HImage from  './Assets/HealthUpdate-Logo.png';
 import { Link, useNavigate } from 'react-router-dom';
 import "./Login.css"
import { useData } from './UserContextData';


 
 export default function Login() {

    let navigate=useNavigate();

    const [phone , setPhone]= useState(0);
    let {setPatient}=useData();
    let [loading , setLoading]=useState(true)

    const loginPatient=(event)=>{
        event.preventDefault();

        if(phone==0){
            alert("Enter your registered Mobile Number")
        }else{
            confirmation();
        }
    }
 
    async function confirmation() {  
      if(loading) {
        alert("Loading.....!Please wait for a minute")
      }  
      let Response=await  fetch(`https://health-graph-backend.onrender.com/loginPatient/${phone}`,
            {
                method:"post",
                headers: {
                  'Content-Type': 'application/json', // Specify that you're sending JSON data
                },
              })
          let data=await Response.json();
          setLoading(false)
          alert(data.msg)
          setPhone(1)
          setPatient(data.data)
          navigate("/display")
          
    }

   return (
     <article>
        <div id='back'>
          <div id='main1'>
            <figure>
                <img src={HImage} alt="Health Graph Logo" />
                <figcaption>
                    Maintain your Health Graph consistently in normal leavel
                </figcaption>
            </figure>
            <div id='form'>
            <form>
                <table cellPadding='20'>
                    <tbody>
                        <tr>
                            <td><label htmlFor='phone'>Phone:</label></td>
                            <td><input type="tel" name="Phone" id='phone' className='input' onChange={(e)=>{setPhone(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td colSpan='2' className='btn'><button onClick={loginPatient} id='loginbtn'>Login <submit/></button></td>
                        </tr>
                        <tr>
                            <td colSpan='2' className='btn'><button id='signupbtn'><Link to="/register" className='link'>Create Account</Link></button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
            </div>
        </div>
        </div>
     </article>
   )
 }
 