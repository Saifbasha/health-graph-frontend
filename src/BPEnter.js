import React, { useState } from 'react'
import { useData } from './UserContextData'


export default function BPEnter() {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
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
        const allFilled = Object.values(bp).every(value => value !== "" && value !== null);

        if(allFilled){
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
         setBp({
                "date":formatted,
                "sys_pressure":"",
                "dia_pressure":""
            })
        let data= await Response.json()
        setLoading(false)
        alert(data.msg)
        setPatient(data.data)
        }else{
            alert("please enter the details")
        }
    }

    function submit(){
            UpdateBP()
    }

    let styles={
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-evenly",
        // border:"2px solid #000",
        borderBottom:"2px solid #0f0",
        height:"45%",
        padding:"0px 0px"

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
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-evenly",
        width:"100%"

    }
  return (
    <>
        <div id="bp" style={styles}>
            <h1>Enter BP Record:</h1>
            <div style={inputStyle}>
                <input type='date' name="date" value={bp.date} onChange={EnterNew} max={formatted}/> <br />
                <div style={{display:"flex" , gap:"20px"}}>
                    <input type="number" name="sys_pressure" value={bp.sys_pressure} onChange={EnterNew} required/> <h2>/</h2> <input type="number" value={bp.dia_pressure} name="dia_pressure" onChange={EnterNew} required/>
                </div>
            </div>
            <button onClick={submit} style={btn}>Submit</button>
        </div>
    </>
  )
}
   