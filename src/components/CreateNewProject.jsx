import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAddProjectMutation } from "../features/projects/projectsApi";
import selectUser from "../features/selectors/selectUser";
import { useGetTeamsQuery } from "../features/teams/teamsApi";
import getCurrentDate from "../utils/getCurrentDate";
import Modal from "./Modal";
import Suggestions from "./Suggestions";

const initialValues = { title: "", team: "", description: "" };

export default function CreateNewProject({ modalController, open }) {
  // 📧 states
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [inputValues, setInputValues] = useState(initialValues);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [validationError, setValidationError] = useState(initialValues);

  // 📧 RTK Hooks
  const user = useSelector(selectUser);
  const [handleAddProject] = useAddProjectMutation();
  const { data: teams = [], isLoading: teamsLoading } = useGetTeamsQuery();

  // 📧 handler functions
  const handleShowSuggestion = () => {
    setShowSuggestion(true);
  };
  const handleHideSuggestion = () => {
    setShowSuggestion(false);
  };
  const handleSelectSuggestion = (value) => {
    handleInput({ target: { name: "team", value } });
    handleHideSuggestion();
  };
  const handleInput = (e) => {
    setInputValues((currentValues) => {
      return { ...currentValues, [e.target.name]: e.target.value };
    });
  };
  const handleBlurSuggestion = () => {
    setTimeout(handleHideSuggestion, 100);
  };
  const handleValidate = () => {
    const { title, team, description } = inputValues;
    setValidationError({
      title: !Boolean(title),
      team: !Boolean(team),
      description: !Boolean(description),
    });
    if (!title || !team || !description) {
      return false;
    }

    const selectedTeam = teams.find(
      ({ title }) => title === team.toLowerCase()
    );
    if (!selectedTeam) {
      // 📧 select a valid team
      setValidationError({ team: true });
      toast.warning("Sorry, no team found with this name!");
      return false;
    }

    return true;
  };
  const handleSave = () => {
    if (teamsLoading) {
      toast.warn("Please Wait to load teams and retry.");
      return;
    } else if (!handleValidate()) return;
    const { name: admin, email: adminEmail, avatar: adminAvatar } = user;
    const { teamColor } = teams.find(
      (team) => team.title === inputValues.team.toLowerCase()
    );
    const projectInfo = {
      ...inputValues,
      teamColor,
      admin,
      adminEmail,
      adminAvatar,
      createdAt: getCurrentDate(),
      status: "backlog",
    };
    handleAddProject(projectInfo);
    modalController(false);
  };

  // 📧 resetting the form on successfully submission
  useLayoutEffect(() => {
    setInputValues(initialValues);
  }, [open]);

  useEffect(() => {
    if (teams.length === 0) return;
    const filter = teams.filter(({ title }) =>
      title.includes(inputValues.team)
    );
    setFilteredTeams(filter.slice(0, 5));
  }, [inputValues.team, teams]);

  return (
    <Modal open={open} controller={modalController} handleSave={handleSave}>
      <div className="p-2">
        <h2 className="text-2xl inline-block font-semibold border-b-2 border-solid border-slate-300 pr-4 pb-2 mb-2">
          Create New Project
        </h2>
        <form>
          <input
            className={`w-full p-2 rounded-lg my-2 ring-2 
          ring-${validationError.title ? "red" : "slate"}-300 `}
            type="text"
            placeholder="Project Name"
            name="title"
            value={inputValues.title}
            onChange={handleInput}
          />
          <div className="relative">
            <input
              className={`w-full p-2 rounded-lg mt-2 mb-1 ring-2 ring-${
                validationError.team ? "red" : "slate"
              }-300`}
              type="text"
              placeholder="Team Name"
              name="team"
              value={inputValues.team}
              onChange={handleInput}
              onFocus={handleShowSuggestion}
              onBlur={handleBlurSuggestion}
            />
            <Suggestions show={showSuggestion} list={filteredTeams}>
              {({ title }) => (
                <span
                  key={title}
                  onClick={() => handleSelectSuggestion(title)}
                  className="inline-block py-1 px-4 rounded-lg hover:bg-slate-200 text-blue-500 cursor-pointer capitalize"
                >
                  {title}
                </span>
              )}
            </Suggestions>
          </div>
          <textarea
            name="description"
            placeholder="Description"
            className={`w-full p-2 rounded-lg my-2 ring-2 ring-${
              validationError.description ? "red" : "slate"
            }-300`}
            rows={6}
            style={{ resize: "none" }}
            value={inputValues.description}
            onChange={handleInput}
          />
        </form>
      </div>
    </Modal>
  );
}
