/*
 * grunt-cloudflare-purge
 * https://github.com/ghinda/grunt-cloudflare-purge
 *
 * Copyright (c) 2016 Ionut Colceriu
 * Licensed under the MIT license.
 */

var cloudflareApi = require('./cloudflare_api.js');

module.exports = function(grunt) {
  grunt.registerMultiTask('cloudflare_purge', 'Purge the CloudFlare cache.', function() {
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      apiKey: '',
      email: '',
      zone: '',
      data: {
        purge_everything: true
      }
    });

    var headers = {
      'Content-Type': 'application/json',
      'X-Auth-Key': options.apiKey,
      'X-Auth-Email': options.email
    };

    cloudflareApi.getZones({
      headers: headers,
      zone: options.zone
    }, function (err, res) {
      if (err) {
        grunt.log.error(JSON.stringify(err));
        return done();
      }

      var zone = cloudflareApi.findZone(res, options.zone);

      if (!zone) {
        grunt.log.error('Can\'t find zone ' + options.zone + '.');
        return done();
      }

      cloudflareApi.purgeCache({
        headers: headers,
        zone: zone,
        data: options.data
      }, function (err, res) {
        if (err) {
          grunt.log.error(JSON.stringify(err));
          return done();
        }

        grunt.log.writeln('CloudFlare cache for zone "' + options.zone + '" was purged.');
        done();
      });
    });
  });

};
