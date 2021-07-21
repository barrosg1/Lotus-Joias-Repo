import axios from "axios";

// set the token to every request if the user is logged in

const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-auth-token"];
    }
};

export default setAuthToken;
