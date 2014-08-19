'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var FreemarkeGenerator = module.exports = function FreemarkeGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    
    //console.log(config);
    //console.log(options);
    console.log(args);
    
    yeoman.generators.NamedBase.apply(this, arguments);

    console.log('You called the freemarke subgenerator with the argument ' + this.name + '.');
};

util.inherits(FreemarkeGenerator, yeoman.generators.NamedBase);

FreemarkeGenerator.prototype.files = function files() {
    console.log(process.cwd());
    for (var i = 0, l = arguments.length; i < l; i++) {
        console.log('arguments:'+arguments[i]);
    }
    var tplFile = path.join(this.sourceRoot(), '../../app/templates/webapp/WEB-INF/template/pages/index.ftl');
    console.log(tplFile);
    //this.copy('../../app/templates/webapp/WEB-INF/template/pages/inftx.ftl', this.name + '.js');
    var pages = this.readFileAsString(tplFile);
    pages = pages.replace('${jspro}page/index.js', '${jspro}page/' + this.name + '.js');
    this.write(process.cwd()+'/webapp/WEB-INF/template/pages/'+this.name + '.ftl', pages);
};

FreemarkeGenerator.prototype.bootstrapFiles = function bootstrapFiles() {
    var appPath = this.appPath;
};