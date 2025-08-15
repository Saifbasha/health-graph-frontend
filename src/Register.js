import React, { useState } from 'react'
import HImage from  './Assets/HealthUpdate-Logo.png';
import "./Register.css"
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {

  var register;
  let navigate=useNavigate();


  const [formData,setFormData]=useState({ })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);

    if(formData.Patientname==""){
      alert("Enter Patient Name")
    }else if(formData.Age==""){
      alert("Enter Patient's Age")
    }else if(formData.Phone==""){
      alert("Enter Phone Number")
    }else if(formData.Gender==""){
      alert("Enter Gender")
    }else if(formData.address==""){
      alert("Enter Address")
    }else {
      register={
        "p_name":formData.Patientname,
        "age":formData.Age,
        "number":formData.Phone,
        "gender":formData.Gender,
        "address":formData.address
      }
      console.log(register)
  

      fetch("https://health-graph-backend.onrender.com/savePatient",
        {
          method:"post",
          headers: {
            'Content-Type': 'application/json', // Specify that you're sending JSON data
          },
          body: JSON.stringify(register)
        }
      ).then((Response)=>{
        return  Response.json();
      }).then((data)=>{
        console.log(data)
        if(data.statusCode==202){
            alert(data.msg)
            navigate("/login")
        }else{
          alert("something went wrong")
        }
      })
    }
  };  
 
  
  return (
    <section>
       <div id='back'>
        <div id='main1'>
      <figure>
          <img src={HImage} alt="Health Graph Logo" />
          <figcaption>
            Maintain your Health Graph consistently in normal leavel
          </figcaption>
        </figure>
        <div id='forms'>
            <form>
                <table cellPadding='20'>
                    <tbody>
                    <tr>
                        <td><label htmlFor='pn'>PatientName:</label></td>
                        <td><input type="text" name="Patientname" id='pn' className='input'  onChange={handleChange }  /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='age'>Age:</label></td>
                        <td><input type="number" name="Age" id='age' className='input'  onChange={handleChange}  /></td>
                    </tr>
                    <tr>
                        <td><label>Gender:</label></td>
                        <td id='gender'><input type="radio" name="Gender" value="male" id='male' onChange={handleChange}/>Male 
                        <input type="radio" name="Gender" value="female" id='female' onChange={handleChange}/>Female</td>
                    </tr>
                    <tr>
                        <td><label htmlFor='phone'>Phone:</label></td>
                        <td><input type="tel" name="Phone" id='phone' className='input'  onChange={handleChange}  /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='address'>Address:</label></td>
                        <td><input type='text' name='address' id='address' className='input'  onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td colSpan='2' className='btn'><button onClick={handleSubmit} id='submitbtn'>Submit</button></td>
                    </tr>
                    <tr>
                        <td colSpan='2' className='btn'><button id='accountbtn'><Link to="/login" className='link'>Already have account...!</Link></button></td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </div>
    </div>
    </section>

  )
}
