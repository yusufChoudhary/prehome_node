const moment = require('moment');

const date = new Date();
const hours =5
const minutes =30
function addTimeToDate(date, hours, minutes) {
    return moment(date).add(hours, 'hours').add(minutes, 'minutes').toDate();
}

module.exports = {
    addTimeToDate,
};
