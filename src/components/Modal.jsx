import React from "react";

export default function Modal({
  open = true,
  controller,
  children,
  handleSave,
  disableSave = false,
}) {
  if (!open) return null;

  const handleClose = () => {
    controller(false);
  };

  return (
    <div className="modal-container" style={styles.container}>
      <div
        className="modal-body bg-white rounded-3xl p-5 flex flex-col max-h-screen"
        style={styles.body}
      >
        <div className="modal-header max-h-full overflow-y-auto overflow-x-hidden">{children}</div>
        <div className="modal-footer flex mt-auto justify-around flex-row-reverse">
          <button
            className="flex items-center bg-green-500 px-20 py-2 rounded-full text-green-100 hover:bg-green-600"
            onClick={handleSave}
            disabled={disableSave}
          >
            Save
          </button>
          <button
            className="flex items-center bg-red-500 px-20 py-2 rounded-full text-red-100 hover:bg-red-600"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  body: {
    minWidth: "min(50vw, 500px)",
    minHeight: "400px",
  },
};
