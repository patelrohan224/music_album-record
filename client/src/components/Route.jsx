import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { AddToken, LogOut } from "../redux/actions";
export default function Redirectt() {
  const location = useLocation();
  let token = location.search;
  let [t,name] = token.split("rohanEmail");
  token = t.substring(1);
  let dispatch = useDispatch();
  // const [isLogin, setisLogin] = useState(true);
  const [hover, sethover] = useState(false);
  const [addalbum,setaddalbum]=useState(false);
  const [forceUpade,setforceUpade]=useState(0)
  const { isLogin } = useSelector((state) => state.Auth);


  useEffect(() => {
      if(isLogin==false){
        dispatch(AddToken({token,name}))}
    },[])  

    if(isLogin==false){
        return <Redirect to="/home"/>
    }else{  
        console.log("ss2");
        return <Redirect to="/home"/>
    }
}