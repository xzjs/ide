Blockly.Blocks['exchange'] = {
    init: function () {
        this.jsonInit({
            "message0": "交换 %1 和 %2",
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
            "colour": 160,
            "tooltip": "交换两个数",
            'previousStatement': true,
            'nextStatement': true,
        })
    }
}

Blockly.Python['exchange'] = function (block) {
    var left = Blockly.Python.valueToCode(block, 'LEFT', Blockly.Python.ORDER_RELATIONAL) || '__';
    var right = Blockly.Python.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_RELATIONAL) || '__';
    var code = 'swap(' + left + ',' + right + ')';
    return code;
}