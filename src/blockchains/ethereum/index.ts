/* eslint-disable max-len */
/* eslint-disable no-sync */
/* eslint-disable prefer-reflect */
import Web3 from 'web3';
import Decimal from 'decimal.js';
import { BancorConverterV9 } from './contracts/BancorConverterV9';
import { fromWei, toWei } from './utils';
import { ConversionPathStep, Token } from '../../path_generation';
import { BancorConverter } from './contracts/BancorConverter';
import { ContractRegistry } from './contracts/ContractRegistry';
import { BancorConverterRegistry } from './contracts/BancorConverterRegistry';
import { SmartToken } from './contracts/SmartToken';
import { ERC20Token } from './contracts/ERC20Token';

let web3;
let bancorConverter = BancorConverter;
let contractRegistry = ContractRegistry;
let registryAbi = BancorConverterRegistry;
let registry;

export async function init(ethereumNodeUrl, ethereumContractRegistryAddress = '0xf078b4ec84e5fc57c693d43f1f4a82306c9b88d6') {
    web3 = new Web3(new Web3.providers.HttpProvider(ethereumNodeUrl));
    const contractRegistryContract = new web3.eth.Contract(contractRegistry, ethereumContractRegistryAddress);
    const registryBlockchainId = await contractRegistryContract.methods.addressOf(Web3.utils.asciiToHex('BancorConverterRegistry')).call(); // '0x85e27A5718382F32238497e78b4A40DD778ab847'
    registry = new web3.eth.Contract(registryAbi, registryBlockchainId);
    Decimal.set({ precision: 100, rounding: Decimal.ROUND_DOWN });
}

export const getEthereumContract = (contractAbi, blockchainId) => {
    return new web3.eth.Contract(contractAbi, blockchainId);
};

export const callEthereumContractMethod = async (contract, methodPath, methodArgs?) => {
    return await contract.methods[methodPath](...methodArgs).call();
};

export const getTokenDecimals = async tokenBlockchainId => {
    const token = getEthereumContract(ERC20Token, tokenBlockchainId);
    return await callEthereumContractMethod(token, 'decimals');
};

export const getAmountInTokenWei = async (token: string, amount: string) => {
    const decimals = await getTokenDecimals(token);
    return toWei(amount, decimals);
};

export const getConversionReturn = async (converterPair: ConversionPathStep, amount: string, ABI) => {
    const converterContract = getEthereumContract(ABI, converterPair.converterBlockchainId);
    return await callEthereumContractMethod(converterContract, 'getReturn', [converterPair.fromToken, converterPair.toToken, amount]);
};

export async function getPathStepRate(converterPair: ConversionPathStep, amount: string) {
    let amountInTokenWei = await getAmountInTokenWei((converterPair.fromToken as string), amount);
    const tokenBlockchainId = converterPair.toToken;
    const tokenDecimals = await getTokenDecimals(tokenBlockchainId);
    try {
        const returnAmount = await getConversionReturn(converterPair, amountInTokenWei, bancorConverter);
        amountInTokenWei = returnAmount['0'];
    }
    catch (e) {
        if (e.message.includes('insufficient data for uint256'))
            amountInTokenWei = await getConversionReturn(converterPair, amountInTokenWei, BancorConverterV9);

        else throw (e);
    }
    return fromWei(amountInTokenWei, tokenDecimals);
}

export const getConverterBlockchainId = async blockchainId => {
    const tokenContract = getEthereumContract(SmartToken, blockchainId);
    return await callEthereumContractMethod(tokenContract, 'owner');
};

export async function getReserves(converterBlockchainId) {
    const reserves = getEthereumContract(bancorConverter, converterBlockchainId);
    return { reserves };
}

export async function getReservesCount(converter) {
    return await callEthereumContractMethod(converter, 'connectorTokenCount');
}

export const getConnectorBlokchainIdByPosition = async (converterContract, i) => {
    return await callEthereumContractMethod(converterContract, 'connectorTokens', [i]);
};

export async function getReserveBlockchainId(converter, position) {
    const blockchainId = await getConnectorBlokchainIdByPosition(converter, position);
    const returnValue: Token = {
        blockchainType: 'ethereum',
        blockchainId
    };

    return returnValue;
}

export async function getReserveToken(converterContract, i) {
    const blockchainId = await getConnectorBlokchainIdByPosition(converterContract, i);
    const token: Token = {
        blockchainType: 'ethereum',
        blockchainId
    };
    return token;
}

export async function getSmartTokens(token: Token) {
    const isSmartToken = await callEthereumContractMethod(registry, 'isSmartToken', [token.blockchainId]);
    const smartTokens = isSmartToken ? [token.blockchainId] : await callEthereumContractMethod(registry, 'getConvertibleTokenSmartTokens', [token.blockchainId]);
    return smartTokens;
}
