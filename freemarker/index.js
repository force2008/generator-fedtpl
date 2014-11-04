'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var FreemarkeGenerator = module.exports = function FreemarkeGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    yeoman.generators.NamedBase.apply(this, arguments);
    console.log('You called the freemarke subgenerator with the argument ' + this.name + '.');
};

util.inherits(FreemarkeGenerator, yeoman.generators.NamedBase);

FreemarkeGenerator.prototype.files = function files() {
    //console.log(process.cwd());
    var tplFile = path.join(this.sourceRoot(), '../../app/templates/webapp/WEB-INF/template/pages/index.ftl');
    var pages = this.readFileAsString(tplFile);
    pages = pages.replace('${jspro}page/index.js', '${jspro}page/' + this.name + '.js');
    var config = JSON.parse(fs.readFileSync(process.cwd()+'/config.json'), 'utf8');
    this.write(process.cwd()+'/'+config.webapp+'/'+config.template+'/pages/'+this.name + '.ftl', pages);
};

FreemarkeGenerator.prototype.bootstrapFiles = function bootstrapFiles() {
    var appPath = this.appPath;
};