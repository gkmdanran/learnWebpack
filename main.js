const { add, multiple } = require('./src/js/math.js')
const { splitString } = require('./src/js/split.js')
const { getStrType } = require('./src/js/type.ts')
import './src/css/index.less'
import a from './src/assets/a.png'
const res1 = add(1, 2)
const res2 = multiple(3, 2)
const res3 = splitString('1-2-3', '-')
const res4 = getStrType(1234)
console.log(res1)
console.log(res2)
console.log(res3)
console.log(res4)
console.log(a)
if (module.hot) {
    module.hot.accept(['./src/js/split.js'], () => {
        console.log('更新了')
    })
}