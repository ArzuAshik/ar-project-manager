import isAMemberCheck from "./isAMemberCheck";

const filterTeams = (data, userEmail) => {
    return data.filter(({ adminEmail, members = [] }) => {
        return Boolean(adminEmail === userEmail ||
            isAMemberCheck(members, userEmail))
    });
};

export default filterTeams;