require('dotenv').config()
const Twit = require('twit');
const { keywords } = require('./configs')

const getTweetObject = tweet => {
  // console.log({tweet})
  let tweetText = (tweet.extended_tweet) ? tweet.extended_tweet.full_text : tweet.text;

  // check for retweets
  if (tweet.text.includes('RT @') && tweet.retweeted_status) {
    tweetText = (tweet.retweeted_status.extended_tweet) ? tweet.retweeted_status.extended_tweet.full_text : tweet.retweeted_status.text;
  }

  const getAction = t => {
    return `https://twitter.com/intent/${t}?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E${tweet.id_str}%7Ctwgr%5E%7Ctwcon%5Es1_&${t[0] == 'l' ? 'tweet_id' : 'in_reply_to'}=${tweet.id_str}`
  }

  const TweetObject = {
    created_at: tweet.timestamp_ms,
    id: tweet.id_str,
    text: tweetText,
    user: {
      username: tweet.user.screen_name,
      name: tweet.user.name,
      avatar: tweet.user.profile_image_url,
    },
    actions: {
      reply: getAction('tweet'),
      like: getAction('like')
    },
    lang: tweet.lang
  }

  TweetObject['isRT'] = !!(tweet.text.includes('RT @') && tweet.retweeted_status)
  return TweetObject
}

const { consumer_key, consumer_secret, access_token, access_token_secret } = process.env

var T = new Twit({
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
});

const stream = T.stream('statuses/filter', {
  track: keywords,
  language: 'pt'
})

exports.initiate = io => {
  io.on('connection', socket => {
    stream.on('tweet', tweet => {
      // console.log('tweeting', tweet)
      let TweetObject = getTweetObject(tweet);
      socket.emit('latest tweets', TweetObject);
    });
  })
}

// "prybar-nodejs",
//     "-q",
//     "--ps1",
//     "\u0001\u001b[33m\u0002\u0001\u001b[00m\u0002 ",
//     "-i"
