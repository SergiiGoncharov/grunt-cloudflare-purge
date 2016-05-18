# grunt-cloudflare-purge

> Purge the CloudFlare cache, using the CloudFlare v4 API.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cloudflare-purge --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cloudflare-purge');
```

## The "cloudflare_purge" task

### Overview
In your project's Gruntfile, add a section named `cloudflare_purge` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cloudflare_purge: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.apiKey
Type: `String`
Default value: ``

The CloudFlare Auth API key.

#### options.email
Type: `String`
Default value: ``

The CloudFlare account email.

#### options.zone
Type: `String`
Default value: ``

The CloudFlare domain for which to purge the cache.

#### options.data
Type: `Object`
Default value: `{"purge_everything":true}`

Data sent to the Purge API request. Can be used to purge the entire cache, or individual files. See the [CloudFlare API documentation](https://api.cloudflare.com/#zone-purge-individual-files-by-url-and-cache-tags).


### Usage Examples

```js
grunt.initConfig({
  cloudflare_purge: {
    default: {
      options: {
        apiKey: "123465798",
        email: "buenaventura.durruti@fai.com",
        zone: "fai.com"
      }
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
