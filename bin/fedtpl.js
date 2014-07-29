path = require('path')
yeoman = require('yeoman-generator')()
yeoman.alias(/^([^:]+)$/, '$1:all');
yeoman.alias(/^([^:]+)$/, '$1:app');

yeoman.lookup()
yeoman.register(path.resolve(__dirname, '../app/index.js'), 'yo');

yeoman.run(['yo'], {})