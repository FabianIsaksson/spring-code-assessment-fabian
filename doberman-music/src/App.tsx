import { useEffect, useState } from "react";
import "./App.css";
import Playlists from "./components/playlists";
import { getUserPlaylists } from "./api/playlists";

function App() {
  const [playlists, setPlaylists] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse | null>();

  useEffect(() => {
    getUserPlaylists().then((result) => setPlaylists(result));
  }, []);

  return (
    <div className="App">
      <a href="http://localhost:4000/login">Sign in</a>
      {playlists && <Playlists playlists={playlists} />}
    </div>
  );
}

export default App;
