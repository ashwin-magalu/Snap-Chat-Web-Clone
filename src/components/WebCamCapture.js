import React, { useCallback, useRef, useState } from "react";
import "./WebCamCapture.css";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { setCameraImage } from "../config/cameraSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

const WebCamCapture = () => {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const capture = useCallback(
    // It avoids unnecessary re rendering, it runs once and saves the previous run's data, hence speeding up calculations for 2nd render onwards
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      //This gets image in base64 format

      //console.log(imageSrc);

      dispatch(setCameraImage(imageSrc));

      history.push("/preview");
    },
    [webcamRef]
  );

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />

      <RadioButtonUncheckedIcon
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
};

export default WebCamCapture;
