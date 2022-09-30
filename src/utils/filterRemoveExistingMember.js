const filterRemoveExistingMember = (existingMembers = [], allMemberList = []) => {
    const existingMembersEmails = existingMembers.map(({ email }) => email);
    return allMemberList.filter(({ email }) => !existingMembersEmails.includes(email)).slice(0, 5);

}

export default filterRemoveExistingMember;