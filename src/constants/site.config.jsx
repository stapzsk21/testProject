// Набор трафиков и параметров
import { APP_TRAFFICS } from './traffics';

// Ключи трафиков: 'default', 'sp', 'gt', 'dragon', 'express', 'armaniSp', 'indeyka', 'maradona', 'elbGt', 'angelSp'
const currentTraffic = APP_TRAFFICS['default'];

export const APP_CONSTANTS = {
  spam: currentTraffic.spam,
  spamLicense: currentTraffic.spamLicense,
  callbackSocialInputs: currentTraffic.callbackSocialInputs,
  languages: currentTraffic.languages,
  isAnimated: false,
  documents: 3,
  companyData: {
    title: '',
    adres: '',
    phone: '',
    email: '',
    url: '',
    domain: '',
    license: {
      lls1: '',
      lls2: '',
    },
  },

  javascript: {
    index_page: currentTraffic.accounts,
    lisences_page: {
      dfsa: '',
      fca: '',
      vfsc: '',
      cssf: '',
    },
    counterNumbers: {
      item1: {
        number: '',
      },
      item2: {
        number: '',
      },
      item3: {
        number: '',
      },
      item4: {
        number: '',
      },
      item5: {
        number: '',
      },
    },
    table: {
      reservserver: '',
      table_freq_update: 10000,
      instrument_leverage: {
        stocks: '1:20',
        metals: '1:100',
        forex: '1:100',
        commodities: '1:100',
        indices: '1:500',
        crypto: '1:10',
        etf: '1:100',
      },
    },
    forms: {
      sha: '0000',
      methods: {
        createacc: 'CreateUserAndAccounts',
        createtoken: 'CreateToken',
        createtokenGuest: 'CreateGuestToken',
        webAction: 'WebAction',
        reset: 'ResetPassword',
      },
    },
    ip_restrictions: {
      ip_restrictions_flag: true,
      ip_countries: ['US', 'UA', 'IL'],
    },
  },
};
