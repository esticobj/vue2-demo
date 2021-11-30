import axios from 'axios';
import env from '@/config/env';

let apiUtil = {

};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:8888' :
    env === 'production' ?
    'https://www.url.com' :
    'http://localhost:9010';

apiUtil.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

export default apiUtil;