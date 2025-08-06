import React, { useState } from 'react'
import { useData } from './UserContextData';


export default function SugarEnter() {
      const today = new Date();
        const formatted = today.toISOString().split('T')[0];
        let [loading , setLoading]=useState(true)
        let [sugar ,setSugar]=useState({
            "date":formatted,
            "beforeFood":"",
            "afterFood":""
        })
        let {patient , setPatient}=useData();
        let id=patient.pid;
    function EnterNewSugar(e){
        setSugar(prev=>({
            ...prev ,
            "date":formatted,
            [e.target.name]:e.target.value
        }))
    }

    async function  updateSugar() {
        const allFilled = Object.values(sugar).every(value => value !== "" && value !== null);
        if(allFilled){
            if(loading) {
        alert("Loading.....!Please wait for a minute")
      }
        let Response=await fetch(`https://health-graph-backend.onrender.com/updateDiabete/${id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
                },
            body:JSON.stringify(sugar)
        })
         setSugar({
                 "date":formatted,
            "beforeFood":"",
            "afterFood":""
            })
        let data=await Response.json()
        setLoading(false)
         alert(data.msg)
        setPatient(data.data)
        }else{
            alert("please enter all the details")
        }
    }

    function submit(){
            updateSugar()
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
  return (
    <>
        <div style={styles}>
            <h1>Enter Diabetes Record</h1>
            <table>
                <tr>
                    <td colSpan={2} style={{textAlign:"center"}}>
                        <input type='date' name="date" value={sugar.date} onChange={EnterNewSugar} max={formatted}/>
                    </td>
                </tr>
                <tr>
                    <th>Before Food :</th>
                    <td><input type='number' value={sugar.beforeFood} name="beforeFood" onChange={EnterNewSugar} required/></td>
                </tr>
                <tr>
                    <th>After Food :</th>
                    <td><input type='number' value={sugar.afterFood} name="afterFood" onChange={EnterNewSugar} required/></td>
                </tr>
                <tr>
                    <td colSpan={2} style={{textAlign:"center"}}><button onClick={submit} style={btn}>Submit</button></td>
                </tr>
            </table>
        </div>
    </>
  )
}
