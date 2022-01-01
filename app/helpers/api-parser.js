const isValidDomain = require('is-valid-domain')
const isValidPath = require('is-valid-path');
const validation = require('../config/validation.constants')

function isValidApi(api) {
    try {
        const { method, host, path } = splitFullApi(api);
    
        return method && validation.SUPPORTED_METHOD.includes(method) &&
               host && isValidDomain(host) &&
               path && isValidDomainPath(path);    
    }
    catch {
        return false;
    }
}

function splitFullApi(api) {
    const [method, hostAndPath] = api.split(' ');
    const seperatorIndex = hostAndPath.indexOf('/');

    return { 
        method: method,
        host: seperatorIndex === -1 ? hostAndPath : hostAndPath.slice(0, seperatorIndex),
        path: seperatorIndex === -1 ? "/" : hostAndPath.slice(seperatorIndex)
    }
}

function isValidHost(host) {
    return isValidDomain(host);
}

function isValidDomainPath(path) {
    return path.startsWith('/') && isValidPath(path);
}


module.exports = {
    splitFullApi,
    isValidApi,
    isValidHost,
    isValidDomainPath
};