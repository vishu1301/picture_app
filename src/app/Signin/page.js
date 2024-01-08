"use client";
import Link from "next/link";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toast";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";

const firebaseConfig = {
  apiKey: "AIzaSyCpswnWms1sv02KTeui94V601EmOW8jAT8",
  authDomain: "pictureupload-5336c.firebaseapp.com",
  projectId: "pictureupload-5336c",
  storageBucket: "pictureupload-5336c.appspot.com",
  messagingSenderId: "1011165651701",
  appId: "1:1011165651701:web:eaeb637815b3426dd09bbc",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function page() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignin = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredentials.user, {
        displayName: userName,
      });

      await addDoc(collection(db, "Users"), {
        User_Id: userCredentials.user.uid,
        user_name: userName,
        Full_Name: fullName,
      });

      router.push("/");
      setEmail("");
      setFullName("");
      setPassword("");
      setUserName("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center justify-center bg-white  max-w-80  p-4 py-10 m-5 border-2 mt-10">
          <div className="flex flex-col">
            <img
              src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Black-Logo.wine.svg"
              alt="instagram"
              className="h-40"
            ></img>
            <div>
              <input
                type="text"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 border border-gray-300 pr-10 pl-1 py-1 rounded-md focus:outline-gray-400"
              />
            </div>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Full name"
                onChange={(e) => setFullName(e.target.value)}
                className="bg-gray-100 border border-gray-300 pr-10 pl-1 py-1 rounded-md focus:outline-gray-400"
              />
            </div>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                className="bg-gray-100 border border-gray-300 pr-10 pl-1 py-1 rounded-md focus:outline-gray-400"
              />
            </div>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 border border-gray-300 pr-10 pl-1 py-1 rounded-md focus:outline-gray-400"
              />
            </div>
            <div className="mt-5">
              <button
                onClick={handleSignin}
                className="bg-sky-500 w-full rounded-lg p-1 text-white text-lg hover:bg-blue-600 duration-300 ease-in"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white  max-w-80 py-10 p-5   border-2 mt-1">
          <h1>Already Have an Account ?</h1>
          <Link href="/" className="ml-2 text-blue-600 font-semibold">
            Log in
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default page;
