import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";
import useAuth from "./useAuth";

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const isAuthenticated = useAuth();

    useEffect(() => {
        if (isAuthenticated) return;
        const localAuth = localStorage?.getItem("auth");

        if (localAuth) {
            const auth = JSON.parse(localAuth);
            if (auth?.accessToken && auth?.user) {
                dispatch(
                    userLoggedIn({
                        accessToken: auth.accessToken,
                        user: auth.user,
                    })
                );
            }
        }
    }, [dispatch, isAuthenticated]);

    return isAuthenticated;
}
