import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import cameraReducer from "./cameraSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    camera: cameraReducer,
  },
});
