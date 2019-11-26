<template>
  <div>
    <el-container style="height: 100%">
      <el-aside width="20%">
        <Flowchart></Flowchart>
      </el-aside>
      <el-container>
        <el-header>
          <el-button type="success" round icon="el-icon-video-play" @click="run">运行</el-button>
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="12">
              <Block ref="block" class="block" v-on:blockChange="blockChange"></Block>
            </el-col>
            <el-col :span="12">
              <Code ref="code" class="code" v-on:codeChange="codeChange"></Code>
            </el-col>
          </el-row>
        </el-main>
        <el-footer height="200px">
          <Result ref="result"></Result>
        </el-footer>
      </el-container>
    </el-container>
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
      silenceText: false,
      silenceBlock: false
    };
  },
  components: {
    Block,
    Code,
    Result,
    Flowchart
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
      if (!this.silenceBlock) {
        this.silenceText = true;
        this.$refs.code.setCode(code);
      }
    },
    output: function(text) {
      this.$refs.result.result += text.replace(/</g, "&lt;");
    },
    run: function() {
      //   let code = this.$refs.code.code;
      //   Sk.configure({ output: this.output });
      //   try {
      //     Sk.misceval.asyncToPromise(function() {
      //       Sk.importBuiltinWithBody("<stdin>", false, code, true);
      //     });
      //   } catch (e) {
      //     window.console.log(e);
      //   }
      let json = "[[1,2],[2,3]]";
      this.$emit("run");
      JsBridge.Bridge.sortScene.startCHange("[[1,2],[2,3]]");
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

.el-dialog {
  margin: 0 !important;
}

.el-dialog__header {
  display: none !important;
}

.el-dialog__body {
  padding: 0 !important;
}
</style>
