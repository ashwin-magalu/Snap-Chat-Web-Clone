import { Avatar } from "@material-ui/core";
import { ChatBubble, RadioButtonChecked, Search } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "../config/appSlice";
import { auth, db } from "../config/firebase";
import Chat from "./Chat";
import "./Chats.css";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    db.collection("snapchat-posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        setPosts(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return () => {
      //
    };
  }, []);

  const takeSnap = () => {
    history.push("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          className="chats_avatar"
          alt=""
          src={user.profilePic}
          onClick={() => auth.signOut()}
        />
        <div className="chats__search">
          <Search />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubble className="chats__chatIcon" />
      </div>

      <div className="chats__body">
        {posts.map(
          ({
            id,
            data: { profilePic, userName, timestamp, imageURL, read },
          }) => (
            <Chat
              key={id}
              id={id}
              userName={userName}
              timestamp={timestamp}
              imageURL={imageURL}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>

      <RadioButtonChecked
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
};

export default Chats;
