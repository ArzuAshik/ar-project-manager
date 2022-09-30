import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import colorList from "../constData/colorList";
import selectUser from "../features/selectors/selectUser";
import {
  useAddTeamMutation,
  useGetTeamsQuery
} from "../features/teams/teamsApi";
import getCurrentDate from "../utils/getCurrentDate";
import selectRandomElement from "../utils/selectRandomElement";
import ColorOptions from "./ColorOptions";
import Modal from "./Modal";

const initialValues = { title: "", description: "", teamColor: "" };

export default function CreateNewTeam({ modalController, openModal }) {
  // 📧 States
  const [inputValues, setInputValues] = useState(initialValues);
  const [validationError, setValidationError] = useState(initialValues);

  // 📧 RTK Hooks
  const { name, email, avatar } = useSelector(selectUser);
  const { data: teams, isTeamLoading } = useGetTeamsQuery();
  const [handleAddTeam, { isLoading: addNewTeamLoading }] =
    useAddTeamMutation();

  // 📧 handler functions
  const handleInput = (e) => {
    setInputValues((currentValues) => {
      return { ...currentValues, [e.target.name]: e.target.value };
    });
  };
  const handleSelectColor = (value) => {
    handleInput({ target: { name: "teamColor", value } });
  };
  const isTeamAlreadyExist = (title) => {
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].title === title.toLowerCase()) {
        return true;
      }
    }
    return false;
  };
  const handleValidate = () => {
    const { title, description } = inputValues;

    let validate = true;

    let err = {
      title: !Boolean(title),
      description: !Boolean(description),
    };

    if (!title || !description) {
      validate = false;
    } else if (isTeamAlreadyExist(title)) {
      err.title = true;
      validate = false;
      toast.warning("Team Already Exist.");
    }
    setValidationError({ ...err });
    return validate;
  };
  const handleSave = () => {
    if (!handleValidate() || isTeamLoading || addNewTeamLoading) return;
    const newTeamInfo = {
      ...inputValues,
      title: inputValues.title.toLowerCase(),
      admin: name,
      adminAvatar: avatar,
      adminEmail: email,
      createdAt: getCurrentDate(),
    };
    if (!inputValues.teamColor) {
      newTeamInfo.teamColor = selectRandomElement(colorList);
    }
    handleAddTeam(newTeamInfo);
    modalController(false);
  };

  // ✉ resetting the form on successfully submission
  useLayoutEffect(() => {
    setInputValues(initialValues);
  }, [openModal]);

  return (
    <Modal
      controller={modalController}
      open={openModal}
      handleSave={handleSave}
    >
      <div className="p-2">
        <h2 className="text-2xl w-max mx-auto font-semibold border-b-4 border-solid border-slate-300 px-4 pb-2 mb-2">
          Create New Team
        </h2>
        <form>
          <input
            className={`w-full p-2 rounded-lg my-2 ring-2 ring-${
              validationError.title ? "red" : "slate"
            }-300`}
            type="text"
            placeholder="Team Name"
            name="title"
            value={inputValues.title}
            onChange={handleInput}
          />
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

          <ColorOptions
            handleSelect={handleSelectColor}
            selectedColor={inputValues.teamColor}
          />
        </form>
      </div>
    </Modal>
  );
}
