const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');



//error solved stack overflow
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    post: 587,
    secure: false,
    auth: {
        user: 'mrahmank333',
        pass: '@&rahman0195&@'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){console.log('Error in rendring template', err); return;}

            mailHTML = template;

        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}