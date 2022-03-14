import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { userIsAuthenticated } from "./api/auth";
import { getUser } from "./api/playlists";
import Library from "./views/library";
import Playlist from "./views/playlist";
import SignIn from "./views/sign-in";

const App = () => {
  const [user, setUser] = useState<SpotifyApi.UserObjectPrivate | null>(null);
  const userAuthenticated = userIsAuthenticated();

  useEffect(() => {
    if (window.location.pathname !== "/sign-in" && !userAuthenticated) {
      window.location.replace("http://localhost:3000/sign-in");
    }
  }, [userAuthenticated]);

  useEffect(() => {
    getUser().then((result) => setUser(result));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Library user={user} />} />
        <Route path="/playlist/:id" element={<Playlist user={user} />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
