<template>
    <el-row id="flowchart-container">
        <el-col :span=12>
            <div id="div1" class="flowchart" @click="flowchatClick($event)">步骤1
            </div>
            <div id="div2" class="flowchart" @click="flowchatClick($event)">步骤2</div>
            <div id="div3" class="flowchart" @click="flowchatClick($event)">步骤3</div>
        </el-col>
        <el-col :span="12">
            <div id="div4" class="flowchart" @click="flowchatClick($event)">步骤4</div>
            <div id="div5" class="flowchart" @click="flowchatClick($event)">步骤5</div>
        </el-col>
    </el-row>
</template>

<script>
    import {jsPlumb} from 'jsplumb';

    export default {
        name: "Flowchart",
        data() {
            return {
                plumbIns: null,
                selectedDiv: '',
                flowchartData: [
                    {
                        text: '步骤1',
                        children: null,
                    },
                    {
                        text: '步骤2',
                        children: [
                            {
                                text: '步骤4',
                                children: null,
                            },
                            {
                                text: '步骤5',
                                children: null,
                            }
                        ],
                    },
                    {
                        text: '步骤3',
                        children: null,
                    },
                ],
                connections: [
                    ['div1', 'div2'],
                    ['div2', 'div3'],
                    ['div2', 'div4'],
                    ['div2', 'div5'],
                    ['div4', 'div5'],
                ],
            }
        },
        methods: {
            flowchatClick: function (e) {
                let target = e.currentTarget;
                this.selectedDiv = target.id;
            },
            myConnect: function (connectArray) {
                this.plumbIns.connect({
                    source: connectArray[0],
                    target: connectArray[1],
                    anchor: [
                        'Top',
                        'Bottom',
                        'Left',
                        'Right',
                    ],
                    connector: ['StateMachine'],
                    endpoint: 'Blank',
                    overlays: [['Arrow', {width: 8, length: 8, location: 1}]], // overlay
                    // 添加样式
                    paintStyle: {stroke: '#909399', strokeWidth: 2},
                });
            }
        },
        mounted() {
            this.plumbIns = jsPlumb.getInstance();
            this.plumbIns.ready(() => {
                for (let i = 0; i < this.connections.length; i++) {
                    this.myConnect(this.connections[i]);
                }
            });
        }
    }
</script>

<style scoped>
    #flowchart-container {
        height: 100%;
        width: 100%;
        text-align: center;
    }

    .flowchart {
        width: 100px;
        height: 40px;
        background-color: #B3C0D1;
        margin: 30px auto;
        line-height: 40px;
    }

    .selected {
        background-color: #0f9d58;
    }
</style>