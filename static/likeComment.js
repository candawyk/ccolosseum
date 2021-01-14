function likeComment(comment_id){
        $.ajax({
            url:'/battle/display/' + comment_id,
            type: 'PUT',
            success: function(result){
                window.location.reload(true);
            }
        })
};