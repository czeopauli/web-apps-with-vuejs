"use strict";

Vue.createApp({
  data() {
    return {
      users: [
        {
          username: "Giuliano",
          status: "online",
          lastActivity: 10,
        },
        {
          username: "Paulina",
          status: "offline",
          lastActivity: 22,
        },
        {
          username: "Blanca",
          status: "online",
          lastActivity: 104,
        },
        {
          username: "Marijana",
          status: "online",
          lastActivity: 5,
        },
      ],
    };
  },
  methods: {
    //hier wird der Status des Benutzers geprüft
    recentActivity(user) {
      return user.status === "online" && user.lastActivity <= 10;
    },
    getStatus(user) {
      let color = "";
      // Bedingungen für verschiedene Status des Benutzers.
      if (user.status === "online" && this.recentActivity(user)) {
        color = "green";
      } else if (user.status === "offline") {
        color = "grey";
      } else if (user.status === "online" && !this.recentActivity(user)) {
        color = "red";
      }
      // Rückgabe des Objekts mit der berechneten Farbe.
      return { color };
    },
  },
}).mount("#app");

/*HTML-syntax

die v-for direktive iteriert über die users-liste und durch die :key direktive 
können Elemente hinzugefügt oder entfernt werden.
durch die :style direktive kann die Farbe dynamisch dargestellt werden*/
