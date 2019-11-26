<template>
  <div id="code" ref="mycm"></div>
</template>

<script>
import editor from "../assets/js/blockpy/editor";
export default {
  name: "Code",
  data() {
    return {
      code: "",
      codemirror: null
    };
  },
  mounted() {
    this.codemirror = CodeMirror(this.$refs.mycm, {
      mode: {
        name: "python",
        version: 3,
        singleLineStringErrors: false
      },
      theme: "base16-dark",
      showCursorWhenSelecting: true,
      lineNumbers: true,
      firstLineNumber: 1,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      matchBrackets: true,
      extraKeys: {
        Ctrl: "autocomplete"
      }
    });
    this.codemirror.setSize("100%", "calc(100vh - 260px)");
    this.codemirror.on("inputRead", (editor, input) => {
      if (
        input.text[0] === ";" ||
        input.text[0] === " " ||
        input.text[0] === ":"
      ) {
        return;
      }
      //TODO 智能提示还不好用
      editor.showHint({
        hint: CodeMirror.pythonHint
      });
    });
    this.codemirror.on("change", () => {
      let newCode = this.codemirror.getValue();
      this.$emit("codeChange", newCode);
    });
  },
  methods: {
    setCode: function(code) {
      if (code === undefined || code.trim() === "") {
        this.codemirror.setValue("\n");
      } else {
        this.codemirror.setValue(code);
      }
    }
  }
};
</script>

<style scoped>
</style>