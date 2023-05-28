import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import logo from "./srcphotos/logo.png"
import "./Adminlogin.css"


const Adminlogin = () => {
  const navigate = useNavigate();
  const [adminmail, setAdminmail] = useState();
  const [adminpassword, setAdminpassword] = useState(false);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        return;
      }
      if (user.email === "admin@vsbec.com") {
        navigate("/admin");
      }
    });
  });

  const validateadmin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, adminmail, adminpassword);

      if (adminmail === "admin@vsbec.com") {
        navigate("/admin");
      }
    } catch (error) {
      alert("Username or password is incorrect");
      navigate("/adminlogin");
    }

    return;
  };

  return (
    <div id = "adminlogincontainer" >
      <div id = "adminloginlogodiv" >
        <img id = "adminloginlogo" src = {logo}/>
      </div>
      <div id = "adminloginformdiv" >
        
      <form id = "adminloginform" onSubmit={validateadmin}>
      <h1 id = "adminloginh1">Admin Login</h1>
        <input
          id = "adminlogininput"
          onChange={(e) => {
            setAdminmail(e.target.value);
          }}
          placeholder="Enter Email"
        />
        <input
        placeholder = "Enter Password"
        type = "password"
        id = "adminlogininput"
          onChange={(e) => {
            setAdminpassword(e.target.value);
          }}
        />
        <button id = "adminloginbtn" type="submit">Login</button>
      </form>
      </div>
    </div>
  );
};

export default Adminlogin;
