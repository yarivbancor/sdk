"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers = __importStar(require("./helpers"));
var ethereum_1 = require("./blockchains/ethereum");
var eos_1 = require("./blockchains/eos");
var types_1 = require("./types");
var Core = /** @class */ (function () {
    function Core() {
        this.blockchains = {};
    }
    Core.prototype.create = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!settings.ethereumNodeEndpoint) return [3 /*break*/, 2];
                        _a = this.blockchains;
                        _b = types_1.BlockchainType.Ethereum;
                        return [4 /*yield*/, ethereum_1.Ethereum.create(settings.ethereumNodeEndpoint)];
                    case 1:
                        _a[_b] = _e.sent();
                        _e.label = 2;
                    case 2:
                        if (!settings.eosNodeEndpoint) return [3 /*break*/, 4];
                        _c = this.blockchains;
                        _d = types_1.BlockchainType.EOS;
                        return [4 /*yield*/, eos_1.EOS.create(settings.eosNodeEndpoint)];
                    case 3:
                        _c[_d] = _e.sent();
                        _e.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Core.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.blockchains[types_1.BlockchainType.Ethereum]) return [3 /*break*/, 2];
                        return [4 /*yield*/, ethereum_1.Ethereum.destroy(this.blockchains[types_1.BlockchainType.Ethereum])];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.blockchains[types_1.BlockchainType.EOS]) return [3 /*break*/, 4];
                        return [4 /*yield*/, eos_1.EOS.destroy(this.blockchains[types_1.BlockchainType.EOS])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Core.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, blockchainType;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [];
                        for (_b in this.blockchains)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        blockchainType = _a[_i];
                        return [4 /*yield*/, this.blockchains[blockchainType].refresh()];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Core.prototype.getPaths = function (sourceToken, targetToken, amount) {
        if (amount === void 0) { amount = '1'; }
        return __awaiter(this, void 0, void 0, function () {
            var sourceBlockchain, targetBlockchain, sourcePaths, targetPaths, paths;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sourceBlockchain = this.blockchains[sourceToken.blockchainType];
                        targetBlockchain = this.blockchains[targetToken.blockchainType];
                        if (!(sourceBlockchain == targetBlockchain)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getPathsFunction(sourceToken.blockchainType, sourceToken, targetToken)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.getPathsFunction(sourceToken.blockchainType, sourceToken, sourceBlockchain.getAnchorToken())];
                    case 3:
                        sourcePaths = _a.sent();
                        return [4 /*yield*/, this.getPathsFunction(targetToken.blockchainType, targetBlockchain.getAnchorToken(), targetToken)];
                    case 4:
                        targetPaths = _a.sent();
                        paths = [];
                        sourcePaths.map(function (source) {
                            targetPaths.map(function (target) {
                                paths.push(__spreadArrays(source, target));
                            });
                        });
                        return [2 /*return*/, paths];
                }
            });
        });
    };
    Core.prototype.getPathAndRate = function (sourceToken, targetToken, amount) {
        if (amount === void 0) { amount = '1'; }
        return __awaiter(this, void 0, void 0, function () {
            var sourceBlockchain, targetBlockchain, paths, rates, index, sourcePaths, sourceRates, sourceIndex, targetPaths, targetRates, targetIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sourceBlockchain = this.blockchains[sourceToken.blockchainType];
                        targetBlockchain = this.blockchains[targetToken.blockchainType];
                        if (!(sourceBlockchain == targetBlockchain)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getPathsFunction(sourceToken.blockchainType, sourceToken, targetToken)];
                    case 1:
                        paths = _a.sent();
                        return [4 /*yield*/, this.getRates(sourceToken.blockchainType, paths, amount)];
                    case 2:
                        rates = _a.sent();
                        index = Core.getBest(paths, rates);
                        return [2 /*return*/, {
                                path: paths[index],
                                rate: rates[index],
                            }];
                    case 3: return [4 /*yield*/, this.getPathsFunction(sourceToken.blockchainType, sourceToken, sourceBlockchain.getAnchorToken())];
                    case 4:
                        sourcePaths = _a.sent();
                        return [4 /*yield*/, this.getRates(sourceToken.blockchainType, sourcePaths, amount)];
                    case 5:
                        sourceRates = _a.sent();
                        sourceIndex = Core.getBest(sourcePaths, sourceRates);
                        return [4 /*yield*/, this.getPathsFunction(targetToken.blockchainType, targetBlockchain.getAnchorToken(), targetToken)];
                    case 6:
                        targetPaths = _a.sent();
                        return [4 /*yield*/, this.getRates(targetToken.blockchainType, targetPaths, sourceRates[sourceIndex])];
                    case 7:
                        targetRates = _a.sent();
                        targetIndex = Core.getBest(targetPaths, targetRates);
                        return [2 /*return*/, {
                                path: __spreadArrays(sourcePaths[sourceIndex], targetPaths[targetIndex]),
                                rate: targetRates[targetIndex],
                            }];
                }
            });
        });
    };
    Core.prototype.getRateByPath = function (path, amount) {
        if (amount === void 0) { amount = '1'; }
        return __awaiter(this, void 0, void 0, function () {
            var sourceBlockchainType, targetBlockchainType, index, sourceBlockchainPath, targetBlockchainPath, sourceBlockchainRate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sourceBlockchainType = path[0].blockchainType;
                        targetBlockchainType = path[path.length - 1].blockchainType;
                        if (!(sourceBlockchainType == targetBlockchainType)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getRates(sourceBlockchainType, [path], amount)];
                    case 1: return [2 /*return*/, (_a.sent())[0]];
                    case 2:
                        index = path.findIndex(function (item) { return item.blockchainType == targetBlockchainType; });
                        sourceBlockchainPath = path.slice(0, index);
                        targetBlockchainPath = path.slice(index);
                        return [4 /*yield*/, this.getRates(sourceBlockchainType, [sourceBlockchainPath], amount)];
                    case 3:
                        sourceBlockchainRate = (_a.sent())[0];
                        return [4 /*yield*/, this.getRates(targetBlockchainType, [targetBlockchainPath], sourceBlockchainRate)];
                    case 4: return [2 /*return*/, (_a.sent())[0]];
                }
            });
        });
    };
    Core.prototype.getPathsFunction = function (blockchainType, sourceToken, targetToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // special case for source token == target token
                        if (helpers.isTokenEqual(sourceToken, targetToken))
                            return [2 /*return*/, [[sourceToken]]];
                        return [4 /*yield*/, this.blockchains[blockchainType].getPaths(sourceToken, targetToken)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Core.prototype.getRates = function (blockchainType, paths, amount) {
        if (amount === void 0) { amount = '1'; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // special case for single path and source token == target token
                        if (paths.length == 1 && helpers.isTokenEqual(paths[0][0], paths[0][paths[0].length - 1]))
                            return [2 /*return*/, [amount]];
                        return [4 /*yield*/, this.blockchains[blockchainType].getRates(paths, amount)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Core.getBest = function (paths, rates) {
        var index = 0;
        for (var i = 1; i < rates.length; i++) {
            if (Core.betterRate(rates, index, i) || (Core.equalRate(rates, index, i) && Core.betterPath(paths, index, i)))
                index = i;
        }
        return index;
    };
    Core.betterRate = function (rates, index1, index2) {
        // return Number(rates[index1]) < Number(rates[index2]);
        var rate1 = rates[index1].split('.').concat('');
        var rate2 = rates[index2].split('.').concat('');
        rate1[0] = rate1[0].padStart(rate2[0].length, '0');
        rate2[0] = rate2[0].padStart(rate1[0].length, '0');
        rate1[1] = rate1[1].padEnd(rate2[1].length, '0');
        rate2[1] = rate2[1].padEnd(rate1[1].length, '0');
        return rate1.join('') < rate2.join('');
    };
    Core.equalRate = function (rates, index1, index2) {
        return rates[index1] == rates[index2];
    };
    Core.betterPath = function (paths, index1, index2) {
        return paths[index1].length > paths[index2].length;
    };
    return Core;
}());
exports.Core = Core;
//# sourceMappingURL=core.js.map