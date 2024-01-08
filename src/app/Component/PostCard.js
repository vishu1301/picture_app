"use client";
import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import { BsSend } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PostView from "./PostView";
import { initializeApp } from "firebase/app";
import { FaCamera } from "react-icons/fa";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toast";

const firebaseConfig = {
  apiKey: "AIzaSyCpswnWms1sv02KTeui94V601EmOW8jAT8",
  authDomain: "pictureupload-5336c.firebaseapp.com",
  projectId: "pictureupload-5336c",
  storageBucket: "pictureupload-5336c.appspot.com",
  messagingSenderId: "1011165651701",
  appId: "1:1011165651701:web:eaeb637815b3426dd09bbc",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function PostCard() {
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [newCaption, setNewCaption] = useState("");

  const viewOpen = (postId) => {
    const openPostData = postData.filter((data) => data.id == postId);
    setViewData(openPostData);
    setOpen(true);
  };

  const updateCaption = async (postID, newCaption) => {
    const postDoc = doc(db, "POSTS", postID);

    try {
      await updateDoc(postDoc, { Caption: newCaption });
    } catch (error) {
      toast.error("Error Updating Data:", error);
    }
  };

  const stopClose = (e) => {
    e.stopPropagation();
  };

  const deletePost = async (postID) => {
    await deleteDoc(doc(db, "POSTS", postID));
  };

  const postDetail = () => {
    const postCollection = collection(db, "POSTS");

    const postCollectionData = onSnapshot(
      postCollection,
      (snapshot) => {
        const post = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPostData(post);
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );

    return () => postCollectionData();
  };

  useEffect(() => {
    const unsubscribe = postDetail();
    return () => unsubscribe();
  }, []);

  // console.log(postData.map((detail) => detail.id));

  return (
    <div>
      {postData.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <h1 className="text-7xl border-4 border-black rounded-full p-6 ">
            <FaCamera />
          </h1>
          <h1 className="mt-5 text-2xl tracking-widest font-semibold">
            NO POSTS
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-5 mb-10 font-mono">
          {postData.map((detail, index) => (
            <div key={index} className="mb-10">
              <div className="flex flex-row mb-2 space-x-4">
                <div className="flex items-center">
                  <img
                    src={detail.image}
                    alt="profile"
                    className="h-10 w-10 rounded-full"
                  />
                  <h1 className="ml-2 mt-2 font-semibold text-base">User</h1>
                </div>

                <div className="flex-grow flex justify-end items-center">
                  <h1
                    className="text-2xl cursor-pointer hover:bg-gray-100 duration-300 rounded-full"
                    onClick={() => viewOpen(detail.id)}
                  >
                    <HiOutlineDotsHorizontal />
                  </h1>
                </div>
              </div>

              <img
                src={detail.image}
                alt="post"
                className="h-96 w-96 rounded-sm"
              ></img>
              <div className="mt-2 flex flex-row">
                <h1 className="text-2xl cursor-pointer">
                  <IoMdHeartEmpty />
                </h1>
                <h1 className="ml-2 text-2xl cursor-pointer">
                  <IoChatbubbleOutline />
                </h1>
                <h1 className="ml-2 text-2xl cursor-pointer">
                  <BsSend />
                </h1>
              </div>
              <h1 className="mt-1">100 likes</h1>
              <h1 className="mt-2">User {detail.Caption}</h1>
            </div>
          ))}
        </div>
      )}

      {open && (
        <PostView
          setOpen={setOpen}
          stopClose={stopClose}
          viewData={viewData}
          updateCaption={updateCaption}
          newCaption={newCaption}
          setNewCaption={setNewCaption}
          deletePost={deletePost}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default PostCard;
