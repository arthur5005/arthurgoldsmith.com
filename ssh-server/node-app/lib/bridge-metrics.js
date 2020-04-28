import humanizeDuration from 'humanize-duration';

export default class BridgeMetrics {
  activeBridges = 0;
  createdBridges = 0;
  startTime;
  lastCreatedBridge; 

  get uptime() {
    return humanizeDuration(Date.now() - this.startTime);
  }

  constructor() {
    this.startTime = Date.now();
  }

  watch(bridge) {
    this.createdBridges++;
    this.lastCreatedBridge = Date.now();

    bridge.on('connected', () => this.activeBridges++);
    bridge.on('destroyed', () => this.activeBridges--);
  }
}
