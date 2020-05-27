const moment = require('moment');
require('@/lib/iota');
const helixNode = require('@/utils/helix-node');

export default {
  install(Vue, options) {
    Vue.prototype.$localeTimestamp = timestamp => moment(timestamp * 1000).format();

    Vue.prototype.$getQRCode = (address) => {
      const json = {
        address,
        amount: '',
        message: '',
      };
      return JSON.stringify(json);
    };

    Vue.prototype.$getStyleIO = (h1, h2) => {
      if (!(h1 === null || h2 === null) && helixNode.iota.utils.noChecksum(h1) === helixNode.iota.utils.noChecksum(h2)) {
        return 'font-weight: bold; font-style:italic';
      }
    };
  },
};
