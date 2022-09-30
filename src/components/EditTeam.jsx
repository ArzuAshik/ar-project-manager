import React, { useEffect, useState } from "react";
import {
  useGetTeamsQuery,
  useUpdateTeamMutation
} from "../features/teams/teamsApi";
import { useGetUsersQuery } from "../features/users/usersApi";
import useDebounce from "../hooks/useDebounce";
import filterRemoveExistingMember from "../utils/filterRemoveExistingMember";
import ColorOptions from "./ColorOptions";
import Modal from "./Modal";
import Suggestions from "./Suggestions";

export default function EditTeam({ info, controller }) {
  // 📧 destructuring props
  const { title, description, teamColor, admin, adminEmail, adminAvatar } =
    info;

  // 📧 states
  const [searchInput, setSearchInput] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestingUser, setSuggestingUser] = useState([]);
  const [members, setMembers] = useState([]);
  const [inputValues, setInputValues] = useState({
    description,
    teamColor,
  });

  // 📧 RTK Hooks
  const [handleUpdateTeam] = useUpdateTeamMutation();
  const { data: allTeams } = useGetTeamsQuery();
  const {
    data: users = [],
    isFetching,
    isSuccess,
  } = useGetUsersQuery(searchParam);

  // 📧 filtering users by search params
  useDebounce(() => setSearchParam(searchInput), 500, [searchInput]);

  // 📧 finding this team, this is required for updating the ui after adding new member
  useEffect(() => {
    const { members = [] } = allTeams.find(({ id }) => id === info.id);
    setMembers(members);
  }, [allTeams, info]);

  // 📧 removing existing members from list
  useEffect(() => {
    if (!showSuggestion || isFetching || !isSuccess) return;
    const list = filterRemoveExistingMember(
      [...members, { email: adminEmail }],
      users
    );
    setSuggestingUser(list);
  }, [users, members, adminEmail, showSuggestion, isFetching, isSuccess]);

  // 📧 handler functions
  const handleSelectColor = (value) => {
    handleInput({ target: { name: "teamColor", value } });
  };
  const handleHideSuggestion = () => {
    setTimeout(() => setShowSuggestion(false), 100);
  };
  const handleSelectSuggestion = (member) => {
    const data = { ...info, members: [...members, member] };
    handleUpdateTeam(data);
  };
  const handleSave = () => {
    const data = { ...info, ...inputValues, members };
    handleUpdateTeam(data);
    controller(false);
  };
  const handleInput = (e) => {
    setInputValues((currentValues) => {
      return { ...currentValues, [e.target.name]: e.target.value };
    });
  };
  // **************

  return (
    <Modal controller={controller} open={true} handleSave={handleSave}>
      <div
        className={`p-4 rounded-2xl bg-gradient-to-br from-${teamColor}-100 to-${teamColor}-50 mb-4`}
        style={{ minHeight: 480 }}
      >
        <div className="">
          <div className="flex gap-1 items-center">
            <span className="font-bold text-slate-400 text-lg">
              Team Title:
            </span>
            <span className="capitalize text-lg">{title}</span>
          </div>
          <div>
            <span className="font-bold text-slate-400 text-lg">
              Team Description:
            </span>
            <textarea
              name="description"
              placeholder="Description"
              className={`w-full h-max py-1 px-2 mt-1 rounded-lg text-lg ring-1 ring-slate-200`}
              style={{ resize: "none" }}
              value={inputValues.description}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="mt-8">
          <div
            className="bg-slate-300 p-3 rounded-lg mb-5 relative"
            style={
              showSuggestion
                ? { boxShadow: "0 0 0 100vw rgba(0, 0, 0, 0.4)" }
                : {}
            }
          >
            <input
              onFocus={() => setShowSuggestion(true)}
              onBlur={handleHideSuggestion}
              type="text"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              placeholder="To Add Member Type member name or email"
              className="bg-slate-50 w-full rounded-full p-2 pl-4 text-center"
            />
            <Suggestions
              show={showSuggestion}
              list={suggestingUser}
              loading={isFetching}
            >
              {(userInfo) => (
                <div
                  className="px-4 py-1 bg-slate-300"
                  key={userInfo.name}
                  onClick={() => handleSelectSuggestion(userInfo)}
                >
                  <div className="flex items-center gap-3 cursor-pointer bg-slate-100 hover:bg-slate-200 hover:ring-2 ring-sky-200 rounded-full p-1">
                    <img
                      className="rounded-full ring-2 ring-pink-400"
                      height="25"
                      width="25"
                      src={userInfo.avatar}
                      alt={userInfo.name}
                    />
                    <span className="font-bold text-lg text-slate-500">
                      {userInfo.name}
                    </span>
                  </div>
                </div>
              )}
            </Suggestions>
          </div>

          <ul className="p-2 bg-slate-200 rounded-lg">
            <li className="flex items-center gap-3 bg-slate-50 p-1 mb-2 rounded-full">
              <img
                className="rounded-full ring-2 ring-sky-400"
                height="35"
                width="35"
                src={adminAvatar}
                alt={admin}
              />
              <span className="font-bold text-lg text-slate-500">{admin}</span>
              <span className="ml-auto text-sky-400 font-bold pr-3">Admin</span>
            </li>
            {members.map(({ name, avatar }) => (
              <li
                className="flex items-center gap-3 bg-slate-50 p-1 mb-2 rounded-full"
                key={avatar}
              >
                <img
                  className="rounded-full ring-2 ring-yellow-400"
                  height="35"
                  width="35"
                  src={avatar}
                  alt={name}
                />
                <span className="font-bold text-lg text-slate-500">{name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <span className="font-bold text-slate-400 mb-2 inline-block">
            Team Color:
          </span>
          <ColorOptions
            hideTitle
            handleSelect={handleSelectColor}
            selectedColor={inputValues.teamColor}
          />
        </div>
      </div>
    </Modal>
  );
}
