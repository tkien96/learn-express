const moment = require('moment');

const getRandomNumber = () => {
    return Math.random()
}

const currentDateTime = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {
    getRandomNumber,
    currentDateTime
}
