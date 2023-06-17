import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Snackbar } from '@material-ui/core';

function AddLyrics() {
  const [countryName, setCountryName] = useState('');
  const [anthemLyrics, setAnthemLyrics] = useState('');
  const [anthemAudio, setAnthemAudio] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleCountryNameChange = (event) => {
    setCountryName(event.target.value);
  };

  const handleAnthemLyricsChange = (event) => {
    setAnthemLyrics(event.target.value);
  };

  const handleAnthemAudioChange = (event) => {
    setAnthemAudio(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('countryName', countryName);
    formData.append('anthemLyrics', anthemLyrics);
    formData.append('anthemAudio', anthemAudio);

    try {
      await axios.post('http://ec2-43-206-92-46.ap-northeast-1.compute.amazonaws.com:8080/api/lyrics/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear form inputs
      setCountryName('');
      setAnthemLyrics('');
      setAnthemAudio(null);

      setSuccessOpen(true);
    } catch (error) {
      console.error('Error adding lyrics:', error);
      setErrorOpen(true);
    }
  };

  const handleCloseSuccess = () => {
    setSuccessOpen(false);
  };

  const handleCloseError = () => {
    setErrorOpen(false);
  };

  return (
    <div>
      <h2>Add Lyrics</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Country Name"
          fullWidth
          required
          value={countryName}
          onChange={handleCountryNameChange}
        />
        <TextField
          label="Anthem Lyrics"
          fullWidth
          multiline
          rows={4}
          required
          value={anthemLyrics}
          onChange={handleAnthemLyricsChange}
        />
        <input type="file" accept="audio/mpeg" onChange={handleAnthemAudioChange} />
        <Button type="submit" variant="contained" color="primary">
          Add Lyrics
        </Button>
      </form>
      <Snackbar
        open={successOpen}
        onClose={handleCloseSuccess}
        message="Lyrics added successfully!"
        autoHideDuration={3000}
      />
      <Snackbar
        open={errorOpen}
        onClose={handleCloseError}
        message="Failed to add lyrics. Please try again."
        autoHideDuration={3000}
      />
    </div>
  );
}

export default AddLyrics;
