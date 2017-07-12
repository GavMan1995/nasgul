#!/usr/bin/env node
const findInFiles = require('find-in-files')
const _ = require('lodash')

grabAllClasses((err, res) => {
  console.log('=======================================')
  console.log(res.unusedClasses.slice(0,4))
  console.log('=======================================')
  console.log(`There are ${res.unusedClasses.length} unused classes!`)
  console.log('=======================================')
  console.log(res.classesNotInCSS.slice(0,4))
  console.log('=======================================')
  console.log(`There are ${res.classesNotInCSS.length} classes not used in CSS!`)
})

function grabAllClasses(callback) {
  const arg = process.argv[2]

  parseCSSFiles(arg, (err, res) => {
    parseJSFiles(arg, res, (err, res)  => {
      let css = res.css
      let js = res.js

      const unusedClasses = css.filter((value) => {
        return js.indexOf(value) === -1
      })

      const classesNotInCSS = js.filter((value) => {
        return css.indexOf(value) === -1
      })

      callback(null, {unusedClasses, classesNotInCSS})
    })
  })
}


function parseCSSFiles(file, callback) {
  let arrOfCSSClasses = []

  findInFiles.find({'term': /\..+ \{/, 'flags': 'g'}, file, '.scss$')
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

      callback(null, arrOfCSSClasses)
    })
}

function parseJSFiles(file, cssArray, callback) {
  let arrOfJSClasses = []

  findInFiles.find({'term': / className='.+?'/, 'flags': 'g'}, file, '.js$')
    .then((results) => {
      let arrOfValues = _.values(results)

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

      callback(null, {css: cssArray, js: arrOfJSClasses})
    })
}
