import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./hoe.css";
export default function ShowAlbum() {
  const [show, setshow] = useState(false);
  const { token } = useSelector((state) => state.Auth);
  const [id, setid] = useState("");
  const [error, seterror] = useState(false);
  const [load, setLoad] = useState(false);
  const [name, setname] = useState("");
  const [editflag, seteditflag] = useState(false);
  const [e, sete] = useState([]);
  const idA = useParams();
  const { isLogin } = useSelector((state) => state.Auth);
  let history = useHistory();
  async function deleteA(idd) {
    setLoad(true);
    try {
      console.log(e._id);
      let album = await axios.delete(
        `http://localhost:2345/music/delete/${e._id}`,
        // `https://shielded-sands-21994.herokuapp.com/music/delete/${e._id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setLoad(false);

      seterror(false);
    } catch (error) {
      console.log("error:", error);
      setLoad(false);
      seterror(true);
    }
  }
  async function editA(idd) {
    setLoad(true);
    try {
      let album = await axios.patch(
        `http://localhost:2345/music/editAlbum/${idd}`,
        // `https://shielded-sands-21994.herokuapp.com/music/editAlbum/${idd}`,

        {
          name: `${name}`,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setname("");
      setLoad(false);
      seteditflag(!editflag);
      seterror(false);
    } catch (error) {
      console.log("error:", error);
      setLoad(false);
      seterror(true);
    }
  }
  useEffect(() => {
    async function verify() {
      setLoad(true);
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
        setLoad(false);
        seterror(false);
      } catch (error) {
        console.log("error:", error);
        setLoad(false);
        seterror(true);
      }
    }

    if (isLogin == true) {
      verify();
    }
    async function getdata() {
      setLoad(true);
      console.log("idA:", idA);
      try {
        let album = await axios.get(
          `http://localhost:2345/music/getalbum/${idA.idA}`,
          {
            // let album = await axios.get(`https://shielded-sands-21994.herokuapp.com/music/getId`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        seterror(false);
        console.log("album:", album);
        sete(album.data.album);
        setLoad(false);
      } catch (error) {
        setLoad(false);
        seterror(true);
        console.log("error:", error);
      }
    }
    getdata();
  }, [show, editflag]);
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
      <div className="alpar2">
        <Button
          onClick={() => history.goBack()}
          style={{ width: "80px" }}
        >{`< back`}</Button>
        <div className="albumE">
          <div className="img">
            <img
              className="img_G"
              onClick={() => {
                setshow(!show);
              }}
              src={e.albumimg}
              alt=""
            />
          </div>
          <div className="cont_pr">
            <div className="cont">
              {!editflag ? (
                <h1>{e.name}</h1>
              ) : (
                <>
                  <TextField
                    label={e.name}
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    id="outlined-basic"
                    variant="outlined"
                    className="name_inpt"
                    size="small"
                  />
                  <Button
                    disabled={!name}
                    onClick={() => {
                      editA(e._id);
                    }}
                  >
                    Edit
                  </Button>
                </>
              )}
              <p>{e.genre}</p>
              <p>{e.year}</p>
              <div className="img2">
                <img className="img_" src={e.artistimg} alt="" />
              </div>
            </div>
            <div className="cont">
              <p>{e.artistname}</p>
              <p>songs {e.songs?.length}</p>
              {id == e.artist ? (
                <>
                  <Button
                    onClick={() => {
                      seteditflag(!editflag);
                    }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => deleteA(e._id)}>Delete</Button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div>
          {
            <>
              <div className="songss">
                <p>Song Name</p>
                <p>Duration</p>
              </div>
              {e.songs?.map((e, i) => (
                <div key={i} className="songss">
                  <p>
                    {i + 1} {e[0]}
                  </p>
                  <p>{e[1]}</p>
                </div>
              ))}
            </>
          }
        </div>
      </div>
    </>
  );
}
