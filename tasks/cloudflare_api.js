/* cloudflare api v4
 */

var https = require('https');
var apiHost = 'api.cloudflare.com';
var apiUrl = '/client/v4';

function getZones (params, callback) {
  var postReq = https.request({
    host: apiHost,
    path: apiUrl + '/zones',
    method: 'GET',
    headers: params.headers
  }, function(res) {
    res.setEncoding('utf8');
    var data = '';

    res.on('data', function (d) {
      data += d;
    });

    res.on('end', function () {
      data = JSON.parse(data);
      var err = null;

      if (data.success !== true) {
        err = data.errors;
      }

      callback(err, data.result);
    });
  });

  postReq.end();
}

function findZone (zones, name) {
  var foundZone = null;

  zones.some(function (zone) {
    if (zone.name === name) {
      foundZone = zone;
      return true;
    }
  });

  return foundZone;
}

function purgeCache (params, callback) {
  var postData = JSON.stringify(params.data);
  params.headers['Content-Length'] = Buffer.byteLength(postData);

  var postReq = https.request({
    host: apiHost,
    path: apiUrl + '/zones/' + params.zone.id + '/purge_cache',
    method: 'DELETE',
    headers: params.headers
  }, function(res) {

    res.setEncoding('utf8');
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      data = JSON.parse(data);
      var err = null;

      if (data.success !== true) {
        err = data.errors;
      }

      callback(err, data);
    });
  });

  // post the data
  postReq.write(postData);
  postReq.end();
}

module.exports = {
  getZones: getZones,
  findZone: findZone,
  purgeCache: purgeCache
};
