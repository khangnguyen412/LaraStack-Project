import type { LoginType } from "@/types/login.type";

class Login {
    /**
     * @param {string} username
     * @param {string} password
     */
    username = "";
    password = "";

    constructor({ username, password }: LoginType) {
        this.username = username || ""
        this.password = password || ""
    }

    /**
     * check if username is email
     * @returns {boolean}
     */
    isEmail = () => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.username);
    }

    /**
     * @param {string} userName
     * @returns {{username: string}}
     */
    getUsername = (username: string) => {
        return this.username = username || ""
    }

    /**
     * @param {string} password
     * @returns {{password: string}}
     */
    getPassword = (password: string) => {
        return this.password = password || ""
    }

    /**
     * @returns {{username: string, password: string} | {email: string, password: string}}
     */
    getLoginData = ({ username, password }: LoginType) => {
        this.getUsername(username || "")
        this.getPassword(password || "")
        if (this.isEmail()) {
            return {
                email: this.username,
                password: this.password,
            }
        } else {
            return {
                username: this.username,
                password: this.password,
            }
        }
    }
}
export default Login
