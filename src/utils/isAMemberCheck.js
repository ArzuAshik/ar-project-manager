const isAMemberCheck = (members = [], userEmail) => {
    if (members.length === 0) return false;
    for (let i = 0; i < members.length; i++) {
        const { email } = members[i];
        if (email === userEmail) return true;
    };
    return false
}

export default isAMemberCheck;