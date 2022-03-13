import { useMemo } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h2>{isUser ? "My playlists" : "Featured Playlists"}</h2>
      {filteredItems.length < 1 && <p>No playlists</p>}
      <ul>
        {filteredItems?.map((item) => (
          <Link key={item.id} to={`/playlist/${item.id}`}>
            <li>{item.name} </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;
