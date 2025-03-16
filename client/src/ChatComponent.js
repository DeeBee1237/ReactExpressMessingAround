import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function ChatComponent(props) {

  const [allMessages, setAllMessages] = useState([]);

  // the user name for the chat
  const { name } = useParams();

  function deleteMessage(messageId) {
    
    fetch(`/deleteMessage/${messageId}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      setAllMessages(data.messages)
    })
  }
 
  // TODO: need to remove allMessages from useEffect array as this will cause infinite loop
  // instead I should be periodically updating each client to refresh the chat for new messages somehow ...
  // TODO: see https://stackoverflow.com/questions/59667278/react-hooks-periodic-run-useeffect
  useEffect(() => {
    console.log("use effect was called")

    fetch('/getMessages')
      .then(res => res.json())
      .then(data => {
        setAllMessages(data.messages)
      })

  }, []) //messagesSent])

  function search(formData) {
    const message = formData.get("newChatMessage");

    fetch("/postNewMessage", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: name,
        message: message,
      }),
    })
      .then(result => 
        result.json()
      )
      .then((data) => {
        setAllMessages(data.messages)
      });
  }

  return (
    <div>
      <p>Chat User : {name} </p>

      {
        <div class="chat">

        {allMessages.map((messageObj, i) => (
            // <div data-time="16:35" class={messageObj.userName === name ? "msg sent" : "msg rcvd"}>{messageObj.message}</div>
          <div>
            <div data-time="16:35" class={messageObj.userName === name ? "msg sent" : "msg rcvd"}>{messageObj.message}</div>
            {(messageObj.userName == name) ? 
            (<button onClick={() => deleteMessage(messageObj.id)}>Delete</button>) : 
            (<></>)}
          </div>
        ))}
        
        </div>
      }

      <form action={search}>
        <input name="newChatMessage" />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

export default ChatComponent;
