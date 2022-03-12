import "./App.css";
import Playlists from "./components/playlists";

/*
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));

*/

const client_id = "CLIENT_ID";
const redirect_uri = "http://localhost:8888/callback";

function App() {
  return (
    <div className="App">
      <Playlists />
    </div>
  );
}

export default App;
