import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import db, { auth } from "../firebase";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { selectUser } from "../features/userSlice";
import paw_white from '../assets/images/paw_white.png';
import SidebarChannel from "./SidebarChannel";
import { Avatar } from "@material-ui/core";
import Thread from '../assets/images/thread.png'; 

import "./Sidebar.css";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);
  console.log(channels)

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter the new channel name")

    if (channelName) {
      db.collection("channels").add({
        channelName,
      })
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={paw_white} alt="logo" />
        <h3>Catcord</h3>
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <h4>Channels to ruin</h4>
          </div>

          <AddIcon className="sidebar__addChannel" onClick={handleAddChannel} />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel id={id} channelName={channel.channelName} />
          ))}
        </div>

        <img alt="decor-img" className="sidebar__img" src={Thread} />
      </div>

      <div className="sidebar__profile">
        <Avatar src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <ExitToApp onClick={() => auth.signOut()} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
