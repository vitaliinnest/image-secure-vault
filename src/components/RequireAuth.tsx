import { Navigate, Outlet, useLocation } from "react-router-dom";
import { TOKEN_STORAGE_KEY } from "../services/consts";
import { useLocalStorage } from "usehooks-ts";

function RequireAuth() {
  const [token] = useLocalStorage<string | undefined>(TOKEN_STORAGE_KEY, undefined);
  const loggedIn = token !== undefined;
  const location = useLocation();
  if (!loggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}

export default RequireAuth;