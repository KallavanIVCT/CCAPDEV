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
        console.log("KDOAKD");
        let item = $(this);
        $('#popup_js2').toggleClass('active'); // Toggle the 'active' class for visibility
      }
    )

    $(document).on('click', '#close-btn', function(e){
        $('#popup_js2').toggleClass('active');
    })

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

    }
);

//TODO MCO2: Client-side AJAX Comment React
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