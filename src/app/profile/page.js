"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log(user);

  return (
    <div>
      <Navbar />
      <div className="flex md:flex-row flex-wrap items-center">
        <div className="w-full md:w-1/4 p-4 text-center">
          <div className="w-full relative md:w-3/4 text-center mt-8">
            <img
              className="h-40 w-40 rounded-full"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              alt="user"
            />
          </div>
        </div>
        <div className="w-full md:w-3/4 p-4 text-center">
          <div className="text-left pl-4 pt-3">
            {user && (
              <span className="text-base text-gray-700 text-2xl mr-2">
                {user.displayName}
              </span>
            )}
            <span className="text-base font-semibold text-gray-700 mr-2">
              <button className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                Edit Profile
              </button>
            </span>
          </div>

          <div className="text-left pl-4 pt-3">
            <span className="text-base font-semibold text-gray-700 mr-2">
              <b>65</b> posts
            </span>
            <span className="text-base font-semibold text-gray-700 mr-2">
              <b>247</b> followers
            </span>
            <span className="text-base font-semibold text-gray-700">
              <b>241</b> following
            </span>
          </div>

          <div className="text-left pl-4 pt-3">
            <span className="text-lg font-bold text-gray-700 mr-2">
              Sonali Hirave
            </span>
          </div>

          <div className="text-left pl-4 pt-3">
            <p className="text-base font-medium text-blue-700 mr-2">
              #graphicsdesigner #traveller #reader #blogger #digitalmarketer
            </p>
            <p className="text-base font-medium text-gray-700 mr-2">
              https://www.behance.net/hiravesona7855
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
