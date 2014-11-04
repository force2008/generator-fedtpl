'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var FedtplGenerator = yeoman.generators.Base.extend({
    init: function() {
        this.pkg = require('../package.json');

        this.on('end', function() {
            if (!this.options['skip-install']) {
                console.log('installDependencies');
                this.installDependencies();
            }
        });
    },

    askFor: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous fedtpl generator!'));
        this.log(JSON.stringify(this.pkg));

        var prompts = [{
                type: 'list',
                name: 'tplName',
                message: 'which template do you need:',
                choices: ['project', 'website']
            }, {
                when: function(props) {
                    this.__tplName = props.tplName;
                    return this.__tplName == 'project'
                }.bind(this),
                name: 'webappName',
                message: 'what is your public folder(webapp)?',
                default: 'webapp'
            }, {
                when: function(props) {
                    return this.__tplName == 'project'
                }.bind(this),
                type: 'confirm',
                name: 'freemaker',
                message: 'Would you like to install freemaker structure in template?',
                default: true
            }, {
                when: function(props) {
                    return props.freemaker;
                }.bind(this),
                name: 'templatePath',
                message: 'Input freemaker path ',
                default: 'WEB-INF/template'
            }, {
                when: function(props) {
                    return this.__tplName == 'project'
                }.bind(this),
                type: 'confirm',
                name: 'test',
                message: 'Would you like to install jasmine test structure in template?',
                default: true
            }, {
                type: 'confirm',
                name: 'mcss',
                message: 'Would you like to install MCSS in template?',
                default: 'Y/n'
            }, {
                type: 'confirm',
                name: 'puer',
                message: 'Would you like to install puer in template?',
                default: 'Y/n'
            }, {
                type: 'confirm',
                name: 'gitlab',
                message: 'Would you like to get dependencies from git lab?',
                default: 'Y/n'
            }

        ];

        this.prompt(prompts, function(props) {
            this.blogName = props.tplName;
            this.mcss = props.mcss;
            this.puer = props.puer;
            this.freemaker = props.freemaker;
            this.test = props.test;
            this.gitlab = props.gitlab;
            this.webappName = props.webappName;
            this.templatePath = props.templatePath;
            // console.log('template name:',this.blogName, 
            //   'webapp Name:',this.webappName,
            //   'templatePath',this.templatePath,
            //   'mcss:', this.mcss, this.puer, 
            //   'freemaker:', this.freemaker, 
            //   'test:', this.test)
            done();
        }.bind(this));
        // var prompts = [{
        //     type: 'list',
        //     name: 'csstool',
        //     message: 'whitch template do you need:',
        //     choices: ['MCSS', 'official website']
        // }];

    },

    app: function() {
        if (this.blogName == 'project') {
            this.mkdir('deploy');
            this.copy('deploy/release.bat', 'deploy/release.bat');
            this.copy('deploy/release.sh', 'deploy/release.sh');
                        
            this.write('.gitignore', '/node_modules');
            this.mkdir('psd');
            var webappName = this.webappName;
            this.mkdir(this.webappName);

            this.bulkDirectory( 'webapp/res',this.webappName+'/res');
            this.bulkDirectory( 'webapp/src',this.webappName+'/src');

            this.bulkDirectory('webapp/WEB-INF/template',this.webappName+'/'+this.templatePath);
            var tplFile = path.join(this.sourceRoot(), 'deploy/release.conf');
            var content = this.readFileAsString(tplFile);
            content = content.replace('./WEB-INF/template/pages/', this.templatePath+'/pages/');
            content = content.replace('./WEB-INF/tpl/pages/', './tpl/pages');
            content = content.replace('../webapp/', '../'+this.webappName);
            if (this.freemaker) {
                content = content.replace('#DIR_SOURCE_TP', 'DIR_SOURCE_TP');
                content = content.replace('#DIR_OUTPUT_TP', 'DIR_OUTPUT_TP');
            } 
            this.write('deploy/release.conf', content);
            var _bower = require('./templates/_bower.json');
            if (this.test) {
                this.bulkDirectory('webapp/test', this.webappName+'/test');
                console.log(JSON.stringify(_bower));
                _bower.dependencies.jasmine = 'https://github.com/pivotal/jasmine.git'
            }
            if (this.gitlab) {
                _bower.dependencies.nej = 'http://gitlab.hz.netease.com/caijf/nej.git';
                //_bower.dependencies.publisher = 'http://gitlab.hz.netease.com/caijf/nejpublisher.git';
            } else {
                _bower.dependencies.nej = 'https://github.com/NetEaseWD/NEJ.git';
                //_bower.dependencies.publisher = 'https://github.com/NetEaseWD/NEJPublisher.git';
            }
            //this.copy('_bower.json', 'bower.json');
            this.write('bower.json', JSON.stringify(_bower));
            var _bowerrc = {};
            _bowerrc.directory = this.webappName +'/src/javascript/lib';
            this.write('.bowerrc', JSON.stringify(_bowerrc));
            //this.copy('_bowerrc', '.bowerrc');
        } else if (this.blogName == 'website') {
            this.bulkDirectory('website', 'website');
        }
        var _package = {
            'name': 'package',
            'version': '0.0.0',
            'scripts': {},
            'dependencies': {}
        };

        if (this.mcss) {
            this.bulkDirectory('webapp/mcss',this.webappName+'/src/mcss');
            //_package.scripts.preinstall = 'npm i -g mcss';
            _package.dependencies.mcss = '0.4.8';
        }
        if (this.puer) {
            //_package.scripts.preinstall = 'npm i -g puer';
            _package.dependencies.puer = '0.1.1';
        }
        //_package.scripts.preinstall = 'npm i -g commander';
        _package.dependencies.nej = '0.2.5';
        //this.copy('_package.json', 'package.json');
        this.write('package.json', JSON.stringify(_package));
        this.write('config.json', JSON.stringify({"webapp":this.webappName,"template":this.templatePath}));
    },

    projectfiles: function() {

    }
});

module.exports = FedtplGenerator;