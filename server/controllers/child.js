import Child from "../models/Child.js"; // Ensure correct path
import jwt from "jsonwebtoken";
const JWT_SECRET = "abcd!@#$";

// export const createChild = async (req, res) => {
//   const documentNames = req.files.map((file) => file.filename);
//   const photo = documentNames.pop();
//   const {
//     admissionDate,
//     admissionFee,
//     firstName,
//     lastName,
//     gender,
//     dob,
//     height,
//     weight,
//     status,
//     parentFirstName,
//     parentLastName,
//     contactNumber,
//     emailID,
//     address,
//     documentFileName,
//     currentMedication,
//     foodHabits,
//     medicalHistory,
//     familyHistory,
//     additionalInfo,
//     specialNeed,
//     difficulties,
//     goals,
//     therapies,
//   } = req.body;

//   try {
//     const child = await Child.create({
//       admissionDate: admissionDate,
//       admissionFee: admissionFee,
//       firstName: firstName,
//       lastName: lastName,
//       gender: gender,
//       dob: dob,
//       height: height,
//       weight: weight,
//       photo: photo,
//       status: status,
//       parentFirstName: parentFirstName,
//       parentLastName: parentLastName,
//       contactNumber: contactNumber,
//       emailID: emailID,
//       address: address,
//       documentFileName: documentFileName,
//       documents: documentNames,
//       currentMedication: currentMedication,
//       foodHabits: foodHabits,
//       medicalHistory: medicalHistory,
//       familyHistory: familyHistory,
//       additionalInfo: additionalInfo,
//       specialNeed: specialNeed,
//       difficulties: difficulties,
//       goals: goals,
//       therapies:therapies
//     });

//     const data = {
//       id: child.id,
//     };
//     const authToken = jwt.sign(data, JWT_SECRET);
//     // console.log(authToken);
//     console.log(authToken);
//     res.json({ success: true, authToken: authToken });
//   } catch (error) {
//     console.error("Error sending data:", error);
//   }
// };
export const createChild = async (req, res) => {
  const documentNames = req.files.map((file) => file.filename);
  const photo = documentNames.pop();
  const {
    admissionDate,
    admissionFee,
    firstName,
    lastName,
    gender,
    dob,
    height,
    weight,
    status,
    parentFirstName,
    parentLastName,
    contactNumber,
    emailID,
    address,
    documentFileName,
    currentMedication,
    foodHabits,
    medicalHistory,
    familyHistory,
    additionalInfo,
    specialNeed,
    difficulties,
    goals,
    therapies,
  } = req.body;

  // Parse therapies correctly
  let parsedTherapies;
  try {
    parsedTherapies = JSON.parse(therapies || '[]').map(id => mongoose.Types.ObjectId(id));
  } catch (err) {
    console.error('Error parsing therapies:', err);
    parsedTherapies = []; // fallback to empty array on error
  }

  try {
    const child = await Child.create({
      admissionDate,
      admissionFee,
      firstName,
      lastName,
      gender,
      dob,
      height,
      weight,
      photo,
      status,
      parentFirstName,
      parentLastName,
      contactNumber,
      emailID,
      address,
      documentFileName,
      documents: documentNames,
      currentMedication,
      foodHabits,
      medicalHistory,
      familyHistory,
      additionalInfo,
      specialNeed,
      difficulties,
      goals,
      therapies: parsedTherapies // Use the parsed array of ObjectIds
    });

    const data = {
      id: child.id,
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    console.log(authToken);
    res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.error("Error sending data:", error);
    res.status(400).json({ error: error.message }); // Return error response
  }
};

export const getIds = async (req, res) => {
  try {
    let children = await Child.find(
      {},
      { firstName: 1, lastName: 1, emailID: 1, _id: 0 }
    );
    let updatedChildren = children.map((child) => {
      return {
        value: child.emailID,  // Include 'emailID'
        label: child.firstName + " " + child.lastName  // Include the concatenated 'name'
      };
    });
    res.json(updatedChildren);
  } catch (error) {
    res.status(500).json("Error retrieving child ids");
  }
};

// Get a child profile by ID
export const getChildProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const child = await Child.findById(id);
    res.json(child);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error retrieving child profile");
  }
};

// Get children with a limit
export const getChildren = async (req, res) => {
  try {
    const { limit } = req.query;
    const num = parseInt(limit, 10);
    const children = await Child.find(
      {},
      {
        firstName: 1,
        lastName: 1,
        parentFirstName: 1,
        parentLastName: 1,
        dob: 1,
        gender: 1,
        status: 1,
        photo: 1,
        therapies:1,
      }
    )
      .limit(num)
      .exec();
    res.json(children);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Error retrieving children");
  }
};

// Filter children
export const filterChildren = async (req, res) => {
  try {
    const { limit } = req.query;
    const num = parseInt(limit, 10);
    const { ID, Name, Parent, Status } = req.body;
    let filter = {};
    const nameFilter = [];

    if (Name) {
      const regexPattern = new RegExp(Name, "i");
      nameFilter.push({ firstName: { $regex: regexPattern } });
      nameFilter.push({ lastName: { $regex: regexPattern } });
    }
    if (nameFilter.length > 0) {
      filter.$or = nameFilter;
    }
    if (Parent) {
      filter.parentFirstName = { $regex: new RegExp(Parent, "i") };
    }
    if (Status) {
      filter.status = Status;
    }

    const data = await Child.find(filter).limit(num).exec();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error filtering children");
  }
};

// Delete a child
export const deleteChild = async (req, res) => {
  try {
    let child = await Child.findById(req.params.id);
    if (!child) {
      return res.status(404).send("Not Found");
    }
    await Child.findByIdAndDelete(req.params.id);
    res.json({ message: "The child has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error deleting child");
  }
};

// Update a child
export const updateChild = async (req, res) => {
  try {
    let child = await Child.findById(req.params.id);
    if (!child) {
      return res.status(404).send("Not Found");
    }
    const {
      admissionDate,
      admissionFee,
      firstName,
      lastName,
      gender,
      dob,
      height,
      weight,
      photo,
      status,
      parentFirstName,
      parentLastName,
      contactNumber,
      emailID,
      address,
      documentFileName,
      documentFilePath,
      currentMedication,
      foodHabits,
      medicalHistory,
      familyHistory,
      additionalInfo,
      specialNeed,
      difficulties,
      goals,
      therapies
    } = req.body;

    const newChild = {
      admissionDate,
      admissionFee,
      firstName,
      lastName,
      gender,
      dob,
      height,
      weight,
      photo,
      status,
      parentFirstName,
      parentLastName,
      contactNumber,
      emailID,
      address,
      documentFileName,
      documentFilePath,
      currentMedication,
      foodHabits,
      medicalHistory,
      familyHistory,
      additionalInfo,
      specialNeed,
      difficulties,
      goals,
      therapies
    };

    child = await Child.findByIdAndUpdate(
      req.params.id,
      { $set: newChild },
      { new: true }
    );
    res.json({ child });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error updating child");
  }
};
