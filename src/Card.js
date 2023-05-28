import { useState, useEffect } from "react";
import { rtdb } from "./firebase";
import { onValue, ref } from "firebase/database";
import "./Card.css";
import { auth } from "./firebase";
import { push, set, update } from "firebase/database";

import SubtitleGenerator from "./SubtitleGenerator";

const Card = (props) => {
  const [Data, setData] = useState();
  const [feedback, setFeedback] = useState();
  useEffect(() => {
    if (props.user && props.user[1]) {
      getLinks(props.user[1]);
    }
  }, [props.user]);

  if (props.user === null) {
    return null;
  }

  const selectedusername = props.user[0];
  const selectedusermail = props.user[1];

  const getLinks = async () => {
    const email = selectedusermail;

    const sanitizedEmail = email.replace(/\./g, "");
    const userLinksRef = ref(rtdb, `users/${sanitizedEmail}/links`);

    const unsub = onValue(userLinksRef, (snap) => {
      const data = snap.val();

      if (data != null) {
        try {
          setData(data);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div id="carddivout">
      {Data &&
        Object.entries(Data).map(([key, value]) => {
          const videoLink = value[0][0];
          const videoIdRegex = /\/d\/([a-zA-Z0-9_-]+)\//;
          const match = videoLink.match(videoIdRegex);
          const videoId = match ? match[1] : null;

          const addLink = () => {
            const email = selectedusermail;
            const sanitizedEmail = email.replace(/\./g, "");

            const userLinksRef = ref(
              rtdb,
              `users/${sanitizedEmail}/links/${key}`
            );

            const newData = { ...Data[key] };
            newData[0][2] = feedback;

            update(userLinksRef, newData)
              .then(() => {
                console.log(newData);
                console.log("Value updated successfully!");
              })
              .catch((error) => {
                console.log("Error updating value:", error);
              });
          };

          if (videoId === null) {
            return;
          }

          return (
            // <div key={key} className="card">
            //   <h3>{key}</h3>
            //   <p>{value[0][1]}</p>
            // </div>

            <div id="card" key={key}>
              <iframe
                src={`https://drive.google.com/file/d/${videoId}/preview`}
                id="cardiframe"
                title="Google Drive Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <h1>Self intro video with project </h1>

              <p>{value[0][1]}</p>
              
              <div id="cardfeedbackdiv">
              <p><strong>Feedback:</strong> {value[0][2]}</p>
                <div>
                <input
                id = "cardfeedbackinput"
                  onChange={(e) => {
                    setFeedback(e.target.value);
                  }}
                  placeholder="Enter Feedback"
                ></input>
                <button id = "cardfeedbackbtn" onClick={() => addLink(key)}>Submit</button>
                </div>
              </div>
            </div>
          );
        }).reverse()}
    </div>
  );
};

export default Card;
