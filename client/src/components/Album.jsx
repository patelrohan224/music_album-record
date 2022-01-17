import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AlbumE from "./AlbumE";
import "./hoe.css";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useHistory, useParams } from "react-router-dom";
const dataa = [
  "Jazz",
  "Modal",
  "Rock",
  "Pop",
  "Progressive",
  "Roots",
  "Reggae",
  "Funk",
];

export default function Album() {
  const [albumdata, setalbumdata] = useState([]);
  const [load1, setload1] = useState(false);
  const [error1, seterror1] = useState(false);
  const [totalPage, setTotalpage] = useState(0);
  const [forceUpade2, setforceUpade2] = useState(0);
  // const [page, serPage] = useState(1);
  const [limit, serLimit] = useState(5);
  const [year, setyear] = useState(false);
  const [genre, setgenre] = useState(false);
  const [string, setstring] = useState("");
  const [genres, setgenres] = useState("");
  const [personal, setpersonal] = useState(false);
  const { isLogin, token } = useSelector((state) => state.Auth);
  let history = useHistory();
  let page;
  page = useParams() || 1;
  const setCurrentPage = (event, value) => {
    history.push(`/page/${value}`);
  };
  useEffect(() => {
    async function getalbum() {
      setload1(true);
      try {
        let album = await axios.get(
          // `https://shielded-sands-21994.herokuapp.com/music/allAllbum?page=${page}&limit=${limit}&year=${
          `http://localhost:2345/music/allAllbum?page=${
            page.page
          }&limit=${limit}&year=${
            year ? "-1" : "1"
          }&name=${string}&genre=${genres}`
        );
        if (album !== undefined) {
          console.log('album.data.totalPages', album.data.totalPages)
          setTotalpage(album.data.totalPages);
          setalbumdata(album.data.Albmus);
          setload1(false);
          seterror1(false);
        }
      } catch (error) {
        console.log("error:", error);
        seterror1(true);
        setload1(false);
      }
    }

    async function getSelf() {
      setload1(true);
      try {
        let album = await axios.get(
          // `https://shielded-sands-21994.herokuapp.com/music/allAllbum?page=${page}&limit=${limit}&year=${
          `http://localhost:2345/music/allAllbumSelf/data?page=${
            page.page
          }&limit=${limit}&year=${
            year ? "-1" : "1"
          }&name=${string}&genre=${genres}&self=${personal}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (album !== undefined) {
          // console.log('album:', album)
          console.log('album.data.totalPages:self', album.data.totalPages)
          setTotalpage(album.data.totalPages);
          setalbumdata(album.data.Albmus);
          setload1(false);
          seterror1(false);
        }
      } catch (error) {
        console.log("error:", error);
        seterror1(true);
        setload1(false);
      }
    }
    if (personal) {
      getSelf();
    } else {
      getalbum();
    }
  }, [page, year, forceUpade2, genre, string, genres, personal]);
  return (
    <>
      <div className="contest">
        <div style={{ display: "flex" }}>
          <TextField
            style={{ margin: "1% 0%" }}
            // error={aimg}
            label={"Search by Album Name"}
            // helperText={aimg ? "ArtistImg is required" : ""}
            value={string}
            onChange={(e) => {
              setstring(e.target.value);
            }}
            id="outlined-basic"
            variant="outlined"
            className="name_inpt"
            size="small"
          />

          <div style={{ width: "30%", height: "30px", padding: "8px" }}>
            {" "}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={dataa}
              sx={{ width: "100%", padding: "0px" }}
              value={genres}
              renderInput={(params) => (
                <TextField
                  placeholder="Filter By Genre"
                  {...params}
                  onSelect={(e) => {
                    setgenres(e.target.value);
                  }}
                ></TextField>
              )}
            />
          </div>
          {albumdata !== undefined ? (
            <>
              <Button
                onClick={() => {
                  setyear(!year);
                }}
                style={{ margin: "1% 0%" }}
                variant={!year ? "outlined" : "contained"}
              >
                Sort year
              </Button>
              &nbsp;
              {isLogin ? (
                <Button
                  onClick={() => {
                    setpersonal(!personal);
                  }}
                  style={{ margin: "1% 0%" }}
                  variant={!personal ? "outlined" : "contained"}
                >
                  Your Album
                </Button>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
        {load1 ? (
          <p>Loading...</p>
        ) : error1 ? (
          <p>Something went wrong</p>
        ) : (
          <div>
            {albumdata !== undefined
              ? albumdata?.map((e) => (
                  <AlbumE
                    e={e}
                    isLogin={isLogin}
                    key={e._id}
                    setforceUpade2={setforceUpade2}
                    forceUpade2={forceUpade2}
                  />
                ))
              : "No Album is available"}
          </div>
        )}

        {albumdata !== undefined ? (
          <div style={{ float: "right", margin: "4%" }}>
            <Stack spacing={3}>
              <Pagination
                count={totalPage}
                defaultPage={Number(page.page) || 1}
                onChange={setCurrentPage}
                color="primary"
                size="large"
              />
            </Stack>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
