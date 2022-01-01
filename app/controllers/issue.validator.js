const httpStatus = require('http-status');
const isValidDomain = require('is-valid-domain')
const { body, param, query,  validationResult } = require('express-validator')
const validation = require('../config/validation.constants')
const apiParser = require('../helpers/api-parser');

const createAndUpsertValidationRules = () => {
  return [
    body('method')
      .exists().withMessage('method is mandatory').bail()
      .isIn(validation.SUPPORTED_METHOD).withMessage('unsupported method, valid values are: ' + validation.SUPPORTED_METHOD),
    body('host')
      .exists().withMessage('host is mandatory').bail()
      .custom(isValidDomain).withMessage('invalid host string'),
    body('path')
      .exists().withMessage('path is mandatory')
      .custom(p => apiParser.isValidDomainPath(p)),
    body('status')
      .optional()
      .isIn(validation.SUPPORTED_STATUS).withMessage('status must be one of the following: ' + validation.SUPPORTED_STATUS),
    body('severity')
      .optional()
      .isIn(validation.SUPPORTED_SEVERITY).withMessage('severity must be one of the following: ' + validation.SUPPORTED_SEVERITY),
    body('module')
      .optional()
      .isString().withMessage("description must be a string"),
    body('type')
      .optional()
      .isIn(validation.SUPPORTED_TYPE).withMessage('type must be one of the following: ' + validation.SUPPORTED_TYPE),
    body('description')
      .optional()
      .isString().withMessage("description must be a string"),
  ]
}

const updateValidationRules = () => {
  return [
    param('id')
      .exists().withMessage('id is mandatory').bail()
      .isMongoId().withMessage('id must be a valid mongo id').bail(),
    body('method')
      .optional()
      .isIn(validation.SUPPORTED_METHOD).withMessage('unsupported method, valid values are: ' + validation.SUPPORTED_METHOD),
    body('host')
      .optional()
      .custom(isValidDomain).withMessage('invalid host string'),
    body('path')
      .optional()
      .custom(p => apiParser.isValidDomainPath(p)).withMessage('invalid path string'),
    body('status')
      .optional()
      .isIn(validation.SUPPORTED_STATUS).withMessage('status must be one of the following: ' + validation.SUPPORTED_STATUS),
    body('severity')
      .optional()
      .isIn(validation.SUPPORTED_SEVERITY).withMessage('severity must be one of the following: ' + validation.SUPPORTED_SEVERITY),
    body('module')
      .optional()
      .isString().withMessage("description must be a string"),
    body('type')
      .optional()
      .isIn(validation.SUPPORTED_TYPE).withMessage('type must be one of the following: ' + validation.SUPPORTED_TYPE),
    body('description')
      .optional()
      .isString().withMessage("description must be a string"),
  ]
}

const getByQueryParamValidationRules = () => {
  return [
    query('api')
      .optional()
      .custom(apiParser.isValidApi).withMessage('invalid full api string').bail()
      .custom((value, { req }) => Object.keys(req.query).length === 1).withMessage("get by api should not pass extra query params"),
    query('method')
      .optional()
      .isIn(validation.SUPPORTED_METHOD).withMessage('unsupported method, valid values are: ' + validation.SUPPORTED_METHOD),
    query('host')
      .optional()
      .custom(isValidDomain).withMessage('invalid host string'),
    query('path')
      .optional()
      .custom(p => apiParser.isValidDomainPath(p)).withMessage('invalid path string'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  return errors.isEmpty() ? next() : res.json({ status: httpStatus.BAD_REQUEST, error: errors  });
}

module.exports = {
  createAndUpsertValidationRules,
  updateValidationRules,
  getByQueryParamValidationRules,
  validate,
}