/* eslint-disable no-undef */
import Parse from "parse";

const APP_ID = process.env.REACT_APP_APP_ID;
const JS_KEY = process.env.REACT_APP_API_KEY;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = SERVER_URL;

export default Parse;
