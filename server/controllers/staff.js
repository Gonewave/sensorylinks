import Staff from "../models/Staff.js"; // Ensure correct path

// router.post("/upload-file", upload.array("files"), async (req, res) => {
//   res.send(req.file.filename);
// });

export const UploadFile = async (req, res) => {
    res.send(req.file.filename);
}

export const CreateStaff =  async (req, res) => {
    const {firstName,lastName,phNumber,dob,gender,email,password,address,photo,status,designation,qualification,degreeCertificate,practicingApprovalCertificate,aadharNumber,aadharCard,panNumber,panCard,bankAccountNumber,bankIFCCode,bankMICRCode,bankName,bankBranch
    } = req.body;
    try {
      let staff = await Staff.findOne({ email: email });
      if (staff) {
        res.status(400).send({
          success: false,
          errors: "Sorry a staff with this email already exists",
        });
        return;
      }
  
      staff = await Staff.create({
        firstName: firstName,
        lastName: lastName,
        phNumber: phNumber,
        email: email,
        dob: dob,
        gender: gender,
        password: password,
        address: address,
        photo: photo,
        status: status,
        designation: designation,
        qualification: qualification,
        degreeCertificate: degreeCertificate,
        practicingApprovalCertificate: practicingApprovalCertificate,
        aadharNumber: aadharNumber,
        aadharCard: aadharCard,
        panNumber: panNumber,
        panCard: panCard,
        bankAccountNumber: bankAccountNumber,
        bankIFCCode: bankIFCCode,
        bankMICRCode: bankMICRCode,
        bankName: bankName,
        bankBranch: bankBranch
      });
  
      const data = {
        id: staff.id,
      };
      // const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(authToken);
      // res.json({ success: true, authToken: authToken });
      res.json({id: staff._id})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
}

export const GetStaffs = async (req, res) => {
    try {
        const { limit } = req.query;
        const num = parseInt(limit, 10);
        const staff = await Staff.find({}).select("-password").limit(num).exec();;
        res.json(staff);
      } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occured");
      }
}

export const filterStaff = async (req, res) => {
  try {
      const { limit } = req.query;
      const num = parseInt(limit, 10);
      const { Name, phNumber, Status } = req.body;
      let filter = {};
      const nameFilter = [];

      if (Name) {
          const regexPattern = new RegExp(Name, 'i');
          nameFilter.push({ firstName: { $regex: regexPattern } });
          nameFilter.push({ lastName: { $regex: regexPattern } });
      }
      if (nameFilter.length > 0) {
          filter.$or = nameFilter;
      }
      if (phNumber) {
          filter.phNumber = { $regex: new RegExp(phNumber, 'i') };
      }
      if (Status) {
          filter.status = Status;
      }

      const data = await Staff.find(filter).limit(num).exec();
      res.json(data);
  } catch (err) {
      console.error(err.message);
      res.status(500).json("Error filtering children");
  }
};

export const getSpecificStaff = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id).select("-password");
        res.json(staff);
      } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occured");
      }
}

export const DeleteStaff = async (req, res) => {
    try {
        let staff = await Staff.findById(req.params.id);
        if (!staff) {
          return res.status(404).send("Not Found");
        }
        staff = await Staff.findByIdAndDelete(req.params.id);
        res.json({ "Job done": "The Staff has been deleted" });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
        return;
      }
}

export const UpdateStaff = async (req, res) => {
    try {
        let staff = await Staff.findById(req.params.id);
        if (!staff) {
          return res.status(404).send("Not Found");
        }
        const {
          firstName,
          lastName,
          phNumber,
          email,
          password,
          address,
          photo,
          status,
          designation,
        } = req.body;
        const newStaff = {};
        if (firstName) {
          newStaff.firstName = firstName;
        }
        if (lastName) {
          newStaff.lastName = lastName;
        }
        if (phNumber) {
          newStaff.phNumber = phNumber;
        }
        if (email) {
          newStaff.email = email;
        }
        if (password) {
          newStaff.password = password;
        }
        if (address) {
          newStaff.address = address;
        }
        if (photo) {
          newStaff.photo = photo;
        }
        if (status) {
          newStaff.status = status;
        }
        if (designation) {
          newStaff.designation = designation;
        }
    
        staff = await Staff.findByIdAndUpdate(
          req.params.id,
          { $set: newStaff },
          { new: true }
        );
        res.json({ staff });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
      }
}
