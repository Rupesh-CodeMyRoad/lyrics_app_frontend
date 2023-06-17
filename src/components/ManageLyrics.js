import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
} from '@material-ui/core';

function ManageLyrics() {
  const [lyrics, setLyrics] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLyric, setSelectedLyric] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [anthemLyrics, setAnthemLyrics] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteLyricId, setDeleteLyricId] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://ec2-43-206-92-46.ap-northeast-1.compute.amazonaws.com:8080/api/lyrics');
      setLyrics(result.data);
    };
    fetchData();
  }, []);

  const handleOpen = (lyric) => {
    setSelectedLyric(lyric);
    setCountryName(lyric.countryName);
    setAnthemLyrics(lyric.anthemLyrics);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedLyric(null);
    setCountryName('');
    setAnthemLyrics('');
    setOpen(false);
  };

  const handleDelete = async (id) => {
    setDeleteConfirmationOpen(true);
    setDeleteLyricId(id);
  };

  const handleSave = async () => {
    if (selectedLyric) {
      // Edit lyric
      const updatedLyric = new FormData();
      updatedLyric.append('countryName', countryName);
      updatedLyric.append('anthemLyrics', anthemLyrics);
      updatedLyric.append('anthemAudio', selectedLyric.anthemAudio);
      await axios.put(`http://ec2-43-206-92-46.ap-northeast-1.compute.amazonaws.com:8080/api/lyrics/update`, updatedLyric, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // Create lyric
      const newLyric = new FormData();
      newLyric.append('countryName', countryName);
      newLyric.append('anthemLyrics', anthemLyrics);
      newLyric.append('anthemAudio', null); // Set the file input value to this property
      await axios.post('http://ec2-43-206-92-46.ap-northeast-1.compute.amazonaws.com:8080/api/lyrics/add', newLyric, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  
    // Refresh the lyrics list
    const result = await axios.get('http://ec2-43-206-92-46.ap-northeast-1.compute.amazonaws.com:8080/api/lyrics');
    setLyrics(result.data);
  
    handleClose();
    setSuccessOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    await axios.delete(`http://ec2-43-206-92-46.ap-northeast-1.compute.amazonaws.com:8080/api/lyrics/delete/${deleteLyricId}`);

    // Refresh the lyrics list
    const result = await axios.get('http://ec2-43-206-92-46.ap-northeast-1.compute.amazonaws.com:8080/api/lyrics');
    setLyrics(result.data);

    setDeleteConfirmationOpen(false);
    };
    
    const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    };
    
    const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Set the anthemAudio state to the selected file
    setSelectedLyric((prevLyric) => ({ ...prevLyric, anthemAudio: file }));
    };
    
    const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }
    setSuccessOpen(false);
    setErrorOpen(false);
    };
    
    return (
    <div>
    <h2>Manage Lyrics</h2>
    <TableContainer component={Paper}>
    <Table>
    <TableHead>
    <TableRow>
    <TableCell>Country Name</TableCell>
    <TableCell>Anthems Lyrics</TableCell>
    <TableCell></TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {lyrics.map((lyric) => (
    <TableRow key={lyric.id}>
    <TableCell>{lyric.countryName}</TableCell>
    <TableCell>{lyric.anthemLyrics}</TableCell>
    <TableCell>
    <Button variant="outlined" color="primary" onClick={() => handleOpen(lyric)}>
    Edit
    </Button>
    <Button variant="outlined" color="secondary" onClick={() => handleDelete(lyric.id)}>
    Delete
    </Button>
    </TableCell>
    </TableRow>
    ))}
    </TableBody>
    </Table>
    </TableContainer>
    <Button variant="contained" color="primary" onClick={() => handleOpen('/add-lyrics')}>
    Add New Lyric
    </Button>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{selectedLyric ? 'Edit Lyric' : 'Add New Lyric'}</DialogTitle>
    <DialogContent>
      <TextField
        label="Country Name"
        fullWidth
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
      />
      <TextField
        label="Anthem Lyrics"
        fullWidth
        multiline
        rows={4}
        value={anthemLyrics}
        onChange={(e) => setAnthemLyrics(e.target.value)}
      />
      {selectedLyric && (
        <div>
          <label htmlFor="anthemAudio">Audio:</label>
          <input type="file" id="anthemAudio" accept="audio/mpeg" onChange={handleFileChange} />
        </div>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleSave} color="primary">
        {selectedLyric ? 'Save' : 'Add'}
      </Button>
    </DialogActions>
  </Dialog>
  <Dialog open={deleteConfirmationOpen} onClose={handleDeleteCancel}>
    <DialogTitle>Confirmation</DialogTitle>
    <DialogContent>
      Are you sure you want to delete this lyric?
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDeleteCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={handleDeleteConfirmation} color="secondary">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
  <Snackbar
    open={successOpen}
    autoHideDuration={3000}
    onClose={handleSnackbarClose}
    message="Lyrics added/updated successfully"
  />
  <Snackbar
    open={errorOpen}
    autoHideDuration={3000}
    onClose={handleSnackbarClose}
    message="Failed to add/update lyrics. Please try again."
    />
    </div>
    );
    }
    
    export default ManageLyrics;
