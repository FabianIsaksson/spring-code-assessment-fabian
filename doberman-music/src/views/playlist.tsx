import { useEffect, useState } from "react";
import { getPlaylist } from "../api/playlists";
import { useParams } from "react-router";

const Playlist = ({ user }: { user: SpotifyApi.UserObjectPrivate | null }) => {
  const [searchTerm, setSearchTerm] = useState("");
  let { id } = useParams();

  const [playlist, setPlaylist] =
    useState<SpotifyApi.SinglePlaylistResponse | null>();

  useEffect(() => {
    getPlaylist(id).then((result) => setPlaylist(result));
  }, [id]);

  return (
    <div>
      <div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={() => setSearchTerm("")}
        ></input>
      </div>
      {playlist && (
        <div>
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
          <ul>
            {playlist.tracks.items.map((item) => (
              <li key={item.track.id}>
                <p>{item.track.name}</p>
                <p>{item.track.artists.map((a) => a.name).join(", ")}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Playlist;
