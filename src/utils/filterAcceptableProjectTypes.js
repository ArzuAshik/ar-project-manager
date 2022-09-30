import projectStatusTypeList from "../constData/projectStatusTypeList";

const filterAcceptableProjectTypes = (projectType) => {
    return projectStatusTypeList.filter((type) => type !== projectType)
}

export default filterAcceptableProjectTypes;