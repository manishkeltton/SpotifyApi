const clientID = "f2dd2457309f4707962f209d3d55c38e";
const redirectUrl = "https://sleepy-williams-972fe5.netlify.app"

let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {

            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
            window.location = accessUrl;
        }
    }
}

export default Spotify;