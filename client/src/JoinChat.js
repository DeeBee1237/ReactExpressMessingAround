import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

function JoinChat() {

function joinChat(chatName) {
  // TODO: https://stackoverflow.com/questions/37295377/how-to-navigate-from-one-page-to-another-in-react-js
    console.log("chatName:", chatName)

}

  return (
    <div>
      <p>Join Chat Room</p>

      <form action={joinChat}></form>

      <p> Enter Your Name</p>
      <form action={joinChat}>
        <input name="joinChat" />
        {/* <button type="submit">Join</button> */}
        <Link to="/joinChat">Join</Link>
        {/* <Link to={{pathName: "/joinChat"}}>Join</Link> */}
      </form>
    </div>
  );
}

export default JoinChat;
