/**
 * @fileoverview Handles unpaired mobile devices and desktop displays.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var HashMap = require('hashmap');

function PairManager() {
  this.mobiles = new HashMap();
  this.desktops = new HashMap();

  this.pairsMobileDesktop = new HashMap();
  this.pairsDesktopMobile = new HashMap();
}

PairManager.prototype.addMobile = function(id, socket) {
  this.mobiles.set(id, socket);
};

PairManager.prototype.addDesktop = function(id, socket) {
  this.desktops.set(id, socket);
};

PairManager.prototype.pair = function(mobileId, desktopId) {
  if (this.mobiles.has(mobileId) &&
      this.desktops.has(desktopId) &&
      !this.pairsMobileDesktop.has(mobileId) &&
      !this.pairsDesktopMobile.has(desktopId)) {
    this.pairsMobileDesktop.set(mobileId, desktopId);
    this.pairsDesktopMobile.set(desktopId, mobileId);
    return this.desktops.get(desktopId);
  }
};

PairManager.prototype.getPairedDesktop = function(mobileId) {
  return this.pairsMobileDesktop.get(mobileId);
};

PairManager.prototype.getPairedMobile = function(desktopId) {
  return this.pairsDesktopMobile.get(desktopId);
};

PairManager.prototype.remove = function(id) {
  this.mobiles.remove(id);
  this.desktops.remove(id);
  this.pairsMobileDesktop.remove(id);
  this.pairsDesktopMobile.remove(id);
};

PairManager.prototype.getSocket = function(id) {
  if (this.mobiles.has(id)) {
    return this.mobiles.get(id);
  } else if (this.desktops.has(id)) {
    return this.desktops.get(id);
  }
  return null;
};

PairManager.prototype.isMobile = function(id) {
  return this.mobiles.has(id);
};

PairManager.prototype.isDesktop = function(id) {
  return this.desktops.has(id);
};

module.exports = PairManager;
