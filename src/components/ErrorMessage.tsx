import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, Button } from '@mui/material';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

function ErrorMessage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Container
      id="error-page"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // 100% of the viewport height
      }}
    >
      <Box textAlign="center">
        <Typography variant="h4">Oops!</Typography>
        <Typography variant="body1">Sorry, an unexpected error has occurred.</Typography>
        {isRouteErrorResponse(error) && (
          <Typography variant="body1" fontStyle="italic">
            {`${error.statusText} (${error.status})`}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/home')}
          sx={{ marginTop: 2 }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}

export default ErrorMessage;
