import  mongoose  from 'mongoose';

const TherapyPlanSchema = new mongoose.Schema({
    childId: {
        type: String
    },
    therapy: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    status: {
        type: String
    }
})

// Table name will be "therapyPlan"
const TherapyPlans = mongoose.model('therapyPlans', TherapyPlanSchema);

export default TherapyPlans