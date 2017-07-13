const glob = require('glob')
const fs = require('fs')
const _ = require('lodash')
const sass = require('node-sass')
const findInFiles = require('find-in-files')

const importReg = new RegExp('\@import.+;')

module.exports = function (file) {
  compileCSS(file)

  findInFiles.find({'term': /\..+ \{/, 'flags': 'g'}, __dirname + '/styles.css')
      .then((results) => {

        console.log(results)
        // let arrOfValues = _.values(results)

        // arrOfValues = arrOfValues.map((val) => {
        //   return val.matches
        // })

        // arrOfValues = [].concat.apply([], arrOfValues)

        // arrOfValues = arrOfValues.map((val) => {
        //   return val.split('.').pop().split(' {').join('')
        // })

        // arrOfCSSClasses = arrOfValues.filter((elem, index, self) => {
        //   return index === self.indexOf(elem)
        // })

        // callback(null, arrOfCSSClasses)
      })
}


function compileCSS(file, cb) {
  fs.writeFileSync(__dirname + '/styles.scss', '')

  console.log('Grabbing SCSS files!')

  glob(file + '/**/*.scss', (err, files) => {
    if(err) {
      console.log(err)
    }

    console.log('Chunking SCSS together')

    files.map((file) => {
      if (file.indexOf('src/common/styles/global-dependencies/variables.scss') !== -1) {
        let contents = fs.readFileSync(file, 'utf8')
        contents = contents.split(importReg).join('')
        fs.appendFileSync(__dirname + '/styles.scss', contents)
      }
    })

    files.map((file) => {
      if (file.indexOf('global-dependencies') !== -1 && file.indexOf('variables.scss')  === -1) {
        let contents = fs.readFileSync(file, 'utf8')
        contents = contents.split(importReg).join('')
        fs.appendFileSync(__dirname + '/styles.scss', contents)
      }
    })

    files.map((file) => {
      if (file.indexOf('global-styles') !== -1 && file.indexOf('OLD') === -1) {
        let contents = fs.readFileSync(file, 'utf8')
        contents = contents.split(importReg).join('')
        fs.appendFileSync(__dirname + '/styles.scss', contents)
      }
    })

    files.map((file) => {
      if (file.indexOf('global-styles') === -1 && file.indexOf('global-dependencies') === -1) {
        let contents = fs.readFileSync(file, 'utf8')
        contents = contents.split(importReg).join('')
        fs.appendFileSync(__dirname + '/styles.scss', contents)
      }
    })

    console.log('Compliing SCSS to css')

    sass.render({file: __dirname + '/styles.scss'}, (err, res) => {
      if(err) {
        console.log(err)
      }

      console.log(res)
      fs.writeFile(__dirname + '/styles.css', res.css)
    })
  })
}
