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
  const [editflag, seteditflag] = useState(false);
  const [e, sete] = useState([]);
  const [da, setdata] = useState([]);
  const idA = useParams();
  const { isLogin } = useSelector((state) => state.Auth);
  let history = useHistory();
  const [name, setname] = useState("");
  const [genre, setgenre] = useState("");
  const [alimg, setalimg] = useState("");
  const [arimg, setarimg] = useState("");
  const [year, setyear] = useState("");
  const [arname, setarname] = useState("");
  const [forceUpadte, setForceUpadte] = useState(0);
  const [sedit, setsedit] = useState(false);
  const [sname, setsname] = useState("");
  const [du, setdur] = useState("");

  const [addname, setaddname] = useState("");
  const [adddur, setadddur] = useState("");

  async function deleteA(idd) {
    setLoad(true);
    try {
      let album = await axios.delete(
        `https://shielded-sands-21994.herokuapp.com/music/delete/${e._id}`,
        // `https://shielded-sands-21994.herokuapp.com/music/delete/${e._id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setLoad(false);
      history.goBack();
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
        `https://shielded-sands-21994.herokuapp.com/music/editAlbum/${idd}`,
        // `https://shielded-sands-21994.herokuapp.com/music/editAlbum/${idd}`,

        {
          name: `${name != "" ? name : e.name}`,
          artistname: `${arname != "" ? arname : e.artistname}`,
          genre: `${genre != "" ? genre : e.genre}`,
          year: `${year != "" ? year : e.year}`,
          artistimg: `${arimg != "" ? arimg : e.artistimg}`,
          albumimg: `${alimg != "" ? alimg : e.albumimg}`,
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

  async function sondelete(ii) {
    setLoad(true);
    try {
      let album = await axios.patch(
        `https://shielded-sands-21994.herokuapp.com/music/songedit/${idA.idA}/ii/${ii}`
      );
      seterror(false);
      setLoad(false);
      // console.log("sond delete", album);
      setForceUpadte(forceUpadte + 1);
    } catch (error) {
      setLoad(false);
      seterror(true);
      console.log("error:", error);
    }
  }

  async function songAdd(ii) {
    setLoad(true);
    try {
      let album = await axios.patch(
        `https://shielded-sands-21994.herokuapp.com/music/songadd/${idA.idA}/ii/${ii}/d/${adddur}/s/${addname}`
      );
      seterror(false);
      setLoad(false);
      setaddname("");
      setadddur("");
      // console.log("sond delete", album);
      setForceUpadte(forceUpadte + 1);
    } catch (error) {
      setLoad(false);
      seterror(true);
      console.log("error:", error);
    }
  }
  async function editsong(ii) {
    setLoad(true);
    try {
      let album = await axios.patch(
        `https://shielded-sands-21994.herokuapp.com/music/songedit/${idA.idA}/ii/${ii}/d/${du}/s/${sname}`
      );
      seterror(false);
      setLoad(false);
      setsname("");
      setdur("");
      setsedit(!sedit);
      // console.log("sond delete", album);
      setForceUpadte(forceUpadte + 1);
    } catch (error) {
      setLoad(false);
      seterror(true);
      console.log("error:", error);
    }
  }
  useEffect(() => {
    async function verify() {
      setLoad(true);
      try {
        let album = await axios.get(`https://shielded-sands-21994.herokuapp.com/music/getId`, {
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

      try {
        let album = await axios.get(
          `https://shielded-sands-21994.herokuapp.com/music/getalbum/${idA.idA}`,
          {
            // let album = await axios.get(`https://shielded-sands-21994.herokuapp.com/music/getId`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        seterror(false);
        setdata(album.data.album)
        sete(album.data.album);
        setLoad(false);
      } catch (error) {
        setLoad(false);
        seterror(true);
        console.log("error:", error);
      }
    }

    getdata();
  }, [show, editflag, forceUpadte]);
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
            {editflag ? (
              <>
                <TextField
                  style={{ margin: "2% 0%" }}
                  label={"AlbumImg"}
                  value={alimg}
                  onChange={(e) => {
                    setalimg(e.target.value);
                  }}
                  id="outlined-basic"
                  variant="outlined"
                  className="name_inpt"
                  size="small"
                />
              </>
            ) : (
              ""
            )}
          </div>
          <div className="cont_pr">
            <div className="cont">
              {!editflag ? (
                <h1>{e.name}</h1>
              ) : (
                <>
                  <TextField
                    style={{ margin: "2% 0%" }}
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
                </>
              )}
              {!editflag ? (
                <p>{e.genre}</p>
              ) : (
                <>
                  <TextField
                    style={{ margin: "2% 0%" }}
                    label={e.genre}
                    value={genre}
                    onChange={(e) => {
                      setgenre(e.target.value);
                    }}
                    id="outlined-basic"
                    variant="outlined"
                    className="name_inpt"
                    size="small"
                  />
                </>
              )}
              {!editflag ? (
                <p>{e.year}</p>
              ) : (
                <>
                  <TextField
                    style={{ margin: "2% 0%" }}
                    // label={e.year}
                    value={year}
                    onChange={(e) => {
                      setyear(e.target.value);
                    }}
                    type="date"
                    id="outlined-basic"
                    variant="outlined"
                    className="name_inpt"
                    size="small"
                  />
                </>
              )}
              <div className="img2">
                <img className="img_" src={e.artistimg} alt="" />
                {editflag ? (
                  <TextField
                    style={{ margin: "2% 0%" }}
                    label={"ArtistImg"}
                    value={arimg}
                    onChange={(e) => {
                      setarimg(e.target.value);
                    }}
                    id="outlined-basic"
                    variant="outlined"
                    className="name_inpt"
                    size="small"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="cont">
              {!editflag ? (
                <p>{e.artistname}</p>
              ) : (
                <>
                  <TextField
                    label={e.artistname}
                    value={arname}
                    onChange={(e) => {
                      setarname(e.target.value);
                    }}
                    id="outlined-basic"
                    variant="outlined"
                    className="name_inpt"
                    size="small"
                  />
                </>
              )}
              <p>songs {e.songs?.length}</p>
              {id == e.artist ? (
                <>
                  {editflag ? (
                    <Button
                      onClick={() => {
                        editA(e._id);
                      }}
                    >
                      yes
                    </Button>
                  ) : (
                    ""
                  )}
                  <Button
                    onClick={() => {
                      seteditflag(!editflag);
                    }}
                  >
                    {!editflag ? "Edit" : "No"}
                  </Button>

                  <Button onClick={() => deleteA(e._id)}>Delete</Button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div style={{ marginTop: "2rem" }}>
          {
            <>
              <div className="songss">
                {/* <p>Song Name</p>
                <p>Duration</p> */}
              </div>
              {e.songs?.map((e, i) => (
                <>
                  <div key={i} className="songss">
                    {sedit ? (
                      <TextField
                        label={e[0]}
                        value={sname}
                        onChange={(e) => {
                          setsname(e.target.value);
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        className="name_inpt"
                        size="small"
                      />
                    ) : (
                      <p>
                        {i + 1} {e[0]}
                      </p>
                    )}
                    {sedit ? (
                      <TextField
                        label={e[1]}
                        value={du}
                        onChange={(e) => {
                          setdur(e.target.value);
                        }}
                        type="number"
                        id="outlined-basic"
                        variant="outlined"
                        className="name_inpt"
                        size="small"
                      />
                    ) : (
                      <p style={{ float: "right" }}>{e[1]}</p>
                    )}
                    {sedit && isLogin ? (
                      <Button
                        disabled={du == "" || sname == ""}
                        onClick={() => {
                          editsong(i);
                        }}
                      >
                        Yes
                      </Button>
                    ) : (
                      ""
                    )}
                    <>
                    {id === da.artist ? (
                      <div>
                        <Button onClick={() => setsedit(!sedit)}>Edit</Button>
                        <Button onClick={() => sondelete(i)}>Delete</Button>
                        </div>
                    ) : (
                      ""
                      )}
                      </>
                  </div>
                </>
              ))}
            </>
          }
          {id === e.artist ? (
            <div className="songss">
              <TextField
                label={"Song Name"}
                value={addname}
                onChange={(e) => {
                  setaddname(e.target.value);
                }}
                id="outlined-basic"
                variant="outlined"
                className="name_inpt"
                size="small"
              />
              <TextField
                label={"song Duration"}
                value={adddur}
                onChange={(e) => {
                  setadddur(e.target.value);
                }}
                type="number"
                id="outlined-basic"
                variant="outlined"
                className="name_inpt"
                size="small"
              />
              <Button
                disabled={adddur == "" || addname == ""}
                onClick={() => songAdd()}
              >
                Add
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
