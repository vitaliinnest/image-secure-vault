import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocalStorage } from "usehooks-ts";
import { TOKEN_STORAGE_KEY } from "../services/consts";
import { validateToken } from "../services/web3storage";

function Settings() {
  const [token, setToken] = useLocalStorage<string | undefined>(TOKEN_STORAGE_KEY, undefined);
  const [newToken, setNewToken] = useState<string | undefined>(token);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const validateTokenAsync = async (token: string | undefined): Promise<boolean> => {
    try {
      setLoading(true);
      const isValid = await validateToken(token || "");
      return isValid;
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleTokenChange = async () => {
    if (await validateToken(newToken!)) {
      const isValid = await validateTokenAsync(newToken);
      if (isValid) {
        setToken(newToken);
        setError(undefined);
      } else {
        setError("Invalid token");
      }
    } else {
      setError("Invalid token format");
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
      >
        <TextField
          label="New Token"
          variant="outlined"
          type="password"
          value={newToken}
          onChange={(e) => {
            setNewToken(e.target.value);
            setError(undefined);
          }}
          style={{ marginBottom: "16px" }}
          error={!!error}
          helperText={error}
        />
        <Button variant="contained" color="primary" onClick={handleTokenChange}>
          Change Token
        </Button>
        {loading && <CircularProgress style={{ marginTop: "16px" }} />}
      </Box>
    </Container>
  );
}

export default Settings;
