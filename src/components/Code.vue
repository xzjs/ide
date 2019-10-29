<template>
    <codemirror ref="myCm" v-model="code" :options="cmOptions"></codemirror>
</template>

<script>
    import {codemirror} from 'vue-codemirror';
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/mode/python/python.js';
    import 'codemirror/theme/base16-dark.css';
    import 'codemirror/addon/hint/show-hint.js';
    import 'codemirror/addon/hint/show-hint.css';
    import 'codemirror/addon/hint/python-hint.js';

    export default {
        name: "Code",
        data() {
            return {
                code: '',
                cmOptions: {
                    mode: {
                        name: "python",
                        version: 3,
                        singleLineStringErrors: false
                    },
                    theme: 'base16-dark',
                    showCursorWhenSelecting: true,
                    lineNumbers: true,
                    firstLineNumber: 1,
                    indentUnit: 4,
                    tabSize: 4,
                    indentWithTabs: false,
                    matchBrackets: true,
                    extraKeys: {},
                },
            }
        },
        components: {
            codemirror
        },
        computed: {
            codemirror() {
                return this.$refs.myCm.codemirror
            }
        },
        mounted() {
            this.codemirror.setSize('100%', 'calc(100vh - 260px)');
            this.codemirror.on('inputRead', (editor, input) => {
                if (input.text[0] === ';' || input.text[0] === ' ' || input.text[0] === ":") {
                    return;
                }
                editor.showHint({
                    hint: this.codemirror.pythonHint
                });
            });
            this.codemirror.on("change", () => {
                let newCode = this.codemirror.getValue();
                this.$emit('codeChange', newCode);
            });
        },
        methods: {
            setCode: function (code) {
                if (code === undefined || code.trim() === "") {
                    this.codemirror.setValue("\n");
                } else {
                    this.codemirror.setValue(code);
                }
            }
        }
    }
</script>

<style scoped>
</style>