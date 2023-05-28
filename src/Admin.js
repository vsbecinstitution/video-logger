import Adminlogin from "./Adminlogin";
import { useEffect, useState } from "react";
import { auth ,rtdb} from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { set } from "@firebase/database";
import Card from "./Card.js"
import logo from "./srcphotos/logo.png"
import "./Admin.css"
import Post from "./Post"
import SubtitleGenerator from './SubtitleGenerator';

import { getDatabase, ref, orderByChild, equalTo, onValue } from "firebase/database";


const Admin = () => {
  const navigate = useNavigate();
  const [adminmail, setAdminmail] = useState();
  const [adminstate, setAdminstate] = useState(false);
  const [batch,setBatch] = useState();
  const [department,setDepartment] = useState();
  const [preview,setPreview] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // New state for selected user
  const [isCardView, setIsCardView] = useState(true);


  useEffect(() => {
    const check = onAuthStateChanged(auth, (user) => {
      if (!user) {
        return navigate("/adminlogin");
      }
      if (user.email !== "admin@vsbec.com") {
        alert("you are not a admin");
        navigate("/adminlogin");
      }
    });
  });
  const toggleView = () => {
    setIsCardView(!isCardView);
  };

  const signout = async () => {
    try {
        await signOut(auth);
        setAdminmail(null);
    setAdminstate(false);
    setBatch(null);
    setDepartment(null);
    setPreview([]);
    setSelectedUser(null);
      
      navigate("/");

      return <div></div>;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (batch && department) {
      const userRef = ref(rtdb, "users");
      const all = onValue(userRef, (snap) => {
        const data = snap.val();
        console.log(data)

        const filteredData = Object.entries(data).filter(
          (doc) => doc[1].batch === batch && doc[1].department === department
        );

        console.log("filer")
        console.log(filteredData) 

        const temp = filteredData.map((doc) => [doc[1].name, doc[1].email]);

        setPreview(temp);
      });
      console.log(preview)
    }
  }, [batch, department]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };    

  

  return (
    <div id = "admincontainer">
      <div id = "adminnavbar">
        <div id="homelogodiv">
          <img id = "homelogo" src = {logo}/>
          <p id= "logotitle" > <strong id = "homestrong">VSB</strong> Communication Video Logger Admin View</p>
        </div>
        <div id = "adminformsection">
      <div id = "adminformdiv">
          <form id = "adminform" >
              <select id = "admininput" onChange={(e) =>{setBatch(e.target.value)}} >
                  <option>Batch</option>
                  <option value = "Product" >Product</option>
                  <option value = "Service" >Service</option>
                  <option value = "Pega" >Pega</option>
              </select>
              <select id = "admininput" onChange= {(e)=>{
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
              <button id = "admininputbtn" type="submit">Submit</button>
          </form>
      </div>
      </div>
      
        <div>
        <button id = "changetab" onClick={toggleView}>Change Tab</button>
        <button id = "homesignout" onClick={signout}>Sign out</button>
        </div>

      </div>
      
      {/* <div>
        {preview.map((item, index) => (
          <div key={index}>
            <h1>{item[0]}</h1>
            <p>{item[1]}</p>
          </div>
        ))}
      </div> */}

      <div >
      
        {isCardView ? (
          <div id = "adminwrapper"><div id = "adminsidenav">
          <div>
          {preview.map((item, index) => (
            <div
              key={index} 
              onClick={() => handleUserClick(item)} // Set selected user on click
              className={`user-item ${selectedUser === item ? "active" : ""}`} // Add "active" class if user is selected
            >
              <h3 id = "adminh3" >{item[0]}</h3>
              <p>{item[1]}</p>
              <hr></hr>
            </div>
          ))}
        </div>
        
          </div>
          <div id = "admincardview">
          <Card user={selectedUser} />
          </div></div>
        ) : (
          <Post user={selectedUser} />
        )}
      </div>
      
      
    </div>
  );
};

export default Admin;
