import {Link,  useNavigate} from "react-router-dom"
import {useState ,useEffect} from 'react'
import {createUserWithEmailAndPassword ,onAuthStateChanged} from 'firebase/auth'
import {auth ,rtdb} from "./firebase"
import {ref,push,set} from "firebase/database"
import "./Register.css"

function Register(){
  const [newEmail,setNewEmail] = useState();
  const [newPassword,setNewPassword] = useState();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [Batch,setBatch] = useState("");
  const [Year,setYear] = useState();
  const [registernumber,setRegisternumber] = useState();

  const [Usermail,setUsermail] = useState();
  const navigate = useNavigate();
  

  const createuser =async (e)=>{
    e.preventDefault();
    
    
    

    try{
      await createUserWithEmailAndPassword(auth,newEmail,newPassword);
      const sanitizedEmail = auth.currentUser.email.replace(/\./g, '');
      const newData = {
        email: newEmail,
        name: name,
        registerno:registernumber,
        department: department,
        links: {},
        batch:Batch,
        year:Year
      };
      const newDataRef = set(ref(rtdb, `users/${sanitizedEmail}/`), newData);
      if (newEmail === 'admin@vsbec.com') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
      
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div id= "registerdiv">

    
    <div id = "registerformdiv">
      <div>
      <h1 id="registerh1">
      Register
    </h1>
      </div>
      <form id="registerform" onSubmit = {createuser}>
      <input id = "registerinput" placeholder = "Enter Email" onChange = {(e)=>{
        setNewEmail(e.target.value);
      }} />
      <input id = "registerinput" type = "password" placeholder  = "Enter Password" onChange = {(e)=>{
        setNewPassword(e.target.value);
      }} />
      <input id = "registerinput" placeholder = "Enter Name" onChange = {(e)=>{
        setName(e.target.value);
      }} />
      <input id = "registerinput" placeholder="Enter Register Number eg.(922520106170)" onChange = {
        (e)=>{
          setRegisternumber(e.target.value);
        }
      }/>
      <select id = "registerinput" onChange={(e)=>{
        setDepartment(e.target.value)
      }}>
      <option value = "" >Department</option>
        <option value = "ECE" >ECE</option>
        <option value = "EEE" >EEE</option>
        <option value = "CSE" >CSE</option>
        <option value = "IT" >IT</option>
        <option value = "CIVIL" >CIVIL</option>
        <option value = "MECH" >MECH</option>
        <option value = "BIOMED" >BIOMED</option>
        <option value = "BIOTECH" >BIOTECH</option>

      </select>
      <select id = "registerinput"  onChange={(e)=>{
        setBatch(e.target.value)
      }}>
            <option value="">Batch</option>
            <option value="Product">Product</option>
            <option value="Service">Service</option>
            <option value="Pega">Pega</option>
          </select>
        <select id = "registerinput" onChange={(e)=>{
          setYear(e.target.value)
        }}>
          <option value = "">Passout Year</option>
          <option value = "2024">2024</option>
          <option value = "2025">2025</option>
          <option value = "2026" >2026</option>
        </select>
      <button id=  "registerbtn">Register</button>
      <Link id = "registerlink" to = "/">Already a user Login</Link>
      </form>
    </div>

    </div>
  )

}

export default Register