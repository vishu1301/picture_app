"use client";
import React, { useState } from "react";

function PostView({
  setOpen,
  stopClose,
  viewData,
  setNewCaption,
  newCaption,
  updateCaption,
  deletePost,
}) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const openUpdateView = () => {
    setOpenUpdate(true);
  };

  const openDeleteView = () => {
    setOpenDelete(true);
  };

  const handleCaptionChange = (e) => {
    setNewCaption(e.target.value);
  };

  const handleUpdateCaption = () => {
    updateCaption(viewData[0].id, newCaption);
    setOpenUpdate(false);
    setNewCaption("");
    setOpen(false);
  };

  const handleDeletePost = () => {
    deletePost(viewData[0].id);
    setOpenDelete(false);
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-mono"
      onClick={() => setOpen(false)}
    >
      <div
        className="flex items-center justify-center z-50"
        onClick={stopClose}
      >
        {openUpdate ? (
          <div className="flex items-center justify-center flex-col bg-white p-5 rounded-2xl">
            <input
              type="text"
              value={newCaption}
              onChange={handleCaptionChange}
              placeholder="Update Caption"
              className="bg-gray-200 h-20 w-96 p-2 border-none outline-none"
            />
            <button
              onClick={handleUpdateCaption}
              className="bg-blue-500 mt-4 p-4 text-white rounded-lg"
            >
              Update Caption
            </button>
          </div>
        ) : openDelete ? (
          <>
            <div className="flex items-center justify-center flex-col bg-white p-5 rounded-2xl">
              <h1>DO YOU WANT TO DELETE POST ?</h1>
              <div className="flex flex-row justify-center items-center">
                <button className="m-5" onClick={handleDeletePost}>
                  YES
                </button>
                <button className="m-5" onClick={() => setOpenDelete(false)}>
                  NO
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl">
            <div className="flex items-center justify-center flex-col">
              <button
                onClick={openUpdateView}
                className="px-40 py-5 border outline-none rounded-tl-2xl rounded-tr-2xl uppercase"
              >
                Update
              </button>
              <button
                onClick={openDeleteView}
                className="px-40 py-5 border outline-none rounded-bl-2xl rounded-br-2xl uppercase text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostView;
