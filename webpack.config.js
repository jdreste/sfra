/* globals cat, cd, cp, echo, exec, exit, find, ls, mkdir, rm, target, test */
'use strict';

require('shelljs/make');
var path = require('path');

var createJSPath = function () {
    var result = {};

    var jsFiles = ls('./app_storefront_base/cartridge/client/js/*.js');

    jsFiles.forEach(function (filePath) {
        var name = path.basename(filePath, '.js');
        result[name] = filePath;
    });

    return result;
};

module.exports = [{
    name: 'js',
    entry: createJSPath(),
    output: {
        path: './app_storefront_base/cartridge/static/default/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /bootstrap(.)*\.js$/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}];
