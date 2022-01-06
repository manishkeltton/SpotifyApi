const clientID = "f2dd2457309f4707962f209d3d55c38e";
const redirectUrl = "http://localhost:3000";

let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        // console.log("accessTokenMatch =>",accessTokenMatch);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        // console.log("expiresInMatch => ", expiresInMatch);
        if (accessTokenMatch && expiresInMatch) {

            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } 
        else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
            window.location = accessUrl;
        }
    }
}

export default Spotify;