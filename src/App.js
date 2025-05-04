import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box, Button, Snackbar, CircularProgress } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import Header from './components/layout/Header';
import EconomicAnalysis from './components/economic/EconomicAnalysis';
import IndustryAnalysis from './components/industry/IndustryAnalysis';
import MarketAnalysis from './components/market/MarketAnalysis';
import DateRangePicker from './components/DateRangePicker';
import { getUSIndicators, getChinaIndicators, fetchStoreAllMacroIndices } from './services/indicators';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [startDate, setStartDate] = useState(dayjs().subtract(6, 'month').startOf('month'));
  const [endDate, setEndDate] = useState(dayjs());
  const [usIndicators, setUSIndicators] = useState(null);
  const [chinaIndicators, setChinaIndicators] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchIndicators = async () => {
    try {
      const [usData, chinaData] = await Promise.all([
        getUSIndicators(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')),
        getChinaIndicators(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'))
      ]);
      setUSIndicators(usData);
      setChinaIndicators(chinaData);
    } catch (error) {
      console.error('Error fetching indicators:', error);
    }
  };

  const handleFetchAll = async () => {
    setIsLoading(true);
    try {
      const response = await fetchStoreAllMacroIndices(
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD')
      );
      if (response.status === 'success') {
        setSnackbarMessage('Successfully fetched and stored all macro indices');
        setSnackbarOpen(true);
        // Refresh the indicators after successful fetch
        fetchIndicators();
      }
    } catch (error) {
      setSnackbarMessage('Failed to fetch and store macro indices');
      setSnackbarOpen(true);
      console.error('Error fetching all macro indices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchIndicators();
  }, [startDate, endDate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleFetchAll}
              disabled={isLoading}
              sx={{ 
                mt: 1,
                minWidth: 100,
                position: 'relative'
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                  <span style={{ visibility: 'hidden' }}>Fetch All</span>
                </>
              ) : (
                'Fetch All'
              )}
            </Button>
          </Box>
          <EconomicAnalysis usIndicators={usIndicators} chinaIndicators={chinaIndicators} />
          <IndustryAnalysis />
          <MarketAnalysis />
        </Container>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
}

export default App; 