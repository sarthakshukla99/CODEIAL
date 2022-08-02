class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:3300');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){

        let self = this;


        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data)
            })

        });


        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                })
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);

            let messages_list = $('#chat-messages-list');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }


            let newMessage = `<article class="msg-container msg-remote ${messageType}" id="msg-0">
                                    <div class="msg-box">
                                        <img class="user-img" id="user-0"
                                            src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro" />
                                        <div class="flr">
                                            <div class="messages">
                                                <p class="msg" id="msg-0">
                                                    ${data.message}
                                                </p>
                                            </div>
                                            <span class="timestamp"><span class="username">Name</span>&bull;<span class="posttime">${data.user.email}</span></span>
                                        </div>
                                    </div>
                                </article>`


            

            $('#chat-messages-list').append(newMessage);
        })
    }
}