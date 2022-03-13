import { useEffect, useState } from "react";
import { addTrack, getPlaylist, getUserPlaylists } from "../api/playlists";
import { useParams } from "react-router";
import { ReactComponent as Heart } from "../static/icons/heart.svg";
import { ReactComponent as Close } from "../static/icons/close.svg";

const Playlist = ({ user }: { user: SpotifyApi.UserObjectPrivate | null }) => {
  let { id } = useParams();
  const [selectedTrack, setSelectedTrack] =
    useState<SpotifyApi.PlaylistTrackObject>();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [userPlaylists, setUserPlaylists] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse | null>();
  const [playlist, setPlaylist] =
    useState<SpotifyApi.SinglePlaylistResponse | null>();

  useEffect(() => {
    getPlaylist(id).then((result) => setPlaylist(result));
  }, [id]);

  useEffect(() => {
    getUserPlaylists().then((result) => setUserPlaylists(result));
  }, []);

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
                <Heart
                  onClick={() => {
                    setSelectedTrack(item);
                    setShowModal(true);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div
        style={{
          position: "fixed",
          background: "white",
          bottom: 0,
          width: "100%",
          height: "60vh",
          display: showModal ? "block" : "none",
        }}
      >
        Add song to playlist
        <div>
          <Close onClick={() => setShowModal(false)} />

          <ul>
            {userPlaylists?.items?.map((item) => (
              <li
                onClick={() => {
                  addTrack(item.id, selectedTrack?.track.uri);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
