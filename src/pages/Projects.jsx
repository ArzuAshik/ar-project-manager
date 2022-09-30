import React from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { trash, trashOpen } from "../assets/images";
import ProjectStatusContainer from "../components/ProjectStatusContainer";
import projectStatusTypeList from "../constData/projectStatusTypeList";
import { useDeleteProjectMutation } from "../features/projects/projectsApi";
import selectUser from "../features/selectors/selectUser";
import DefaultLayout from "../Layout/DefaultLayout";
import dropHookProps from "../utils/dropHookProps";

export default function Projects() {
  const { email } = useSelector(selectUser);
  const [handleDelete] = useDeleteProjectMutation();
  const [{ isOver, canDrop }, drop] = useDrop(
    dropHookProps(["backlog"], handleDrop)
  );

  function handleDrop({ id, adminEmail }) {
    if (adminEmail !== email) {
      toast.warn("You are not the creator of this project!");
      return;
    }
    handleDelete(id);
  }

  return (
    <DefaultLayout title="Projects">
      <div className="px-10 mt-6 flex justify-between">
        <h1 className="text-2xl font-bold">Project Board</h1>

        <div
          ref={drop}
          className={`${
            canDrop ? "" : "hidden"
          } p-4 fixed bottom-0 right-0 w-72 h-72 z-50 rounded-xl`}
          style={
            isOver
              ? {
                  boxShadow: "0 0 0 500vw rgba(0, 0, 0, .5)",
                }
              : {}
          }
        >
          <img src={isOver ? trashOpen : trash} alt="trash" />
        </div>
      </div>
      <div className="flex flex-grow justify-between px-10 mt-4 overflow-auto">
        {projectStatusTypeList.map((statusType) => (
          <ProjectStatusContainer key={statusType} title={statusType} />
        ))}
      </div>
    </DefaultLayout>
  );
}
