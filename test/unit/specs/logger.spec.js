'use strict'

var logger = require('../../../src/utils/composrLogger.js')
var config = require('config')
var chai = require('chai')
var expect = chai.expect
var fs = require('fs')

var logFile = config.get('composrLog.logFile') ? config.get('composrLog.logFile') : 'logs/composr.log'

// Skipped for travis, but should work
describe.skip('Log file creation', function () {
  // Delete the logs if exists
  before(function (done) {
    if (fs.existsSync(logFile)) {
      fs.unlink(logFile, function (err) {
        if (err) throw err
        fs.writeFileSync(logFile, '')
        done(err)
      })
    } else {
      done()
    }
  })

  it('creates a log file', function (done) {
    this.timeout(30000)
    logger.error('bob el silencioso', function () {
      setTimeout(function () {
        fs.exists(logFile, function (exists) {
          expect(exists).to.equals(true)
          done()
        })
      }, 2000)
    })
  })

  it('logs the message', function (done) {
    logger.error('thenew error', function () {
      fs.readFile(logFile, 'utf8', function (err, data) {
        if (err) throw err
        expect(data.indexOf('thenew error')).to.not.equals(-1)
        done(err)
      })
    })
  })
})
