'use strict'

const week = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
}

const getDayCode = function(day){
  return week[day]
}

module.exports = {
  getDayCode
}

