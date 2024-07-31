function togglePopup()
{
    document.getElementById("popup_js").classList.toggle("active");
}

function hidePopup(){
    document.getElementById("popup_js").classList.remove("active");
}


$(document).ready(function() {
  
    // Attach a click event listener to the document
    $(document).on('click', '#update', function(event) {
        let item = $(this);
        let post_id = item.siblings('.post-id').val()
        $('input[name="post_id"]').val(post_id);
        $('#popup_js2').toggleClass('active'); // Toggle the 'active' class for visibility
        
        
      }
    )

    $(document).on('click', '#close-btn', function(e){
        $('#popup_js2').toggleClass('active');
    })

    // Attach a click event listener to the document
    $(document).on('click', '#delete-account-button', function(event) {
        let item = $(this);
        $('#popup_js3').toggleClass('active'); // Toggle the 'active' class for visibility
      }
    )

    $(document).on('click', '#no', function(e){
        $('#popup_js3').toggleClass('active');
    })





    const form  = $('#update-form-form');   
    $('#update-form-form').submit(async function(event) {
        event.preventDefault();
        const formData = new FormData(this); // 'this' refers to the form element
        try {
            const response = await fetch('/api/post/updatePost', {
              method: 'PATCH',
              body: formData,
            });
        
            if (!response.ok) {
              throw new Error(`Error updating post: ${response.statusText}`);
            }
        
            location.reload();
            console.log('Post updated successfully:', data);
          } catch (error) {
            console.log('Error updating post:', error);
          }
    });

    $(document).on('click', '.delbutton', async function(e){
        let item = $(this);
        let post_idX = item.siblings('.post-id').val()
        const resp = await fetch(`/api/post/deletePost/${post_idX}`, {
            method: 'DELETE',
          });

        if(!resp.ok){
            location.reload();
            throw new Error(`Error updating post: ${resp.statusText}`);

        }
        location.reload();
    });


    $('#update-the-user').submit(async function(event) {
        event.preventDefault();
        const formData = new FormData(this); 
        try {
            const response = await fetch('/api/user/updateUser', {
                method: 'PATCH',
                body: formData,
            });
        
            if (!response.ok) {
                throw new Error(`Error updating profile: ${response.statusText}`);
            }
        
            location.reload();
            console.log('Profile updated successfully:', data);
        } catch (error) {
            console.log('Error updating profile:', error);
        }
    });
    
    $(document).on('click', '#confirm-delete-account', async function(e){
        const userId = $(this).data('userid');
        try {
            const resp = await fetch(`/api/user/deleteUser/${userId}`, {
                method: 'DELETE',
            });

            if (!resp.ok) {
                throw new Error(`Error deleting user: ${resp.statusText}`);
            }

            window.location.href = '/api/user/register'; //Head back to register as to not cause any trouble with sessions
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    });

});

//<form class="create-post-form" id="update-form-form" name="update-post-form" action="/api/post/updatePost" method="PUT" enctype="multipart/form-data">
//TODO MCO2: Client-side AJAX Comment React
$(document).ready(function(){

});




//<form class="create-post-form" id="update-form-form" name="update-post-form" action="/api/post/updatePost" method="PUT" enctype="multipart/form-data">
//TODO MCO2: Client-side AJAX Comment React
$(document).ready(function(){

});


document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'confirm-delete-account'
    const deleteButtons = document.querySelectorAll('.deleteCommentButton');
    // Use for...of loop to iterate over each button
    for (const button of deleteButtons) {
        button.addEventListener('click', async function(e) {
            e.preventDefault(); // Prevent the default action (e.g., form submission or navigation)
            let $button = $(button);
            const comment_id = button.dataset.commentId;

            console.log("CommentID" + comment_id);
            try {
                const response = await fetch('/api/comment/deleteComment', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json' // Ensure the Content-Type is set to application/json
                    },
                    body: JSON.stringify({comment_id}),
                });
            
                if (!response.ok) {
                    throw new Error(`Error updating profile: ${response.statusText}`);
                }
                location.reload();
                console.log('Profile updated successfully:', data);
            } catch (error) {
                console.log('Error updating profile:', error);
            }
        })
    }
})

document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'confirm-delete-account'
    const deleteButtons = document.querySelectorAll('.button-for-edit');
    console.log(deleteButtons);
    // Use for...of loop to iterate over each button
    for (const button of deleteButtons) {
        button.addEventListener('click', async function(e) {
            e.preventDefault(); // Prevent the default action (e.g., form submission or navigation)
            const comment_id = button.dataset.commentId;
            let buttonparent = button.parentElement;
            let $buttonparent = $(buttonparent);
            let $buttonparentsiblings = $buttonparent.siblings();
            let $theneed = $buttonparentsiblings.filter('.body-for-text');
            let bodyX = $theneed.text();
            console.log(bodyX);
            console.log("CommentID" + comment_id);
            try {
                const response = await fetch('/api/comment/updateComment', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json' // Ensure the Content-Type is set to application/json
                    },
                    body: JSON.stringify({comment_id, bodyX}),
                });
            
                if (!response.ok) {
                    throw new Error(`Error updating profile: ${response.statusText}`);
                }
                location.reload();
                console.log('Profile updated successfully:', data);
            } catch (error) {
                console.log('Error updating profile:', error);
            }
        })
    }
})


function toggleReplyComment(button) {
    button.parentElement.getElementsByTagName("div")[0].style.display = (button.parentElement.getElementsByTagName("div")[0].style.display === 'block') ? 'none' : 'block';
}

function editCommentDiv(button){
    comment = button.parentElement.parentElement.getElementsByTagName("p")[0];
    actionButtons = button.parentElement.parentElement.getElementsByTagName("div")[0];

    if(comment.classList.contains("draftReplyComment")){
        comment.classList.remove("draftReplyComment");
        comment.setAttribute('contenteditable','false');

        actionButtons.classList.add('editCommentButtons');
    } else {
        comment.setAttribute('contenteditable','true');
        comment.classList.add('draftReplyComment');

        actionButtons.classList.remove('editCommentButtons');
    }
}