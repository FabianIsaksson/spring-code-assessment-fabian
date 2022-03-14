import { useMemo } from "react";
import { Link } from "react-router-dom";
import ListButton, { ListContainer } from "./list-button";
import "./playlists.scss";

const Playlists = ({
  type,
  filter,
  userPlaylists,
  featuredPlaylists,
}: {
  type: "user" | "featured" | "add";
  filter: string;
  userPlaylists?: SpotifyApi.ListOfUsersPlaylistsResponse;
  featuredPlaylists?: SpotifyApi.ListOfFeaturedPlaylistsResponse;
}) => {
  const isUser = type === "user";
  // const isFeatured = !isUser;

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
    </div>
  );
};

export default Playlists;
