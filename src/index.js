import Blockly from 'blockly';
import biBlocks from './utils/bi_blockly/blocks/bi_blockly';
import biBlocksJS from './utils/bi_blockly/generators/javascript/bi_blockly';
import commands from './commands';

export default (editor, opts = {}) => {
  const options = {
    ...{
      // Blockly options
      blocklyOptions: {
        toolbox: '',
        workspaceOptions: {}
      },

      // Starter code
      starter: 'var el = this',

      toolbarIcon: '<i class="fa fa-puzzle-piece"></i>',

      // Component types to give logic support
      logicTypesSupport: ['default', 'wrapper', 'text', 'textnode', 'image', 'video', 'svg'],

      // Object to extend the default component's toolbar button for the code, eg. `{ label: '</>', attributes: { title: 'Open custom code' } }`
      // Pass a falsy value to avoid adding the button
      toolbarBtnCustomCode: {},

      // On run success
      onRun: () => console.log('success'),

      // Logic when there is an error on run
      onSyntaxError: err => console.log('error', err),

      // Title for the custom code modal
      modalTitle: 'Insert your logic',

      // Additional options for the code viewer, eg. `{ theme: 'hopscotch', readOnly: 0 }`
      codeViewOptions: {},

      // Label for the default save button
      buttonLabel: 'Save',

      // Object to extend the default inject logic command.
      // Check the source to see all available methods
      commandInjectLogic: {},
    },
    ...opts
  };

  // set blockly globally
  biBlocks(Blockly);

  biBlocksJS(Blockly);

  // load commands
  commands(editor, options);

  // TODO Remove
  editor.on('load', () =>
    editor.addComponents(
      `<div style="margin:100px; padding:25px;">
            Content loaded from the plugin
        </div>`, {
        at: 0
      }
    ))
};