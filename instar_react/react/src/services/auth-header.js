export default function authHeader() {
    return {Authorization: 'JWT ' + sessionStorage.getItem('TOKEN')};
}