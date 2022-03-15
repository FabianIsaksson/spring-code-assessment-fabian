import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ListButton, { ListContainer } from "./list-button";
import { ReactComponent as Plus } from "../static/icons/plus.svg";
import { ReactComponent as Close } from "../static/icons/close.svg";
import "./playlists.scss";
import { addPlaylist } from "../api/playlists";

const Playlists = ({
  type,
  filter,
  userPlaylists,
  featuredPlaylists,
  triggerRefetch,
}: {
  type: "user" | "featured" | "add";
  filter: string;
  userPlaylists?: SpotifyApi.ListOfUsersPlaylistsResponse;
  featuredPlaylists?: SpotifyApi.ListOfFeaturedPlaylistsResponse;
  triggerRefetch?: () => void;
}) => {
  const [nameInput, setNameInput] = useState(
    "My Playlist " + new Date().toLocaleDateString(),
  );

  const [descriptionInput, setDescriptionInput] = useState("");

  const [error, setError] = useState("");

  const isUser = type === "user";
  const [showModal, setShowModal] = useState(false);

  const userItemsFiltered = useMemo(() => {
    return userPlaylists?.items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [userPlaylists, filter]);

  const featuredItemsFiltered = useMemo(() => {
    return featuredPlaylists?.playlists.items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [featuredPlaylists, filter]);

  const filteredItems =
    (isUser ? userItemsFiltered : featuredItemsFiltered) ?? [];

  return (
    <div className="playlists-container">
      <h2 className="playlists-title">
        {isUser ? "My playlists" : "Featured Playlists"}
      </h2>
      {filteredItems.length < 1 && <p>No playlists</p>}
      <ListContainer>
        {filteredItems?.map((item) => (
          <Link key={item.id} to={`/playlist/${item.id}`}>
            <ListButton name={item.name} image={item.images[0]?.url ?? ""} />
          </Link>
        ))}
      </ListContainer>
      {isUser && (
        <button className="playlists-add" onClick={() => setShowModal(true)}>
          <Plus />
          <span>Add playlist</span>
        </button>
      )}
      {showModal && (
        <div
          className="playlists-modal"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <div
            className="playlists-modal-content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3>Add playlist</h3>

            <button
              className="playlists-modal-closebutton"
              onClick={() => setShowModal(false)}
            >
              <Close />
            </button>

            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="Playlist name..."
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={descriptionInput}
              placeholder="Say something about your new playlist..."
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
            {error && <p>{error}</p>}

            <div
              className="playlists-button"
              onClick={() => {
                if (nameInput) {
                  addPlaylist(nameInput, descriptionInput);

                  if (triggerRefetch) {
                    setTimeout(() => {
                      triggerRefetch();
                    }, 500);
                  }

                  setShowModal(false);
                } else {
                  setError("Please input a name for your playlist");
                }
              }}
            >
              Add playlist
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlists;
