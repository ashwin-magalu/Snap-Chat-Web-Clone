import {
  AttachFile,
  Close,
  Create,
  Crop,
  MusicNote,
  Note,
  Send,
  TextFields,
  Timer,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetCameraImage, selectcameraImage } from "../config/cameraSlice";
import "./Preview.css";
import { v4 as uuid } from "uuid";
import { storage, db } from "../config/firebase";
import firebase from "firebase";
import { selectUser } from "../config/appSlice";

const Preview = () => {
  const cameraImg = useSelector(selectcameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [name, setName] = useState(user?.userName);
  const [profilepic, setProfilepic] = useState(user?.profilePic);

  useEffect(() => {
    if (!cameraImg) {
      history.replace("/");
    }
    console.log(user);
    return () => {
      //
    };
  }, [cameraImg, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`snapchat-posts/${id}`)
      .putString(cameraImg, "data_url"); // It will save image not in base64 name

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("snapchat-posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("snapchat-posts").add({
              imageURL: url,
              userName: name,
              read: false,
              profilePic: profilepic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };

  return (
    <div className="preview">
      <Close className="preview__close" onClick={closePreview} />
      <div className="preview__toolBarRight">
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImg} alt="" />
      <div className="preview__footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <Send className="preview__sendIcon" />
      </div>
    </div>
  );
};

export default Preview;
