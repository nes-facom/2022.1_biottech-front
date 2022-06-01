import axios from "axios";
import { API_ENDPOINT, JWT_TOKEN_NAME } from "../constants"

class AuthService {

    login(email, password) {
        axios
            .post(`${API_ENDPOINT}/users/login.json`, { username: email, password: password })
            .then(response => {
                sessionStorage.setItem(JWT_TOKEN_NAME, response.data.token);
                window.location.href = '/'
            }).catch(error => {
                console.log(error);
            });
    }


    getJWTToken() {
        return sessionStorage.getItem(JWT_TOKEN_NAME);
    }

    isAuthenticated() {
        return this.getJWTToken() != null;
    }

    logout() {
        sessionStorage.removeItem(JWT_TOKEN_NAME);
    }

}

export default new AuthService();