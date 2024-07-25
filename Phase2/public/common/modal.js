function togglePopup(popupId) {
    document.getElementById(popupId).classList.toggle("active");
}

function hidePopup(popupId) {
    document.getElementById(popupId).classList.remove("active");
}


$(document).ready(function() {
  
    // Attach a click event listener to the document
    $(document).on('click', '#update', function(event) {
        console.log("KDOAKD");
        let item = $(this);
        let post_id = item.siblings('.post-id').val()
        console.log(post_id);
        $('input[name="post_id"]').val(post_id);

        console.log($('input[name="post_id"]').val(post_id));
        $('#popup_js2').toggleClass('active'); // Toggle the 'active' class for visibility
        
        
      }
    )

    $(document).on('click', '#close-btn', function(e){
        $('#popup_js2').toggleClass('active');
    })
    /*
    // Attach a click event listener to the document
    $(document).on('click', '#delete', function(event) {
        console.log("KDOAKD");
        let item = $(this);
        $('#popup_js3').toggleClass('active'); // Toggle the 'active' class for visibility
      }
    )

    $(document).on('click', '#close-btn2', function(e){
        $('#popup_js3').toggleClass('active');
    })
        */

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
        
            const data = await response.json();
            location.reload();
            console.log('Post updated successfully:', data);
          } catch (error) {
            console.log('Error updating post:', error);
          }
    });

    $(document).on('click', '.delbutton', async function(e){
        let item = $(this);
        let post_idX = item.siblings('.post-id').val()
        console.log(post_idX);
        const resp = await fetch(`/api/post/deletePost/${post_idX}`, {
            method: 'DELETE',
          });

        if(!resp.ok){
            location.reload();
            throw new Error(`Error updating post: ${resp.statusText}`);

        }
        location.reload();
    });

          
});
//<form class="create-post-form" id="update-form-form" name="update-post-form" action="/api/post/updatePost" method="PUT" enctype="multipart/form-data">
//TODO MCO2: Client-side AJAX Comment React
$(document).ready(function(){
    const updateUserForm = $('#update-profile-form');   
    $('#update-profile-form').submit(async function(event) {
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
        
            const data = await response.json();
            location.reload();
            console.log('Profile updated successfully:', data);
        } catch (error) {
            console.log('Error updating profile:', error);
        }
    });

    $(document).on('click', '#delete-account-button', async function(e){
        const userId = $(this).data('userid');
        try {
            const resp = await fetch(`/api/user/deleteUser/${userId}`, {
                method: 'DELETE',
            });
    
            if (!resp.ok) {
                throw new Error(`Error deleting user: ${resp.statusText}`);
            }
    
            location.reload();
            console.log('User deleted successfully');
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    });
});


// User Description, PFP, and Username Update and Entire Delete 
$(document).ready(function(){

});

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