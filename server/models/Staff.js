import  mongoose  from 'mongoose';

const StaffSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phNumber: {
        type: String
    },
    dob: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    photo: {
        type: String
    },
    status: {
        type: String
    },
    designation: {
        type: String
    },
    qualification: {
        type: String
    },
    degreeCertificate: {
        type: String
    },
    practicingApprovalCertificate: {
        type: String
    },
    aadharNumber: {
        type: String
    },
    aadharCard: {
        type: String
    },
    panNumber: {
        type: String
    },
    panCard: {
        type: String
    },
    bankAccountNumber: {
        type: String
    },
    bankIFCCode: {
        type: String
    },
    bankMICRCode: {
        type: String
    },
    bankName: {
        type: String
    },
    bankBranch: {
        type: String
    }
})

// Table name will be "staff"
const Staff = mongoose.model('staff', StaffSchema);

export default Staff;