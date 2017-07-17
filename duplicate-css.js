const glob = require('glob')
const _ = require('lodash')
const findInFiles = require('find-in-files')

const importReg = new RegExp('\@import.+;')
const classReg = /{.+}$/g

module.exports = function(file) {
  return new Promise((resolve, reject) => {
    findInFiles
      .find({'term': /\.?.+\{[\S\s]+?\}/, 'flags': 'g'}, file, '.scss$')
      .then((results) => {
        const classObj = {}
        const filteredObj = {}
        let arrOfValues = _.values(results).map((val) => {
          return val.matches
        })

        arrOfValues = [].concat.apply([], arrOfValues)

        arrOfValues.forEach((val) => {
          const polished = val.split(' ').join('').split('\n').join('')
          const objKey = polished.split(classReg)[0]
          const objVal = (polished.match(classReg) || [])[0]

          if (!objKey || !objVal) return

          classObj[objKey] = objVal
        })

        const inverted = _.invertBy(classObj)

        _.keys(inverted).forEach((key) => {
          if (inverted[key].length > 1) {
            filteredObj[key] = inverted[key]
          }
        })

        fs.open('duplicate-class-list.txt', 'w', (err, fd) => {
          if (err) {
            reject(err)
          }

          fs.writeFile('duplicate-class-list.txt', JSON.stringify(filteredObj), (err) => {
            if (err) {
              reject(err)
            }
          })
        })

        resolve(filteredObj)
      })
      .catch(reject)
  })
}
