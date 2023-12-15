"use strict";

Vue.createApp({
  data() {
    return {
      dark: false,
    };
  },
  methods: {
    toggleDark() {
      this.dark = !this.dark;

      if (this.dark) {
        document.title = "Good Night";
      } else {
        document.title = "Good Morning";
      }
    },
  },
}).mount("#app");

/*
let dark = false;
let button = document.querySelector(".toggleButton");
button.addEventListener("click", (e) => {
  button.classList.add("toggleButton");

  dark = !dark;

  if (dark) {
    document.body.classList.add("body-dark");
    button.classList.add("button-dark");
    document.title = "Good Night";
  } else {
    document.body.classList.remove("body-dark");
    button.classList.remove("button-dark");
    document.title = "Good Morning";
  }
});*/
