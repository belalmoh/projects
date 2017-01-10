var nodemailer = require('nodemailer');

module.exports = {
    setCredentials: function(email, password) {
        this.email = email;
        this.pass = password;
    },
    sendEmail: function (Recievers, Subject, EmployeeSSN) {
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: this.email, // Your email id
                pass: this.pass // Your password
            }
        });

        var mailOptions = {
            from: this.email, // sender address
            to: Recievers, // list of receivers
            subject: Subject, // Subject line
            // text: Body //, // plaintext body
            html: `<b>Dear,</b> <p>there was some insertion error regarding employee\'s salary that is greater than his/her supvervisor. </p> <p>Consequently, please revise his/her info according to this SSN: <span style="color:red">${EmployeeSSN}</span> <hr style="border-color: #cbced3"> <p><b style="color:#068dd6">Belal Mohammed - 4131148</b></p></p>` // You can choose to send an HTML body instead
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Error!.");
                // console.log(error);
                // res.json({yo: 'error'});
            } else {
                // console.log("Email is successfully sent to your desired recipients.");
                // console.log('Message sent: ' + info.response);
                // res.json({yo: info.response});
            };
        });
    }
}