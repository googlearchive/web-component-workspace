/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// jshint node:true
'use strict';
var assert = require('assert');
var Datastore = require('nedb');

var WebComponentDb = function WebComponentDb(configFile) {
  assert(typeof configFile == "string", "configFile must be a string.");
  this.db = new Datastore({
    filename: configFile,
    autoload: true
  });
}

WebComponentDb.prototype = {
  addPackage: function addPackage(folder, repo) {
    this.db.remove({folder: folder});
    this.db.insert({folder: folder, repo: repo});
  },
  setPackageDeps: function setPackageDeps(folder, deps) {
    this.db.update({folder: folder}, {$set: {deps: deps}});
  },
  setPackageBranch: function setPackageBranch(folder, branch) {
    this.db.update({folder: folder}, {$set: {branch: branch}});
  }
}

module.exports = WebComponentDb;