'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var FedtplGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Fedtpl generator!'));

    var prompts = [{
      name: 'fedTpl',
      message: 'Would you like to create front end Templates?'
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;
	  this.blogName = props.blogName;
      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('deploy');
    this.copy('deploy/release.bat', 'deploy/release.bat');
	this.copy('deploy/release.conf', 'deploy/release.conf');
	this.copy('deploy/release.sh', 'deploy/release.sh');
	
	this.mkdir('psd');
	
	this.mkdir('webapp');
	this.mkdir('webapp/res');
	this.mkdir('webapp/res/images');
	this.mkdir('webapp/src');
	this.mkdir('webapp/src/css');
	this.copy('webapp/src/css/base.css', 'webapp/src/css/base.css');
	this.copy('webapp/src/css/grid.css', 'webapp/src/css/grid.css');
	this.copy('webapp/src/css/module.css', 'webapp/src/css/module.css');
	this.copy('webapp/src/css/unit.css', 'webapp/src/css/unit.css');
	
	this.mkdir('webapp/src/html');
	this.mkdir('webapp/src/html/module');
	this.mkdir('webapp/src/html/module/layout');
	this.copy('webapp/src/html/module/layout/index.html', 'webapp/src/html/module/layout/index.html');
	this.copy('webapp/src/html/module/layout/index.js', 'webapp/src/html/module/layout/index.js');
	
	this.mkdir('webapp/src/javascript');
	this.mkdir('webapp/src/javascript/cache');
	this.copy('webapp/src/javascript/cache/list.cache.js', 'webapp/src/javascript/cache/list.cache.js');
	
	this.mkdir('webapp/src/javascript/config');
	this.copy('webapp/src/javascript/config/develop.js', 'webapp/src/javascript/config/develop.js');
	this.copy('webapp/src/javascript/config/online.js', 'webapp/src/javascript/config/online.js');
	
	this.mkdir('webapp/src/javascript/extend');
	this.copy('webapp/src/javascript/extend/util.js', 'webapp/src/javascript/extend/util.js');
	
	this.mkdir('webapp/src/javascript/module');
	this.mkdir('webapp/src/javascript/page');
	this.copy('webapp/src/javascript/page/index.js', 'webapp/src/javascript/page/index.js');
	this.mkdir('webapp/src/javascript/widget');
	
	this.mkdir('webapp/src/javascript/widget/item');
	this.copy('webapp/src/javascript/widget/item/item.js', 'webapp/src/javascript/widget/item/item.js');
	this.mkdir('webapp/src/javascript/widget/layer');
	this.copy('webapp/src/javascript/widget/layer/card.js', 'webapp/src/javascript/widget/layer/card.js');
	this.copy('webapp/src/javascript/widget/layer/window.js', 'webapp/src/javascript/widget/layer/window.js');
	this.copy('webapp/src/javascript/widget/module.js', 'webapp/src/javascript/widget/item/module.js');
	
	
	this.copy('webapp/src/javascript/readme.txt', 'webapp/src/javascript/readme.txt');
	this.mkdir('webapp/src/mcss');
	this.copy('webapp/src/mcss/_config.mcss', 'webapp/src/mcss/_config.mcss');
	this.copy('webapp/src/mcss/_prefix.mcss', 'webapp/src/mcss/_prefix.mcss');
	this.copy('webapp/src/mcss/base.mcss', 'webapp/src/mcss/base.mcss');
	this.copy('webapp/src/mcss/grid.mcss', 'webapp/src/mcss/grid.mcss');
	this.copy('webapp/src/mcss/mcss.json', 'webapp/src/mcss/mcss.json');
	this.copy('webapp/src/mcss/module.mcss', 'webapp/src/mcss/module.mcss');
	this.copy('webapp/src/mcss/unit.mcss', 'webapp/src/mcss/unit.mcss');
	
	
	this.mkdir('webapp/src/3rd');
	
	this.mkdir('webapp/src/pages');
	
	this.mkdir('webapp/WEB-INF');
	
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
	
	this.copy('_bowerrc', '.bowerrc');
  },

  projectfiles: function () {
    
  }
});

module.exports = FedtplGenerator;
