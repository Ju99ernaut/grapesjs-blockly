import biBlocks from './utils/bi_blockly/blocks/bi_blockly';
import biBlocksJS from './utils/bi_blockly/generators/javascript/bi_blockly';
import commands from './commands';

export default (editor, opts = {}) => {
  const options = {
    ...{
      // Blockly options
      blocklyOptions: {
        toolbox: '',
        toolboxPush: '',
        workspaceOptions: {}
      },

      // Starter xml
      starter: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="bi_var" id="OHq;p^O:()AR3;aG%CwD" x="90" y="30"><field name="var_type">let</field><field name="var">el</field><value name="val"><block type="bi_var_name" id="Je,,~AE%W2MCRA?7u.^0"><field name="NAME">this</field></block></value></block></xml>',

      toolbarIcon: '<i class="fa fa-puzzle-piece"></i>',

      // Component types to allow script editing
      // Avoid components with predefined scripts
      blocklyTypesSupport: ['default', 'wrapper', 'text', 'textnode', 'image', 'video', 'svg'],

      // Object to extend the default component's toolbar button for the code, eg. `{ label: '</>', attributes: { title: 'Open blockly editor' } }`
      // Pass a falsy value to avoid adding the button
      toolbarBtnBlockly: {},

      // On run success
      onRun: () => console.log('valid syntax'),

      // Logic when there is an error on run
      onError: err => console.log('error', err),

      // Title for the blockly modal
      modalTitle: 'Blockly',

      // Additional options for the code viewer, eg. `{ theme: 'hopscotch', readOnly: 0 }`
      codeViewOptions: {},

      // Label for the default save button
      buttonLabel: 'Save',

      // Object to extend the default blockly command.
      // Check the source to see all available methods
      commandBlocklyScript: {},
    },
    ...opts
  };



  if (!Blockly) {
    throw new Error('Blockly instance not found');
  }

  // set blockly globally
  biBlocks(Blockly);

  biBlocksJS(Blockly);

  // load commands
  commands(editor, options);
};