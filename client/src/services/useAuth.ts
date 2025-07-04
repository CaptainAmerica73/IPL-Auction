import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function useAuth() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated;
}
