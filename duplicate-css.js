const glob = require('glob')
const fs = require('fs')
const _ = require('lodash')
const sass = require('node-sass')

const importReg = new RegExp('\@import.+;')
const cssReg = new RegExp('\.?.+\{[\S\s]+?\}')

module.exports = function (file) {
  compileCSS(file, (err, res) => {
    if (err) {
      console.log(err)
    }

    console.log(res)

    const css = fs.readFileSync(__dirname + '/styles.css', 'utf8')

    let arrOfClasses = css.split(cssReg)

    arrOfClasses.map((val) => {
      console.log(val + '\n\n')
    })
  })


}


function compileCSS(file, callback) {
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
        callback(err, null)
      }

      console.log(res)
      fs.writeFileSync(__dirname + '/styles.css', res.css)
      callback(null, 'successful write to styles.css')
    })
  })
}
