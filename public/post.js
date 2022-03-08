const re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g

const createLink = (l, t) => `<a class="-blue link" target="_blank" href="${l.trim()}">${t}</a>`

const parse = t => `<span style="font: inherit">${t.replace(/\n/gm, '<br>').replace(/((\#|\@)(?:[^\x00-\x7F]|\w)+)/g, m => {
  const base = 'https://twitter.com/'
  const l = `${m[0] == '#' ? 'hashtag/' : ''}${m.substring(1)}`
  return createLink(base+l, m)
}).replace(re, m => new RegExp('https://twitter.com/').test(m) ? m : createLink(m, m))}</span>`

const parseDate = d => {
  d = new Date(d)
  const _d = Math.round(+d / 1000)
  const now = Math.round(+new Date(Date.now()) / 1000)

  if ((now - _d) < 0) {
    throw new Error('Future date')
  }

  const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

  if ((now - _d) >= 24 * 60 * 60) {
    return `${d.getDate()} de ${MONTHS[d.getMonth()]}`
  }

  if ((now - _d) >= 60 * 60) {
    return Math.round((now - _d) / (60 * 60)) + ' h'
  }

  if ((now - _d) >= 60) {
    return Math.round((now - _d) / 60) + ' min'
  }

  return Math.round((now - _d) % 60) + ' s'
}

const Tweet = {
  props: ['tweet'],
  computed: {
    textTweet() {
      return parse(this.tweet.text)
    },
    linkTweet() {
      return `https://twitter.com/${this.tweet.user.username}/status/${this.tweet.id}`
    },
    created_at() {
      return parseDate(parseInt(this.tweet.created_at))
    }
  },
  template: `
		<a class="post" :href="linkTweet" target="_blank">
      <div class="left">
				<div class="avatar-box">
					<a href="">
						<img class="avatar" :src="tweet.user.avatar" >
					</a>
				</div>
			</div>
			<div class="right">
				<div class="header">
					<a :href="'https://twitter.com/' + tweet.user.username" target="_blank">
						<span class="name">{{ tweet.user.name }}</span>
						<span class="username">{{ tweet.user.username }}</span>
					</a>
					<span class="sub">
						<span>·</span>
						<a :href="linkTweet" target="_blank" class="hours link">
							<time>{{ created_at }}</time>
						</a>
					</span>
				</div>
				<div class="body" v-html="textTweet"></div>
				<div class="footer">
					<a :href="tweet.actions.reply" target="_blank" class="reply action" title="Responder">
						<div class="shadow"></div>
						<svg viewBox="0 0 24 24" class="icon">
							<g>
								<path
									d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z">
								</path>
							</g>
						</svg>
					</a>
					<a :href="tweet.actions.like" target="_blank" class="like action" title="Curtir">
						<div class="shadow"></div>
						<svg viewBox="0 0 24 24" class="icon">
							<g>
								<path
									d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z">
								</path>
							</g>
						</svg>
					</a>
				</div>
			</div>
		</a>`
}