// Versi App Router
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
  try {
    await serverAuth();

    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0]);
  } catch (error) {
    console.error("Error fetching random movie:", error);
    return new NextResponse("Error fetching random movie", { status: 500 });
  }
}



// Versi Pages Router
// import { NextApiRequest, NextApiResponse } from "next";

// import prismadb from "@/lib/prismadb";

// import serverAuth from "@/lib/serverAuth";

// const default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'GET') {
//         return res.status(405).end();
//     }

//     try {
//         await serverAuth(req, res);

//         const movieCount = await prismadb.movie.count();
//         const randomIndex = Math.floor(Math.random() * movieCount);

//         const randomMovies = await prismadb.movie.findMany({
//             take: 1,
//             skip: randomIndex
//         });

//         return res.status(200).json(randomMovies[0]);
//     } catch (error) {
//         console.log(error);
//         return res.status(400).end();
//     }
// }
