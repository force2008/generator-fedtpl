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
	this.log(JSON.stringify(this.pkg));
	
    var prompts = [{
	  type:"list",
      name: 'tplName',
      message: 'which template do you need:',
	  choices:["project","website"]
    },
	{
		when:function(props) { this.__tplName=props.tplName;return this.__tplName=='project'}.bind(this),
		type:'confirm',
		name:'freemaker',
		message: 'Would you to install freemaker structure in template?',
		default:true
	},
	{
		when:function(props) { return this.__tplName=='project'}.bind(this),
		type:'confirm',
		name:'test',
		message: 'Would you to install jasmine test structure in template?',
		default:true
	},
	{
		type:'confirm',
		name:'mcss',
		message: 'Would you to install MCSS in template?',
		default:'Y/n'
	}
	
	
	];

    this.prompt(prompts, function (props) {
	  console.log( JSON.stringify(props, null, "  ") );
      //this.someOption = props.someOption;
	  this.blogName = props.tplName;
	  this.mcss = props.mcss;
	  this.freemaker = props.freemaker;
	  this.test = props.test;
	  console.log('template name:',this.blogName,',mcsss:',this.mcss,'freemaker:',this.freemaker,'test:',this.test)
	  done();
    }.bind(this));
	var prompts = [{
	  type:"list",
      name: 'csstool',
      message: 'whitch template do you need:',
	  choices:["MCSS","official website"]
    }];
	
},

  app: function () {
	if(this.blogName=='project'){
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
		if(this.template){
			this.mkdir('webapp/WEB-INF');
		}
		
		if(this.test){
			var _bower = require('./templates/_bower.json');
			console.log(JSON.stringify(_bower));
			_bower.dependencies.jasmine = 'https://github.com/pivotal/jasmine.git'
		}
		_bower.dependencies.nej = 'https://github.com/NetEaseWD/NEJ.git';
		_bower.dependencies.publisher = 'https://github.com/NetEaseWD/NEJPublisher.git';
		//this.copy('_bower.json', 'bower.json');
		this.write('bower.json', JSON.stringify(_bower));
		this.copy('_bowerrc', '.bowerrc');
	} else if(this.blogName=='website'){
		this.mkdir('css');
		this.copy('css/style.mcss', 'website/css/style.css');
		this.mkdir('javascript');
		this.copy('javascript/index.js', '/website/javascript/index.js');
		this.copy('index.html', '/website/index.html');
	}
	var _package = {
					  "name": "package",
					  "version": "0.0.0",
					  "scripts": {
						"preinstall": "npm i -g mcss"
					  },
					  "dependencies": {}
					};
	if(this.mcss){
		_package.dependencies.mcss='0.4.8'
	}
	
	//this.copy('_package.json', 'package.json');
	this.write('package.json', JSON.stringify(_package));
  },

  projectfiles: function () {
    
  }
});

module.exports = FedtplGenerator;
