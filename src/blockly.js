// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

let Blockly;
if (typeof window !== 'undefined') {
    Blockly = require('../node_modules/node-blockly/browser-raw.js');
} else {
    Blockly = require('../node_modules/node-blockly/_blockly.js');
}
const biBlocks = require('./utils/bi_blockly/blocks/bi_blockly.js')
biBlocks(Blockly);

const blocklyJS = require('node-blockly/lib/javascript_compressed');
blocklyJS(Blockly);

const biBlocksJS = require('./utils/bi_blockly/generators/javascript/bi_blockly.js')
biBlocksJS(Blockly);

console.log("Blockly");

module.exports = Blockly;