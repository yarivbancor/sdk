"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decimal_js_1 = __importDefault(require("decimal.js"));
var ZERO = new decimal_js_1.default(0);
var ONE = new decimal_js_1.default(1);
var MAX_WEIGHT = new decimal_js_1.default(1000000);
var MAX_FEE = new decimal_js_1.default(1000000);
decimal_js_1.default.set({ precision: 100, rounding: decimal_js_1.default.ROUND_DOWN });
function toWei(amount, decimals) {
    return new decimal_js_1.default(amount + "e+" + decimals).toFixed();
}
exports.toWei = toWei;
function fromWei(amount, decimals) {
    return new decimal_js_1.default(amount + "e-" + decimals).toFixed();
}
exports.fromWei = fromWei;
function toDecimalPlaces(amount, decimals) {
    return amount.toDecimalPlaces(decimals).toFixed();
}
exports.toDecimalPlaces = toDecimalPlaces;
function isTokenEqual(token1, token2) {
    return token1.blockchainType == token2.blockchainType &&
        token1.blockchainId.toLowerCase() == token2.blockchainId.toLowerCase() &&
        token1.symbol == token2.symbol;
}
exports.isTokenEqual = isTokenEqual;
function calculatePurchaseReturn(supply, reserveBalance, reserveWeight, depositAmount) {
    var _a;
    _a = Array.from(arguments).map(function (x) { return new decimal_js_1.default(x); }), supply = _a[0], reserveBalance = _a[1], reserveWeight = _a[2], depositAmount = _a[3];
    // special case for 0 deposit amount
    if (depositAmount.equals(ZERO))
        return ZERO;
    // special case if the weight = 100%
    if (reserveWeight.equals(MAX_WEIGHT))
        return supply.mul(depositAmount).div(reserveBalance);
    // return supply * ((1 + depositAmount / reserveBalance) ^ (reserveWeight / 1000000) - 1)
    return supply.mul((ONE.add(depositAmount.div(reserveBalance))).pow(reserveWeight.div(MAX_WEIGHT)).sub(ONE));
}
exports.calculatePurchaseReturn = calculatePurchaseReturn;
function calculateSaleReturn(supply, reserveBalance, reserveWeight, sellAmount) {
    var _a;
    _a = Array.from(arguments).map(function (x) { return new decimal_js_1.default(x); }), supply = _a[0], reserveBalance = _a[1], reserveWeight = _a[2], sellAmount = _a[3];
    // special case for 0 sell amount
    if (sellAmount.equals(ZERO))
        return ZERO;
    // special case for selling the entire supply
    if (sellAmount.equals(supply))
        return reserveBalance;
    // special case if the weight = 100%
    if (reserveWeight.equals(MAX_WEIGHT))
        return reserveBalance.mul(sellAmount).div(supply);
    // return reserveBalance * (1 - (1 - sellAmount / supply) ^ (1000000 / reserveWeight))
    return reserveBalance.mul(ONE.sub(ONE.sub(sellAmount.div(supply)).pow((MAX_WEIGHT.div(reserveWeight)))));
}
exports.calculateSaleReturn = calculateSaleReturn;
function calculateCrossReserveReturn(sourceReserveBalance, sourceReserveWeight, targetReserveBalance, targetReserveWeight, amount) {
    var _a;
    _a = Array.from(arguments).map(function (x) { return new decimal_js_1.default(x); }), sourceReserveBalance = _a[0], sourceReserveWeight = _a[1], targetReserveBalance = _a[2], targetReserveWeight = _a[3], amount = _a[4];
    // special case for equal weights
    if (sourceReserveWeight.equals(targetReserveWeight))
        return targetReserveBalance.mul(amount).div(sourceReserveBalance.add(amount));
    // return targetReserveBalance * (1 - (sourceReserveBalance / (sourceReserveBalance + amount)) ^ (sourceReserveWeight / targetReserveWeight))
    return targetReserveBalance.mul(ONE.sub(sourceReserveBalance.div(sourceReserveBalance.add(amount)).pow(sourceReserveWeight.div(targetReserveWeight))));
}
exports.calculateCrossReserveReturn = calculateCrossReserveReturn;
function calculateFundCost(supply, reserveBalance, reserveRatio, amount) {
    var _a;
    _a = Array.from(arguments).map(function (x) { return new decimal_js_1.default(x); }), supply = _a[0], reserveBalance = _a[1], reserveRatio = _a[2], amount = _a[3];
    // special case for 0 amount
    if (amount.equals(ZERO))
        return ZERO;
    // special case if the reserve ratio = 100%
    if (reserveRatio.equals(MAX_WEIGHT))
        return (amount.mul(reserveBalance).sub(ONE)).div(supply.add(ONE));
    // return reserveBalance * (((supply + amount) / supply) ^ (MAX_WEIGHT / reserveRatio) - 1)
    return reserveBalance.mul(supply.add(amount).div(supply).pow(MAX_WEIGHT.div(reserveRatio)).sub(ONE));
}
exports.calculateFundCost = calculateFundCost;
function calculateLiquidateReturn(supply, reserveBalance, reserveRatio, amount) {
    var _a;
    _a = Array.from(arguments).map(function (x) { return new decimal_js_1.default(x); }), supply = _a[0], reserveBalance = _a[1], reserveRatio = _a[2], amount = _a[3];
    // special case for 0 amount
    if (amount.equals(ZERO))
        return ZERO;
    // special case for liquidating the entire supply
    if (amount.equals(supply))
        return reserveBalance;
    // special case if the reserve ratio = 100%
    if (reserveRatio.equals(MAX_WEIGHT))
        return amount.mul(reserveBalance).div(supply);
    // return reserveBalance * (1 - ((supply - amount) / supply) ^ (MAX_WEIGHT / reserveRatio))
    return reserveBalance.mul(ONE.sub(supply.sub(amount).div(supply).pow(MAX_WEIGHT.div(reserveRatio))));
}
exports.calculateLiquidateReturn = calculateLiquidateReturn;
function getFinalAmount(amount, conversionFee, magnitude) {
    var _a;
    _a = Array.from(arguments).map(function (x) { return new decimal_js_1.default(x); }), amount = _a[0], conversionFee = _a[1], magnitude = _a[2];
    return amount.mul(MAX_FEE.sub(conversionFee).pow(magnitude)).div(MAX_FEE.pow(magnitude));
}
exports.getFinalAmount = getFinalAmount;
//# sourceMappingURL=helpers.js.map