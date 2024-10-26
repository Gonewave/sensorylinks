import mongoose from 'mongoose';

const AssessmentShareSchema = new mongoose.Schema({
    childID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    isSubmitted: {
        type: Boolean,
        default: false
    },
    specificQuestions: {
        type: Boolean,
        default: false
    },
    survey: {
        type: Array,
        default: []
    }
});

const AssessmentShare = mongoose.model('AssessmentShare', AssessmentShareSchema);
export default AssessmentShare;
