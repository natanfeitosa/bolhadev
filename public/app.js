
const App = {
  data: () => ({
    tweets: [],
    socket: {}
  }),
  components: {
    Tweet
  },
  created() {
    this.socket = io();
  },
  mounted() {
    this.socket.on('latest tweets', this.posts.bind())
  },
  methods: {
    posts(data) {
      if(!data.isRT) {
        this.tweets.unshift(data)
      }

      if(this.tweets.length >= 100) {
        this.tweets = this.tweets.slice(0, 80)
      }
    }
  },
  template: `
    <div class="header">
      <h2 class="title">Últimos posts da bolhadev</h2>
	  </div>
	  <div class="posts">
      <Tweet v-for="(item, index) in tweets" :key="index" :tweet="item"/>
    </div>
  `
};

Vue.createApp(App).mount('#app');
