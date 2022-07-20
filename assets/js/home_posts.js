// {
//     // METHOD TO SUBMIT THE FORM DATA FOR NEW POST USING AJAX
//     let createPost = function(){
//         let newPostForm = $('#new-post-form');

//         newPostForm.submit(function(e){
//             e.preventDefault($(' .delete-post-button, newPost'));

//             $.ajax({
//                 type: 'post',
//                 url: '/posts/create',
//                 data: newPostForm.serialize(),
//                 success: function(data){
//                     let newPost = newPostDom(data.data.post);
//                     $('#posts-list-container').prepend(newPost);
//                     deletePost($(' .delete-post-button', newPost));
//                 }, error: function(error){
//                     console.log(error.responseText);
//                 }
//             })
            
//         });
//     }

//     // METHOD TO CREATE POST IN DOM
//     let newPostDom = function(post){
//         return $(`<section class="feed_posts posts_section" id="post-${post._id}">
        
//                     <div class="item_detail_container">
//                         <h3 class="post_content">
//                             <i class="fa-solid fa-feather-pointed"></i>
//                             <b> ${post.content} </b></h3>
//                             <small class="hello">
//                                 <!-- if the user is signed in & the user who is signedIn is the user who Created the post  -->
                            
                
//                                 <a class=" delete delete-post-button" href="/posts/destroy/${post._id}"><i class="fa-solid fa-trash-can"></i></a>
                
                            
//                                 <b class="post_user">
//                                     <i class="fa-solid fa-user"></i>
//                                     ${post.user.name};
//                                 </b>
//                             </small>
                
//                     </div>
                
  
                
                       
                
//                             <form action="/comments/create" 
//                             class="form_styling" method="post">
                
//                                 <textarea name="content" class="textarea" cols="30" rows="2" placeholder="Hey!!... What are your thoughts" required ></textarea>
                                
//                                 <input type="hidden" name="post" value="${ post.id}" >
                                
//                                 <input type="submit" value="Comment" class="post-btn">
//                             </form>
                    
                
//                             <div class="post_comment_list">
//                                 <ul id="post_comments_${ post._id}" >
                                    
                                    
//                                 </ul>
//                             </div>
                        
                
                    
//                 </section>`)
//     }

//     // method to delete a post form DOM
//     let deletePost = function(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'get',
//                 url: $(deleteLink).prop('href'),
//                 success: function(data){
//                     $(`#post-${data.data.post_id}`).remove()
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }

//     createPost();
    
// }










// // ==================================================================================


// // {   
// //     // method to submit the form data for new post using AJAX
// //     let createPost = function(){
// //         let newPostForm = $('#new-post-form');

// //         newPostForm.submit(function(e){
// //             e.preventDefault();

// //             $.ajax({
// //                 type: 'post',
// //                 url: '/posts/create',
// //                 data: newPostForm.serialize(),
// //                 success: function(data){
// //                     let newPost = newPostDom(data.data.post);
// //                     $('#posts-list-container>ul').prepend(newPost);
// //                     deletePost($(' .delete-post-button', newPost));
// //                 }, error: function(error){
// //                     console.log(error.responseText);
// //                 }
// //             });
// //         });
// //     }


// //     // method to create a post in DOM
// //     let newPostDom = function(post){
// //         return $(`<li id="post-${post._id}">
// //                     <p>
                        
// //                         <small>
// //                             <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
// //                         </small>
                       
// //                         ${ post.content }
// //                         <br>
// //                         <small>
// //                         ${ post.user.name }
// //                         </small>
// //                     </p>
// //                     <div class="post-comments">
                        
// //                             <form action="/comments/create" method="POST">
// //                                 <input type="text" name="content" placeholder="Type Here to add comment..." required>
// //                                 <input type="hidden" name="post" value="${ post._id }" >
// //                                 <input type="submit" value="Add Comment">
// //                             </form>
               
                
// //                         <div class="post-comments-list">
// //                             <ul id="post-comments-${ post._id }">
                                
// //                             </ul>
// //                         </div>
// //                     </div>
                    
// //                 </li>`)
// //     }


// //     // method to delete a post from DOM
// //     let deletePost = function(deleteLink){
// //         $(deleteLink).click(function(e){
// //             e.preventDefault();

// //             $.ajax({
// //                 type: 'get',
// //                 url: $(deleteLink).prop('href'),
// //                 success: function(data){
// //                     $(`#post-${data.data.post_id}`).remove();
// //                 },error: function(error){
// //                     console.log(error.responseText);
// //                 }
// //             });

// //         });
// //     }






// //     createPost();
// // }