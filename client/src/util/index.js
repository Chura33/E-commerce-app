import { axios } from "axios";

const isDevelopment = windows.local.hostname.includes("localhost");

const getServer = () => {
    return isDevelopment ? "http://localhost:5000" : "";
}

export {getServer};