const findInFiles = require('find-in-files')
const _ = require('lodash')
const fs = require('fs')

module.exports = function () {
  grabAllClasses((err, res) => {
    const unusedList = res.unusedClasses.map((val, index) => {
      return `${index + 1}: ` + val + '\n'
    }).join('')

    const noCSSList = res.classesNotInCSS.map((val, index) => {
      return `${index + 1}: ` + val + '\n'
    }).join('')

    const text = `Unused Classes\n-------------------------\n${unusedList}\n-------------\n\nClasses not in CSS\n------------------------\n${noCSSList}\n------------`

    if (err) {
      console.log(err)
    } else {
      fs.open('unused-class-list.txt', 'w', (err, fd) => {
        if (err) {
          console.log(err)
        }

        fs.writeFile('unused-class-list.txt', text, (err) => {
          if (err) {
            console.log(err)
          }
        })
      })

      console.log('=======================================')
      console.log(res.unusedClasses.slice(0,4))
      console.log('---------------------------------------')
      console.log(`There are ${res.unusedClasses.length} unused classes!`)
      console.log('=======================================')
      console.log(res.classesNotInCSS.slice(0,4))
      console.log('---------------------------------------')
      console.log(`There are ${res.classesNotInCSS.length} classes not found in the CSS!`)
      console.log('Full list of classes in unused-class-list.txt in the current directory')
    }
  })

  function grabAllClasses(callback) {
    if (process.argv.length === 3) {
      const arg = process.argv[2]

      parseCSSFiles(arg, (err, res) => {
        parseReactFiles(arg, res, (err, res)  => {
          if(err) {
            callback(err)
          }

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
    } else if (process.argv.length === 4) {
      const cssArg = process.argv[2]
      const jsArg = process.argv[3]

      parseCSSFiles(cssArg, (err, res) => {
        parseReactFiles(jsArg, res, (err, res)  => {
          if (err) {
            callback(err)
          }

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
    } else {
      callback('Please Specify either onne or two files to check "CSS file is is always first"')
    }
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

  function parseReactFiles(file, cssArray, callback) {
    let arrOfJSClasses = []

    findInFiles.find({'term': / className='.+?'/, 'flags': 'g'}, file, '.js$')
      .then((results) => {
        if (results === []) {
          parseJSFiles(file, cssArray, (err, res) => {
            callback(err, res)
          })
        }

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

  function parseJSFiles(file, cssArray, callback) {
    let arrOfJSClasses = []

    findInFiles.find({'term': / class=".+?"/, 'flags': 'g'}, file, '.js$')
      .then((results) => {
        if (results === []) {
          callback('no files')
        }

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
}
