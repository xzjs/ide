<template>
  <div class="main">
    <div
      style="margin: auto;width: 100%;height: 100%;"
      class="egret-player"
      data-entry-class="Main"
      data-orientation="auto"
      data-scale-mode="showAll"
      data-frame-rate="30"
      data-content-width="1920"
      data-content-height="1080"
      data-show-paint-rect="false"
      data-multi-fingered="2"
      data-show-fps="false"
      data-show-log="false"
      data-show-fps-style="x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9"
    ></div>
    <el-button
      v-if="drawerBlock"
      type="success"
      icon="el-icon-video-play"
      class="run"
      style="font-size: 50px;margin: 0 auto;z-index:3000;"
      circle
      @click="run"
    ></el-button>
    <el-drawer
      title="block"
      :visible.sync="drawerBlock"
      size="45%"
      direction="ltr"
      :close-on-press-escape="false"
      :wrapperClosable="false"
      :with-header="false"
      :show-close="false"
    >
      <Block ref="block"></Block>
    </el-drawer>
    <el-drawer
      title="python"
      :visible.sync="drawerPython"
      size="45%"
      direction="rtl"
      :close-on-press-escape="false"
      :wrapperClosable="false"
      :with-header="false"
      :show-close="false"
    >
      <Code ref="python"></Code>
    </el-drawer>
    <el-dialog
      title="总结分析"
      :visible.sync="analysisVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :fullscreen="true"
    >
      <Analysis></Analysis>
    </el-dialog>
  </div>
</template>

<script>
import IDE from "./components/IDE";
import Analysis from "./components/Analysis";
import Block from "./components/Block";
import Code from "./components/Code";

export default {
  name: "App",
  data() {
    return {
      drawerBlock: false,
      drawerPython: false,
      analysisVisible: false,
      type: "block",
      direction: "ltr"
    };
  },
  components: {
    Block,
    Code,
    Analysis
  },
  mounted() {
    var loadScript = function(list, callback) {
      var loaded = 0;
      var loadNext = function() {
        loadSingleScript(list[loaded], function() {
          loaded++;
          if (loaded >= list.length) {
            callback();
          } else {
            loadNext();
          }
        });
      };
      loadNext();
    };

    var loadSingleScript = function(src, callback) {
      var s = document.createElement("script");
      s.async = false;
      s.src = src;
      s.addEventListener(
        "load",
        function() {
          s.parentNode.removeChild(s);
          s.removeEventListener("load", arguments.callee, false);
          callback();
        },
        false
      );
      document.body.appendChild(s);
    };

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./manifest.json?v=" + Math.random(), true);
    xhr.addEventListener("load", function() {
      var manifest = JSON.parse(xhr.response);
      var list = manifest.initial.concat(manifest.game);
      loadScript(list, function() {
        /**
         * {
         * "renderMode":, //Engine rendering mode, "canvas" or "webgl"
         * "audioType": 0 //Use the audio type, 0: default, 2: web audio, 3: audio
         * "antialias": //Whether the anti-aliasing is enabled in WebGL mode, true: on, false: off, defaults to false
         * "calculateCanvasScaleFactor": //a function return canvas scale factor
         * }
         **/
        egret.runEgret({
          renderMode: "webgl",
          audioType: 0,
          calculateCanvasScaleFactor: function(context) {
            var backingStore =
              context.backingStorePixelRatio ||
              context.webkitBackingStorePixelRatio ||
              context.mozBackingStorePixelRatio ||
              context.msBackingStorePixelRatio ||
              context.oBackingStorePixelRatio ||
              context.backingStorePixelRatio ||
              1;
            return (window.devicePixelRatio || 1) / backingStore;
          }
        });
      });
    });
    xhr.send(null);
    window.showBlock = this.showBlock;
    window.showPython = this.showPython;
    window.showAnalysis = this.showAnalysis;
  },
  methods: {
    showBlock() {
      this.drawerBlock = true;
    },
    showPython() {
      this.drawerBlock = true;
      this.drawerPython = true;
    },
    showAnalysis() {
      this.analysisVisible = true;
    },
    run: function() {
      if (this.drawerPython) {
        var code = this.$refs.python.getCode();
      } else {
        var code = this.$refs.block.getCode();
      }
      this.axios
        .post("run", { code: code })
        .then(response => {
          if (response.data.length) {
            this.drawerBlock = false;
            this.drawerPython = false;
            JsBridge.Bridge.sortScene.startChange(response.data);
          } else {
            this.$message.error("似乎不对，再试试");
          }
        })
        .catch(error => {
          this.$message.error(error.response.data);
        });
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.main {
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#gameContainer {
  width: 100%;
  height: 100%;
}

.el-dialog {
  margin: 0 !important;
}

.el-dialog__header {
  display: none !important;
}

.el-dialog__body {
  padding: 0 !important;
  height: 100%;
}

.run {
  width: 100px;
  height: 100px;
}
</style>