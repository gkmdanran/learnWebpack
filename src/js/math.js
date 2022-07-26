
const dayjs = require('dayjs')

console.log(dayjs('2018/11/28').format('YYYY-MM-DD HH:mm:ss'));
function add(num1, num2) {
    return num1 + num2
}
function multiple(num1, num2) {
    return num1 * num2
}
module.exports = {
    add,
    multiple
}