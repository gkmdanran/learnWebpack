
const dayjs=require('dayjs')
function getStrType(str: string): string {
    return str
}
console.log(getStrType('3333'))
console.log(dayjs('2018/08/08').format('YYYY-MM-DD HH:mm:ss'));
module.exports = {
    getStrType
}