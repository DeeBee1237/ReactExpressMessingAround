import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function ChatComponent(props) {

  const [messages, setMessages] = useState([]);

  // the user name for the chat
  const { name } = useParams();
 
  useEffect(() => {

    fetch('/getMessages')
      .then(res => res.json())
      .then(data => {
        setMessages(data.messages)
      })

  }, [messages])

  function search(formData) {
    const message = formData.get("newChatMessage");

    fetch("/postNewMessage", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then(result => 
        result.json()
      )
      .then((data) => {
        setMessages(data.messages);
      });
  }

  return (
    <div>
      <p>Chat User : {name} </p>

      {
        <div class="chat">
         {messages.map((message, i) => (
          <div data-time="16:35" class="msg sent">{message}</div>
        ))}

        {messages.map((message, i) => (
          <div data-time="16:35" class="msg rcvd">{message}</div>
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
