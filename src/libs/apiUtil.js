import axios from 'axios';

let apiUtil = {

};

const ajaxUrl = process.env.NODE_ENV === 'development' ?
    'http://localhost:8010' :
    process.env.NODE_ENV === 'production' ?
    'https://dev.xbcmz.top/vue2-demo-api' :
    'http://localhost:8080';

apiUtil.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

export default apiUtil;