// Versi App Router
"use client";

import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
// import useCurrentUser from "@/hooks/useCurrentUser";
import { useSession } from "next-auth/react";

export default function Home() {
  // const { data: user } = useCurrentUser();
  const { data: session, status } = useSession();

  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  // console.log("Movies:", movies); // 🔍 Debuggin

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    // Redirect to /auth manually (karena di App Router tidak ada getServerSideProps)
    if (typeof window !== "undefined") {
      window.location.href = "/auth";
    }
    return null;
  }

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}



// versi pages router

// import { NextPageContext } from "next";
// import { getSession, signOut } from "next-auth/react";

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }

// export default function Home() {
//   // const { data: user} = useCurrentUser();
//   return (
//     <>
//       <Navbar />
//       {/* <h1 className="text-4xl text-green-500">Netflix Clone</h1>
//       <p className="text-white">Logged in as : {user?.email}</p>
//       <button className="h-10 w-full bg-white" onClick={() => signOut()}>Logout</button> */}
//     </>
//   )
// }