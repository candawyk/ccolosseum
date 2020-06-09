function deleteComment(comment_id){
        $.ajax({
            url:'/battle/display/' + comment_id,
            type: 'DELETE',
            success: function(result){
                window.location.reload(true);
            }
        })
};
