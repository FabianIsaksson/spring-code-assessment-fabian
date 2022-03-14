import { useEffect, useState } from "react";
import Playlists from "../components/playlists";
import { getFeaturedPlaylists, getUserPlaylists } from "../api/playlists";
import "./library.scss";
import Avatar from "../components/avatar";

const Library = ({ user }: { user: SpotifyApi.UserObjectPrivate | null }) => {
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
    <div className="library-container">
      <Avatar
        name={user?.display_name ?? ""}
        image={user?.images?.[0]?.url ?? ""}
      />
      <div className="library-searchbar">
        <input
          value={searchTerm}
          placeholder="Search..."
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
};

export default Library;
