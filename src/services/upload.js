import * as axios from 'axios';

// const BASE_URL = 'http://localhost:808"';
const BASE_URL = 'http://smf-rmuti-control.herokuapp.com';

function upload(formData) {
    const url = `${BASE_URL}/api/csv/upload`;
    return axios.post(url, formData)
}
export { upload }