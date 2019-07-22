<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400">
        <v-card-title>
          <h1>NUXT.JS CHAT</h1>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="16" :rules="nameRules" label="Name" required></v-text-field>

            <v-text-field v-model="room" :rules="roomRules" label="Room" required></v-text-field>

            <v-btn :disabled="!valid" color="primary" @click="submit">Sign IN</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  layout: "empty",
  head: {
    title: "Welcome to Nuxt Chat"
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    }
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 16) || "max length 16!"
    ],
    room: "",
    roomRules: [v => !!v || "room is required"]
  }),
  methods: {
    ...mapMutations(["setUser"]),
    // PRINT CALLBACK
    PrintCB(data) {
      console.warn('==============');
      console.log('Data: ' + data);
      console.warn('==============');
    },
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        };
        

        // Відправка користувача на сервер
        // Sending user to server  

       this.$socket.emit('userJoin', user, data => {
        this.PrintCB(data);
        if (typeof data === 'string') {
          console.error('ERROR', data);
        } else {
          // В стейт сетим користувача і перекідуєм на сторінку чата
          // Set user and redirect to chat page
          user.id = data.userId;
          this.setUser(user);
          this.$router.push("/chat");
        }
       }) 
      }
    }
  }
};
</script>
