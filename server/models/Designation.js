import  mongoose  from 'mongoose';

const DesignationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

// Table name will be "designation"
const Designation = mongoose.model('designation', DesignationSchema);

export default Designation