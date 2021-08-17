import axios from "axios";

export default axios.create({
  // baseURL: "/api/",
  baseURL: "https://smf-rmuti-control.herokuapp.com/api/",
  // baseURL: "http://http://www.smf-rmuti.lnw.mn/api/",
  headers: {
    "Content-type": "application/json"
  }
});
z