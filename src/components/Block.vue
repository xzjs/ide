<template>
    <div id="block" ref="block"></div>
</template>

<script>
    import BlockPyEditor from '../assets/js/blockpy/editor';

    export default {
        name: "Block",
        data() {
            return {
                blockly: null,
                category_map: {
                    'Variables': '<category name="变量" custom="VARIABLE" colour="240">' +
                        '</category>',
                    'Decisions': '<category name="决策" colour="330">' +
                        '<block type="controls_if"></block>' +
                        '<block type="controls_if"><mutation else="1"></mutation></block>' +
                        '<block type="logic_compare"></block>' +
                        '<block type="logic_operation"></block>' +
                        '<block type="logic_negate"></block>' +
                        '</category>',
                    'Iteration': '<category name="循环" colour="300">' +
                        '<block type="controls_forEach"></block>' +
                        '</category>',
                    'Functions': '<category name="方法" custom="PROCEDURE" colour="210">' +
                        '</category>',
                    'Classes': '<category name="类" colour="210">' +
                        '<block type="class_creation"></block>' +
                        '<block type="class_creation">' +
                        '<mutation value="k"></mutation>' +
                        '</block>' +
                        '</category>',
                    'Calculation': '<category name="数学" colour="270">' +
                        //'<block type="raw_table"></block>'+
                        '<block type="math_arithmetic"></block>' +
                        //'<block type="type_check"></block>'+
                        //'<block type="raw_empty"></block>'+
                        //'<block type="math_single"></block>'+
                        //'<block type="math_number_property"></block>'+
                        '<block type="math_round"></block>' +
                        //'<block type="text_join"></block>'+
                        '</category>',
                    'Conversion': '<category name="转换" colour="275">' +
                        '<block type="procedures_callreturn" inline="true">' +
                        '<mutation name="int"><arg name="">' +
                        '</arg></mutation>' +
                        '</block>' +
                        '<block type="procedures_callreturn" inline="true">' +
                        '<mutation name="float"><arg name="">' +
                        '</arg></mutation>' +
                        '</block>' +
                        '<block type="procedures_callreturn" inline="true">' +
                        '<mutation name="str"><arg name="">' +
                        '</arg></mutation>' +
                        '</block>' +
                        '<block type="procedures_callreturn" inline="true">' +
                        '<mutation name="bool"><arg name="">' +
                        '</arg></mutation>' +
                        '</block>' +
                        '</category>',
                    'Python': '<category name="Python" colour="180">' +
                        '<block type="raw_block"></block>' +
                        '<block type="raw_expression"></block>' +
                        //'<block type="function_call"></block>'+
                        '</category>',
                    'Output': '<category name="输出" colour="160">' +
                        '<block type="text_print"></block>' +
                        // '<block type="text_print_multiple"></block>'+
                        // '<block type="plot_line"></block>' +
                        // '<block type="plot_scatter"></block>' +
                        // '<block type="plot_hist"></block>' +
                        // '<block type="plot_show"></block>' +
                        // '<block type="plot_title"></block>' +
                        // '<block type="plot_xlabel"></block>' +
                        // '<block type="plot_ylabel"></block>' +
                        '</category>',
                    // 'Input': '<category name="输入" colour="165">' +
                    //     '<block type="text_input"></block>' +
                    //     '</category>',
                    'Turtles': '<category name="Turtles" colour="180">' +
                        '<block type="turtle_create"></block>' +
                        '<block type="turtle_forward"></block>' +
                        '<block type="turtle_backward"></block>' +
                        '<block type="turtle_left"></block>' +
                        '<block type="turtle_right"></block>' +
                        '<block type="turtle_color"></block>' +
                        '</category>',
                    'Values': '<category name="值" colour="100">' +
                        '<block type="text"></block>' +
                        '<block type="math_number"></block>' +
                        '<block type="logic_boolean"></block>' +
                        '</category>',
                    'Tuples': '<category name="元组" colour="40">' +
                        '<block type="tuple_create"></block>' +
                        '</category>',
                    'Lists': '<category name="列表" colour="30">' +
                        //'<block type="lists_create"></block>'+
                        '<block type="lists_create_with">' +
                        '<value name="ADD0">' +
                        '<block type="math_number"><field name="NUM">0</field></block>' +
                        '</value>' +
                        '<value name="ADD1">' +
                        '<block type="math_number"><field name="NUM">0</field></block>' +
                        '</value>' +
                        '<value name="ADD2">' +
                        '<block type="math_number"><field name="NUM">0</field></block>' +
                        '</value>' +
                        '</block>' +
                        '<block type="lists_create_with"></block>' +
                        '<block type="lists_create_empty"></block>' +
                        // '<block type="lists_append"></block>' +
                        '<block type="procedures_callreturn" inline="true">' +
                        '<mutation name="range"><arg name="">' +
                        '<block type="math_number"><field name="NUM">10</field></block>' +
                        '</arg></mutation>' +
                        '<value name="ARG0">' +
                        '<block type="math_number"><field name="NUM">10</field></block>' +
                        '</value>' +
                        '</block>' +
                        /*'<block type="lists_length"></block>'+*/
                        /*'<block type="lists_index">'+
                            '<value name="ITEM">'+
                              '<shadow type="math_number">'+
                                '<field name="NUM">0</field>'+
                              '</shadow>'+
                            '</value>'+
                        '</block>'+*/
                        '</category>',
                    // 'Dictionaries': '<category name="字典" colour="0">' +
                    //     // '<block type="dicts_create_with"></block>' +
                    //     '<block type="dict_get_literal"></block>' +
                    //     //'<block type="dict_keys"></block>'+
                    //     '</category>',
                    /*
                    'Data - Weather': '<category name="Data - Weather" colour="70">'+
                                    '<block type="weather_temperature"></block>'+
                                    '<block type="weather_report"></block>'+
                                    '<block type="weather_forecasts"></block>'+
                                    '<block type="weather_report_forecasts"></block>'+
                                    '<block type="weather_all_forecasts"></block>'+
                                    '<block type="weather_highs_lows"></block>'+
                                '</category>',
                    'Data - Stocks': '<category name="Data - Stock" colour="65">'+
                                    '<block type="stocks_current"></block>'+
                                    '<block type="stocks_past"></block>'+
                                '</category>',
                    'Data - Earthquakes': '<category name="Data - Earthquakes" colour="60">'+
                                    '<block type="earthquake_get"></block>'+
                                    '<block type="earthquake_both"></block>'+
                                    '<block type="earthquake_all"></block>'+
                                '</category>',
                    'Data - Crime': '<category name="Data - Crime" colour="55">'+
                                    '<block type="crime_state"></block>'+
                                    '<block type="crime_year"></block>'+
                                    '<block type="crime_all"></block>'+
                                '</category>',
                    'Data - Books': '<category name="Data - Books" colour="50">'+
                                    '<block type="books_get"></block>'+
                                '</category>',*/
                    'Data - Parking': '<category name="Data - Parking" colour="45">' +
                        '<block type="datetime_day"></block>' +
                        '<block type="datetime_time"></block>' +
                        '<block type="logic_compare">' +
                        '<field name="OP">EQ</field>' +
                        '<value name="A">' +
                        '<block type="datetime_time">' +
                        '<mutation isNow="1"></mutation>' +
                        '<field name="HOUR">1</field>' +
                        '<field name="MINUTE">00</field>' +
                        '<field name="MERIDIAN">PM</field>' +
                        '</block>' +
                        '</value>' +
                        '</block>' +
                        '<block type="logic_compare">' +
                        '<field name="OP">EQ</field>' +
                        '<value name="A">' +
                        '<block type="datetime_day">' +
                        '<field name="DAY">Monday</field>' +
                        '</block>' +
                        '</value>' +
                        '</block>' +
                        //'<block type="datetime_check_day"></block>'+
                        //'<block type="datetime_check_time"></block>'+
                        '</category>',
                    'Separator': '<sep></sep>'
                },
                default_modules: [
                    'Variables',
                    'Decisions',
                    'Iteration',
                    'Calculation',
                    'Output',
                    'Input',
                    'Values',
                    'Conversion',
                    'Lists',
                    'Dictionaries'
                ],
                converter: null,
            }
        },
        mounted() {
            this.blockly = Blockly.inject('block', {toolbox: this.updateToolbox(false)});
            BlockPyEditor.blockly = this.blockly;
            this.converter = new PythonToBlocks();
            this.blockly.addChangeListener(() => {
                this.updateBlocks();
            });
        },
        methods: {
            updateToolbox: function (only_set) {
                var xml = '<xml id="toolbox" style="display: none">';
                var modules = this.default_modules;
                var started_misc = false,
                    started_values = false,
                    started_data = false;
                for (var i = 0, length = modules.length; i < length; i = i + 1) {
                    var module = modules[i];
                    if (!started_misc && ['Calculation', 'Conversion', 'Output', 'Input', 'Python'].indexOf(module) != -1) {
                        started_misc = true;
                        xml += this.category_map['Separator'];
                    }
                    if (!started_values && ['Values', 'Lists', 'Dictionaries'].indexOf(module) != -1) {
                        started_values = true;
                        xml += this.category_map['Separator'];
                    }
                    if (!started_data && module.slice(0, 6) == 'Data -') {
                        started_data = true;
                        xml += this.category_map['Separator'];
                    }
                    if (typeof module == 'string') {
                        xml += this.category_map[module];
                    } else {
                        // var category = '<category name="' + module.name + '" colour="' + module.color + '">';
                        // for (var j = 0; module.blocks.length > 0; j = j + 1) {
                        //     var block = module.blocks[j];
                        //     category += '<block type="' + block + '"></block>';
                        // }
                        // category += '</category>';
                    }
                    //'<sep></sep>'+
                }
                xml += '</xml>';
                if (only_set && !this.main.model.settings.read_only()) {
                    this.blockly.updateToolbox(xml);
                    this.makeToolboxAccessible();
                    this.blockly.resize();
                } else {
                    return xml;
                }
            },
            setBlocks: function (python_code) {
                let xml_code = "";
                if (python_code !== '' && python_code !== undefined && python_code.trim().charAt(0) !== '<') {
                    let result = this.converter.convertSource(python_code);
                    xml_code = result.xml;
                }
                let error_code = this.converter.convertSourceToCodeBlock(python_code);
                let errorXml = Blockly.Xml.textToDom(error_code);
                if (python_code === '' || python_code === undefined || python_code.trim() === '') {
                    this.blockly.clear();
                } else if (xml_code !== '' && xml_code !== undefined) {
                    let blocklyXml = Blockly.Xml.textToDom(xml_code);
                    try {
                        BlockPyEditor.setBlocksFromXml(blocklyXml);
                    } catch (e) {
                        BlockPyEditor.setBlocksFromXml(errorXml);
                    }
                } else {
                    BlockPyEditor.setBlocksFromXml(errorXml);
                }
                Blockly.Events.disable();
                this.blockly.align();
                Blockly.Events.enable();
            },
            updateBlocks: function () {
                let newCode = '';
                try {
                    newCode = Blockly.Python.workspaceToCode(this.blockpy);
                } catch (e) {
                    BlockPyEditor.clearDeadBlocks();
                }
                this.$emit('blockChange', newCode);
            }
        }
    }
</script>

<style scoped>
    #block {
        height: calc(100vh - 260px);
        width: 100%;
    }
</style>