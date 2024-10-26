import Sense from "../models/Sense.js";
import Reflex from "../models/Reflex.js";
import Questions from "../models/Questions.js";
import Survey from "../models/Survey.js";
import SharedSurvey from "../models/SharedSurvey.js";
import AssessmentShare from "../models/AssessmentShare.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "@al!";

export const createSense = async (req, res) => {
    const {title}=req.body;
    try {
        const data=await Sense.create({
            title:title
        })
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

export const createReflex = async (req, res) => {
    const {title}=req.body;
    try {
        const data=await Reflex.create({
            title:title
        })
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

export const getSense = async (req,res)=>{
    try {
        const data=await Sense.find({});
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

export const getReflex = async (req,res)=>{
    try {
        const data=await Reflex.find({});
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

export const updateSense = async (req, res) => {
    const { id } = req.params;
  const { title } = req.body;
  try {
    const updatedSense = await Sense.findByIdAndUpdate(id, { title }, { new: true });
    if (!updatedSense) {
      return res.status(404).send('Sense not found');
    }

    // Update related questions
    await Questions.updateMany({ sense: id }, { $set: { sense: updatedSense._id } });

    res.json(updatedSense);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

export const deleteSense = async (req, res) => {
    const { id } = req.params;
  try {
    await Sense.findByIdAndDelete(id);
    await Questions.deleteMany({ sense: id }); // Delete related questions
    res.json({ message: 'Sense and related questions deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};




export const updateReflex = async (req, res) => {
    const { title } = req.body;
    const { id } = req.params;
    try {
      const updatedReflex = await Reflex.findByIdAndUpdate(id, { title }, { new: true });
      if (!updatedReflex) {
        return res.status(404).send('Reflex not found');
      }
      res.json(updatedReflex);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
};

export const delelteReflex = async (req, res) => {
    const { id } = req.params;
  try {
    const deletedReflex = await Reflex.findByIdAndDelete(id);
    if (!deletedReflex) {
      return res.status(404).send('Reflex not found');
    }
    res.json({ message: 'Reflex deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};



export const createQuestion = async (req, res) => {
  const { question, senseId } = req.body;
  try {
    const sense = await Sense.findById(senseId);
    if (!sense) {
      return res.status(404).send('Sense not found');
    }
    const newQuestion = await Questions.create({ question, sense: sense._id });
    res.json(newQuestion);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

export const getQuestion = async (req, res) => {
  try {
    const questions = await Questions.find({}).populate('sense');
    res.json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

export const getSpecificQuestion = async (req, res) => {
  const { sense } = req.body;
  try {
    var questions = [];
    const senseId = await Sense.find({title: sense});
    if (senseId.length !== 0) {
      const id = senseId[0]._id
      questions = await Questions.find({sense : id});
    }
    res.json(questions);
    // res.json(senseId[0]._id)
  } catch (error) {
    console.log(error);
  }
}

export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question } = req.body;
  try {
    const updatedQuestion = await Questions.findByIdAndUpdate(id, { question }, { new: true });
    if (!updatedQuestion) {
      return res.status(404).send('Question not found');
    }
    res.json(updatedQuestion);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    await Questions.findByIdAndDelete(id);
    res.json({ message: 'Question deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};


export const getSurveys = async (req, res) => {
  const { childId } = req.body;
  try {
    const surveys = await Survey.find({ childId: childId }).sort({ assessment: 1 });
    res.json(surveys);
  } catch (error) {
    res.json(error.message);
  }
};


export const getSharedSurveys = async (req, res) => {
  const { childId } = req.body;
  try {
    const surveys = await SharedSurvey.find({ childId: childId }).sort({ assessment: 1 });
    res.json(surveys);
  } catch (error) {
    res.json(error.message);
  }
};


export const addSurvey = async (req, res) => {
  const {childId, sense, question, reflex, score, assessment} = req.body;
  try {
    const data = await Survey.create({childId: childId, sense: sense, question: question, reflex: reflex, score: score, assessment: assessment});
    res.json(data);
  } catch (error) {
    res.json(error.message);
  }
}

export const updateScore = async (req, res) => {
  const {newSurvey} = req.body;
  try {
    for (const record of newSurvey) {
      await Survey.updateOne(
        { _id: record._id },        // Find document by _id
        { $set: { score: record.score } }  // Update the 'score' field
      );
    }
    res.json(newSurvey);
  } catch (error) {
    res.json(error.message);
  }
}

export const addSurveyCollections = async (req, res) => {
  const {surveys} = req.body;
  try {
    const result = await Survey.insertMany(surveys);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
export const addSharedSurveyCollections = async (req, res) => {
  const {surveys} = req.body;
  try {
    const result = await SharedSurvey.insertMany(surveys);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
export const shareAssessment = async (req, res) => {
  const { childId, survey } = req.body;

  try {
    // Determine if specific questions are selected
    const specificQuestions = survey.length === 0 ? false : true;
    const payload = {
      childId,
      timestamp: Date.now(),  // Adding a timestamp to ensure uniqueness
    };

    // Generate a unique token with the childId and timestamp
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
    // Create a new entry in the AssessmentShare schema
    const shareData = await AssessmentShare.create({
      childID: childId,
      token,
      isSubmitted: false,
      specificQuestions,
      survey, // This will be an empty array if no questions were added
    });

    // Respond with success and the share URL
    res.json({
      success: true,
      message: "Assessment shared successfully!",
      shareUrl: `/assessment/share/${token}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getSharedAssessment = async (req, res) => {
  const { token } = req.params;

  try {
      // Verify token and fetch assessment details
      const decoded = jwt.verify(token, JWT_SECRET);
      const assessment = await AssessmentShare.findOne({ token }).populate('childID');

      if (!assessment) {
          return res.status(404).json({ message: "Assessment not found" });
      }

      res.json(assessment);
  } catch (error) {
      res.status(500).json({ message: "Invalid token or error fetching assessment" });
  }
};

export const getAssessmentByToken = async (req, res) => {
  const { token } = req.params;

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const assessment = await AssessmentShare.findOne({ token });
    if (assessment) {
      res.json(assessment);
    } else {
      res.status(404).json({ error: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ error: "Unauthorized access" });
  }
};

// Submit assessment and mark as submitted
export const submitAssessment = async (req, res) => {
  const { token } = req.params;
  const { surveys } = req.body;

  try {
    const assessment = await AssessmentShare.findOneAndUpdate(
      { token },
      { surveys, isSubmitted: true },
      { new: true }
    );
    if (assessment) {
      res.json(assessment);
    } else {
      res.status(404).json({ error: "Assessment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};