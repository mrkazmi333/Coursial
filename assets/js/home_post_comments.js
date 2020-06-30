





class PostComments{
    //constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        //call for all existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(' .comment-input').val('');
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                }, error: function(error){
                    console.log(error.responseText);
                }
                
            });


        });
    }

    newCommentDom(comment){
        //added a class 'delete-comment-button' to delete comment link
        // and also added id to the comments li
        return $(`<li class="comment-list" id="comment-${ comment._id }">
                    <p>
                        
                        <h4 class="comment-user-name">
                            ${ comment.user.name }
                        </h4>
                        
                    <p class="comment-content"> ${ comment.content } </p> 
                
                   
                        <small>
                            <a class="delete-comment delete-comment-button" href="/comments/destroy/${ comment._id }">Delete Comment</a>
                        </small>
                    
                    </p>
                </li>`);
    }
    


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                
                    $(`#comment-${data.data.comment_id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
                
            });
        });
    }
}