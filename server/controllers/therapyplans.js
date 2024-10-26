import TherapyPlans from "../models/TherapyPlans.js"; // Ensure correct path

export const AddTherapyPlan = async (req, res) => {
    const {childId, therapy, startDate, endDate, status} = req.body;
    try {
        const plan = await TherapyPlans.create({childId: childId, therapy: therapy, startDate: startDate, endDate: endDate, status: status});
        res.json(plan);
    } catch (error) {
        console.log(error);
    }
}

export const GetTherapyPlans = async (req, res) => {
    const { childId } = req.body;
    try {
        const { limit } = req.query;
        const num = parseInt(limit, 10);
        const plans = await TherapyPlans.find({childId: childId}).limit(num).exec();
        res.json(plans);
    } catch (error) {
        console.log(error);
    }
}

export const GetAll = async (req, res) => {
    try {
        const plans = await TherapyPlans.find({});
        res.json(plans);
    } catch (error) {
        console.log(error)
    }
}