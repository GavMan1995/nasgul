const findInFiles = require('find-in-files')

module.exports = function (file) {
  console.log(`Checking for duplicate css classes in the "${file}" directory.`)
  findInFiles.find('.c-', file, '.scss$')
    .then((results) => {

      console.log(results)
    //
    //   arrOfValues = arrOfValues.map((val) => {
    //     return val.matches
    //   })
    //
    //   arrOfValues = [].concat.apply([], arrOfValues)
    //
    //   arrOfValues = arrOfValues.map((val) => {
    //     return val.split('.').pop().split(' {').join('')
    //   })
    //
    //   arrOfCSSClasses = arrOfValues.filter((elem, index, self) => {
    //     return index === self.indexOf(elem)
    //   })
    //
    })
}
