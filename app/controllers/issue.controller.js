const httpStatus = require('http-status');
const apiParser = require('../helpers/api-parser');
const issuesManager = require('../BL/issue.manager');

const getByQueryParams = async (req, res) => {
    try {        
        if (req.query.api) {
            let { method, host, path } = apiParser.splitFullApi(req.query.api);
           
            if (method && host && path) {
                res.redirect(`issues?method=${method}&host=${host}&path=${path}`);
            }
            else {
                // should not happen, validated in middleware
                res.json({ status: httpStatus.BAD_REQUEST, error: "failed to parse api" });
            }
            return;
        }
    
        const filters = {};
        if (req.query.method) {
            filters.method =req.query.method;
        }
        if (req.query.host) {
            filters.host = req.query.host;
        }
        if (req.query.path) {
            filters.path = req.query.path;
        }

        const issues = await issuesManager.getBy(filters);
        res.json({ status: httpStatus.OK, issues: issues });
    }
    catch (error) {
        console.log(error);
        res.json({ status: httpStatus.INTERNAL_SERVER_ERROR, error: "something went wrong, check server logs for more information" });
    }    
};

const create = async (req, res) => {     
    try { 
        const issueId = await issuesManager.create(req.body);   
        res.json({ status: httpStatus.OK, issueId: issueId });
    }
    catch (error) {
        console.log(error);
        res.json({ status: httpStatus.INTERNAL_SERVER_ERROR, error: "something went wrong, check server logs for more information" });
    }
};

const update = async (req, res) => {     
    try { 
        const issueId = req.params.id;

        const success = await issuesManager.updateById(issueId, req.body);
        if (success) {
            res.json({ status: httpStatus.OK });
        }
        else {
            res.json({ status: httpStatus.NOT_FOUND, message: "Id does not exist" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ status: httpStatus.INTERNAL_SERVER_ERROR, error: "something went wrong, check server logs for more information" });
    }
};

const upsert = async (req, res) => {
    try {     
        const filters = {
            method: req.body.method,
            host: req.body.host,
            path: req.body.path,
        }

        const result = await issuesManager.upsert(filters, req.body);       
        res.json({ 
            status: httpStatus.OK, 
            matchedCount: result.matchedCount, 
            modifiedCount : result.modifiedCount, 
            upsertedId: result.upsertedId 
        });
    }
    catch (error) {
        console.log(error);
        res.json({ status: httpStatus.INTERNAL_SERVER_ERROR, error: "something went wrong, check server logs for more information" });
    }
};


module.exports = {
    getByQueryParams,
    create,
    update,
    upsert
};
