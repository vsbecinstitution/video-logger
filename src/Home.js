import { signInWithEmailLink } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "./firebase";
import { rtdb } from "./firebase";
import { ref, push, onValue, set } from "firebase/database";
import "./Home.css";
import logo from "./srcphotos/logo.png";

function Home() {
  const navigate = useNavigate();
  const [Link, setLink] = useState();
  const [Data, setData] = useState(null);
  const [Usermail, setUsermail] = useState();
  const [Name, setName] = useState();
  const [videolink, setVideolink] = useState();
  const [todaytopic, setTodaytopic] = useState("");
  const [owntopic, setOwntopic] = useState("");

  useEffect(() => {
    if (auth.currentUser === null) {
      console.log("no user");
      return navigate("/");
    }
    const getLinks = async () => {
      const email = auth.currentUser.email;
      setUsermail(email);
      const sanitizedEmail = email.replace(/\./g, "");
      const userLinksRef = ref(rtdb, `users/${sanitizedEmail}/links`);
      const userNameRef = ref(rtdb, `users/${sanitizedEmail}`);
      const takename = onValue(userNameRef, (snap) => {
        const data = snap.val();
        setName(data.name);
      });

      const topicref = ref(rtdb, "topics");
      const taketopic = onValue(topicref, (snap) => {
        const topic = snap.val();
        Object.keys(topic).map((key, value) => {
          return setTodaytopic(topic[key]);
        });
      });

      const unsub = onValue(userLinksRef, (snap) => {
        const data = snap.val();
        if (data != null) {
          try {
            setData(
              Object.keys(data)
                .map((doc) => data[doc])
                .reverse()
            );
          } catch (error) {
            console.log(error);
          }
        }
      });
    };

    getLinks();
  }, [auth]);

  let final = todaytopic;

  if (owntopic !== "") {
    final = owntopic;
  } else {
    final = todaytopic;
  }

  const plink = [[Link, Date(), "No Feedback", final]];

  const addLink = () => {
    const email = auth.currentUser.email;
    const sanitizedEmail = email.replace(/\./g, "");
    const userLinksRef = ref(rtdb, `users/${sanitizedEmail}/links`);
    const newLinkRef = push(userLinksRef, plink);
    alert("Link Added Successfully!");
  };

  const signout = async () => {
    try {
      await auth.signOut();
      setData(null);
      navigate("/");

      return <div></div>;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="homecontainer">
      <div id="navbar">
        <div id="homelogodiv">
          <img id="homelogo" src={logo} />
          <p id="logotitle">
            {" "}
            <strong id="homestrong">VSB</strong> Communication Video Logger
          </p>
        </div>
        <div>
          <button id="homesignout" onClick={signout}>
            Sign out
          </button>
        </div>
      </div>

      <div id="homewelcome">
        <h1 id="homewelcomeh1">Welcome {Name}!</h1>
      </div>
      <div id="mpmamdiv">
        <h1 id="mpmamwords">Consistency is the Key</h1>
        <div>
          <ul id="ulist">
            <li>1) Be concise and avoid fillers</li>
            <li>2) Focus on key achievements</li>
            <li>3) Be confident and assertive</li>
            <li>4) Tailor it to the situation</li>
            <li>5) Prepare and Practice</li>
          </ul>
        </div>
        <p id="mpmam">- Mohana Priya Mam</p>
      </div>
      <div id="homeinputdiv">
        <div id="hometodaytopicdiv">
          <h3 id="todaytitleh3">Upload Link for Todays Topic </h3>
          <p id="hometodaytopicp">"{todaytopic}"</p>
        </div>

        <div>
          <input
            id="todaytitleinput"
            placeholder="Enter the video Drive link with get link option in Drive"
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <button id="todaytitlebtn" onClick={addLink}>
            Add Link
          </button>
        </div>
      </div>
      <div>
        <p>or</p>
      </div>
      <div id="homeowninputdiv">
        <div>
          <h3 id="owntitleh3">Upload Video with own Topic</h3>
        </div>

        <div id="homeowntitlediv">
          <input
            onChange={(e) => {
              setOwntopic(e.target.value);
            }}
            id="owntitleinput"
            placeholder="Enter Video Title"
          />
          <input
            id="owntitleinput"
            placeholder="Enter the video Drive link with get link option in Drive"
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <button id="owntitlebtn" onClick={addLink}>
            Add Link
          </button>
        </div>
      </div>
      <div>
        <h1 id="previousvideosh1">Previous Videos</h1>
      </div>
      <div id="homeprevious">
        {Data &&
          Data.map((doc, index) => {
            const videoLink = doc[0][0];
            const videoIdRegex = /\/d\/([a-zA-Z0-9_-]+)\//;
            const match = videoLink.match(videoIdRegex);
            const videoId = match ? match[1] : null;

            if (videoId === null) {
              return;
            }

            return (
              <div className="homecard" key={index}>
                <iframe
                  id="homevideoframe"
                  src={`https://drive.google.com/file/d/${videoId}/preview`}
                  title="Google Drive Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <h3 id="homevideoh3">{doc[0][3]}</h3>
                <p>{doc[0][1]}</p>
                <p>
                  <strong>Feedback : </strong>
                  {doc[0][2]}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default Home;
