#!/usr/bin/env node
const findInFiles = require('find-in-files')
const _ = require('lodash')

// checkClasses((err, res) => {
//   // console.log(`There are ${res.length} unused classes`)
//   // console.log('============ Classes ============')
//   // console.log(res)
//   // console.log('=================================')
// })
//
//

//
// function checkClasses(callback) {
//   let unusedClasses = []
//   let css = []
//   let js = []
//
//   grabClassesFromFiles((err, res) => {
//     css = res.css
//     js = res.js
//
//     const arr = css.concat(js)
//
//
//     callback(arr)
//
//     console.log(js)
//   })
// }

grabClassesFromFiles()

function grabClassesFromFiles() {
  const arg = process.argv
  let cssClasses = []
  let jsClasses = []

  console.log(parseJSFiles(arg[2]))

  // if ( arg.length <= 2 ) {
  //   console.warn('You must supply the directories you need to check')
  // }
  //
  // if (arg.length === 3) {
  //   parseJSFiles(arg[2], (err, res) => {
  //     jsClasses = res
  //   })
  //
  //   parseCSSFiles(arg[2], (err, res) => {
  //     cssClasses = res
  //   })
  // }
}



function parseCSSFiles(file, callback) {
  let arrOfCSSClasses = []

  findInFiles.findSync({'term': /\..+ \{/, 'flags': 'g'}, file, '.scss$')
    .then((results) => {
      let arrOfValues = _.values(results)

      arrOfValues = arrOfValues.map((val) => {
        return val.matches
      })

      arrOfValues = [].concat.apply([], arrOfValues)

      arrOfValues = arrOfValues.map((val) => {
        return val.split('.').pop().split(' {').join('')
      })

      arrOfCSSClasses = arrOfValues.filter((elem, index, self) => {
        return index === self.indexOf(elem)
      })

      return arrOfCSSClasses
    })
}

function parseJSFiles(file) {
  let arrOfJSClasses = []

  const results = findInFiles.findSync({'term': /className='.+[^ >]'/, 'flags': 'g'}, file, '.js$')
  const arrOfValues = _.values(results)

  arrOfValues = arrOfValues.map((val) => {
    return val.matches
  })

  arrOfValues = [].concat.apply([], arrOfValues)

  arrOfValues = arrOfValues.map((val) => {
    return val.split("className='").pop().split("'").join('').split(' ')
  })

  arrOfJSClasses = [].concat.apply([], arrOfValues)

  arrOfJSClasses = arrOfJSClasses.filter((elem, index, self) => {
    return index === self.indexOf(elem)
  })

  return arrOfJSClasses
}
