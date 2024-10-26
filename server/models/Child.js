import mongoose from 'mongoose';

const ChildSchema = new mongoose.Schema({
    admissionDate: String,
    admissionFee: String,
    firstName: String,
    lastName: String,
    gender: String,
    dob: String,
    height: String,
    weight: String,
    photo: String,
    status: String,
    parentFirstName: String,
    parentLastName: String,
    contactNumber: String,
    emailID: String,
    address: String,
    documentFileName: [String],
    documents: [String],
    currentMedication: String,
    foodHabits: String,
    medicalHistory: String,
    familyHistory: String,
    additionalInfo: String,
    specialNeed: [String],
    difficulties: [String],
    goals: [String],
    // Referencing Therapy IDs in the Child schema for assigned therapies
    therapies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'therapies' // This should match the model name of the therapy schema
        }
    ]
});

// Collection name will be "child"
const Child = mongoose.model('child', ChildSchema);

export default Child;
