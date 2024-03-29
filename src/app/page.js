"use client";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginHandler = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem("UID", userCredentials.user.uid);
      router.push("/profile");
      toast.success("Logged In 🥳");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("UID");
    if (loggedIn) {
      router.push("/Home");
    }
  }, []);

  return (
    <>
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
                placeholder="E-mail address"
                onChange={(e) => setEmail(e.target.value)}
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
                onClick={loginHandler}
                className="bg-sky-500 w-full rounded-lg p-1 text-white text-lg hover:bg-blue-600 duration-300 ease-in"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white  max-w-80 py-10 p-5   border-2 mt-1">
          <h1>Don't Have an Account ?</h1>
          <Link href="/Signin" className="ml-2 text-blue-600 font-semibold">
            Sign in
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
