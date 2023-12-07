"use strict";

Vue.createApp({
  data() {
    return {
      fruitBasket: [
        "🍏 Apple",
        "🍌 Banana",
        "🍉 Melon",
        "🫐 Blueberry",
        "🍓 Strawberry",
        "🍍 Ananas",
        "🥭 Mango",
      ],
    };
  },
  methods: {
    removeFruit(fruitToRemove) {
      //Hier wird mir der Filter Methode ein neues Array mit den restl.Früchten erstellt
      this.fruitBasket = this.fruitBasket.filter((fruit) => {
        //prüft ob aktuelle Frucht nicht gleich der Frucht entspricht, die entfernt wird
        return fruit !== fruitToRemove;
      });
    },
  },
}).mount("#app");

//this.removeFruit("Banana");
