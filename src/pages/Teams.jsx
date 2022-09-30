import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import CreateNewTeam from "../components/CreateNewTeam";
import EditTeam from "../components/EditTeam";
import PlusButton from "../components/PlusButton";
import selectUser from "../features/selectors/selectUser";
import { useGetTeamsQuery } from "../features/teams/teamsApi";
import DefaultLayout from "../Layout/DefaultLayout";
import TeamLoading from "../LoadingComponents/TeamLoading";
import filterTeams from "../utils/filterTeams";

export default function Teams() {
  const [openModal, setOpenModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  const { email } = useSelector(selectUser);
  const { data = [], isLoading, isSuccess } = useGetTeamsQuery();
  const [myTeams, setMyTeams] = useState([]);

  // 📧 filtering my projects
  useEffect(() => {
    if (isLoading || data.length === 0) return;
    setMyTeams(filterTeams(data, email));
  }, [data, isLoading, email]);
  // ****************

  // 📧 handler functions
  const handleEditTeam = (teamInfo) => {
    return () => setEditingTeam(teamInfo);
  };
  const handleModal = (value) => {
    setOpenModal(value);
  };
  // *****************

  // 📧 loading component
  if (isLoading) {
    return <TeamLoading />;
  }

  return (
    <DefaultLayout title="Teams">
      <div className="px-10 mt-6 flex justify-between">
        <h1 className="text-2xl font-bold">Teams</h1>
        <PlusButton onClick={() => handleModal(true)} show={isSuccess} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
        {myTeams.length === 0 && isSuccess ? (
          <div className="p-5 text-center text-3xl text-gray-500">
            No Teams For You!
          </div>
        ) : (
          myTeams.map((teamInfo) => (
            <Card
              key={teamInfo.id}
              info={teamInfo}
              onClick={handleEditTeam(teamInfo)}
            />
          ))
        )}
      </div>

      {openModal && (
        <CreateNewTeam modalController={handleModal} openModal={openModal} />
      )}
      {editingTeam && (
        <EditTeam info={editingTeam} controller={setEditingTeam} />
      )}
    </DefaultLayout>
  );
}
