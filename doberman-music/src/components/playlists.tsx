import { useMemo } from "react";

const Playlists = ({
  type,
  filter,
  userPlaylists,
  featuredPlaylists,
}: {
  type: "user" | "featured";
  filter: string;
  userPlaylists?: SpotifyApi.ListOfUsersPlaylistsResponse;
  featuredPlaylists?: SpotifyApi.ListOfFeaturedPlaylistsResponse;
}) => {
  const isUser = type === "user";
  const isFeatured = !isUser;

  const userItemsFiltered = useMemo(() => {
    return userPlaylists?.items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [userPlaylists, filter]);

  const featuredItemsFiltered = useMemo(() => {
    return featuredPlaylists?.playlists.items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [userPlaylists, filter]);

  return (
    <div>
      <h2>{isUser ? "My playlists" : "Featured Playlists"}</h2>
      <ul>
        {isUser &&
          userItemsFiltered?.map((item) => <li key={item.id}>{item.name} </li>)}
        {isFeatured &&
          featuredItemsFiltered?.map((item) => (
            <li key={item.id}>{item.name} </li>
          ))}
      </ul>
    </div>
  );
};

export default Playlists;
