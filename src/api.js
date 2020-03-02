import axios from 'axios';

axios.defaults.baseURL =
  __buildEnv__ === 'production' ? 'https://edge-translate.lexswed.now.sh/' : 'http://localhost:3000/';

export const getLanguages = () => axios('/api/languages').then(res => res.data);

export const translate = params => axios('/api/translate', { params }).then(res => res.data);
