import { Avatar } from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";
import React from "react";
import "./Chat.css";
import ReactTimeago from "react-timeago";
import { useDispatch } from "react-redux";
import { selectImage } from "../config/appSlice";
import { db } from "../config/firebase";
import { useHistory } from "react-router-dom";

const Chat = ({ id, userName, timestamp, imageURL, read, profilePic }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageURL));
      db.collection("snapchat-posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      history.push("/chats/view");
    }
  };

  return (
    <div className="chat" onClick={open}>
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{userName}</h4>
        {!read && (
          <p>
            Tap to view -{" "}
            <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
          </p>
        )}
      </div>
      {!read && <StopRounded className="chat__readIcon" />}
    </div>
  );
};

export default Chat;
