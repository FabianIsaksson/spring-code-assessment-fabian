import { useEffect, useState } from "react";
import "./App.css";
import Playlists from "./components/playlists";
import { getFeaturedPlaylists, getUserPlaylists } from "./api/playlists";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

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
      <div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={() => setSearchTerm("")}
        ></input>
      </div>
      {userPlaylists && (
        <Playlists
          type="user"
          userPlaylists={userPlaylists}
          filter={searchTerm}
        />
      )}
      {featuredPlaylists && (
        <Playlists
          type="featured"
          featuredPlaylists={featuredPlaylists}
          filter={searchTerm}
        />
      )}
    </div>
  );
}

export default App;
