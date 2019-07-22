<template>
  <div class="chat-wrap">
    <div class="chat">
     <Message v-for="msg in messages" :key = "msg.text"
     :name="msg.name"
     :text="msg.text"
     :owner="msg.id === user.id"
     
     ></Message>
    </div>
    <div class="chat-form">
      <ChatForm></ChatForm>
    </div>
  </div>
</template>

<script>
  import { mapState} from "vuex";
  import Message from '@/components/Message'
  import ChatForm from '@/components/ChatForm'
  export default {
    middleware: ["AuthGuard"],
    head() {
      return {
        title: `Room ${this.user.room}`
      };
    },
    components: {
      Message,
      ChatForm,
    },
    computed: mapState(["user", "messages"])
  };
</script>

<style scoped>

  .chat-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .chat-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    height: 80px;
    background: #212121;
  }
  .chat {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 80px;
    padding: 1rem;
    overflow-y: auto;
  }
</style>
