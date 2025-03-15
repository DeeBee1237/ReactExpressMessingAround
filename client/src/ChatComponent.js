import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function ChatComponent(props) {

  const [messagesSent, setMessagesSent] = useState([]);
  const [messagesRcvd, setMessagesRcvd] = useState([]);

  // the user name for the chat
  const { name } = useParams();
 
  useEffect(() => {

    fetch('/getMessages')
      .then(res => res.json())
      .then(data => {
        
        // TODO: this relies on users without duplicate names CHECK FOR THIS!
        let sentMessageObjs = data.messages.filter((messageObj) => messageObj.userName === name)
        let sentMessages = sentMessageObjs.map((messageObj) => messageObj.message)

        let rcvdMessageObjs = data.messages.filter((messageObj) => messageObj.userName !== name)
        let rcvdMessages = rcvdMessageObjs.map((messageObj) => messageObj.message)
        
        // .map((messageObj) => messageObj.message)
        // let actualMessages2 = data.messages.map((messageObj) => messageObj.message)
        
        setMessagesSent(sentMessages)
        setMessagesRcvd(rcvdMessages)
      })

  }, [messagesSent])

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
        // let actualMessages = data.messages.map((messageObj) => messageObj.message)
        // setMessages(actualMessages);
        let sentMessageObjs = data.messages.filter((messageObj) => messageObj.userName === name)
        let sentMessages = sentMessageObjs.map((messageObj) => messageObj.message)

        let rcvdMessageObjs = data.messages.filter((messageObj) => messageObj.userName !== name)
        let rcvdMessages = rcvdMessageObjs.map((messageObj) => messageObj.message)
        
        // .map((messageObj) => messageObj.message)
        // let actualMessages2 = data.messages.map((messageObj) => messageObj.message)
        
        setMessagesSent(sentMessages)
        setMessagesRcvd(rcvdMessages)
      });
  }

  return (
    <div>
      <p>Chat User : {name} </p>

      {
        <div class="chat">
         {messagesSent.map((message, i) => (
          <div data-time="16:35" class="msg sent">{message}</div>
        ))}

        {messagesRcvd.map((message, i) => (
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
