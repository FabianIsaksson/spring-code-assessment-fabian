import { useCallback, useEffect, useState } from "react";
import { addTrack, getPlaylist, getUserPlaylists } from "../api/playlists";
import { useParams } from "react-router";
import { ReactComponent as Heart } from "../static/icons/heart.svg";
import { ReactComponent as Close } from "../static/icons/close.svg";
import { ReactComponent as ArrowLeft } from "../static/icons/arrow-left.svg";
import "./playlist.scss";
import ListButton, { ListContainer } from "../components/list-button";

const Playlist = ({ user }: { user: SpotifyApi.UserObjectPrivate | null }) => {
  let { id } = useParams();
  const [selectedTrack, setSelectedTrack] =
    useState<SpotifyApi.PlaylistTrackObject>();
  const [showModal, setShowModal] = useState(false);

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

  const triggerRefetch = useCallback(() => {
    getPlaylist(id).then((result) => setPlaylist(result));
    getUserPlaylists().then((result) => setUserPlaylists(result));
  }, [id]);

  return (
    <div className="playlist-container">
      <button
        onClick={() => (window.location.pathname = "/")}
        className="playlist-backbutton"
      >
        <ArrowLeft />
      </button>

      {playlist && (
        <div>
          <div className="playlist-header">
            <div>
              <h2>{playlist.name}</h2>
              <p>{playlist.description}</p>
            </div>
            {playlist.images[0] && (
              <img src={playlist.images[0]?.url} alt="playlist" />
            )}
          </div>

          <ul className="playlist-tracklist-container">
            {playlist.tracks.items.map(
              (item, i) =>
                item.track && (
                  <li
                    className="playlist-tracklist-item"
                    key={item.track.id + i}
                  >
                    <div className="playlist-tracklist-item-text">
                      {item.track.name && (
                        <p className="playlist-tracklist-item-text-name">
                          {item.track.name}
                        </p>
                      )}
                      <p className="playlist-tracklist-item-text-artists">
                        {item.track.artists.map((a) => a.name).join(", ")}
                      </p>
                    </div>

                    <Heart
                      onClick={() => {
                        setSelectedTrack(item);
                        setShowModal(true);
                      }}
                    />
                  </li>
                ),
            )}
          </ul>
        </div>
      )}
      {showModal && (
        <div
          className="playlist-modal"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <div
            className="playlist-modal-content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3>Add song to playlist</h3>
            <div>
              <button
                className="playlist-modal-closebutton"
                onClick={() => setShowModal(false)}
              >
                <Close />
              </button>
              <ListContainer>
                {userPlaylists?.items?.map((item, i) => (
                  <ListButton
                    key={item.id + i}
                    name={item.name}
                    image={item.images[0]?.url}
                    onClick={() => {
                      addTrack(item.id, selectedTrack?.track.uri);
                      setTimeout(() => {
                        triggerRefetch();
                      }, 500);
                    }}
                  />
                ))}
              </ListContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist;
