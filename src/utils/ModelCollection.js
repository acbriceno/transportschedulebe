'use strict'

const modelCollection = {

  PATIENT: 1,
  DOCTOR: 2,
  NURSE: 3,
  HCORG: 4,
  TECHLAB: 5,
  DISPENSARY: 6,
  COUNSELOR: 7,
  NUTRITIONIST: 8,
  USER: 9,
  SECURITYQA: 10,
  APPOINTMENT: 11,
  AVAILABILITY: 12,
  properties: {
    1: { name: 'PATIENT', value: 1, code: 'PATIENT', collection: 'patients' },
    2: { name: 'DOCTOR', value: 2, code: 'DOCTOR', collection: 'doctors' },
    3: { name: 'NURSE', value: 3, code: 'NURSE', collection: 'nurses' },
    4: { name: 'HCORG', value: 4, code: 'HCORG', collection: 'hcorganizations' },
    5: { name: 'TECHLAB', value: 5, code: 'TECHLAB', collection: 'techlabs' },
    6: { name: 'DISPENSARY', value: 6, code: 'DISPENSARY', collection: 'dispensaries' },
    7: { name: 'COUNSELOR', value: 7, code: 'COUNSELOR', collection: 'counselors' },
    8: { name: 'NUTRITIONIST', value: 8, code: 'NUTRITIONIST', collection: 'nutritionists' },
    9: { name: 'USER', value: 9, code: 'USER', collection: 'users' },
    10: { name: 'SECURITYQA', value: 10, code: 'SECURITYQA', collection: 'securityqas' },
    11: { name: 'APPOINTMENT', value: 11, code: 'APPOINTMENT', collection: 'appointments' },
    12: { name: 'AVAILABILITY', value: 12, code: 'AVAILABILITY', collection: 'availability' }

  }

}
module.exports = modelCollection
