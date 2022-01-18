import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AlbumE from "./AlbumE";
import "./hoe.css";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useHistory, useLocation, useParams } from "react-router-dom";
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
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
export default function Album() {
  const setCurrentPage = (event, value) => {
    setPage(value);
    history.push(`/home?page=${value}&size=${limit}`);
  };
  const query = useQuery();
  const [page, setPage] = useState(+query.get("page") || 1);
  query.set("page", page.toString());
  const [albumdata, setalbumdata] = useState([]);
  const [load1, setload1] = useState(false);
  const [error1, seterror1] = useState(false);
  const [totalPage, setTotalpage] = useState(0);
  const [forceUpade2, setforceUpade2] = useState(0);
  // const [page, serPage] = useState(1);
  const [limit, serLimit] = useState(+query.get("size") || 5);
  const [year, setyear] = useState(query.get("year") || "1");
  const [genre, setgenre] = useState(false);
  const [string, setstring] = useState("");
  const [genres, setgenres] = useState(query.get("genre") || "");
  // query.set("genre", genres.toString());
  const [personal, setpersonal] = useState(query.get("self") || 1);
  const { isLogin, token } = useSelector((state) => state.Auth);
  let history = useHistory();
  // let page;
  // page = useParams() || 1;

  // sort=author:asc
  useEffect(() => {
    async function getalbum() {
      setload1(true);
      try {
        let album = await axios.get(
          `https://shielded-sands-21994.herokuapp.com/music/allAllbum?page=${+query.get(
            "page"
            )}&limit=${+query.get("size")}&year=${
              year 
            }&name=${string}&genre=${
              genres
            }`
          // `http://localhost:2345/music/allAllbum?page=${+query.get(
          //   "page"
          // )}&limit=${+query.get("size")}&year=${
          //   year 
          // }&name=${string}&genre=${
          //   genres
          // }`
        );

        if (album !== undefined) {
          // if (album.data.Albums.length==5) {
          //   setPage(album.data.totalPage-1);
          //   query.set("page", album.data.totalPage.toString());
          //   history.push(`/home?page=${page-1}&size=5`);
          // }

          setTotalpage(album.data.totalPages);
          setalbumdata(album.data.Albmus);
          setload1(false);
          seterror1(false);
          console.log('query.get("page"):', query.get("genre"))
          // if(genres=="" && year!=="-1"){
          //   history.push(
          //     `/home`)
          //     // ?page=${page}&size=${limit}&year=${year}
          //     }
          //     if(year=="-1"){
          //       history.push(
          //         `/home?year=${year}`)
          //         }
          // if (query.get("genre") != "") {
          //     history.push(
          //       `/home?page=${+query.get("page")}&size=${+query.get(
          //         "size"
          //         )}&genre=${query.get("genre")}&year=${year}`
          //         );
          //       }
          let url=(page>1?`page=${+query.get("page")}&size=${limit}`:"")
          +(genres!==""? `&genre=${query.get("genre")}`:"")
          +(year=="-1" ? `&year=${year}`:"")
          history.push(`/home?${url}`);
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
          `https://shielded-sands-21994.herokuapp.com/music/allAllbumSelf/data?page=${+query.get(
            "page"
            )}&limit=${+query.get("size")}&year=${
              year 
            }&name=${string}&genre=${genres}&self=${personal}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          // `http://localhost:2345/music/allAllbumSelf/data?page=${+query.get(
          //   "page"
          // )}&limit=${+query.get("size")}&year=${
          //   year 
          // }&name=${string}&genre=${genres}&self=${personal}`,
          // {
          //   headers: {
          //     Authorization: "Bearer " + token,
          //   },
          // }
        );
        if (album !== undefined) {
          // if (album.data.totalPages == undefined) {
          //   setPage(page - 1);
          //   query.set("page", page.toString());
          //   history.push(`/home?page=${page - 1}&size=5`);
          // }
          setTotalpage(album.data.totalPages);
          setalbumdata(album.data.Albmus);
          setload1(false);
          seterror1(false);
          // if(genres==""){
          //   history.push(
          //     `/home?page=${page}&size=${limit}&year=${year}&self=${personal}`)
          //     }
          // if (query.get("genre") != "") {
          //     history.push(
          //       `/home?page=${+query.get("page")}&size=${+query.get(
          //         "size"
          //         )}&genre=${query.get("genre")}&year=${year}&self=${personal}`
          //         );
          //       }
          let url=(page>1?`page=${+query.get("page")}&size=${limit}`:"")
          +(genres!==""? `genre=${query.get("genre")}`:"")
          +(year=="-1" ? `&year=${year}`:"")
          +(personal=="-1"?`&self=${personal}`:"" )
          history.push(`/home?${url}`);
        }
      } catch (error) {
        console.log("error:", error);
        seterror1(true);
        setload1(false);
      }
    }
    if (personal==-1) {
      query.set("self","-1")
      getSelf();
    } else {
      query.set("self","1")
      getalbum();
    }
    query.set("genre", genres.toString());
  }, [page, year, forceUpade2, genre, string, genres, personal]);
  return (
    <>
      <div className="contest">
        <div style={{ display: "flex",padding:"0% 2% 2%" }}>
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
                  if(year=="1"){

                    setyear("-1");
                    query.set("year","-1")
                  }else{
                    setyear("1");
                    query.set("year","1")
                  }
                }}
                style={{ margin: "1% 0%" }}
                variant={year=="1" ? "outlined" : "contained"}
              >
                Sort year
              </Button>
              &nbsp;
              {isLogin ? (
                <Button
                  onClick={() => {
                    setpersonal(!personal);
                    if(personal=="1"){
                      setpersonal("-1");
                    
                    }else{
                      setpersonal("1");
                     
                    }
                  }}
                  
                  style={{ margin: "1% 0%" }}
                  variant={personal=="1" ? "outlined" : "contained"}
                >
                  Your Albums
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
                defaultPage={+query.get("page") ? +query.get("page") : 1}
                onChange={setCurrentPage}
                color="primary"
                size="large"
              />
            </Stack>
          </div>
        ) : (
          ""
        )}
        {albumdata==undefined?
        <Button onClick={() =>{
        history.push("/home")
        setPage(1)}}>Home</Button>:''}
      </div>
    </>
  );
}
