import React, { useState ,useEffect } from 'react'
import { useData } from './UserContextData';
import "./NewData.css"
import BPEnter from './BPEnter';
import SugarEnter from './SugarEnter';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowLoopLeft , faPersonDigging} from '@fortawesome/free-solid-svg-icons';

export default function NewData() {
    let {patient , setPatient}=useData();
    let [details , setDetails]=useState({})
    let [bpCheck , setBPCheck]=useState(false)
    let [sugarCheck ,setSugarCheck]=useState(false)
    let [loading , setLoading]=useState(true)

    console.log(patient)
    useEffect(()=>{
          setDetails(patient)
      },[])

      let [isEditable, setIsEditable] = useState(false);

      function handleChange(e){
        setDetails(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
      }

     async  function updatePateint(){
      if(loading){
          alert("Loading...!Please wait for a minute")
        }
        let Response=await fetch("https://health-graph-backend.onrender.com/updatePatient",{
             method:"post",
          headers: {
            'Content-Type': 'application/json', // Specify that you're sending JSON data
          },
          body: JSON.stringify(details)
        })

        let data=await Response.json();
        setLoading(false);
        alert(data.msg)
        setPatient(data.data)
        setIsEditable(false)
    }

      function multiFunction(){
        if(!isEditable){
            setIsEditable(true)
        }else{
            updatePateint();
            console.log(details)
        }
      }
  return (
    <>
     {
      console.log(details)
    }
      <div id="body">
        <div id='back'>
        <div id="content">
            <div id="Pcontent">
                <table >
                    <tr>
                        <th>Name:</th>
                        <td><input type='text' name="p_name" value={details.p_name} onChange={handleChange} readOnly={!isEditable} /></td>
                    </tr>
                     <tr>
                        <th>Age:</th>
                        <td><input type='number' name="age" value={details.age} onChange={handleChange} readOnly={!isEditable} /></td>
                    </tr>
                     <tr>
                        <th>Gender:</th>
                        <td id='gender'><input type='radio' name="gender" value="male" onChange={handleChange} readOnly={!isEditable} checked={details.gender==="male"} /> Male
                            <input type='radio' name="gender" value="female" onChange={handleChange} readOnly={!isEditable} checked={details.gender==="female"}/>Female
                        </td>
                    </tr>
                    <tr>
                        <th>Address:</th>
                        <td><input type='text' name="address" value={details.address} onChange={handleChange} readOnly={!isEditable} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2} ><button onClick={multiFunction} id='edit'>{isEditable ? "Save" : "Edit"}</button>  </td>
                    </tr>
                </table>
                <div id='checks'>
                  <h1>Select the Entering Records</h1>
                  <table>
                    <tr>
                      <th>BP:</th>
                      <td><input type='checkbox' name="bpCheck" checked={bpCheck} onChange={(e)=>{
                        setBPCheck(e.target.checked)
                      }}/></td>
                    </tr>
                    <tr>
                      <th>Diabetes:</th>
                      <td><input type='checkbox' name="sugarCheck" checked={sugarCheck} onChange={(e)=>{
                        setSugarCheck(e.target.checked)
                      }}/></td>
                    </tr>
                  </table>
                </div>
            </div>
            <div id='backbtn'>
                  <Link to="/display" id='backlink'>
                     <FontAwesomeIcon icon={faPersonWalkingArrowLoopLeft} id='link'/> <br /> Back
                  </Link>
                  <Link id='backlink' to="/" onClick={()=>{ setPatient(null);  }}>
                    <FontAwesomeIcon icon={faPersonDigging} id='link' />  <br /> LogOut
                  </Link>
            </div>
            <div id='deasesUpdate'>
               {
                bpCheck && <BPEnter />
               }
               {
                sugarCheck && <SugarEnter />
               }
            </div>
        </div>
        </div>
      </div>
    </>
  )
}
   