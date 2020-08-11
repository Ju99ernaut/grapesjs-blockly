import {
    cmdId
} from './consts';
import Blockly from 'blockly';
import BlocklyEditor from './blocklyEditor';
import {
    parseCode
} from './utils/js2blocks';

export default (editor, opts = {}) => {
    const cm = editor.Commands;
    const md = editor.Modal;
    const domc = editor.Components;
    const {
        modalTitle,
        codeViewOptions,
        commandInjectLogic,
        blocklyOptions,
        logicTypesSupport,
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

    //? Add icons specified scriptless component types
    logicTypesSupport && logicTypesSupport.forEach(type => {
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
                        });
                        this.set('toolbar', tb);
                    }
                }
            }
        });
    })

    // Add the custom code command
    cm.add(cmdId, {
        run(editor, sender, opts = {}) {
            this.editor = editor;
            this.options = opts;
            this.target = opts.target || editor.getSelected();
            const target = this.target;

            if (target && target.get('editable')) this.showCustomCode(target);
        },

        stop(editor) {
            //blocklyEditor && blocklyEditor.hide();
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
            const code = target.get('script') || starter;
            md.open({
                title,
                content
            }).getModel().once('change:open', () => editor.stopCommand(this.id));
            //? create blockly if none, parse target script if present, refresh the editors(set contents)
            //? mount code editors
            if (!blocklyEditor) {
                blocklyEditor = new BlocklyEditor(content.querySelector('#blockly'), blocklyOptions);
                blocklyEditor.workspace.addChangeListener(() => this.updateWorkspace());
            }
            this.getCodeViewer().setContent(code);
        },

        /**
         * Custom pre-content. Can be a simple string or an HTMLElement
         */
        getPreContent() {
            const preContent = document.createElement('div');
            preContent.id = "logic-toolbar";
            const runLogic = document.createElement('div');
            runLogic.id = "logic-toolbar";
            runLogic.className = "fa fa-bug";
            const toggle = document.createElement('div');
            toggle.id = "toggle-code-view";
            toggle.className = "fa fa-code";
            const sync = document.createElement('div');
            sync.id = "sync-logic";
            sync.className = "fa fa-refresh";

            runLogic.onclick = () => this.runCode();
            toggle.onclick = () => this.toggleCodeViewer();
            sync.onclick = () => this.copyGen();

            preContent.appendChild(runLogic);
            preContent.appendChild(toggle);
            preContent.appendChild(sync);

            return preContent; //toolbar el
        },

        /**
         * Custom post-content. Can be a simple string or an HTMLElement
         */
        getPostContent() {
            const postContent = document.createElement('div');
            postContent.id = "blockly-cont";
            postContent.innerHTML = `
                <div id="blockly" style="width:100%;height:500px;color:grey"></div>
                <div id="read-only-cont" style="display:none"></div>
                `;

            postContent.children[1].appendChild(this.getCodeGen().getElement());

            return postContent; //blockly el and hidden readonly input
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
            const codeCont = document.createElement('div');
            codeCont.id = "code-viewer";
            codeCont.style.display = "none";
            const codeViewer = this.getCodeViewer();
            const pfx = editor.getConfig('stylePrefix');
            content.className = `${pfx}inject-logic`;
            appendToContent(content, this.getPreContent());
            codeCont.appendChild(codeViewer.getElement());
            content.appendChild(codeCont);
            appendToContent(content, this.getPostContent());
            appendToContent(content, this.getContentActions());
            codeViewer.refresh();
            setTimeout(() => codeViewer.focus(), 0);

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
            const btn = document.createElement('button');
            const pfx = editor.getConfig('stylePrefix');
            btn.innerHTML = opts.buttonLabel;
            btn.className = `${pfx}btn-prim ${pfx}btn-save__inject-logic`;
            btn.onclick = () => this.handleSave();

            return btn;
        },

        /**
         * Handle the main save task
         */
        handleSave() {
            const {
                editor,
                target
            } = this;
            const code = this.getCodeGen().getContent();
            //? Reload component if required
            target.set('script', code);
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
                    readOnly: 0,
                    autoBeautify: 1,
                    ...codeViewOptions,
                });
                this.codeViewer.getElement().onChange = () => parseCode(this.codeViewer.getContent());
            }

            return this.codeViewer;
        },

        /**
         * Return the code generated instance
         * @return {CodeGen}
         */
        getCodeGen() {
            const {
                editor
            } = this;

            if (!this.codeGen) {
                this.codeGen = editor.CodeManager.createViewer({
                    codeName: 'javascript',
                    theme: 'hopscotch',
                    readOnly: 1,
                    autoBeautify: 1,
                    ...codeViewOptions,
                });
            }

            return this.codeGen;
        },

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

        copyGen() {
            //console.log("copyEd2_Ed1")

            // get generated from readonly
            const code = this.getCodeViewer().getContent();
            // check code && set editor to generated;
            parseCode(code) && this.getCodeViewer().setContent(code);
        },

        updateWorkspace(e) {
            console.log("updateWorkspace");
            let blockly_code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
            try {
                // set readonly from generated
                this.getCodeGen().setContent(blockly_code);
            } catch (e) {
                // readonly not found.
            }
        },

        runCode() {
            //console.log("run")
            try {
                // JCOA: Is there a safe eval with debug options?
                // eslint-disable-next-line
                code = this.getCodeViewer().getContent();
                eval(code); // final code
                onRun && onRun();
            } catch (err) {
                onError && onError(err);
            }
        },

        ...commandInjectLogic,
    });
}