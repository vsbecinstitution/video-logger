import {rtdb} from "./firebase"
import {useState} from "react"
import {push,ref} from "firebase/database"
import "./Post.css"



const Post = ()=>{

    const [topic,setTopic] = useState();


    const addLink = () => {
        
        const userLinksRef = ref(rtdb, `topics/`);
        const newLinkRef = push(userLinksRef, topic);
        alert("Posted Todays Task!")
      };


    return (
        <div id = "postdiv" >
            <input id = "postinput" onChange = {(e)=>{
                setTopic(e.target.value)
            }}  placeholder = "Enter Todays Topic">
            </input>
            <button id = "postbtn" onClick = {addLink} >Post</button>
        </div>
    )

}

export default Post;