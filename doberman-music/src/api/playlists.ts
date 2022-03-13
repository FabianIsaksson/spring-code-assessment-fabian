import { userIsAuthenticated } from "./auth";

export const getUserPlaylists =
  async (): Promise<SpotifyApi.ListOfUsersPlaylistsResponse | null> => {
    let userPlaylists: SpotifyApi.ListOfUsersPlaylistsResponse | null = null;

    if (userIsAuthenticated()) {
      await fetch("http://localhost:4000/user-playlists", {
        method: "GET",
        credentials: "include",
      })
        .then((r) => r.json())
        .then((data: SpotifyApi.ListOfUsersPlaylistsResponse) => {
          userPlaylists = data;
        });
    }

    return userPlaylists;
  };
