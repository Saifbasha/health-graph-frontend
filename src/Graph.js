import React, { useState } from 'react'
import { useData } from './UserContextData';
import "./Graph.css";
import BpGraph from './BpGraph';
import SugarGraph from './SugarGraph';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowLoopLeft , faPersonDigging } from '@fortawesome/free-solid-svg-icons';

export default function Graph() {
    let {patient , setPatient}=useData();
    let [bpGraph, setBpGrapgh]=useState(false);
    let [sugarGraph, setSugarGraph]=useState(false);

  return (
    <>
        <article>
            <div id='back'>
                <div id='mirror'>
                    <div id='bp-graph'>
                        <div id='info'>
                            <label for="bpGraph">BP Grapgh:</label>
                            <input type='checkbox' name="bpCheck" checked={bpGraph} onChange={(e)=>{
                                 setBpGrapgh(e.target.checked)
                             }}/>
                        </div>
                        <div id='graph'>
                            {bpGraph && <BpGraph myArray={patient.bp}/>}
                        </div> 
                    </div>
                    <div id='backbtn'>
                         <Link to="/display" id='backlink'>
                            <FontAwesomeIcon icon={faPersonWalkingArrowLoopLeft} id='link'/> <br /> Back
                         </Link> 
                         <Link id='backlink' to="/" onClick={()=>{
                            setBpGrapgh(false)
                            setSugarGraph(false)
                            setPatient(null);
                         }}>
                             <FontAwesomeIcon icon={faPersonDigging} id='link' />  <br /> LogOut
                         </Link>
                    </div>
                    <div id='sugar-graph'>
                          <div id='info'>
                            <label for="sugarGraph">Diabetes Grapgh:</label>
                            <input type='checkbox' name="bpCheck" checked={sugarGraph} onChange={(e)=>{
                                 setSugarGraph(e.target.checked)
                             }}/>
                        </div>
                        <div id='graph'>
                            {sugarGraph && <SugarGraph myArray={patient.diabetes}/>}
                        </div>   
                    </div>
                </div>
            </div>
        </article>
    </>
  )
}
