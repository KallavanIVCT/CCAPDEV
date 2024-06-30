

// the goal is to when user clicks upvote icon
// it will make a request to server to update the values of the post schema then it  would change the value of the post-request


document.addEventListener('DOMContentLoaded',function(){
    const upvoteIcon = document.getElementsByClassName('upvote-icon'); 
    const downvoteIcon = document.getElementsByClassName('downvote-icon'); 
    const upvoteNum = document.getElementsByClassName('upvote-count')


    user_id = '66776c6fb5909970e7f38836';
    
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