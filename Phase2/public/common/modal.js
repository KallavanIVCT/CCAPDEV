function togglePopup()
{
    document.getElementById("popup_js").classList.toggle("active");
}

function hidePopup(){
    document.getElementById("popup_js").classList.remove("active");
}

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