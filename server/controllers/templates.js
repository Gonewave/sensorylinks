import Templates from "../models/Templates.js";

export const createTemplate = async (req, res) => {
    const {name, surveys} = req.body;

    try {
        const template = await Templates.create({
            name: name,
            surveys: surveys
        })
        res.json(template);
    } catch (error) {
        console.error(error);
    }
}

export const fetchTemplates = async (req, res) => {
    try {
        const template = await Templates.find({});
        res.json(template);
    } catch (error) {
        console.error(error);
    }
}

export const deleteTemplate = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTemplate = await Templates.findByIdAndDelete(id);
      
      if (!deletedTemplate) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.status(200).json({ message: "Template deleted successfully" });
    } catch (error) {
      console.error("Error deleting template:", error);
      res.status(500).json({ message: "Error deleting template" });
    }
  }

export const updateTemplate = async (req, res) => {
    try {
      const templateId = req.params.id;
      const updatedTemplate = req.body; // Get updated data from the request body
  
      const template = await Templates.findByIdAndUpdate(templateId, updatedTemplate, { new: true });
  
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
  
      res.json(template);
    } catch (error) {
      console.error("Error updating template:", error);
      res.status(500).json({ error: "Server error" });
    }
  };