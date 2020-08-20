import { CONSTANTS } from "../Constants"
import Axios from "axios"
import JwtDecode from "jwt-decode";

class AuthService {
    checkToken = () => {
        if (sessionStorage.getItem("TOKEN")) {
            let decoded = new JwtDecode(sessionStorage.getItem("TOKEN"));
            if (decoded.exp - Math.ceil(Date.now() / 1000) < 100) {
                Axios.post(CONSTANTS.URL + '/user/refresh', {
                    token: sessionStorage.getItem("TOKEN")
                }).then( response => {
                    if (response.data.token) {
                        sessionStorage.setItem("TOKEN", response.data.token);
                    }
                }).catch( error => {
                    this.logout();
                    window.location.replace('/login')
                });
            }
        }
    }
    login = (username, password) => {
        return Axios.post(CONSTANTS.URL + '/user/login', {
            username: username,
            password: password
        }).then( response => {
            if (response.data.token) {
                sessionStorage.setItem("TOKEN", response.data.token);
            }
            return response.data;
        });
    }

    register = (username, password1, password2, name, phone) => {
        return Axios.post(CONSTANTS.URL + '/user/register', {
            username: username,
            password1: password1,
            password2: password2,
            name: name,
            phone: phone,
        })
    }

    logout = () => {
        sessionStorage.removeItem("TOKEN");
    }

    currentUser = () => {
        let decoded = new JwtDecode(sessionStorage.getItem("TOKEN"));
        return decoded.user_id
    }
    isAuthenticated = () => {
        if (sessionStorage.getItem("TOKEN")) {
            return true;
        }
        return false;
    }
    
}

export default new AuthService();