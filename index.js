import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if(e.target.dataset.trash){
        handleTrashClick(e.target.dataset.trash)
        console.log('deleted')
    }
    else if(e.target.dataset.replyBtn){
        ReplyTo(e.target.dataset.replyBtn)
    }
}
)

function ReplyTo(tweetId){
    const reply = document.getElementById(`${tweet.uuid}-reply-input`)
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    targetTweetObj.push({
                handle: `@Kevin`,
                profilePic: `images/kevin.jpg`,
                tweetText: `${reply.value}`
            })
            render()
            
}


function handleTrashClick(tweetId){
    for (let tweet of tweetsData){
    const container = document.getElementById("container")
    const deleteBtn = document.getElementById(`${tweet.uuid}-delete-btn`)
     const targetTweetObj = tweetsData.filter(function(tweet){
        return tweetId === tweet.uuid
     })[0]
        if (targetTweetObj === tweet){
       tweetsData.splice(tweet, 1)
        }
         render()
     }
}       

 
function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden') 
     }

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Kevin`,
            profilePic: `images/kevin.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    render()
    tweetInput.value = ''
    }

}

function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        let repliesHtml = `<div class="tweet-input-area">
			<img src="images/kevin.jpg" class="profile-pic">
			<textarea placeholder="Tweet Your Reply" id="${tweet.uuid}-reply-input" class="replyarea"></textarea>
		</div>
		<button id="reply-btn" class="reply-btn">Reply</button>
		`
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`
   })
        }
        
          
        feedHtml += `
<div class="tweet">
<i class="fa-solid fa-xmark delete" 
id="${tweet.uuid}-delete-btn" 
data-trash="${tweet.uuid}" ></i>
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div id="container">
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>   
</div>
`
   })
   return feedHtml 
   
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

function getStorage(){
    console.log(localStorage.tweetsData)
}

getStorage()