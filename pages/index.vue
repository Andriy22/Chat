<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
    <v-btn @click.prevent="send">
      NEW MSG
    </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>


export default {
  sockets: {
    connect() {
      console.log('Client connected');
    }
  },
  methods: {
    send(){
      this.$socket.emit('createMessage', {
        text: 'Client MSG',
      })
    }
  },
  components: {

  }
}
</script>
