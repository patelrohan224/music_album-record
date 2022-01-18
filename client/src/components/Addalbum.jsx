import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./hoe.css";

import { TextField, Button } from "@mui/material";

import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
const initstate = {
  name: "",
  age: Number(""),
  contact: Number(""),
  education: "",
  city: "",
  gender: "",
};
// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };
export default function Addalbum({ setadalbum, adalbum }) {
  // const query = useQuery();
  // const [page, setPage] = useState(+query.get("page"));
  const [load, setLaod] = useState(false);
  const { token } = useSelector((state) => state.Auth);
  const [name, setName] = useState("");
  const [Name_flag, setName_flag] = useState(false);
  const [aimg, setaimg] = useState(false);
  const [alimg, setalimg] = useState(false);
  const [astring, setastring] = useState("");
  const [alstring, setalstring] = useState("");
  const [age, setage] = useState("");
  const [Age_flag, setAge_flag] = useState(false);
  const [city, setcity] = useState("");
  const [education, seteducation] = useState([]);
  const [gender, setgender] = useState("");
  const [genderflag, setgenderflag] = useState(false);
  const [contact, setcontact] = useState("");
  const [phoneflag, setphoneflag] = useState(false);

  const [songname, setsongname] = useState("");
  const [songdur, setsongdur] = useState("");
  const [sfalg, setsflag] = useState(false);
  const [dfalg, setdflag] = useState(false);
  const [ar, setar] = useState([]);
  const validation = () => {
    if (name === "") {
      setName_flag(true);
      return false;
    } else {
      setName_flag(false);
    }
    if (age === "") {
      setAge_flag(true);
      return false;
    } else {
      setAge_flag(false);
    }

    if (gender === "") {
      setgenderflag(true);
      return false;
    } else {
      setgenderflag(false);
    }
    if (contact === "") {
      setphoneflag(true);
      return false;
    } else {
      setphoneflag(false);
    }
    if (alstring === "") {
      setalimg(true);
      return false;
    } else {
      setalimg(false);
    }
    if (astring === "") {
      setaimg(true);
      return false;
    } else {
      setaimg(false);
    }
    return true;
  };
  let history = useHistory();
  async function addstudent() {
    setLaod(true);
    try {
      // await axios.post("https://shielded-sands-21994.herokuapp.com/music/addAlbum",{
      let album = await axios.post(
        "http://localhost:2345/music/addAlbum",
        {
          name: `${name}`,
          artistname: `${age}`,
          songs: ar,
          genre: `${gender}`,
          year: `${contact}`,
          artistimg: `${astring}`,
          albumimg: `${alstring}`,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setLaod(false);
      setadalbum(!adalbum);
      history.push(`/rd`);
    } catch (error) {
      console.log("add stdt", error);
      setLaod(true);
    }
  }

  return load ? (
    <>
      <div className="addst">
        <p>Loading...</p>
      </div>
    </>
  ) : (
    <>
      <div className="addst">
        <div className="close">
          <img
            onClick={() => {
              setadalbum(!adalbum);
            }}
            style={{ height: "20px", width: "20px" }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_close.svg/1024px-OOjs_UI_icon_close.svg.png"
            alt=""
          />
        </div>
        <div className="addst-dv">
          <TextField
            error={Name_flag}
            label={Name_flag ? "error" : "AlbumName"}
            helperText={Name_flag ? "AlbumName is required" : ""}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="outlined-basic"
            variant="outlined"
            className="name_inpt"
            size="small"
          />
          <TextField
            error={Age_flag}
            label={Age_flag ? "error" : "ArtistName"}
            helperText={Age_flag ? "ArtistName is required" : ""}
            value={age}
            onChange={(e) => {
              setage(e.target.value);
            }}
            type="text"
            id="outlined-basic"
            variant="outlined"
            className="name_inpt"
            size="small"
          />
        </div>

        <div className="addst-dv">
          <TextField
            error={genderflag}
            label={genderflag ? "error" : "Genre"}
            helperText={genderflag ? "Genre is required" : ""}
            value={gender}
            onChange={(e) => {
              setgender(e.target.value);
            }}
            id="outlined-basic"
            variant="outlined"
            className="name_inpt"
            size="small"
          />

          <TextField
            error={phoneflag}
            //   label={phoneflag ? "error" : "Deadline"}
            helperText={phoneflag ? "deadline is required" : ""}
            value={contact}
            onChange={(e) => {
              setcontact(e.target.value);
            }}
            type="date"
            id="outlined-basic"
            variant="outlined"
            className="name_inpt"
            size="small"
          />
        </div>
        <div className="addst-dv">
          <TextField
            error={alimg}
            label={alimg ? "error" : "AlbumImg"}
            helperText={alimg ? "AlbumImg is required" : ""}
            value={alstring}
            onChange={(e) => {
              setalstring(e.target.value);
            }}
            id="outlined-basic"
            variant="outlined"
            className="name_inpt"
            size="small"
          />
          <TextField
            error={aimg}
            label={aimg ? "error" : "ArtistImg"}
            helperText={aimg ? "ArtistImg is required" : ""}
            value={astring}
            onChange={(e) => {
              setastring(e.target.value);
            }}
            id="outlined-basic"
            variant="outlined"
            className="name_inpt"
            size="small"
          />
        </div>

        <div className="addst-dv">
          <TextField
            error={sfalg}
            label={sfalg ? "error" : "Song"}
            helperText={sfalg ? "Song is required" : ""}
            value={songname}
            onChange={(e) => {
              setsongname(e.target.value);
            }}
            id="outlined-basic"
            variant="outlined"
            className="name_inpt"
            size="small"
          />
          <TextField
            error={dfalg}
            label={dfalg ? "error" : "Duration"}
            helperText={dfalg ? "Duration is required" : ""}
            value={songdur}
            onChange={(e) => {
              setsongdur(e.target.value);
            }}
            id="outlined-basic"
            variant="outlined"
            className="name_inpt"
            size="small"
          />
          <Button
            onClick={() => {
              if (songname != "" && songdur != "") {
                let s = songname.toString();
                let d = songdur.toString();
                setar([...ar, [s, d]]);
                setsongname("");
                setsongdur("");
              }
            }}
          >
            Add
          </Button>
          <div>No Of Song {ar.length}</div>
        </div>
        <div className="add-btn">
          <Button
            disabled={ar.length == 0}
            variant="contained"
            onClick={() => {
              validation();
              if (validation()) {
                addstudent();
              }
            }}
          >
            Add Album
          </Button>
        </div>
      </div>
    </>
  );
}
