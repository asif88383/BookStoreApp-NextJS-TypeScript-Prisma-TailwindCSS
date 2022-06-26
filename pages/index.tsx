import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import {BsFillCloudLightningRainFill} from "react-icons/bs"

const Home: NextPage = (props) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookGenere, setBookGenere] = useState("");
  const [APIResponse, setAPIResponse] = useState(null);
  
  useEffect(() => {
    console.log("Book Title: ", bookTitle);
    console.log("Book Author: ", bookAuthor);
    console.log("Book Genere: ", bookGenere);
    console.log("API Res: ", APIResponse);
  },[bookTitle, bookAuthor, bookGenere])

  const readDB =async () => {
    try{
      const response = await fetch("/api/books", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setAPIResponse(await response.json());
      if (response.status !== 200) {
        console.log("something went wrong");
      } else {
        resetForm();
        console.log("read DB successfully !!!");
      }
    }catch(error){
      console.log("There was an error reading from DB: ", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { bookTitle, bookAuthor, bookGenere };
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        resetForm();
        readDB();
        console.log("form submitted successfully !!!");
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  const resetForm = () => {
    setBookTitle("");
    setBookAuthor("");
    setBookGenere("");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Book Store</title>
        <meta name="description" content="Book Store next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className="absolute flex justify-center flex-col items-center m-0 w-screen h-screen bg-no-repeat bg-cover 
        bg-[url('https://images.unsplash.com/photo-1438382458652-54431bf59e01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80')]"
      >
        <div className="flex justify-center items-center w-screen h-screen bg-opacity-90 bg-slate-700 shadow-lg z-50">
          <div className="absolute h-3/4 w-3/4 bg-white flex flex-row xl:flex-row lg:flex-row md:flex-col sm:flex-col max-w-5xl">
            {/* Left Side Logo  */}
            <div
              className="xl:w-1/3 lg:w-1/3 md:h-1/3 sm:h-1/3 xl:h-full lg:h-full md:w-full sm:w-full flex flex-col gap-5 items-center justify-center text-white"
              style={{ backgroundColor: "#414770" }}
            >
              <motion.span
                variants={{
                  hidden: {
                    opacity: 1,
                  },
                  visible: {
                    y: [25, -25],
                    color: "#DCE1E9",
                    transition: {
                      y: {
                        yoyo: Infinity,
                        duration: 1.5,
                        delay: 1.5,
                        ease: "easeOut",
                      },
                    },
                  },
                  removed: {
                    opacity: 1,
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                <BsFillCloudLightningRainFill className="w-32 h-32" />
              </motion.span>
              <h1
                id="logoFont"
                className="text-3xl font-bold drop-shadow-2xl tracking-wider"
              >
                Book Store
              </h1>
            </div>

            {/* Add Book Card  */}
            <div className="xl:w-2/3 lg:w-2/3 md:h-2/3 sm:h-2/3 xl:h-full lg:h-full md:w-full sm:w-full bg-slate-200 flex justify-center items-center">
              <AnimatePresence initial={false}>
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 1,
                    },
                    visible: {
                      x: isAnimating ? [0, 25, -25, 25, -25, 0] : 0,
                      transition: {
                        y: {
                          // yoyo: Infinity,
                          duration: 1.5,
                          ease: "easeOut",
                        },
                      },
                    },
                    removed: {
                      opacity: 1,
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="removed"
                  className="w-3/5"
                >
                  <AnimatePresence>
                    <motion.div
                      animate={{
                        // x: [0, 0, 0, -100, -100, 100, 100, 0],
                        // rotate: [0, 45, -45, 45, -45, 0],
                        rotate: 360,
                      }}
                      initial={{
                        opacity: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 50,
                        duration: 1.5,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                    >
                      {/* add book to bookstore code  */}
                      <div
                        id="bookstore"
                        className="flex justify-center items-center flex-col bg-white shadow-lg max-w-max"
                      >
                        <div className="flex items-start p-8 flex-col">
                          <div className="mt-10 mb-5 flex gap-3 flex-col">
                            <h2 className="text-xs text-slate-400">
                              Welcom to Book Store
                            </h2>
                            <h1
                              className="text-2xl text-slate-600 font-semibold"
                              id="logoFont"
                            >
                              Add Book details here...
                            </h1>
                          </div>

                          <form
                            onSubmit={(e)=>handleSubmit(e)}
                            method="POST"
                            className="flex flex-col items-start gap-5 mb-5"
                          >
                            {/* place code here */}
                            <div className="flex flex-col gap-3 w-full justify-center">
                              <div className="flex flex-col gap-2">
                                <label
                                  htmlFor="book-title"
                                  className="text-xs text-slate-500"
                                >
                                  Book title:
                                </label>
                                <input
                                  id="book-title"
                                  name="book-title"
                                  type="text"
                                  onChange={(e) => setBookTitle(e.target.value)}
                                  className={`w-72 h-7 pl-2 border-2 rounded-sm text-md z-12 focus:outline-none`}
                                />
                                <label
                                  htmlFor="author-name"
                                  className="text-xs text-slate-500"
                                >
                                  Author name:
                                </label>
                                <input
                                  id="author-name"
                                  name="author-name"
                                  type="text"
                                  onChange={(e) =>
                                    setBookAuthor(e.target.value)
                                  }
                                  className={`w-72 h-7 pl-2 border-2 rounded-sm text-md z-12 focus:outline-none`}
                                />
                                <label
                                  htmlFor="genere"
                                  className="text-xs text-slate-500"
                                >
                                  Genere:
                                </label>
                                <input
                                  id="genere"
                                  name="genere"
                                  type="text"
                                  onChange={(e) =>
                                    setBookGenere(e.target.value)
                                  }
                                  className={`w-72 h-7 pl-2 border-2 rounded-sm text-md z-12 focus:outline-none`}
                                />
                              </div>
                            </div>

                            <div className="flex flex-row gap-2 items-center">
                              <button
                                type="submit"
                                className={`rounded-sm text-white pl-2 pr-2 pt-1 pb-1 text-sm `}
                                style={{ backgroundColor: "#5B85AA" }}
                              >
                                Add Book
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home
