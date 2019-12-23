<template>
  <div>
    <el-button type="success" round icon="el-icon-video-play" @click="run">运行</el-button>
    <Block v-if="type=='block'" ref="code" class="block" v-on:blockChange="blockChange"></Block>
    <Code v-else ref="code" class="code" v-on:codeChange="codeChange"></Code>
  </div>
</template>

<script>
import Block from "@/components/Block";
import Code from "@/components/Code";
import Result from "@/components/Result";
import Flowchart from "@/components/Flowchart";

export default {
  name: "IDE",
  data() {
    return {
      code: "",
      silenceText: false,
      silenceBlock: false
    };
  },
  props: ["type"],
  components: {
    Block,
    Code
  },
  methods: {
    codeChange: function(code) {
      if (!this.silenceText) {
        this.silenceBlock = true;
        this.$refs.block.setBlocks(code);
        window.setTimeout(() => {
          this.silenceBlock = false;
        }, 40);
      }
      this.silenceText = false;
    },
    blockChange: function(code) {
      this.code;
    },
    output: function(text) {
      this.$refs.result.result += text.replace(/</g, "&lt;");
    },
    run: function() {
      let code = this.$refs.code.getCode();
      this.axios
        .post("run", { code: code })
        .then(response => {
          if (response.data.length) {
            this.$emit("run");
            JsBridge.Bridge.sortScene.startChange(response.data);
          } else {
            this.$message.error("似乎不对，再试试");
          }
        })
        .catch(error => {
          this.$message.error(error.response.data);
        });
    }
  },
  mounted() {}
};
</script>

<style scope>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  padding: 10px !important;
}

.el-footer {
  height: 200px;
  background-color: #41444e;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  line-height: 100%;
  padding: 0 !important;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
