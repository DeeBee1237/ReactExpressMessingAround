import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

function JoinChat() {

  // TODO: should the default be different here ?
  const [userName, setUserName] = useState("")

function search(formData) {
  const name = formData.get("userName");
  setUserName(name)
}

  return (
    <div>

      <p>Join Chat Room</p>

        {userName === "" ? (
           <p> Enter Your Name </p>
        ) : (
          <p>Hello {userName}</p>
        )}

      <form action={search}>
        <input name="userName" />
        <button type="submit">Set Username</button>
      </form>


      {userName === "" ? (
          <p>You need a user name to join the chat</p>
        ) : (
          <Link to={`/joinChat/${userName}`}>Join The Chat</Link>
        )}
        
    </div>
  );
}

export default JoinChat;
