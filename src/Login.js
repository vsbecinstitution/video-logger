import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import logo from "../src/srcphotos/logo.png";
import "./Login.css";

function Login() {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === "admin@vsbec.com") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const signout = async () => {
    try {
      await auth.signOut();

      navigate("/");

      return <div></div>;
    } catch (error) {
      console.log(error);
    }
  };

  const validate = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, Email, Password);
    } catch (error) {
      alert("User Name or Password not valid");

      return navigate("/");
      console.log(error);
    }
    
    console.log(auth.currentUser.email);
  };

  return (
    <div id="container">
      <div id="logodiv">
        <img id="logo" src={logo} />
      </div>
      <div id="formdiv">
        <h1 id="loginh1">Login</h1>
        <form id="loginform" onSubmit={validate}>
          <input
            id="logininput"
            className="input"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="logininput"
            type="password"
            placeholder=" Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button id="loginbutton" type="submit">
              Login
            </button>
          </div>
          <Link className="link" to="/register">
            Register
          </Link>
          <Link className="link" to="/adminlogin">
            Admin Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
