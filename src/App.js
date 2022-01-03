import { GoTriangleLeft, GoTriangleRight } from "react-icons/go"
import './App.css';
import { useEffect, useState } from 'react';
import Spotify from './utils/Spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './components/Players/Player';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Album from './components/album/Album';
import PlayLists from './components/playLists/PlayLists';

const SpotifyNew = new SpotifyWebApi();

function App() {

  const [state, setState] = useState();
  const [trackData, setTrackData] = useState();
  const [url, setUrl] = useState();
  const [isState, setIsState] = useState(true);
  const [isTrackData, setIsTrackData] = useState(false);
  const [isPlayList, setIsPlayList] = useState(false);
  const [isUrl, setIsUrl] = useState(false)
  const accessToken = Spotify.getAccessToken();
  // console.log("Spotify =>", Spotify.getAccessToken());

  useEffect(() => {
    SpotifyNew.setAccessToken(accessToken);
    SpotifyNew.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err, data) {
      if (err) console.error(err);
      else {
        setIsState(true);
        setState(data.items);
      };
    });

  }, [])


  let trackalbum = ids => {
    console.log("tracalbum => ", ids);
    SpotifyNew
      .getAlbum(ids)
      .then(function (data) {
        console.log("Album track => ", data);
        return data.tracks.items.map(function (t) {
          // console.log("iddd =.> ", t.id);
          return t.id;
        });
      })
      .then(function (trackIds) {
        return SpotifyNew.getTracks(trackIds);
      })
      .then(function (tracksInfo) {
        console.log("tracksInfo => ", tracksInfo);
        setIsPlayList(true);
        setIsTrackData(true);
        // setIsUrl(true);
        setTrackData(tracksInfo);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  let onPlayList = (urlData) => {
    console.log("urlData => ", urlData);
    console.log("IseUrl =>", isUrl);
    setIsUrl(true);
    setUrl(urlData);
  }

  let backBtn = () => {
     setIsTrackData(false);
     setIsPlayList(false);
     setIsState(true);
  }

  let forwardBtn = () => {
      setIsPlayList(true);
      setIsState(false);
  }

  // console.log("State =>", state);
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="right-container">
          <div className="back-forw-btn">
            <button onClick={() => backBtn()}><GoTriangleLeft color="black" /></button>
            <button onClick={() => forwardBtn()}><GoTriangleRight color="black" /></button>
          </div>
          <h1>Elvis prisley</h1>
          <div className="container">
            {isState && (<Album state={state} trackalbum={trackalbum} isTrackData={isTrackData}/>)}
            {isPlayList && (<PlayLists trackData={trackData} onPlayList={onPlayList} url={url} />)}
          </div>
        </div>
      </div>
      {isUrl && <Player url={url} />}
    </div>
  );
}

export default App;
