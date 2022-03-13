import { useEffect, useState } from "react";
import "./App.css";
import Playlists from "./components/playlists";
import Cookies from "universal-cookie";

function App() {
  const [playlists, setPlaylists] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse>();

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("access_token")) {
      fetch("http://localhost:4000/user-playlists", {
        method: "GET",
        credentials: "include",
      })
        .then((r) => r.json())
        .then((data: SpotifyApi.ListOfUsersPlaylistsResponse) => {
          console.log("🚀 ~ file: App.tsx ~ line 19 ~ .then ~ data", data);
          setPlaylists(data);
        });
    } else {
      console.log("User is not signed in");
    }
  }, []);

  return (
    <div className="App">
      <a href="http://localhost:4000/login">Sign in</a>
      {playlists && <Playlists playlists={playlists} />}
    </div>
  );
}

export default App;
