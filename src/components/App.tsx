import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import NavBar from "./NavBar";
import AuthorizationPage from "./AuthorizationPage";
import { useLocalStorage } from "usehooks-ts";
import { TOKEN_STORAGE_KEY } from "../services/consts";
// https://github.com/mui/material-ui/issues/31835

const theme = createTheme({
  palette: {
    primary: {
      main: "#3498db",
    },
    secondary: {
      main: "#2ecc71",
    },
    background: {
      default: "#f4f4f4",
    },
    text: {
      primary: "#333",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 4,
});

function App() {
  const [loggedIn] = useLocalStorage(TOKEN_STORAGE_KEY, false);
  return (
    <ThemeProvider theme={theme}>
      {!loggedIn ? (
        <AuthorizationPage />
      ) : (
        <>
          <NavBar />
          <Outlet />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
