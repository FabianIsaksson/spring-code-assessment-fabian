const Playlists = ({
  playlists,
}: {
  playlists: SpotifyApi.ListOfUsersPlaylistsResponse;
}) => {
  return (
    <ul>
      {playlists.items.map((item) => (
        <li>{item.name} </li>
      ))}
    </ul>
  );
};

export default Playlists;
