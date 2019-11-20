<template>
  <div id="app">
    <div id="gameContainer"></div>
    <el-dialog title="提示" :visible.sync="codeVisible" width="100%" :before-close="handleClose">
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
    window.gameInstance = UnityLoader.instantiate(
      "gameContainer",
      "game/Build/game.json"
    );
    window.showCode = this.showCode;
  },
  methods: {
    showCode() {
      this.codeVisible = true;
    },
    handleClose() {
      return false;
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