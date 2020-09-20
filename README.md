# Grapesjs Blockly

Attach code generated from `google blockly` to a component

>Requires `Blockly` and `@blockly/block-plus-minus` plugin recommended. Try adding after all components  

<p align="center">
  <img alt="screenshot.png" src="screenshot.png"/>
</p>

[DEMO](https://codepen.io/ju99ernaut/pen/ExKOxKg)

### HTML
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs"></script>
<script src="https://unpkg.com/blockly"></script>
<script src="https://unpkg.com/grapesjs-blockly"></script>

<div id="gjs"></div>
```

### JS
```js
const editor = grapesjs.init({
	container: '#gjs',
  height: '100%',
  fromElement: true,
  storageManager: false,
  plugins: ['grapesjs-blockly'],
});
```

### CSS
```css
body, html {
  margin: 0;
  height: 100%;
}
```


## Summary

* Plugin name: `grapesjs-blockly`
* Commands
    * `blockly-script`


## Options

| Option | Description | Default |
|-|-|-
| `blocklyOptions` | Options to pass to blockly on init, `toolbox` defines blockly toolbox, `workspaceOptions` defines blockly injection options, `toolbox` will overwrite the default and `toolboxPush` will add to default | `{toolbox: '', toolboxPush: '', workspaceOptions: {}}` |
| `starter` | Canvas starter blocks, defaulf setting generates `let el = this` | `<xml xmlns=...>...</xml>` |
| `toolbarIcon` | Toolbar icon for opening blockly modal | `<i class="fa fa-puzzle-piece"></i>` | 
| `blocklyTypesSupport` | Component types to allow script editing from blockly, `avoid components with predefined scripts or scripts set elsewhere` | `['default', 'wrapper', 'text', 'textnode', 'image', 'video', 'svg']` |
| `toolbarBtnBlockly` | Options to pass when extending toolbar | `{}` |
| `onRun` | Logic to run if debug is successful | `() => console.log('valid syntax')` |
| `onError` | Logic to run if debug finds errors | `err => console.log('error:',err)` |
| `modalTitle` | Title for blockly modal | `Blockly` |
| `codeViewOptions` | Additional options for the code viewer | `{}` |
| `buttonLabel` | Label for the default save button | `save` |
| `commandBlocklyScript` | Object to extend the default `blockly-script` command | `{}` |



## Download

* CDN
  * `https://unpkg.com/grapesjs-blockly`
* NPM
  * `npm i grapesjs-blockly`
* GIT
  * `git clone https://github.com/Ju99ernaut/grapesjs-blockly.git`



## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/blockly"></script>
<script src="path/to/grapesjs-blockly.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      // ...
      plugins: ['grapesjs-blockly'],
      pluginsOpts: {
        'grapesjs-blockly': { /* options */ }
      }
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-blockly';
import Blockly from 'blockly';
import 'grapesjs/dist/css/grapes.min.css';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [plugin],
  pluginsOpts: {
    [plugin]: { /* options */ }
  }
  // or
  plugins: [
    editor => plugin(editor, { /* options */ }),
  ],
});
```



## Development

Clone the repository

```sh
$ git clone https://github.com/Ju99ernaut/grapesjs-blockly.git
$ cd grapesjs-blockly
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build the source

```sh
$ npm run build
```



## License

MIT
