import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { AddToken, LogOut } from "../redux/actions";
import { Button } from "@mui/material";
import "./hoe.css";
import Addalbum from "./Addalbum";
export default function Home() {
  let dispatch = useDispatch();
  // const [isLogin, setisLogin] = useState(true);
  const [hover, sethover] = useState(false);
  const [adalbum,setadalbum]=useState(false);
  const { isLogin,Name } = useSelector((state) => state.Auth);
  const google_auth = () => {
    window.location.href = "https://shielded-sands-21994.herokuapp.com/auth/google";
    // window.location.href = "http://localhost:2345/auth/google";
  };

  const logout = () => {
    dispatch(LogOut());
    window.location.href = "https://music-album-records-rohanpatel.vercel.app/";
    // window.location.href = " http://localhost:3000/";
  };

  useEffect(() => {

  },[adalbum])  

  return (
    <>
      <div className="navbar">
        {/* <img
          style={{ height: "40px", width: "100px", float: "left" }}
          src="https://cdn-icons-png.flaticon.com/512/167/167708.png"
          alt=""
        /> */}
        {!isLogin ? (
          <Button
            onClick={() => {
              google_auth();
            }}
            variant="text"
            style={{ float: "right", color: "rgb(81 142 248)" }}
          >
            Signup/Login
          </Button>
        ) : (
          ""
        )}
        {!isLogin ? (
          <img
            onClick={() => {
              google_auth();
            }}
            style={{
              height: "40px",
              width: "40px",
              float: "right",
              cursor: "pointer",
            }}
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt=""
          />
        ) : (
          <Button
            onMouseEnter={() => {
              sethover(true);
            }}
            onMouseLeave={() => {
              sethover(false);
            }}
            onClick={logout}
            style={{ float: "right",width:"auto"}}
            variant="contained"
          >
            {!hover ? Name : "Log out"}
          </Button>
        )}
        {isLogin ? (
          <div>
            {" "}
            <Button
              onClick={() => {
                if (isLogin) {
                  setadalbum(!adalbum);
                }
              }}
              style={{ float: "right", margin: "0% 1%" }}
              variant={adalbum ? "contained" : "outlined"}
            >
              Add Album
            </Button>
          </div>
        ) : (
          ""
        )} 
      </div>
      {adalbum?
      <Addalbum setadalbum={setadalbum} adalbum={adalbum} />
      :""}
    </>
  );
}


