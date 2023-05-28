import {useState,useEffect} from "react";
import {rtdb} from "./firebase"
import {onValue,ref} from "firebase/database"
import "./Card.css"

import SubtitleGenerator from "./SubtitleGenerator";

const Card = (props)=>{

    const [Data,setData] = useState();
    useEffect(() => {
        if (props.user && props.user[1]) {
          getLinks(props.user[1]);
        }
      }, [props.user]);

    if(props.user === null){
        return
    }
    

    const selectedusername = props.user[0];
    const selectedusermail = props.user[1]
    
    
    const getLinks = async () => {
      

        const email = selectedusermail;
        
        const sanitizedEmail = email.replace(/\./g, "");
        const userLinksRef = ref(rtdb, `users/${sanitizedEmail}/links`);
        
        const unsub = onValue(userLinksRef, (snap) => {
          const data = snap.val();
          console.log(data)
          if (data != null) {
            try {
              setData(Object.keys(data).map((doc) => data[doc]).reverse());
            } catch (error) {
              console.log(error);
            }
            
          }
        });

        
      };
  
      

    

    return (
        <div id = "carddivout" >
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
              <div id = "card" key={index}>
                <iframe
                  src={`https://drive.google.com/file/d/${videoId}/preview`}
                  id = "cardiframe"
                  title="Google Drive Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <h1>Self intro video with project </h1>
                
                <p>{doc[0][1]}</p>
              </div>
            );
          })}
      </div>
    )
}

export default Card;