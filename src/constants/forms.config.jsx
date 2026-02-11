import { APP_CONSTANTS } from './site.config';

export const API_CONFIG = {
  hosts: {
    web: {
      host: APP_CONSTANTS.companyData.domain + '/web',
      type: 'dispatchregister',
    },
    createacc: {
      host: APP_CONSTANTS.companyData.domain + '/api/',
    },
    auth2: {
      host: APP_CONSTANTS.companyData.domain + '/#/?key=',
      endhost: '#/auth',
    },
    usercallback: {
      host: APP_CONSTANTS.companyData.domain + '/api/',
    },
  },
  methods: APP_CONSTANTS.javascript.forms.methods,
  contentType: 'application/json; charset=utf-8',
  sendType: 'POST',
};
