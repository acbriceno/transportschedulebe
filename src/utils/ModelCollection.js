'use strict'

const modelCollection = {

  OPERATOR: 1,
  COMMUTER: 2,
  STOP: 3,
  PASS: 4,
  OPERATORROUTE: 5,
  USER: 6,
  SECURITYQA: 7,
  properties: {
    1: { name: 'OPERATOR', value: 1, code: 'OPERATOR', collection: 'operators' },
    2: { name: 'COMMUTER', value: 2, code: 'COMMUTER', collection: 'commuters' },
    3: { name: 'STOP', value: 3, code: 'STOP', collection: 'stops' },
    4: { name: 'PASS', value: 4, code: 'PASS', collection: 'passes' },
    5: { name: 'OPERATORROUTE', value: 5, code: 'OPERATORROUTE', collection: 'operatorRoutes' },
    6: { name: 'USER', value: 6, code: 'USER', collection: 'users' },
    7: { name: 'SECURITYQA', value: 7, code: 'SECURITYQA', collection: 'securityqas' }


  }

}
module.exports = modelCollection
