import React, { useState } from 'react'
import { useData } from './UserContextData'
import Display from './Display';

export default function BPEnter() {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    const [clicked, setClicked] = useState(false);
    let [loading , setLoading]=useState(true)
    let [bp ,setBp]=useState({
        "date":formatted,
        "sys_pressure":"",
        "dia_pressure":""
    })
    let {patient , setPatient}=useData();
    let id=patient.pid;
    function EnterNew(e){
        setBp(pre=>({
            ...pre,
            [e.target.name]:e.target.value
        }))
    }

    async function UpdateBP() {
        if(loading) {
        alert("Loading.....!Please wait for a minute")
      }
        let Response=await fetch(`https://health-graph-backend.onrender.com/updateBp/${id}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(bp)
        })
        let data= await Response.json()
        setLoading(false)
        alert(data.msg)
        setPatient(data.data)
    }

    function submit(){
        if(!clicked){
            UpdateBP()
            setClicked(true)
        }
    }

    let styles={
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-evenly",
        // border:"2px solid #000",
        height:"50%"
    }

    let btn={
        height:"2.5rem",
        width:"10rem",
        fontSize:"18px",
        color:"#fff",
        backgroundColor:"rgb(0,0,255)",
        border:"none",
        cursor:"pointer",
        borderRadius:"0.5rem"
    }

    let inputStyle={
        display:"flex",
        alignItems:"center",
        justifyContent:"space-evenly",
        width:"100%"

    }
  return (
    <>
        <div id="bp" style={styles}>
            <h1>Enter BP Record:</h1>
            <div style={inputStyle}>
                <input type="number" name="sys_pressure" onChange={EnterNew} required/> <h2>/</h2> <input type="number" name="dia_pressure" onChange={EnterNew} required/>
            </div>
            <button onClick={submit} style={btn}>Submit</button>
        </div>
    </>
  )
}
