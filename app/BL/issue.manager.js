const db = require('../models');

const Issue = db.issues;

const getBy = async (filters) => {
    return await Issue.find(filters);    
};

const create = async (issue) => {
    const doc = await Issue.create(issue);
    return doc.id;
};

const updateById = async (issueId, issue) => {
    const result = await Issue.replaceOne( { _id: issueId }, issue);
    return result.matchedCount === 1;
};

const upsert = async (filters, issue) => {
    const options = { upsert: true };

    const result = await Issue.updateMany(filters, issue, options);
    return  {
        matchedCount: result.matchedCount,
        modifiedCount : result.modifiedCount,
        upsertedId: result.upsertedId
    }
};

module.exports = {
    getBy,
    create,
    updateById,
    upsert,
};