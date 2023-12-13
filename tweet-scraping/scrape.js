const fs = require('fs')
const Twitter = require('twitter')
const creds = require('./secrets.json')
const emojiFile = './deepmoji_emojis.txt' 
const lineCounterFile = './current_line_count.txt'
const maxFileLineCount = 50000

const client = new Twitter(creds)
const emojis = fs.readFileSync(emojiFile, 'utf8')
const params = {
    track: emojis,
    language: 'hi',
    until:'2021-04-20'
}

const counts = fs.readFileSync(lineCounterFile).toString().split(',').map(Number)
let lineCounter = counts[0]
let fileCounter = counts[1]

const saveTweetObjectToFile = (tweetObj) => {
    const tweetJSON = JSON.stringify(tweetObj)
    if (lineCounter %500 == 0){
        console.log(lineCounter, " saved")
    }

    if (lineCounter >= maxFileLineCount) {
        lineCounter = 0
        fileCounter += 1
    }

    fs.appendFileSync('./tweets_scraping/deepmoji_tweets_'+ fileCounter +'.txt', tweetJSON + '\n')
    fs.writeFileSync(lineCounterFile, lineCounter.toString() + ',' + fileCounter.toString())
    lineCounter++
}

client.stream('statuses/filter.json', params, stream => {

    // if data received, save to file
    stream.on('data', e => {
        saveTweetObjectToFile(e)
    })

    stream.on('error', err => {
        console.log(err)
    })
})