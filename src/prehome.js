import { signInWithEmailLink } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "./firebase";
import { rtdb } from "./firebase";
import { ref, push, onValue } from "firebase/database";

function Home() {
  const navigate = useNavigate();
  const [Link, setLink] = useState();
  const [Data, setData] = useState();
  const cmail = "";

  useEffect(() => {
    const dataref = ref(rtdb, "users");
    
    const unsub = onValue(dataref, (snap) => {
      const data = snap.val();
      setData(data);
    });

    return ()=>{unsub()}
  }, [Link]);

  if (auth.currentUser === null) {
    console.log("no user");
    return navigate("/");
  }

  const plink = [[Link,Date()]]

  const addLink = () => {
    const email = auth.currentUser.email;
    const sanitizedEmail = email.replace(/\./g, "");
    const userLinksRef = ref(rtdb, `users/${sanitizedEmail}/links`);
    

    // Push the new link value to the user's "links" array
    const newLinkRef = push(userLinksRef, plink);
  };

  

  const signout = async () => {
    try {
      await auth.signOut();
      setData(null);
      navigate("/")
      
      return <div></div>;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>Home</p>
      <button onClick={signout}>Sign out</button>
      <h1>Welcome {auth.currentUser.email}</h1>
      <input
        placeholder="link"
        onChange={(e) => {
          setLink(e.target.value);
        }}
      />
      <button onClick={addLink}>Add Link</button>

      <div>
      {Data &&
        Object.keys(Data).map((key) => (
          <div key={key}>
            <h2>{Data[key].name}</h2>
            <p>{Data[key].dept}</p>
            {Data[key].links &&
              Object.keys(Data[key].links).map((linkKey) => (
                <div key={linkKey}>
                    <a href={Data[key].links[linkKey]} target="_blank" rel="noopener noreferrer">
                    {Data[key].links[linkKey]}
                  </a>
                  {console.log(Data)}
                </div>
              ))}
            {!Data[key].links && <p>No links found.</p>}
          </div>
          
        ))}
    </div>
    
    </div>

    
  );
}
export default Home;
