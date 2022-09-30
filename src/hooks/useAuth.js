import { useSelector } from "react-redux";
import selectAuth from "../features/selectors/selectAuth";

export default function useAuth() {
    const auth = useSelector(selectAuth);

    if (auth?.accessToken && auth?.user) {
        return true;
    } else {
        return false;
    }
}
