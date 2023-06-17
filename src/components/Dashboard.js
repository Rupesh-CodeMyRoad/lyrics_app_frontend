import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Card, CardContent } from '@material-ui/core';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://ec2-43-206-92-46.ap-northeast-1.compute.amazonaws.com:8080/api/lyrics/dashboard');
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardContent style={{ textAlign: 'center' }}>
        {data ? (
          <Typography variant="h4" style={{ marginTop: '20px' }}>
            Total National Anthem: {data.count}
          </Typography>
        ) : (
          <CircularProgress style={{ marginTop: '20px' }} />
        )}
      </CardContent>
    </Card>
  );
}

export default Dashboard;
