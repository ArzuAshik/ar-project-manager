import { userLoggedIn } from "./authSlice";

const onQueryStarted = async (arg, { queryFulfilled, dispatch }) => {
    try {
        const result = await queryFulfilled;

        localStorage.setItem(
            "auth",
            JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
            })
        );

        dispatch(
            userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
            })
        );
    } catch (err) {
        // do nothing
    }
}

const registerUser = builder => {
    return builder.mutation({
        query: (data) => ({
            url: "/register",
            method: "POST",
            body: data,
        }),
        onQueryStarted,
    })
}

export default registerUser;