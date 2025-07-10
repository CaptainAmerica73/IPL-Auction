import {useSelector} from "react-redux";
import {RootState} from "../store/store.tsx";

export default function useAuth() {
    return useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
}
