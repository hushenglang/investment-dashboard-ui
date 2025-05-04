import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const IndicatorCard = ({ title, value, date }) => (
  <Card sx={{ minWidth: 275, m: 1 }}>
    <CardContent>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="h4" color="primary">
        {typeof value === 'number' ? value.toFixed(2) : value}
      </Typography>
      <Typography color="text.secondary">
        Last updated: {new Date(date).toLocaleDateString()}
      </Typography>
    </CardContent>
  </Card>
);

const ChinaIndicators = ({ indicators }) => {
  if (!indicators) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>China Economic Indicators</Typography>
      <Grid container>
        {Object.entries(indicators).map(([key, indicator]) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <IndicatorCard
              title={indicator.name.replace(/_/g, ' ')}
              value={indicator.value}
              date={indicator.date_time}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ChinaIndicators; 