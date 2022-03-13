import { useEffect, useState } from "react";
import "./App.css";
import Playlists from "./components/playlists";
import { getFeaturedPlaylists, getUserPlaylists } from "./api/playlists";

function App() {
  const [userPlaylists, setUserPlaylists] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse | null>();
  const [featuredPlaylists, setFeaturedPlaylists] =
    useState<SpotifyApi.ListOfFeaturedPlaylistsResponse | null>();

  useEffect(() => {
    getUserPlaylists().then((result) => setUserPlaylists(result));
    getFeaturedPlaylists().then((result) => setFeaturedPlaylists(result));
  }, []);

  return (
    <div className="App">
      <a href="http://localhost:4000/login">Sign in</a>
      {userPlaylists && <Playlists type="user" userPlaylists={userPlaylists} />}
      {featuredPlaylists && (
        <Playlists type="featured" featuredPlaylists={featuredPlaylists} />
      )}
    </div>
  );
}

export default App;
