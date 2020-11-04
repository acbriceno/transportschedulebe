'use strict'

const Role = {

  PATIENT: 1,
  DOCTOR: 2,
  NURSE: 3,
  HCOADMIN: 4,
  TECHLAB: 5,
  DISPENSARY: 6,
  COUNSELOR: 7,
  NUTRITIONIST: 8,
  properties: {
    1: { name: 'PATIENT', value: 1, code: 'PATIENT', collection: 'patients' },
    2: { name: 'DOCTOR', value: 2, code: 'DOCTOR', collection: 'doctors' },
    3: { name: 'NURSE', value: 3, code: 'NURSE', collection: 'nurses' },
    4: { name: 'HCOADMIN', value: 4, code: 'HCOADMIN', collection: 'hcorganizations' },
    5: { name: 'TECHLAB', value: 5, code: 'TECHLAB', collection: 'techlabs' },
    6: { name: 'DISPENSARY', value: 6, code: 'DISPENSARY', collection: 'dispensaries' },
    7: { name: 'COUNSELOR', value: 7, code: 'COUNSELOR', collection: 'counselors' },
    8: { name: 'NUTRITIONIST', value: 8, code: 'NUTRITIONIST', collection: 'nutritionists' }
  }

}
module.exports = Role
