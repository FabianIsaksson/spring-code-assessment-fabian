import "./App.css";
import Playlists from "./components/playlists";

function App() {
  return (
    <div className="App">
      <a href="http://localhost:4000/login">Sign in</a>
      <Playlists />
    </div>
  );
}

export default App;
