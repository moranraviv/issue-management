const validation = require('../config/validation.constants')

 const create = function (mongoose) {
    const Issue = mongoose.model(
        "issues",
        mongoose.Schema(
            {
                host: {
                    type: String,
                    required: true
                },
                path: {
                    type: String,
                    required: true
                },
                method: {
                    type: String,
                    required: true,
                    enum: validation.SUPPORTED_METHOD,
                },
                module: {
                    type: String,
                    required: false
                },
                type: {
                    type: String,
                    required: false,
                    enum: validation.SUPPORTED_TYPE,
                },
                status: {
                    type: String,
                    required: false,
                    enum: validation.SUPPORTED_STATUS,
                },
                severity: {
                    type: String,
                    required: false,
                    enum: validation.SUPPORTED_SEVERITY,
                },
                description: {
                    type: String,
                    required: false
                },
            },
            { versionKey: false }
        )
    );

    return Issue;
};

module.exports = {
    create,
};
