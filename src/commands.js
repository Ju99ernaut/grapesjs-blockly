import {
    cmdId,
    keyBlocklyXml
} from './consts';
//import {
//    parseCode
//} from './utils/js2blocks';
import BlocklyEditor from './blocklyEditor';

export default (editor, opts = {}) => {
    const cm = editor.Commands;
    const md = editor.Modal;
    const domc = editor.Components;
    const {
        modalTitle,
        codeViewOptions,
        commandBlocklyScript,
        blocklyOptions,
        blocklyTypesSupport,
        toolbarIcon,
        onRun,
        onError,
        starter
    } = opts;

    let blocklyEditor = null;
    let content = null;

    const appendToContent = (target, content) => {
        if (content instanceof HTMLElement) {
            target.appendChild(content);
        } else if (content) {
            target.insertAdjacentHTML('beforeend', content);
        }
    };

    // Add icons to specified component types
    blocklyTypesSupport && blocklyTypesSupport.forEach(type => {
        const typeOpt = domc.getType(type).model;
        domc.addType(type, {
            model: {
                initToolbar() {
                    typeOpt.prototype.initToolbar.apply(this, arguments);
                    const tb = this.get('toolbar');
                    const tbExists = tb.some(item => item.command === cmdId);

                    if (!tbExists) {
                        tb.unshift({
                            command: cmdId,
                            label: toolbarIcon,
                            ...opts.toolbarBtnBlockly
                        });
                        this.set('toolbar', tb);
                    }
                }
            }
        });
    })

    // Add the blockly command
    cm.add(cmdId, {
        keyBlocklyXml,

        run(editor, sender, opts = {}) {
            this.editor = editor;
            this.options = opts;
            this.target = opts.target || editor.getSelected();
            const target = this.target;

            if (target) this.showCustomCode(target);
        },

        stop(editor) {
            //blocklyEditor && blocklyEditor.hide();
            blocklyEditor.workspace.clear();
            md.close();
        },

        /**
         * Method which tells how to show the custom code
         * @param  {Component} target
         */
        showCustomCode(target) {
            const {
                editor,
                options
            } = this;
            const title = options.title || modalTitle;
            if (!content) content = this.getContent();
            const code = target.getScriptString();
            md.open({
                title,
                content
            }).getModel().once('change:open', () => editor.stopCommand(this.id));
            //? mount code editors
            if (!blocklyEditor) {
                blocklyEditor = new BlocklyEditor(content.querySelector('#blockly'), blocklyOptions);
                blocklyEditor.workspace.addChangeListener(() => this.updateWorkspace());
            }
            const xml = target.get(keyBlocklyXml) || starter; //(code && parseCode(code)) || starter;
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), blocklyEditor.workspace);
        },

        /**
         * Custom pre-content. Can be a simple string or an HTMLElement
         */
        getPreContent() {},

        /**
         * Custom post-content. Can be a simple string or an HTMLElement
         */
        getPostContent() {
            const postContent = document.createElement('div');
            postContent.id = "code-viewer";
            const codeViewer = this.getCodeViewer();
            codeViewer.refresh();
            setTimeout(() => codeViewer.focus(), 0);
            postContent.appendChild(codeViewer.getElement());

            return postContent; //blockly el
        },

        /**
         * Get all the content for the custom code
         * @return {HTMLElement}
         */
        getContent() {
            const {
                editor
            } = this;
            const content = document.createElement('div');
            const blocklyCont = document.createElement('div');
            blocklyCont.id = "blockly-cont";
            blocklyCont.innerHTML = `<div id="blockly" style="width:100%;height:400px;color:grey"></div>`;
            const pfx = editor.getConfig('stylePrefix');
            content.className = `${pfx}inject-logic`;
            appendToContent(content, this.getPreContent());
            content.appendChild(blocklyCont);
            appendToContent(content, this.getPostContent());
            appendToContent(content, this.getContentActions());

            return content;
        },

        /**
         * Get the actions content. Can be a simple string or an HTMLElement
         * @return {HTMLElement|String}
         */
        getContentActions() {
            const {
                editor
            } = this;
            const actions = document.createElement('div');
            actions.id = "actns";
            actions.style = "position:absolute;bottom:260px;right:20px;z-index:2";
            const btn = document.createElement('button');
            const pfx = editor.getConfig('stylePrefix');
            btn.innerHTML = opts.buttonLabel;
            btn.className = `${pfx}btn-prim ${pfx}btn-save__inject-logic`;
            btn.onclick = () => this.handleSave();

            const runLogic = document.createElement('div');
            runLogic.id = "logic-toolbar";
            runLogic.className = "fa fa-bug";
            runLogic.style = "margin:5px;padding:10px;background:rgba(0,0,0,0.2);border-radius:3px;border:1px solid rgba(0,0,0,0.2);cursor:pointer";
            runLogic.onclick = () => this.runCode();

            actions.appendChild(runLogic);
            actions.appendChild(btn);

            return actions;
        },

        /**
         * Handle the main save task
         */
        handleSave() {
            const {
                editor,
                target
            } = this;
            const code = this.getCodeViewer().getContent();
            const xml = Blockly.Xml.workspaceToDom(blocklyEditor.workspace);
            target.set('script', code);
            target.set(keyBlocklyXml, Blockly.Xml.domToText(xml));
            editor.Modal.close();
        },

        /**
         * Return the code viewer instance
         * @return {CodeViewer}
         */
        getCodeViewer() {
            const {
                editor
            } = this;

            if (!this.codeViewer) {
                this.codeViewer = editor.CodeManager.createViewer({
                    codeName: 'javascript',
                    theme: 'hopscotch',
                    readOnly: 1,
                    autoBeautify: 1,
                    ...codeViewOptions,
                });
            }

            return this.codeViewer;
        },

        /**
         * Toggle between blockly and code viewer
         */
        toggleCodeViewer() {
            const blocklyStyle = content.querySelector('#blockly').style;
            const codeViewerStyle = content.querySelector('#code-viewer').style;
            const hidden = (blocklyStyle.height == '0px') || (blocklyStyle.height == '0');
            if (hidden) {
                blocklyStyle.height = "500px";
                codeViewerStyle.display = "none";
            } else {
                blocklyStyle.height = "0";
                codeViewerStyle.display = "block";
            }
        },

        /**
         * Update code when blocks change
         */
        updateWorkspace(e) {
            const blockly_code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
            try {
                // set readonly from generated
                this.getCodeViewer().setContent(blockly_code);
            } catch (e) {
                // readonly not found.
            }
        },

        /**
         * Syncronize blockly when code changes
         */
        sync() {
            const code = this.getCodeViewer().getContent();
            //parseCode(code);
        },

        /**
         * Evaluate code syntax
         */
        runCode() {
            //console.log("run")
            try {
                const code = this.getCodeViewer().getContent();
                Function('"use strict";' + code)(); // final code
                onRun && onRun();
            } catch (err) {
                console.log("error", err);
                onError && onError(err);
            }
        },

        ...commandBlocklyScript,
    });
}