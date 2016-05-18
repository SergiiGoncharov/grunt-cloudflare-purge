'use strict';

var grunt = require('grunt');
var cloudflareApi = require('../tasks/cloudflare_api.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/


var cloudflare = grunt.file.readJSON('cloudflare.json');
var headers = {
  'Content-Type': 'application/json',
  'X-Auth-Key': cloudflare.key,
  'X-Auth-Email': cloudflare.email
};

exports.cloudflare_purge = {
  getZones: function (test) {
    test.expect(1);

    cloudflareApi.getZones({
      headers: headers
    }, function (err, res) {
      test.equal(err, null, 'should not throw an error when listing zones.');
      test.done();
    });
  },
  findZone: function (test) {
    test.expect(1);

    cloudflareApi.getZones({
      headers: headers
    }, function (err, zones) {
      var zone = cloudflareApi.findZone(zones, cloudflare.zone);

      test.equal(zone.name, cloudflare.zone, 'should find the specified zone.');
      test.done();
    });
  },
  purgeCache: function (test) {
    test.expect(1);

    cloudflareApi.getZones({
      headers: headers
    }, function (err, zones) {
      var zone = cloudflareApi.findZone(zones, cloudflare.zone);

      cloudflareApi.purgeCache({
        headers: headers,
        zone: zone,
        data: {
          purge_everything: true
        }
      }, function (err, res) {
        test.equal(err, null, 'should not throw an error when purging the cache.');
        test.done();
      });
    });
  }
};
