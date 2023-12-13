const fs = require('fs')
const Twitter = require('twitter')
const creds = require('./secrets.json')


const client = new Twitter(creds)

let user_id = ""


// curl --request GET 
//'https://api.twitter.com/2/users/by/username/USER_NAME 
//--header 'Authorization: Bearer XXXXXX'


// https://api.twitter.com/2/users/${user_id}/tweets
let response2
username = 'Vidya31282875'
user_no = 50
usernameArray = [ 
]

const axios = require('axios');

    (async () => {
        endpoint1 = `https://api.twitter.com/2/users/by/username/${username}`
        // console.log(endpoint1)
        response = await axios.get(endpoint1,
        { headers: 
            { 'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAJ6CFgEAAAAADaMbSjdsCOcGCLjESILAtxsBHAw%3DnhlKHtX4tlVutPBU652MkkDfCOiwhkB3JibNp2lZofYm98fnC5'  } })
            
        user_id = response.data.data.id
        console.log(user_no, 'userid---', user_id, username)
        
        let next_token = ''
        let firstQuery = true
        let totalCount = 0
        while (next_token!= null) {

            endpoint2 = firstQuery 
            ? `https://api.twitter.com/2/users/${user_id}/tweets`
            : `https://api.twitter.com/2/users/${user_id}/tweets?pagination_token=${next_token}` 
  
            response2 = await axios.get(endpoint2
            ,{ 
                headers: 
                { 'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAJ6CFgEAAAAADaMbSjdsCOcGCLjESILAtxsBHAw%3DnhlKHtX4tlVutPBU652MkkDfCOiwhkB3JibNp2lZofYm98fnC5'  
            } })
        
            // console.log('result', response2.data)
            count = response2.data.meta.result_count

            if (count == 0){
                console.log(user_no ,'-', username, ' tweets done!')
                break
            }
            totalCount += count
            console.log(totalCount + " tweets saved!")
            tweetsArray = response2.data.data
           
            tweetsArray.forEach(tweetObject => {
                const tweetJSON = JSON.stringify(tweetObject)
                fs.appendFileSync('./userTweets/user_'+ user_no + '_' + username +'.txt', tweetJSON + '\n')
            });

            next_token = response2.data.meta.next_token
            firstQuery = false

            if (next_token == null){
                console.log(user_no ,'-', username, ' tweets done!')
                break
            }
        
        }
    
        // console.log(tweetsArray)        
        })().catch(e => {
            console.log(response2)
        console.log(e);
    });
