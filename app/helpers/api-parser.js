const isValidDomain = require('is-valid-domain')
const isValidPath = require('is-valid-path');
const validation = require('../config/validation.constants')

function isValidApi(api) {
    const [method, hostAndPath] = api.split(' ');
    if (method && hostAndPath)
    {
        if (!validation.SUPPORTED_METHOD.includes(method)) {
            return false;
        }

        const seperatorIndex = hostAndPath.indexOf('/');
        if (seperatorIndex === -1) {
            return false;
        }

        const host = hostAndPath.slice(0, seperatorIndex);
        return isValidDomain(host);
    }

    return false;
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