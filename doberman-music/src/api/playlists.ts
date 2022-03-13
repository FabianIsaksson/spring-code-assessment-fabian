import { userIsAuthenticated } from "./auth";

export const getUserPlaylists =
  async (): Promise<SpotifyApi.ListOfUsersPlaylistsResponse | null> => {
    let data: SpotifyApi.ListOfUsersPlaylistsResponse | null = null;

    if (userIsAuthenticated()) {
      await fetch("http://localhost:4000/user-playlists", {
        method: "GET",
        credentials: "include",
      })
        .then((r) => r.json())
        .then((result: SpotifyApi.ListOfUsersPlaylistsResponse) => {
          data = result;
        });
    }

    return data;
  };

export const getFeaturedPlaylists =
  async (): Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse | null> => {
    let data: SpotifyApi.ListOfFeaturedPlaylistsResponse | null = null;

    if (userIsAuthenticated()) {
      await fetch("http://localhost:4000/featured-playlists", {
        method: "GET",
        credentials: "include",
      })
        .then((r) => r.json())
        .then((result: SpotifyApi.ListOfFeaturedPlaylistsResponse) => {
          data = result;
        });
    }

    return data;
  };
