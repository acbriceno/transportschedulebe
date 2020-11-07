'use strict'

const Role = {

  OPERATOR: 1,
  COMMUTER: 2,
  ADMIN: 3,
  properties: {
    1: { name: 'OPERATOR', value: 1, code: 'OPERATOR', collection: 'operators' },
    2: { name: 'COMMUTER', value: 2, code: 'COMMUTER', collection: 'commuters' },
    3: { name: 'ADMIN', value: 3, code: 'ADMIN', collection: 'admin' }
  }

}
module.exports = Role
