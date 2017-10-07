const findInFiles = require('find-in-files')
const _ = require('lodash')
const fs = require('fs')
const queue = require('async/queue')

module.exports = function() {
  grabAllClasses((err, res) => {
    const unusedList = res.unusedClasses
      .map((val, index) => {
        return `${index + 1}: ` + val + '\n'
      })
      .join('')

    const noCSSList = res.classesNotInCSS
      .map((val, index) => {
        return `${index + 1}: ` + val + '\n'
      })
      .join('')

    const q = queue((unusedClass) => {
      const term = `/'${unusedClass}'/`
      findInFiles
        .find({ term, flags: 'g' }, process.argv[2], '.js')
        .then((response) => {
          console.log(response)
        })
    })

    q.push(res.unusedClasses)

    const text = `Unused Classes\n-------------------------\n${unusedList}\n-------------\n\nClasses not in CSS\n------------------------\n${noCSSList}\n------------`

    if (err) console.log(err)

    fs.open('unused-class-list.txt', 'w', (err, fd) => {
      if (err) console.log(err)

      fs.writeFile('unused-class-list.txt', text, err => {
        if (err) console.log(err)
      })
    })

    console.log(res.unusedClasses.slice(0, 4))
    console.log('---------------------------------------')
    console.log(
      `There are ${res.unusedClasses
        .length} out of ${res.numberOfClasses} unused classes!`
    )
    console.log(
      `You are using ${res.numberOfClasses -
        res.unusedClasses.length} classes\n\n`
    )
    console.log(res.classesNotInCSS.slice(0, 4))
    console.log('---------------------------------------')
    console.log(
      `There are ${res.classesNotInCSS
        .length} classes not found in the CSS!\n\n`
    )
    console.log(
      'Full list of classes in unused-class-list.txt in the current directory'
    )
  })

  function grabAllClasses(callback) {
    const file = process.argv[2]

    parseCSSFiles(file, (err, res) => {
      parseJSFiles(file, res, (err, res) => {
        if (err) callback(err)

        let css = res.css
        let js = res.js

        const unusedClasses = css.filter(value => {
          return js.indexOf(value) === -1
        })

        const classesNotInCSS = js.filter(value => {
          return css.indexOf(value) === -1
        })

        callback(null, {
          unusedClasses,
          classesNotInCSS,
          numberOfClasses: css.length
        })
      })
    })
  }

  function parseCSSFiles(file, callback) {
    let arrOfCSSClasses = []
    const htmlEle = /^(p|a|h1|h2|h3|h4|h5|ul|ol|li|table|td|tr|th|hr|\+|>|div|input|thead|tbody|span|tfoot)$/gi

    findInFiles
      .find({ term: /\..+\{/, flags: 'g' }, file, '.scss')
      .then(results => {
        let arrOfValues = _.values(results)

        arrOfValues = arrOfValues.map(val => {
          return val.matches
        })

        arrOfValues = _.flattenDeep(arrOfValues)

        arrOfValues = arrOfValues.map((val) => {
          return val.split('.').pop().split('{').join('').split(':').shift().split('[').shift().split(' ')
        })

        arrOfValues = _.uniq(_.pull(_.flattenDeep(arrOfValues), ''))

        arrOfValues.forEach((val) => {
          if (!val.match(htmlEle)) {
            arrOfCSSClasses.push(val)
          }
        })


        callback(null, arrOfCSSClasses)
      })
  }

  function parseJSFiles(file, cssArray, callback) {
    let arrOfJSClasses = []

    findInFiles
      .find({ term: / ((className|class)='.+?')|((className|class)={`.+?`})/, flags: 'g' }, file, '.js$')
      .then(results => {
        let arrOfValues = _.values(results)

        arrOfValues = arrOfValues.map(val => {
          return val.matches
        })

        arrOfValues = _.flattenDeep(arrOfValues)

        arrOfValues = arrOfValues.map(val => {
          return val.split('className=').join('').split("'").join('').split('${').join('').split('=').join('').split('?').join('').split("{`").join('').split('`}').join('').split(')').join('').split('}').join('').split(' ')
        })

        arrOfJSClasses = _.uniq(_.pull(_.flattenDeep(arrOfValues), ''))

        callback(null, { css: cssArray, js: arrOfJSClasses })
      })
  }
}
