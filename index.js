#!/usr/bin/env node
const _ = require('lodash')

const checkUnusedClasses = require('./check-unused-classes')
const duplicateCSS = require('./duplicate-css')

if (process.argv[2] === '--css') {
  duplicateCSS(process.argv[3])
    .then((response) => {
      const duplicateClasses = _.values(response)
      console.log(response)
      console.log(`There are ${duplicateClasses.length} sets of classes that are doing the same thing`)
      console.log(`You could delete ${_.flattenDeep(duplicateClasses).length - duplicateClasses.length} classes from your css`)
      console.log('you can open duplicate-class-list.txt to see a more readable list of duplicate classes')
    })
    .catch(console.error)
} else {
  checkUnusedClasses()
}
