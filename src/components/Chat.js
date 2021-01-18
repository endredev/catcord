import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from './Message'
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectChannelId, selectChannelName } from "../features/appSlice";
import firebase from 'firebase'
import NoChannelCat from '../assets/images/no_channel_cat.png'; 

import "./Chat.css";
import db from "../firebase";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [placeholder, setPlaceholder] = useState('Choose a channel to mess up')

  useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        )

        setPlaceholder(`Message #${channelName}`)
    }


  }, [channelId, placeholder, channelName])

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection('channels').doc(channelId).collection('messages').add(
      {
        message: input,
        user: user,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }
    )

    setInput('')
  }

  return (
    <div className="chat">
      {channelId ? (
        <>
          <ChatHeader channelName={channelName} />
          <div className="chat__messages">
            {messages.length === 0 ? (
              <p className="no-messages">This channel is still furryless</p>
            ) :
              messages.map(message => (
                <Message timestamp={message.timestamp} message={message.message} user={message.user} />
              ))
            }
          </div>
        </>
      ) :
        <div className="no-channel">
          <img alt="no-channel-selected" src={NoChannelCat} />
          <h1>Select a Channel</h1>
        </div>
      }

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input disabled={!channelId} placeholder={placeholder} value={input} onChange={(e) => setInput(e.target.value)} />
          <button className="chat__inputButton" type="submit" onClick={sendMessage}>
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
