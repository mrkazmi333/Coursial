{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        let postTextArea = $('#post-text-area');
        newPostForm.submit(function(e){
    
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    postTextArea.val('');
                    
                    $('#posts-list-container>ul').prepend(newPost);

                    deletePost($(' .delete-post-button', newPost));

                    //call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                    theme: 'relax',
                    text: "Post Published!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }               
            });
        });

    }
   
    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li class="each-post-li" id="post-${post._id}">
                    <p>
                        
                        <h4 class="user-name-on-post">
                            ${ post.user.name }
                        </h4>
                
                        <p class="post-content">${ post.content }</p>
                    
                        <small>
                            <a class="delete-post delete-post-button" href="/posts/destroy/${ post._id }">Delete Post</a>
                        </small>
                       
                
                    </p>
                    <div class="post-comments">
                       
                            <form id="post-${ post._id}-comments-form" class="comment-form" action="/comments/create" method="POST">
                                <input class="comment-input" type="text" name="content" placeholder="Type here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }">
                                <input class="add-comment-button" type="submit" value="Add Comment">
                            </form>
                    
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                
                        </div>
                    </div>
                    
                </li>`)
    }

    //Method to delete a post from DOM
    let deletePost = function(deletelink){
        $(deletelink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deletelink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                    
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    //Loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            //Get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
            
        });
    }


    createPost();
    convertPostsToAjax();
    
}

