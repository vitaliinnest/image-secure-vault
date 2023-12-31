import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Container, Box, CircularProgress } from '@mui/material';
import { validateToken } from '../services/web3storage';
import { TOKEN_STORAGE_KEY } from '../services/consts';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useLocalStorage } from 'usehooks-ts';

const AuthorizationPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToken] = useLocalStorage<string | undefined>(TOKEN_STORAGE_KEY, undefined);
  const [invalidToken, setInvalidToken] = useState(false);
  const [tokenValue, setTokenValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuthorization = async () => {
    if (tokenValue.trim() === '') {
      setInvalidToken(true);
      return;
    }

    setLoading(true);
    const isValid = await validateToken(tokenValue);
    setLoading(false);

    if (isValid) {
      setToken(tokenValue);
      console.log('Token saved. Navigating to /home');
      navigate('/home');
    } else {
      setInvalidToken(true);
    }
  };

  const handleTokenChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTokenValue(event.target.value);
    setInvalidToken(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CameraAltIcon sx={{ fontSize: 100, color: '#3498db' }} />
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
          Welcome to <br/>Image Secure Vault
        </Typography>
  
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Log in with your web3.storage authorization token to access the secure vault.
          <br/>Our AI ensures the safety of your images.
          <br/><br/>
          Need a token? See how to generate one{' '}
          <a
            href="https://old.web3.storage/docs/how-tos/generate-api-token/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>.
        </Typography>
  
        <TextField
          margin="normal"
          required
          fullWidth
          id="token"
          label="Token"
          name="token"
          autoComplete="token"
          autoFocus
          value={tokenValue}
          onChange={handleTokenChange}
          error={invalidToken}
          helperText={invalidToken ? 'Invalid token. Please enter a valid token.' : ''}
          type="password"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAuthorization}
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Authorize'}
        </Button>
      </Box>
    </Container>
  );
};

export default AuthorizationPage;
