require('babel-register')();

const mocha  = require('mocha');


global.React = require('react');
global.ReactDOM = require('react-dom');
global.shallow = require('enzyme').shallow;
global.tShould  = require('should');

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

documentRef = document;
