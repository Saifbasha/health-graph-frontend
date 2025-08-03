import React, { createContext, useContext, useEffect, useState } from 'react'

const data=createContext();
export default function UserContextData({children}) {
    let [patient , setPatient]=useState(()=>{
        let patientData=JSON.parse(localStorage.getItem('patient'));
        return patientData?patientData:{}
    });
    useEffect(()=>{
        if (patient) {
      localStorage.setItem('patient', JSON.stringify(patient));
    } else {
      localStorage.removeItem('patient'); // optional: clean up on logout
    }
  }, [patient]
    )
  return (
    <>
    <data.Provider value={{patient , setPatient}}>
        {children}
    </data.Provider>
    </>
  )
};

export const useData=()=>useContext(data);
