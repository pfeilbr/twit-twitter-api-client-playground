require('dotenv').config()
const util = require('util')
const Twit = require('twit');
const options = {
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
}

const T = new Twit(options)

// search twitter for all tweets containing the word 'banana' since July 11, 2011
const searchTweets = async () => {
    const resp = await util.promisify(T.get).bind(T)('search/tweets', { q: 'banana since:2011-07-11', count: 100 })
    console.log(JSON.stringify(resp, null, 2))
}

// filter the twitter public stream by the word 'snow'
const filterStream = async () => {
    const stream = T.stream('statuses/filter', { track: 'snow', language: 'en' })

    stream.on('tweet', function (tweet) {
        console.log(tweet.text)
    })
}

// stream a sample of public statuses
const sampleStream = async () => {
    const stream = T.stream('statuses/sample')

    stream.on('tweet', function (tweet) {
        console.log(tweet.text)
    })
}

const run = async () => {
    // await searchTweets()
    // await filterStream()
    await sampleStream()
}

run()
