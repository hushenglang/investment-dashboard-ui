import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={onStartDateChange}
          maxDate={endDate}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true
            }
          }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={onEndDateChange}
          minDate={startDate}
          maxDate={dayjs()}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true
            }
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker; 