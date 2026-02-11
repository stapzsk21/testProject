import axios from 'axios';

// Копирайты
import { COPYRIGHTS } from '../../../constants/copyrights';
import { API_CONFIG } from '../../../constants/forms.config';
// Глобальные переменные
import { APP_CONSTANTS } from '../../../constants/site.config';
import getBasePath from '../../functions/beta/getBasePath';

class FormHandler {
  constructor() {
    // Инициализация с языком по умолчанию
    this.defaultLanguage = APP_CONSTANTS.languages.default;
  }

  getMessage(type, language = this.defaultLanguage) {
    // Создаем сообщения динамически в зависимости от переданного языка
    const messages = {
      errorUserExist: {
        title: COPYRIGHTS.titleError?.[language],
        message: COPYRIGHTS.errorUserExist?.[language],
        type: 'error',
      },
      captchaInfo: {
        title: COPYRIGHTS.captchaTitle?.[language],
        message: COPYRIGHTS.placeholderCaptcha?.[language],
        type: 'captcha',
      },
      errorPhoneExist: {
        title: COPYRIGHTS.titleError?.[language],
        message: COPYRIGHTS.errorPhoneExist?.[language],
        type: 'error',
      },
      errorGlobal: {
        title: COPYRIGHTS.titleError?.[language],
        message: COPYRIGHTS.errorGlobal?.[language],
        type: 'error',
      },
      errorSubmitTime: {
        title: 'Информация',
        message: COPYRIGHTS.errorSubmitTime?.[language],
        type: 'error',
      },
      errorCountryBlock: {
        title: COPYRIGHTS.countryBlockTitle?.[language],
        message: COPYRIGHTS.countryBlockText?.[language],
        type: 'error',
      },
      tooManyRequests: {
        title: COPYRIGHTS.titleError?.[language],
        message: COPYRIGHTS.tooManyRequests?.[language],
        type: 'error',
      },
      errorPassword: {
        title: COPYRIGHTS.titleError?.[language],
        message: COPYRIGHTS.errorPassword?.[language],
        type: 'error',
      },
      success: {
        title: COPYRIGHTS.titleSuccess?.[language],
        message: COPYRIGHTS.textSuccess?.[language],
        type: 'success',
      },
      successRepass: {
        title: COPYRIGHTS.titleSuccess?.[language],
        message: COPYRIGHTS.successRepass?.[language],
        type: 'success',
      },
      twoFaGoogle: {
        title: COPYRIGHTS.titleTwoauthGoogle?.[language],
        message: COPYRIGHTS.enterCode?.[language],
        type: 'error',
      },
      twoFaEmail: {
        title: COPYRIGHTS.titleTwoauthEmail?.[language],
        message: COPYRIGHTS.enterCode?.[language],
        type: 'error',
      },
      errorNewsLoad: {
        title: COPYRIGHTS.titleError?.[language],
        message: COPYRIGHTS.textError?.[language],
        type: 'error',
      },
    };

    return messages[type] || messages.errorGlobal;
  }

  async axiosAPI(url, data) {
    try {
      const response = await axios({
        method: API_CONFIG.sendType,
        url: url,
        headers: {
          'Content-Type': API_CONFIG.contentType,
        },
        data: data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  hasEmailCookie() {
    return document.cookie.split(';').some((cookie) => {
      const [name] = cookie.trim().split('=');
      console.log(name);
      return name === 'email';
    });
  }

  async getNews(lang, category) {
    const path = getBasePath();
    const getPath = path + 'php/rssrequest.php';
    try {
      const response = await axios.get(getPath, {
        params: { lang, category },
      });
      return response.data;
    } catch (error) {
      throw new Error('errorNewsLoad');
    }
  }
}

export default new FormHandler();
