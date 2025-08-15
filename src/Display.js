import React, { useEffect, useState } from 'react';
import "./Display.css"
import HImage from  './Assets/HealthUpdate-Logo.png';
import { Link } from 'react-router-dom';
import { useData } from './UserContextData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPersonDigging} from '@fortawesome/free-solid-svg-icons';

export default function Display() {   

  let {patient , setPatient}=useData();
  let [details , setDetails]= useState({});
  let [BP , setBP]=useState([]);
  let [sugar , setSugar]=useState([])

  useEffect(()=>{
      setDetails(patient)
      setBP(patient.bp)
      setSugar(patient.diabetes)
  },[])

  
    if(!details){
      return (
        <div id="body">
          <div id="main2">
            <h2>Loading....🤦‍♂️🤦‍♂️</h2>
          </div>
        </div>
      )
    }
  return (
    <>
      <div id="body">
        <div id='back'>
        <div id='main2'>
          <figure>
                <img src={HImage} alt="Health Graph Logo" />
                <figcaption>
                    Maintain your Health Graph consistently in normal leavel
                </figcaption>
            </figure>
            <div id='backbtn'>
              <Link id='backlink' to="/" onClick={()=>{ setPatient(null);  }}>
                <FontAwesomeIcon icon={faPersonDigging} id='link' />  <br /> LogOut
              </Link>
            </div>
            <div id='details'>
              <h1>Pateint Details</h1>
               <table border={1}>
                   <tr>
                      <th> Name: </th>
                      <td>{details.p_name}</td>
                   </tr>
                   <tr>
                      <th> Age: </th>
                      <td>{details.age}</td>
                   </tr>
                   <tr>
                      <th> Gender: </th>
                      <td>{details.gender}</td>
                   </tr>
                   <tr>
                      <th> Address: </th>
                      <td>{details.address}</td>
                   </tr>
                  {
                    BP.length!=0 &&
                    <tr>
                      <th> Last Recorded BP: </th>
                      <td> 
                        <p>{BP[BP.length-1].sys_pressure +" / " + BP[BP.length-1].dia_pressure}</p>
                      </td>
                   </tr>
                  }
                  {
                    sugar.length!=0 &&
                    <tr>
                      <th> Last Recorded Diabetes: </th>
                      <td> <p>Before Food: {sugar[sugar.length-1].beforeFood} <br /> Afer Food:{sugar[sugar.length-1].afterFood}</p>
                      </td>
                   </tr>
                  }
               </table>
               <div id='link'>
                   <button><Link to="/edit" className='links'>New Data</Link></button>
                    <button><Link to='/graph' className='links'>Graph</Link></button>     
               </div>
            </div>
        </div>
        </div>
      </div>
    </>
  )
}
  