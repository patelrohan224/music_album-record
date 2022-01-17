import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./hoe.css";
export default function AlbumE({ e, setforceUpade2, togleLogin, forceUpade2 }) {
  const [show, setshow] = useState(false);
  const { token,isLogin } = useSelector((state) => state.Auth);
  const [id, setid] = useState("");
  const [error, seterror] = useState(false);
  const [load, setLoad] = useState(false);
  const [name, setname] = useState("");
  const [editflag, seteditflag] = useState(false);
  let history=useHistory()
 
  useEffect(() => {
    async function verify() {
      try {
        
        let album = await axios.get(`http://localhost:2345/music/getId`, {
          // let album = await axios.get(`https://shielded-sands-21994.herokuapp.com/music/getId`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (album !== undefined) {
          // console.log("album:", album.data.user._id);
          setid(album.data.user._id);
        }
      } catch (error) {
        console.log("error:", error);
      }
    }

    if (isLogin == true) {
      verify();
    }
  }, [show]);
  return load ? (
    <>
      <p>Loading...</p>
    </>
  ) : error ? (
    <>
      <p>Something went wrong</p>
    </>
  ) : (
    <>
      <div 
        // history.push(`/album/${e._id}`)
       className="alpar">
        <div className="albumE">
          <div className="img">
            <img
             onClick={() => {
              setshow(!show);
            }}
              className="img_G"
            
              src={e.albumimg}
              alt=""
            />
          </div>
          <div className="cont_pr">
            <div className="cont">
            
                <Link to={`/album/${e._id}`}>{e.name}</Link>
              
              <p
               
              >
                {e.genre}
              </p>
              <p
                
              >
                {e.year}
              </p>
              <div className="img2">
                <img
                
                  className="img_"
                  src={e.artistimg}
                  alt=""
                />
              </div>
            </div>
            <div className="cont">
              <p
               
              >
                {e.artistname}
              </p>
              <p
                
              >
                songs {e.songs.length}
              </p>
             {e.artist==id?<Link to={`/album/${e._id}`}>Owner</Link>:""}
            </div>
          </div>
        </div>
        <div>
          {show ? (
            <>
              {e.songs?.map((e, i) => (
            <div key={i} className="songss">
                <p>{i+1} {e[0]}</p>
                <p>{e[1]}</p>
            </div>
                ))}
                </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
