const findInFiles = require('find-in-files')
const fs = require('fs')
const glob = require('glob')
const _ = require('lodash')
const sass = require('node-sass')

const classReg = /{.+}$/g
const regEx = /\.?[\D\d]*?{[\S\s]+?}/g

//TODO: Compile the scss to css and use the above regex to match the patterns in the file generated

module.exports = function(file) {
  return new Promise((resolve, reject) => {
    writeAllScss(file)

    sass.render({file: __dirname + '/styles.scss'}, (err, res) => {
      fs.writeFileSync(__dirname + '/compiled.css', res.css)

      const cssObj = parseCSS(__dirname + '/compiled.css')

      console.log(cssObj)
    })
    // findInFiles
    //   .find({'term': regEx, 'flags': 'g'}, file, '.scss$')
    //   .then((results) => {
    //     fs.writeFile('duplicate-class-list.txt', '')
    //     const classObj = {}
    //     const filteredObj = {}
    //     const realClasses = {}
    //     let arrOfValues = _.values(results).map((val) => {
    //       return val.matches
    //     })
    //
    //     arrOfValues = [].concat.apply([], arrOfValues)
    //
    //     arrOfValues.forEach((val) => {
    //       const polished = val.split(' ').join('').split('\n').join('')
    //       const objKey = polished.split(classReg)[0]
    //       const objVal = (polished.match(classReg) || [])[0]
    //
    //       if (!objKey || !objVal) return
    //
    //       classObj[objKey] = objVal
    //     })
    //
    //     _.keys(classObj).map((key) => {
    //       if (key.indexOf('@') === -1) {
    //         realClasses[key] = classObj[key]
    //       }
    //     })
    //
    //     const inverted = _.invertBy(realClasses)
    //
    //     _.keys(inverted).forEach((key) => {
    //       if (inverted[key].length > 1) {
    //         filteredObj[key] = inverted[key]
    //       }
    //     })
    //
    //     fs.open('duplicate-class-list.txt', 'w', (err, fd) => {
    //       if (err) {
    //         reject(err)
    //       }
    //
    //       _.keys(filteredObj).forEach((key) => {
    //         const classes =  JSON.stringify(filteredObj[key]).split(',').join('\n').split('"').join('').split('[').join('').split(']').join('')
    //         const text = `${classes}\n\nall have the same css properties:\n\n${key}\n\n========================================\n\n\n`
    //         fs.appendFileSync('duplicate-class-list.txt', text, 'utf8')
    //       })
    //     })
    //
    //     resolve(filteredObj)
    //   })
    //   .catch(reject)
  })
}

function parseCSS(file, callback) {
  let obj = {}
  const css = fs.readFileSync(file, 'utf8')
  let matches = css.match(regEx)

  matches.forEach((match) => {
    const polished =  match.split(' ').join('').split('\n').join('')
    const objKey = polished.split(classReg)[0].split('{').join('').split('}').join('')
    const objVal = _.pull((polished.match(classReg) || [])[0].split('{').join('').split('}').join('').split(';'), '')

    obj[objKey] = objVal
  })

  if (obj === {}) return console.log('Something went wrong')

  return obj;
}

function writeAllScss(file, callback) {
  glob('/**/*.scss', {root: file}, (err, files) => {
    if (err) return console.log(err)

    fs.writeFileSync(__dirname + '/styles.scss', '')

    writeSpecificFile(files, 'variables')
    writeSpecificFile(files, 'animations')
    writeSpecificFile(files, 'functions')
    writeSpecificFile(files, 'mixins')

    files.map((file) => {
      const content = fs.readFileSync(file, 'utf8')
      if (file.indexOf('variables') === -1 && file.indexOf('animations') === -1 && file.indexOf('functions') === -1 && file.indexOf('mixins') === -1 && content.indexOf('@import') === -1) {
        fs.appendFileSync(__dirname + '/styles.scss', content)
      }
    })
  })
}

function writeSpecificFile(files, query) {
  files.map((file) => {
    if(file.indexOf(query) !== -1) {
      const content = fs.readFileSync(file, 'utf8')
      fs.appendFileSync(__dirname + '/styles.scss', content)
    }
  })
}
