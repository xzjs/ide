<template>
  <div>
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
    <el-dialog title :visible.sync="codeVisible" width="100%">
      <IDE v-on:run="codeVisible=false"></IDE>
    </el-dialog>
  </div>
</template>

<script>
import IDE from "./components/IDE";

export default {
  name: "App",
  data() {
    return {
      codeVisible: false
    };
  },
  components: {
    IDE
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
    window.showCode = this.showCode;
  },
  methods: {
    showCode() {
      this.codeVisible = true;
    },
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
</style>