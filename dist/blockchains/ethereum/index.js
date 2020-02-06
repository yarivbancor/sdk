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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
/* eslint-disable no-sync */
/* eslint-disable prefer-reflect */
var web3_1 = __importDefault(require("web3"));
var decimal_js_1 = __importDefault(require("decimal.js"));
var BancorConverterV9_1 = require("./contracts/BancorConverterV9");
var utils_1 = require("./utils");
var BancorConverter_1 = require("./contracts/BancorConverter");
var ContractRegistry_1 = require("./contracts/ContractRegistry");
var BancorConverterRegistry_1 = require("./contracts/BancorConverterRegistry");
var SmartToken_1 = require("./contracts/SmartToken");
var ERC20Token_1 = require("./contracts/ERC20Token");
var web3;
var bancorConverter = BancorConverter_1.BancorConverter;
var contractRegistry = ContractRegistry_1.ContractRegistry;
var registryAbi = BancorConverterRegistry_1.BancorConverterRegistry;
var registry;
function init(ethereumNodeUrl, ethereumContractRegistryAddress) {
    if (ethereumContractRegistryAddress === void 0) { ethereumContractRegistryAddress = '0xf078b4ec84e5fc57c693d43f1f4a82306c9b88d6'; }
    return __awaiter(this, void 0, void 0, function () {
        var contractRegistryContract, registryBlockchainId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(ethereumNodeUrl));
                    contractRegistryContract = new web3.eth.Contract(contractRegistry, ethereumContractRegistryAddress);
                    return [4 /*yield*/, contractRegistryContract.methods.addressOf(web3_1.default.utils.asciiToHex('BancorConverterRegistry')).call()];
                case 1:
                    registryBlockchainId = _a.sent();
                    registry = new web3.eth.Contract(registryAbi, registryBlockchainId);
                    decimal_js_1.default.set({ precision: 100, rounding: decimal_js_1.default.ROUND_DOWN });
                    return [2 /*return*/];
            }
        });
    });
}
exports.init = init;
exports.getEthereumContract = function (contractAbi, blockchainId) {
    return new web3.eth.Contract(contractAbi, blockchainId);
};
exports.callEthereumContractMethod = function (contract, methodPath, methodArgs) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    var _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _b = (_a = console).log;
                _c = ['callEthereumContractMethod '];
                return [4 /*yield*/, (_d = contract.methods)[methodPath].apply(_d, methodArgs).call()];
            case 1:
                _b.apply(_a, _c.concat([_f.sent()]));
                return [4 /*yield*/, (_e = contract.methods)[methodPath].apply(_e, methodArgs).call()];
            case 2: return [2 /*return*/, _f.sent()];
        }
    });
}); };
exports.getTokenDecimals = function (tokenBlockchainId) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = exports.getEthereumContract(ERC20Token_1.ERC20Token, tokenBlockchainId);
                return [4 /*yield*/, exports.callEthereumContractMethod(token, 'decimals')];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getAmountInTokenWei = function (token, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var decimals;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getTokenDecimals(token)];
            case 1:
                decimals = _a.sent();
                return [2 /*return*/, utils_1.toWei(amount, decimals)];
        }
    });
}); };
exports.getConversionReturn = function (converterPair, amount, ABI) { return __awaiter(void 0, void 0, void 0, function () {
    var converterContract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                converterContract = exports.getEthereumContract(ABI, converterPair.converterBlockchainId);
                return [4 /*yield*/, exports.callEthereumContractMethod(converterContract, 'getReturn', [converterPair.fromToken, converterPair.toToken, amount])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
function getPathStepRate(converterPair, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var amountInTokenWei, tokenBlockchainId, tokenDecimals, returnAmount, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.getAmountInTokenWei(converterPair.fromToken, amount)];
                case 1:
                    amountInTokenWei = _a.sent();
                    tokenBlockchainId = converterPair.toToken;
                    return [4 /*yield*/, exports.getTokenDecimals(tokenBlockchainId)];
                case 2:
                    tokenDecimals = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 9]);
                    return [4 /*yield*/, exports.getConversionReturn(converterPair, amountInTokenWei, bancorConverter)];
                case 4:
                    returnAmount = _a.sent();
                    amountInTokenWei = returnAmount['0'];
                    return [3 /*break*/, 9];
                case 5:
                    e_1 = _a.sent();
                    if (!e_1.message.includes('insufficient data for uint256')) return [3 /*break*/, 7];
                    return [4 /*yield*/, exports.getConversionReturn(converterPair, amountInTokenWei, BancorConverterV9_1.BancorConverterV9)];
                case 6:
                    amountInTokenWei = _a.sent();
                    return [3 /*break*/, 8];
                case 7: throw (e_1);
                case 8: return [3 /*break*/, 9];
                case 9: return [2 /*return*/, utils_1.fromWei(amountInTokenWei, tokenDecimals)];
            }
        });
    });
}
exports.getPathStepRate = getPathStepRate;
exports.getConverterBlockchainId = function (blockchainId) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenContract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tokenContract = exports.getEthereumContract(SmartToken_1.SmartToken, blockchainId);
                return [4 /*yield*/, exports.callEthereumContractMethod(tokenContract, 'owner')];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
function getReserves(converterBlockchainId) {
    return __awaiter(this, void 0, void 0, function () {
        var reserves;
        return __generator(this, function (_a) {
            reserves = exports.getEthereumContract(bancorConverter, converterBlockchainId);
            return [2 /*return*/, { reserves: reserves }];
        });
    });
}
exports.getReserves = getReserves;
function getReservesCount(converter) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.callEthereumContractMethod(converter, 'connectorTokenCount')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getReservesCount = getReservesCount;
exports.getConnectorBlokchainIdByPosition = function (converterContract, i) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.callEthereumContractMethod(converterContract, 'connectorTokens', [i])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
function getReserveBlockchainId(converter, position) {
    return __awaiter(this, void 0, void 0, function () {
        var blockchainId, returnValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.getConnectorBlokchainIdByPosition(converter, position)];
                case 1:
                    blockchainId = _a.sent();
                    returnValue = {
                        blockchainType: 'ethereum',
                        blockchainId: blockchainId
                    };
                    return [2 /*return*/, returnValue];
            }
        });
    });
}
exports.getReserveBlockchainId = getReserveBlockchainId;
function getReserveToken(converterContract, i) {
    return __awaiter(this, void 0, void 0, function () {
        var blockchainId, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.getConnectorBlokchainIdByPosition(converterContract, i)];
                case 1:
                    blockchainId = _a.sent();
                    token = {
                        blockchainType: 'ethereum',
                        blockchainId: blockchainId
                    };
                    return [2 /*return*/, token];
            }
        });
    });
}
exports.getReserveToken = getReserveToken;
function getSmartTokens(token) {
    return __awaiter(this, void 0, void 0, function () {
        var isSmartToken, smartTokens, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, exports.callEthereumContractMethod(registry, 'isSmartToken', [token.blockchainId])];
                case 1:
                    isSmartToken = _b.sent();
                    if (!isSmartToken) return [3 /*break*/, 2];
                    _a = [token.blockchainId];
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, exports.callEthereumContractMethod(registry, 'getConvertibleTokenSmartTokens', [token.blockchainId])];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    smartTokens = _a;
                    return [2 /*return*/, smartTokens];
            }
        });
    });
}
exports.getSmartTokens = getSmartTokens;
