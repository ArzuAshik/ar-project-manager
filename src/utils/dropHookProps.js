import filterAcceptableProjectTypes from "./filterAcceptableProjectTypes";

const dropHookProps = (accept, handleDrop) => {
    // 📧 filtering is acceptable
    let acceptList = accept;
    if (typeof (accept) === "string") {
        acceptList = filterAcceptableProjectTypes(accept);
    }

    return {
        accept: acceptList,
        drop: handleDrop,
        collect: (monitor) => {
            return { isOver: monitor.isOver(), canDrop: monitor.canDrop() };
        },
    };
}

export default dropHookProps;