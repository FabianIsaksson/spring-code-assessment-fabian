const Playlists = ({
  playlists,
}: {
  playlists: SpotifyApi.ListOfUsersPlaylistsResponse;
}) => {
  return (
    <ul>
      {playlists.items.map((item) => (
        <li key={item.id}>{item.name} </li>
      ))}
    </ul>
  );
};

export default Playlists;
