import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IndicatorCard = ({ title, latestValue, prevValue, latestDate, prevDate, timeSeriesData, onShowChart }) => {
  const formatValue = (value) => typeof value === 'number' ? value.toFixed(2) : value;
  const calculateChange = () => {
    if (typeof latestValue === 'number' && typeof prevValue === 'number') {
      const change = ((latestValue - prevValue) / prevValue) * 100;
      return change.toFixed(2) + '%';
    }
    return 'N/A';
  };

  return (
    <Card sx={{ minWidth: 275, m: 1 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="h4" color="primary">
          {formatValue(latestValue)}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Last updated: {new Date(latestDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Previous: {formatValue(prevValue)} ({calculateChange()})
          <br />
          {new Date(prevDate).toLocaleDateString()}
        </Typography>
        {timeSeriesData && timeSeriesData.length > 0 && (
          <Button 
            variant="outlined" 
            size="small" 
            onClick={onShowChart}
            sx={{ mt: 1 }}
          >
            Show Chart
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const TimeSeriesChart = ({ data, title, onClose }) => {
  // Sort data by date in ascending order (oldest first)
  const sortedData = [...data].sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

  // Calculate min and max values for Y axis
  const values = sortedData.map(item => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue;
  const yAxisMin = minValue - (valueRange * 0.1); // Add 10% padding
  const yAxisMax = maxValue + (valueRange * 0.1);

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title} - Historical Data</DialogTitle>
      <DialogContent>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart
              data={sortedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date_time" 
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[yAxisMin, yAxisMax]}
                tickFormatter={(value) => value.toFixed(2)}
              />
              <Tooltip 
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value) => [value.toFixed(2), title]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                name={title}
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ChinaIndicators = ({ indicators }) => {
  const [selectedChart, setSelectedChart] = useState(null);

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
              title={indicator.latest.name.replace(/_/g, ' ')}
              latestValue={indicator.latest.value}
              prevValue={indicator.prev.value}
              latestDate={indicator.latest.date_time}
              prevDate={indicator.prev.date_time}
              timeSeriesData={indicator.all}
              onShowChart={() => setSelectedChart({
                data: indicator.all,
                title: indicator.latest.name.replace(/_/g, ' ')
              })}
            />
          </Grid>
        ))}
      </Grid>
      {selectedChart && (
        <TimeSeriesChart
          data={selectedChart.data}
          title={selectedChart.title}
          onClose={() => setSelectedChart(null)}
        />
      )}
    </div>
  );
};

export default ChinaIndicators; 