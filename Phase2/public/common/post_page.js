

// the goal is to when user clicks upvote icon
// it will make a request to server to update the values of the post schema then it  would change the value of the post-request


document.addEventListener('DOMContentLoaded',function(){
    const upvoteIcon = document.getElementsByClassName('upvote-icon'); 
    const downvoteIcon = document.getElementsByClassName('downvote-icon'); 
    const upvoteNum = document.getElementsByClassName('upvote-count')


    user_id = userfromSession;
    
    upvoteIcon[0].addEventListener('click', async()=>{
        const post = document.getElementsByClassName('post');
        const post_id = post[0].dataset.postId;
        const UP = 'upvote';
        try{
            const response = fetch('/api/post/reactPost', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({post_id, user_id, UP})
            })

            if(!response.ok){
                console.log('cannot upvote/downvote');
            }
           
        }
        catch(e){
            console.log(e);
            console.log("unable to handle request");

        }
    })
    downvoteIcon[0].addEventListener('click', async()=>{
        const post = document.getElementsByClassName('post');
        const post_id = post[0].dataset.postId;
        const UP = 'downvote';
        try{
            const response = fetch('/api/post/reactPost', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({post_id, user_id, UP})
            })

            if(!response.ok){
                console.log('cannot upvote/downvote');
            }
           
        }
        catch(e){
            console.log(e);
            console.log("unable to handle request");

        }
    })
})




document.addEventListener('DOMContentLoaded',function(){
    const upvoteIcon = document.getElementsByClassName('upvote-icon-comment'); 
    const downvoteIcon = document.getElementsByClassName('downvote-icon-comment'); 
    const upvoteNum = document.getElementsByClassName('upvote-count-comment');


    user_id = userfromSession;
    console.log(user_id);
    
    for(let i = 0; i < upvoteIcon.length;i++){
        upvoteIcon[i].addEventListener('click', async()=>{

            console.log(upvoteIcon[i]);
            const comment_id = upvoteIcon[i].dataset.commentId;
            const UP = 'upvote';
            console.log(UP);
            console.log(comment_id);

            
            try{
                const response = await fetch('/api/comment/reactComment', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({comment_id, user_id, UP})
                })
    
                if(!response.ok){
                    console.log('cannot upvote/downvote');
                    return;
                }else{

                    const data = await response.json();
                    // Get the next sibling that has the class 'upvote-count-comment'
                    var $upvote = $(upvoteIcon[i]);//convert to jQuery Element
                    var $upvoteSiblings = $upvote.siblings();

                    console.log($upvoteSiblings);
                
                    // Filter siblings to find the one with the class 'upvote-count-comment'
                    var $upvoteComment = $upvoteSiblings.filter('.upvote-count-comment');
                    var $downvoteComment = $upvoteSiblings.filter('.downvote-count-comment');
                    $upvoteComment.text( data.upvotes);
                    $downvoteComment.text( data.downvotes);
                }
               
            }
            catch(e){
                console.log(e);
                console.log("unable to handle request");
    
            }
        })
    }
    
    for(let i = 0; i < downvoteIcon.length;i++){
        downvoteIcon[i].addEventListener('click', async()=>{

            console.log(downvoteIcon[i]);
            const comment_id = downvoteIcon[i].dataset.commentId;
            const UP = 'downvote';
            console.log(UP);
            console.log(comment_id);

            
            try{
                const response = await fetch('/api/comment/reactComment', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({comment_id, user_id, UP})
                })
    
                if(!response.ok){
                    console.log('cannot upvote/downvote');
                }else{
                    const data = await response.json();
                    // Get the next sibling that has the class 'upvote-count-comment'
                    var $downvote = $(downvoteIcon[i]);//convert to jQuery Element
                    var $downvoteSiblings = $downvote.siblings();

                    console.log($downvoteSiblings);
                
                    // Filter siblings to find the one with the class 'downvote-count-comment'
                    var $upvoteComment = $downvoteSiblings.filter('.upvote-count-comment');
                    var $downvoteComment = $downvoteSiblings.filter('.downvote-count-comment');
                    $upvoteComment.text( data.upvotes);
                    $downvoteComment.text( data.downvotes);
                }

                const data = await response.json();
                data
               
            }
            catch(e){
                console.log(e);
                console.log("unable to handle request");
    
            }
        })
    }
    

})