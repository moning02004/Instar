import { CONSTANTS } from "../Constants"
import Axios from "axios"
import JwtDecode from "jwt-decode";

class AuthService {
    
    checkToken = () => {
        if (sessionStorage.getItem("TOKEN") !== null) {
            let decoded = new JwtDecode(sessionStorage.getItem("TOKEN"));
            if (decoded.exp - Math.ceil(Date.now() / 1000) < 300) {
                Axios.post(CONSTANTS.URL + '/user/refresh', {
                    token: sessionStorage.getItem("TOKEN")
                }).then( response => {
                    if (response.data.token) {
                        sessionStorage.setItem("TOKEN", response.data.token);
                    }
                }).catch( error => {
                    alert('세션이 만료되어 로그인 페이지로 이동합니다.')
                    this.logout();
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
        })
    }

    register = (username, password1, password2, name, nickname) => {
        return Axios.post(CONSTANTS.URL + '/user/', {
            username: username,
            password1: password1,
            password2: password2,
            name: name,
            nickname: nickname
        })
    }

    logout = () => {
        sessionStorage.removeItem("TOKEN");
        window.location.replace('/login');
    }

    currentUser = () => {
        if (sessionStorage.getItem("TOKEN")) {
            let decoded = new JwtDecode(sessionStorage.getItem("TOKEN"));
            return decoded.user_id
        }
        return null;
    }
    isAuthenticated = () => {
        if (sessionStorage.getItem("TOKEN")) {
            return true;
        }
        return false;
    }
    
}

export default new AuthService();