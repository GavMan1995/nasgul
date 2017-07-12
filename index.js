#!/usr/bin/env node
const checkUnusedClasses = require('./check-unused-classes')
const duplicateCSS = require('./duplicate-css')

if (process.argv[2] === '--css') {
  duplicateCSS(process.argv[3])
} else {
  checkUnusedClasses()
}
