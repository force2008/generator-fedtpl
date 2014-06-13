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
	  this.blogName = props.tplName;
	  this.mcss = props.mcss;
	  this.freemaker = props.freemaker;
	  this.test = props.test;
	  //console.log('template name:',this.blogName,',mcss:',this.mcss,'freemaker:',this.freemaker,'test:',this.test)
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
		this.copy('deploy/release.sh', 'deploy/release.sh');
		
		this.mkdir('psd');
		this.mkdir('webapp');
		
		this.bulkDirectory('webapp/res','webapp/res');
		this.bulkDirectory('webapp/src','webapp/src');
		
		this.bulkDirectory('webapp/res','webapp/res');
		if(this.template){
			this.bulkDirectory('webapp/WEB-INF','webapp/WEB-INF');
			this.copy('deploy/release.conf', 'deploy/release_t.conf');
			
		} else{
			this.copy('deploy/release.conf', 'deploy/release.conf');
		}
		var _bower = require('./templates/_bower.json');
		if(this.test){
			this.bulkDirectory('webapp/test','webapp/test');
			console.log(JSON.stringify(_bower));
			_bower.dependencies.jasmine = 'https://github.com/pivotal/jasmine.git'
		}
		_bower.dependencies.nej = 'https://github.com/NetEaseWD/NEJ.git';
		_bower.dependencies.publisher = 'https://github.com/NetEaseWD/NEJPublisher.git';
		//this.copy('_bower.json', 'bower.json');
		this.write('bower.json', JSON.stringify(_bower));
		this.copy('_bowerrc', '.bowerrc');
	} else if(this.blogName=='website'){
		this.bulkDirectory('website','website');
	}
	var _package = {
					  "name": "package",
					  "version": "0.0.0",
					  "scripts": {},
					  "dependencies": {}
					};

	if(this.mcss){
		_package.scripts.preinstall ="npm i -g mcss";
		_package.dependencies.mcss='0.4.8';
	}
	
	//this.copy('_package.json', 'package.json');
	this.write('package.json', JSON.stringify(_package));
  },

  projectfiles: function () {
    
  }
});

module.exports = FedtplGenerator;
