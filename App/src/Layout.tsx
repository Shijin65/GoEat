import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { PulseLoader } from "react-spinners";

type Props = {
  children: React.ReactNode;
  hero?: boolean;
  loader?: boolean;
};
const Layout = ({ children, hero = false, loader = false }: Props) => {
  const [loading, setLoading] = useState(true); // State to track loading status
  useEffect(() => {
    // Simulating a delay of 2 seconds before setting loading to false
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {loading && loader ? ( // Conditional rendering for loading spinner

        <div className="flex flex-col  gap-4 justify-center h-screen items-center text-2xl text-gray-600  font-serif animate-pulse">
          <PulseLoader size={5} speedMultiplier={.5}/>
          <h1>
            <span className="font-bold text-4xl">G</span>o
            <span className="font-bold  text-4xl">E</span>at
          </h1><PulseLoader size={5} speedMultiplier={.5}/>
        </div>
      ) : (
        <>
          <Header />
          {hero ? <Hero /> : ""}
          <div className="container mx-auto flex-1 py-10">{children}</div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;
