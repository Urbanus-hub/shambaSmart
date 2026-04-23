"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldStatus = getFieldStatus;
function getFieldStatus(stage, expectedHarvestDate) {
    if (stage === "HARVESTED") {
        return "Completed";
    }
    const now = Date.now();
    const harvestTime = expectedHarvestDate.getTime();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    if ((stage === "PLANTED" || stage === "GROWING") &&
        harvestTime - now <= sevenDaysMs) {
        return "At Risk";
    }
    return "Active";
}
