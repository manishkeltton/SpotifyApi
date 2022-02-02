import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import "./App.css";
import { useEffect, useState } from "react";
import Spotify from "./utils/Spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Players/Player";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Album from "./components/album/Album";
import PlayLists from "./components/playLists/PlayLists";

const SpotifyNew = new SpotifyWebApi();

function App() {
  const [state, setState] = useState();
  const [trackData, setTrackData] = useState();
  const [url, setUrl] = useState();
  const [isState, setIsState] = useState(true);
  const [isTrackData, setIsTrackData] = useState(false);
  const [isPlayList, setIsPlayList] = useState(false);
  const [isUrl, setIsUrl] = useState(false);
  const accessToken = Spotify.getAccessToken();
  // console.log("Spotify =>", Spotify.getAccessToken());

  useEffect(() => {
    SpotifyNew.setAccessToken(accessToken);
    fetch("https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/albums", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((results) => {
        // console.log("New Result =>", results)
        setIsState(true);
        setState(results.items);
      })
      .catch((error) => console.log("Error =>", error));
  }, []);

  let trackalbum = (ids) => {
    console.log("tracalbum => ", ids);
    fetch(`https://api.spotify.com/v1/albums/${ids}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        // console.log("ressss =>", res.tracks.items)
        setIsPlayList(true);
        setIsTrackData(true);
        setTrackData(res.tracks.items);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  let onPlayList = (urlData) => {
    // console.log("urlData => ", urlData);
    // console.log("IseUrl =>", isUrl);
    setIsUrl(true);
    setUrl(urlData);
  };

  let backBtn = () => {
    setIsTrackData(false);
    setIsPlayList(false);
    setIsState(true);
  };

  let forwardBtn = () => {
    setIsPlayList(true);
    if (trackData) {
      setIsState(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="right-container">
          <div className="back-forw-btn">
            <button onClick={() => backBtn()}>
              <GoTriangleLeft color="black" />
            </button>
            <button onClick={() => forwardBtn()}>
              <GoTriangleRight color="black" />
            </button>
          </div>
          <h1>Elvis prisley</h1>
          <div className="container">
            {isState && (
              <Album
                state={state}
                trackalbum={trackalbum}
                isTrackData={isTrackData}
              />
            )}
            {isPlayList && (
              <PlayLists
                trackData={trackData}
                onPlayList={onPlayList}
                url={url}
              />
            )}
          </div>
        </div>
      </div>
      {isUrl && <Player url={url} />}
    </div>
  );
}

export default App;
