import {useState, useEffect} from 'react';
import './App.css';
import BlockContent from "@sanity/block-content-to-react"
import axios from "axios"


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [portableText, setPortableText] = useState([]);

  useEffect(() => {
    const body = '<p>Say hi to <a href="https://portabletext.org"><strong>Portable Text</strong></a></p>'
    axios.post(
      'https://localhost:5001/portabletext', 
      body,
      {
        headers: {
          'Content-Type': 'text/plain'
        }
      })
      .then(result => {
        setPortableText(result.data);
        setIsLoaded(true);
      })
      .catch(error => {
        setIsLoaded(true);
        setError(error);
      })
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <BlockContent blocks={portableText} />
        </header>
      </div>
    );
  }
}

export default App;