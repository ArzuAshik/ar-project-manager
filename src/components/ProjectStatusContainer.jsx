import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import {
  useGetProjectsQuery,
  useUpdateProjectMutation
} from "../features/projects/projectsApi";
import selectFilteredProjects from "../features/selectors/selectFilterdProjects";
import LoadingCard from "../LoadingComponents/LoadingCard";
import dropHookProps from "../utils/dropHookProps";
import Card from "./Card";
import CreateNewProject from "./CreateNewProject";
import PlusButton from "./PlusButton";

export default function ProjectStatusContainer({ title }) {
  // ✉ states and RTK hooks
  const [openModal, setOpenModal] = useState(false);
  const filteredProjects = useSelector(selectFilteredProjects);
  const [updateProjectStatus] = useUpdateProjectMutation();
  const { data = [], isLoading, isSuccess } = useGetProjectsQuery();
  // *****************

  // ✉ filtering projects
  const projectList = data.filter(({ status }) => status === title);
  //*************

  // ✉ dnd functions
  function handleDrop(info) {
    updateProjectStatus({ ...info, status: title });
  }
  const [{ isOver, canDrop }, drop] = useDrop(dropHookProps(title, handleDrop));
  // *************

  const handleModal = (value) => {
    setOpenModal(value);
  };

  // ✉ Loading Component
  if (isLoading) {
    return (
      <div className={`flex flex-col flex-shrink-0 w-72 px-2 rounded-lg`}>
        <div className="flex items-center flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold capitalize">
            {title}
          </span>
        </div>
        <div className="flex flex-col pb-2 overflow-auto">
          <LoadingCard />
        </div>
      </div>
    );
  }
  // *************

  return (
    <div
      className={`flex flex-col flex-shrink-0 w-72 px-2 rounded-lg ${
        canDrop
          ? isOver
            ? "bg-gradient-to-r from-sky-300"
            : "bg-gradient-to-r from-slate-50 to-transparent"
          : ""
      }`}
      ref={drop}
    >
      <div className="flex items-center flex-shrink-0 h-10 px-2">
        <span className="block text-sm font-semibold capitalize">{title}</span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {projectList.length}
        </span>
        <PlusButton
          onClick={() => handleModal(true)}
          show={title === "backlog"}
        />
      </div>

      <div className="flex flex-col p-1 pb-2 overflow-auto h-full">
        {isSuccess && projectList.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <span className="text-gray-400 text-xl opacity-30">No Project</span>
          </div>
        ) : (
          projectList.map((project) => (
            <Card
              key={project.id}
              info={project}
              active={filteredProjects.includes(project.id)}
              draggable
            />
          ))
        )}
      </div>

      {openModal && (
        <CreateNewProject open={openModal} modalController={handleModal} />
      )}
    </div>
  );
}
