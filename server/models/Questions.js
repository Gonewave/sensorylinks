import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  sense: { type: mongoose.Schema.Types.ObjectId, ref: 'Sense', required: true }
});

const Question = mongoose.model('question', questionSchema);

export default Question;