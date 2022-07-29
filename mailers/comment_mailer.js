const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside new comment mailer ==>', comment);

    nodeMailer.transporter.sendMail({
        from: 'sarthakshukla325@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: '<h1>Yup, your comment is now published</h1>'
    }, (err, info) => {
        if(err){
            console.log('error in sending email', err);
            return
        }

        console.log('Message sent', info);
        return
    })
}