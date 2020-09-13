export default class BlocklyEditor {
    constructor(div, opts = {}) {
        const toolbox = opts.toolbox || `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
        <category name="Logic" colour="%{BKY_LOGIC_HUE}">
            <category name="If">
                <block type="controls_if"></block>
                <block type="controls_if">
                    <mutation else="1"></mutation>
                </block>
                <block type="controls_if">
                    <mutation elseif="1" else="1"></mutation>
                </block>
            </category>
            <category name="Boolean" colour="%{BKY_LOGIC_HUE}">
                <block type="logic_compare"></block>
                <block type="logic_operation"></block>
                <block type="logic_negate"></block>
                <block type="logic_boolean"></block>
                <block type="logic_null"></block>
                <block type="logic_ternary"></block>
            </category>
        </category>
        <category name="Loops" colour="%{BKY_LOOPS_HUE}">
            <block type="controls_repeat_ext">
                <value name="TIMES">
                <block type="math_number">
                    <field name="NUM">10</field>
                </block>
                </value>
            </block>
            <block type="controls_whileUntil"></block>
            <block type="bi_for"></block>
            <block type="controls_for">
                <field name="VAR">i</field>
                <value name="FROM">
                <block type="math_number">
                    <field name="NUM">1</field>
                </block>
                </value>
                <value name="TO">
                <block type="math_number">
                    <field name="NUM">10</field>
                </block>
                </value>
                <value name="BY">
                <block type="math_number">
                    <field name="NUM">1</field>
                </block>
                </value>
            </block>
            <block type="controls_forEach"></block>
            <block type="controls_flow_statements"></block>
        </category>
        <category name="Math" colour="%{BKY_MATH_HUE}">
            <block type="math_number">
                <field name="NUM">123</field>
            </block>
            <block type="bi_parenthesis"></block>
            <block type="bi_unary"></block>
            <block type="bi_unary_return"></block>
            <block type="bi_unary_postfix"></block>
            <block type="bi_unary_postfix_return"></block>
            <block type="math_arithmetic"></block>
            <block type="math_single"></block>
            <block type="math_trig"></block>
            <block type="math_constant"></block>
            <block type="math_number_property"></block>
            <block type="math_round"></block>
            <block type="math_on_list"></block>
            <block type="math_modulo"></block>
            <block type="math_constrain">
                <value name="LOW">
                <block type="math_number">
                    <field name="NUM">1</field>
                </block>
                </value>
                <value name="HIGH">
                <block type="math_number">
                    <field name="NUM">100</field>
                </block>
                </value>
            </block>
            <block type="math_random_int">
                <value name="FROM">
                <block type="math_number">
                    <field name="NUM">1</field>
                </block>
                </value>
                <value name="TO">
                <block type="math_number">
                    <field name="NUM">100</field>
                </block>
                </value>
            </block>
            <block type="math_random_float"></block>
            <block type="math_atan2"></block>
        </category>
        <category name="Lists" colour="%{BKY_LISTS_HUE}">
            <block type="lists_create_empty"></block>
            <block type="lists_create_with"></block>
            <block type="lists_repeat">
                <value name="NUM">
                <block type="math_number">
                    <field name="NUM">5</field>
                </block>
                </value>
            </block>
            <block type="lists_length"></block>
            <block type="lists_isEmpty"></block>
            <block type="lists_indexOf"></block>
            <block type="lists_getIndex"></block>
            <block type="lists_setIndex"></block>
        </category>
        <sep></sep>
        <category name="Text" colour="%{BKY_TEXTS_HUE}">
            <block type="text"></block>
            <block type="text_join"></block>
            <block type="text_append">
                <value name="TEXT">
                <shadow type="text"></shadow>
                </value>
            </block>
            <block type="text_length">
                <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
                </value>
            </block>
            <block type="text_isEmpty">
                <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>
                </value>
            </block>
            <block type="text_indexOf">
                <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR">{textVariable}</field>
                </block>
                </value>
                <value name="FIND">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
                </value>
            </block>
            <block type="text_charAt">
                <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR">{textVariable}</field>
                </block>
                </value>
            </block>
            <block type="text_getSubstring">
                <value name="STRING">
                <block type="variables_get">
                    <field name="VAR">{textVariable}</field>
                </block>
                </value>
            </block>
            <block type="text_changeCase">
                <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
                </value>
            </block>
            <block type="text_trim">
                <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
                </value>
            </block>
            <block type="text_print">
                <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
                </value>
            </block>
            <block type="text_prompt_ext">
                <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
                </value>
            </block>
        </category>
        <category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
        </category>
        <category name="Functions" custom="PROCEDURE" colour="%{BKY_PROCEDURES_HUE}">
        </category>
        <category id="catColour" name="Color" colour="20">
            <block type="colour_picker"></block>
            <block type="colour_random"></block>
            <block type="colour_rgb">
                <value name="RED">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
                <value name="GREEN">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
                <value name="BLUE">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
            <block type="colour_blend">
                <value name="COLOUR1">
                    <shadow type="colour_picker">
                        <field name="COLOUR">#ff0000</field>
                    </shadow>
                </value>
                <value name="COLOUR2">
                    <shadow type="colour_picker">
                        <field name="COLOUR">#3333ff</field>
                    </shadow>
                </value>
                <value name="RATIO">
                    <shadow type="math_number">
                        <field name="NUM">0.5</field>
                    </shadow>
                </value>
            </block>
        </category>
        <sep></sep>
        <category name="Modern" colour="230">
            <block type="bi_var"></block>
            <block type="bi_var_name"></block>
            <block type="bi_assignment"></block>      
            <block type="bi_assignment_return"></block>      
            <block type="bi_field"></block>
            <block type="bi_field_return"></block>
            <block type="bi_return"></block>
            <block type="bi_spread"></block>
        </category>
        <category name="Advanced js" colour="90">
            <block type="bi_new"></block>
            <block type="bi_anonymous_class"></block>
            <block type="bi_class"></block>
            <block type="bi_static"></block>      
            <block type="bi_get"></block>
            <block type="bi_set"></block>
            <block type="bi_try_catch"></block>      
            <block type="bi_catch"></block>
            <block type="bi_comment"></block>
        </category>
        ${opts.toolboxPush}
        <category name="Library" expanded="true">
            <category name="Randomize">
                <block type="procedures_defnoreturn">
                <mutation>
                    <arg name="list"></arg>
                </mutation>
                <field name="NAME">randomize</field>
                <statement name="STACK">
                    <block type="controls_for" inline="true">
                    <field name="VAR">x</field>
                    <value name="FROM">
                        <block type="math_number">
                        <field name="NUM">1</field>
                        </block>
                    </value>
                    <value name="TO">
                        <block type="lists_length" inline="false">
                        <value name="VALUE">
                            <block type="variables_get">
                            <field name="VAR">list</field>
                            </block>
                        </value>
                        </block>
                    </value>
                    <value name="BY">
                        <block type="math_number">
                        <field name="NUM">1</field>
                        </block>
                    </value>
                    <statement name="DO">
                        <block type="variables_set" inline="false">
                        <field name="VAR">y</field>
                        <value name="VALUE">
                            <block type="math_random_int" inline="true">
                            <value name="FROM">
                                <block type="math_number">
                                <field name="NUM">1</field>
                                </block>
                            </value>
                            <value name="TO">
                                <block type="lists_length" inline="false">
                                <value name="VALUE">
                                    <block type="variables_get">
                                    <field name="VAR">list</field>
                                    </block>
                                </value>
                                </block>
                            </value>
                            </block>
                        </value>
                        <next>
                            <block type="variables_set" inline="false">
                            <field name="VAR">temp</field>
                            <value name="VALUE">
                                <block type="lists_getIndex" inline="true">
                                <mutation statement="false" at="true"></mutation>
                                <field name="MODE">GET</field>
                                <field name="WHERE">FROM_START</field>
                                <value name="AT">
                                    <block type="variables_get">
                                    <field name="VAR">y</field>
                                    </block>
                                </value>
                                <value name="VALUE">
                                    <block type="variables_get">
                                    <field name="VAR">list</field>
                                    </block>
                                </value>
                                </block>
                            </value>
                            <next>
                                <block type="lists_setIndex" inline="false">
                                <value name="AT">
                                    <block type="variables_get">
                                    <field name="VAR">y</field>
                                    </block>
                                </value>
                                <value name="LIST">
                                    <block type="variables_get">
                                    <field name="VAR">list</field>
                                    </block>
                                </value>
                                <value name="TO">
                                    <block type="lists_getIndex" inline="true">
                                    <mutation statement="false" at="true"></mutation>
                                    <field name="MODE">GET</field>
                                    <field name="WHERE">FROM_START</field>
                                    <value name="AT">
                                        <block type="variables_get">
                                        <field name="VAR">x</field>
                                        </block>
                                    </value>
                                    <value name="VALUE">
                                        <block type="variables_get">
                                        <field name="VAR">list</field>
                                        </block>
                                    </value>
                                    </block>
                                </value>
                                <next>
                                    <block type="lists_setIndex" inline="false">
                                    <value name="AT">
                                        <block type="variables_get">
                                        <field name="VAR">x</field>
                                        </block>
                                    </value>
                                    <value name="LIST">
                                        <block type="variables_get">
                                        <field name="VAR">list</field>
                                        </block>
                                    </value>
                                    <value name="TO">
                                        <block type="variables_get">
                                        <field name="VAR">temp</field>
                                        </block>
                                    </value>
                                    </block>
                                </next>
                                </block>
                            </next>
                            </block>
                        </next>
                        </block>
                    </statement>
                    </block>
                </statement>
                </block>
            </category>
            <category name="Jabberwocky">
                <block type="text_print">
                <value name="TEXT">
                    <block type="text">
                    <field name="TEXT">'Twas brillig, and the slithy toves</field>
                    </block>
                </value>
                <next>
                    <block type="text_print">
                    <value name="TEXT">
                        <block type="text">
                        <field name="TEXT">  Did gyre and gimble in the wabe:</field>
                        </block>
                    </value>
                    <next>
                        <block type="text_print">
                        <value name="TEXT">
                            <block type="text">
                            <field name="TEXT">All mimsy were the borogroves,</field>
                            </block>
                        </value>
                        <next>
                            <block type="text_print">
                            <value name="TEXT">
                                <block type="text">
                                <field name="TEXT">  And the mome raths outgrabe.</field>
                                </block>
                            </value>
                            </block>
                        </next>
                        </block>
                    </next>
                    </block>
                </next>
                </block>
                <block type="text_print">
                <value name="TEXT">
                    <block type="text">
                    <field name="TEXT">"Beware the Jabberwock, my son!</field>
                    </block>
                </value>
                <next>
                    <block type="text_print">
                    <value name="TEXT">
                        <block type="text">
                        <field name="TEXT">  The jaws that bite, the claws that catch!</field>
                        </block>
                    </value>
                    <next>
                        <block type="text_print">
                        <value name="TEXT">
                            <block type="text">
                            <field name="TEXT">Beware the Jubjub bird, and shun</field>
                            </block>
                        </value>
                        <next>
                            <block type="text_print">
                            <value name="TEXT">
                                <block type="text">
                                <field name="TEXT">  The frumious Bandersnatch!"</field>
                                </block>
                            </value>
                            </block>
                        </next>
                        </block>
                    </next>
                    </block>
                </next>
                </block>
            </category>
        </category>
        </xml>`;
        this.workspace = Blockly.inject(div, {
            toolbox: toolbox,
            zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.2,
                scaleSpeed: 1.2
            },
            grid: {
                spacing: 20,
                length: 3,
                color: '#ccc',
                snap: true
            },
            trashcan: true,
            ...opts.workspaceOptions
        });
    }

    hide() {}
}