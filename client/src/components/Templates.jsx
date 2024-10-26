import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Templates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [expandedTemplateIds, setExpandedTemplateIds] = useState([]);
  const [templateToDelete, setTemplateToDelete] = useState(null); // Holds template ID for deletion confirmation
  const [templateToUpdate, setTemplateToUpdate] = useState(null); // Holds template ID for updating confirmation

  const fetchTemplates = async () => {
    try {
      const response = await fetch("http://localhost:3001/templates/fetchTemplates", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      } else {
        console.error("Failed to fetch templates", response.status);
      }
    } catch (error) {
      console.error("Error fetching templates", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const toggleTemplate = (id) => {
    setExpandedTemplateIds((prev) =>
      prev.includes(id) ? prev.filter((templateId) => templateId !== id) : [...prev, id]
    );
  };

  const deleteTemplate = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/templates/deleteTemplate/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTemplates((prevTemplates) => prevTemplates.filter((template) => template._id !== id));
        setTemplateToDelete(null);
      } else {
        console.error("Failed to delete template", response.status);
      }
    } catch (error) {
      console.error("Error deleting template", error);
    }
  };

  const removeSurvey = (templateId, surveyIndex) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) =>
        template._id === templateId
          ? {
              ...template,
              surveys: template.surveys.filter((_, index) => index !== surveyIndex),
            }
          : template
      )
    );
  };

  const updateTemplate = async (template) => {
    try {
      const response = await fetch(`http://localhost:3001/templates/updateTemplate/${template._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ surveys: template.surveys }),
      });

      if (response.ok) {
        setTemplateToUpdate(null); // Close confirmation modal
      } else {
        console.error("Failed to update template", response.status);
      }
    } catch (error) {
      console.error("Error updating template", error);
    }
  };

  return (
    <div>
      <div className="mx-5 my-5">
        <Header title={"Templates"} />
      </div>
      <div className="mx-5 my-5">
        <button
          type="button"
          className="btn"
          style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
          onClick={() => {
            navigate("/createtemplate");
          }}
        >
          Create Template
        </button>

        <div className="my-5">
          {templates.length > 0 ? (
            templates.map((template) => (
              <div key={template._id} className="my-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>{template.name}</h5>
                  <div>
                    {/* Expand button */}
                    <button
                      className="btn p-0 mx-2"
                      style={{ fontSize: "20px", color: "#fff" }}
                      onClick={() => toggleTemplate(template._id)}
                    >
                      {expandedTemplateIds.includes(template._id) ? "▼" : "►"}
                    </button>
                    {/* Delete button */}
                    <button
                      className="btn p-0"
                      style={{ fontSize: "20px", color: "red" }}
                      onClick={() => setTemplateToDelete(template._id)} // Set template for deletion confirmation
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </div>

                {/* Conditionally display surveys if template is expanded */}
                {expandedTemplateIds.includes(template._id) && (
                  <div>
                    {template.surveys.map((survey, index) => (
                      <div key={index}>
                        <div
                          className="my-2"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div className="container-fluid my-2" style={{ padding: "7px" }}>
                            <h4>Sense: {survey.sense}</h4>
                            <h5>Question: {survey.question}</h5>
                            <h5>Reflex: {survey.reflex.join(", ")}</h5>
                          </div>
                          <button
                            className="btn btn-danger ml-2"
                            onClick={() => removeSurvey(template._id, index)}
                          >
                            Remove
                          </button>
                        </div>
                        <hr />
                      </div>
                    ))}
                  </div>
                )}
                {/* Save Changes button */}
                {expandedTemplateIds.includes(template._id) && (
                  <button
                    className="btn btn-success"
                    onClick={() => setTemplateToUpdate(template)} // Set template for update confirmation
                  >
                    Save Changes
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No templates found.</p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {templateToDelete && (
        <div className="modal fade show" tabIndex={-1} style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setTemplateToDelete(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this template?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setTemplateToDelete(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteTemplate(templateToDelete)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Changes Confirmation Modal */}
      {templateToUpdate && (
        <div className="modal fade show" tabIndex={-1} style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Save Changes</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setTemplateToUpdate(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to save the changes to this template?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setTemplateToUpdate(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => updateTemplate(templateToUpdate)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
