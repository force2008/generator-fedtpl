'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var FreemakerGenerator = module.exports = function FreemakerGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    yeoman.generators.NamedBase.apply(this, arguments);

    console.log('You called the freemarke subgenerator with the argument ' + this.name + '.');
};

util.inherits(FreemakerGenerator, yeoman.generators.NamedBase);

FreemakerGenerator.prototype.files = function files() {
    console.log(process.cwd());
    for (var i = 0, l = arguments.length; i < l; i++) {
        console.log(arguments[i]);
    }
    var tplFile = path.join(this.sourceRoot(), '../../app/templates/webapp/WEB-INF/template/pages/index.ftl');
    console.log(tplFile);
    //this.copy('../../app/templates/webapp/WEB-INF/template/pages/inftx.ftl', this.name + '.js');
    var pages = this.readFileAsString(tplFile);
    pages = pages.replace('${jspro}page/index.js', '${jspro}page/' + this.name + '.js');
    this.write(this.name + '.ftl', pages);
};

FreemakerGenerator.prototype.bootstrapFiles = function bootstrapFiles() {
    var appPath = this.appPath;
    console.log('appPath:' + appPath);
};