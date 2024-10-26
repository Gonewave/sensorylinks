import nodemailer from 'nodemailer';
import Child from "../models/Child.js";

export const sendBulkEmail = async (req, res) => {
    const { emailList, subject, message } = req.body;
    
    // const userEmails = await getUserEmailsFromDB();
    // const emailList = userEmails.map(item => item.emailID);
    // console.log(userEmails);
    console.log(emailList);
    // const subject="Testing";
    // const message="Mail for you from Sensory link backend";
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "mvssriharsha63@gmail.com", 
            pass: "wmlkosyabyywjyhb"
        }
    });

    let mailOptions = {
        from: "mvssriharsha63@gmail.com",
        to: emailList.join(','), 
        // to:"animichandan@gmail.com",
        subject: subject, // Subject line
        text: message // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send({'success': true});
    });
};

// Mock function to simulate fetching user emails from a database
async function getUserEmailsFromDB() {
    try {
       const children = await Child.find({}, { _id:0,emailID:1 });
        return children;
    } catch (error) {
        console.error(error.message);
        return "Error retrieving children";
    }
}