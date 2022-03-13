const Playlists = ({
  type,
  userPlaylists,
  featuredPlaylists,
}: {
  type: "user" | "featured";
  userPlaylists?: SpotifyApi.ListOfUsersPlaylistsResponse;
  featuredPlaylists?: SpotifyApi.ListOfFeaturedPlaylistsResponse;
}) => {
  const isUser = type === "user";
  const isFeatured = !isUser;

  return (
    <div>
      <h2>{isUser ? "My playlists" : "Featured Playlists"}</h2>
      <ul>
        {isUser &&
          userPlaylists?.items.map((item) => (
            <li key={item.id}>{item.name} </li>
          ))}
        {isFeatured &&
          featuredPlaylists?.playlists.items.map((item) => (
            <li key={item.id}>{item.name} </li>
          ))}
      </ul>
    </div>
  );
};

export default Playlists;
