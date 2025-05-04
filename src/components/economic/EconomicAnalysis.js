import React from 'react';
import { Box, Tab, Tabs, Paper } from '@mui/material';
import USIndicators from './USIndicators';
import ChinaIndicators from './ChinaIndicators';

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index} role="tabpanel">
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const EconomicAnalysis = ({ usIndicators, chinaIndicators }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="US Economic Indicators" />
          <Tab label="China Economic Indicators" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <USIndicators indicators={usIndicators?.indicators} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChinaIndicators indicators={chinaIndicators?.indicators} />
      </TabPanel>
    </Paper>
  );
};

export default EconomicAnalysis; 