import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
  childId: {type: String, required: true},
  sense: { type: String, required: true },
  question: { type: String, required: true },
  reflex: {type: [String]},
  score: {type: String},
  assessment: {type: String}
});

const SharedSurvey = mongoose.model('sharedSurvey', surveySchema);

export default SharedSurvey;