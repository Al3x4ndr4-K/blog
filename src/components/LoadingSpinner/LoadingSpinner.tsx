import { Box, CircularProgress } from '@mui/material';

export const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '80px',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(235, 238, 243, 0.8)',
        zIndex: 1,
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};
