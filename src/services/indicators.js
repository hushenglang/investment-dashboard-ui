import api from './api';

export const getUSIndicators = async (startDate, endDate) => {
  try {
    const response = await api.get('/indicators/us', {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching US indicators:', error);
    throw error;
  }
};

export const getChinaIndicators = async (startDate, endDate) => {
  try {
    const response = await api.get('/indicators/china', {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching China indicators:', error);
    throw error;
  }
};

export const fetchStoreAllMacroIndices = async (startDate, endDate) => {
  try {
    const response = await api.post('/indicators/fetch-store-all-macro-indices', {
      start_date: startDate,
      end_date: endDate
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching and storing all macro indices:', error);
    throw error;
  }
}; 