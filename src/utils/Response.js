'use strict'

const success = true
const failure = false
const defaultCode = '0'
const successfulResponse = {
  status: success,
  code: defaultCode
}

const failedResponse = {
  status: failure,
  code: defaultCode
}
const getResponse = (params, mode) => {
  const response = (mode) ? successfulResponse : failedResponse
  for (var [param, value] of params) {
    response[param] = value
  }
  return response
}
module.export = {
  successfulResponse: successfulResponse,
  failedResponse: failedResponse,
  getResponse: getResponse
}
