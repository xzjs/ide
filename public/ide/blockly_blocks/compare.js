Blockly.Blocks['compare'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1 大于 %2",
            "args0": [{
                "type": "input_value",
                "name": "LEFT",
                "check": "Number",
            },
            {
                "type": "input_value",
                "name": "RIGHT",
                "check": "Number"
            }
            ],
            "output": "Boolean",
            "colour": 160,
            "tooltip": "比较两个数的大小"
        })
    }
}

Blockly.Python['compare'] = function (block) {
    var left = Blockly.Python.valueToCode(block, 'LEFT', Blockly.Python.ORDER_RELATIONAL) || '__';
    var right = Blockly.Python.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_RELATIONAL) || '__';
    var code = 'compare(' + left + ',' + right + ')';
    return [code, Blockly.Python.ORDER_NONE];
}