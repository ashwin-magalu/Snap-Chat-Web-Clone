import React, { useEffect } from "react";
import "./ChatView.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectSelectedImage } from "../config/appSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const ChatView = () => {
  const selectedImage = useSelector(selectSelectedImage);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
    return () => {
      //
    };
  }, [selectedImage]);

  const exit = () => {
    history.replace("/chats");
  };

  return (
    <div className="chatView">
      <img alt="" src={selectedImage} onClick={exit} />
      <div className="chatView__timer">
        <CountdownCircleTimer
          isPlaying={true}
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#f7b801", 0.33],
            ["#a30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default ChatView;
