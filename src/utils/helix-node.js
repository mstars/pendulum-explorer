const log = require('@/utils/log');
const settings = require('@/utils/settings.js').default;

// The global object for node info etc.
const obj = {
  nodeInfo: {
    appName: null,
    appVersion: null,
    jreAvailableProcessors: null,
    jreFreeMemory: null,
    jreVersion: null,
    jreMaxMemory: null,
    jreTotalMemory: null,
    latestMilestone: null,
    latestMilestoneIndex: null,
    latestSolidSubtangleMilestone: null,
    latestSolidSubtangleMilestoneIndex: null,
    neighbors: null,
    packetsQueueSize: null,
    time: null,
    tips: null,
    transactionsToRequest: null,
    duration: null,
  },
};

// Create HELIX instance directly with provider
const iota = new IOTA({
  provider: settings.get().nodeUrl,
});
obj.iota = iota;

let refreshNodeInfoTmr = null;

obj.unsubscribe = (event) => {
  if (event === 'node-info') {
    if (refreshNodeInfoTmr !== null) {
      clearInterval(refreshNodeInfoTmr);
      refreshNodeInfoTmr = null;
    }
  }
};

obj.subscribe = (event) => {
  if (event === 'node-info') {
    const refreshNodeInfo = () => {
      iota.api.getNodeInfo((error, success) => {
        if (error) {
          log(error);
        } else {
          obj.nodeInfo = success;
        }
      });
    };

    refreshNodeInfoTmr = setInterval(refreshNodeInfo, 2000);
    refreshNodeInfo();
  }
};
module.exports = obj;
