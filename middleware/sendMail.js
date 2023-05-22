var sendmail = require('sendmail')()

const sendEmailNow=()=>{
    sendmail({
    from: 'dkmehr.com@gmail.com',
    to: 'milad.cia@gmail.com',
    replyTo: 'reyham.com@gmail.com',
    subject: 'MailComposer sendmail',
    html: 'Mail of test sendmail '
    }, function (err, reply) {
    console.log(err && err.stack)
    console.dir(reply)
    })
}

module.exports =sendEmailNow