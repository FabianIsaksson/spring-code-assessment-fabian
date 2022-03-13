import { userIsAuthenticated } from "./auth";

export const getUser =
  async (): Promise<SpotifyApi.UserObjectPrivate | null> => {
    let data: SpotifyApi.UserObjectPrivate | null = null;

    if (userIsAuthenticated()) {
      await fetch("http://localhost:4000/user", {
        method: "GET",
        credentials: "include",
      })
        .then((r) => r.json())
        .then((result: SpotifyApi.UserObjectPrivate) => {
          data = result;
        });
    }

    return data;
  };

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

export const getPlaylist = async (
  id: string | undefined,
): Promise<SpotifyApi.SinglePlaylistResponse | null> => {
  let data: SpotifyApi.SinglePlaylistResponse | null = null;

  if (userIsAuthenticated() && id) {
    await fetch(`http://localhost:4000/playlist?id=${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((r) => r.json())
      .then((result: SpotifyApi.SinglePlaylistResponse) => {
        data = result;
      });
  }

  return data;
};

export const addTrack = async (
  id: string | undefined,
  trackUri: string | undefined,
): Promise<SpotifyApi.SinglePlaylistResponse | null> => {
  let data: SpotifyApi.SinglePlaylistResponse | null = null;

  if (userIsAuthenticated() && id && trackUri) {
    await fetch(
      `http://localhost:4000/playlist-add-track?id=${id}&track=${trackUri}`,
      {
        method: "POST",
        credentials: "include",
      },
    )
      .then((r) => r.json())
      .then((result: SpotifyApi.SinglePlaylistResponse) => {
        data = result;
      });
  }

  return data;
};
