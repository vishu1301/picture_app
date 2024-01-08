"use client";
import React, { useRef, useState } from "react";
import Navbar from "../Component/Navbar";
import { RiAddLine } from "react-icons/ri";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import "firebase/storage";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
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
const storage = getStorage(app);

function Page() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const filereader = new FileReader();

      filereader.onload = () => {
        setPreviewImage(filereader.result);
      };

      filereader.readAsDataURL(file);

      setSelectedFile(file);
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const savePost = async () => {
    try {
      if (selectedFile) {
        const postID = uuidv4();
        const storageRef = ref(storage, `posts/${postID}_${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);

        const imageUrl = await getDownloadURL(storageRef);

        const docRef = await addDoc(collection(db, "POSTS"), {
          uid: postID,
          image: imageUrl,
          Caption: caption,
          timestamp: new Date(),
        });

        console.log("Document added to Firestore successfully:", docRef.id);

        setPreviewImage("");
        setCaption("");
        setSelectedFile(null);

        toast.success("POSTED 🥳 ");
      } else {
        console.error("No file selected.");
        toast.error("Error posting. Please select an image and try again.");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Error posting. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <h1 className="font-bold text-3xl mt-10">New Post</h1>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <div>
          {!previewImage && (
            <>
              <input
                type="file"
                accept=".jpg, .png, .jpeg"
                onChange={handleImageChange}
                className="absolute w-40 h-40 mt-10 opacity-0 cursor-pointer"
              />
              <div className="border-4 border-gray-600 rounded-full p-4 text-center cursor-pointer">
                <RiAddLine className="w-20 h-20 mx-auto text-gray-600 cursor-pointer" />
              </div>
            </>
          )}
          {previewImage && (
            <img src={previewImage} alt="post" className="h-96 rounded-sm" />
          )}
        </div>
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={handleCaptionChange}
          className="bg-gray-200 mt-10 h-20 w-96 p-2 border-none outline-none"
        />
        <button
          onClick={savePost}
          className="mt-5 bg-blue-600 text-white px-4 py-2 text-xl rounded-xl shadow-lg hover:shadow-none ease-in duration-300"
        >
          Post
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Page;
