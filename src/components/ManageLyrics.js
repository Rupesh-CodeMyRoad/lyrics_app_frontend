import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageLyrics() {
  const [lyrics, setLyrics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/lyrics');
      setLyrics(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Manage Lyrics</h2>
      <ul>
        {lyrics.map(lyric => (
          <li key={lyric.id}>{lyric.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ManageLyrics;
