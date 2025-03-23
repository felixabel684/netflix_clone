// Versi App Router
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    await serverAuth(); // Autentikasi user

    const { movieId } = params;

    if (!movieId || typeof movieId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Cari film berdasarkan ID
    const movie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}



// Versi Page Router
// import { NextApiRequest, NextApiResponse } from "next";

// import prismadb from "@/lib/prismadb";
// import serverAuth from "@/lib/serverAuth";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "GET") {
//         return res.status(405).end();
//     }

//     try {
//         await serverAuth(req, res);

//         const { movieId } = req.query;

//         if (typeof movieId !== "string") {
//             throw new Error("Invalid ID");
//         }

//         if (!movieId) {
//             throw new Error("Invalid ID");
//         }

//         const movie = await prismadb.movie.findUnique({
//             where: {
//                 id: movieId
//             }
//         });

//         if (!movie) {
//             throw new Error("Movie not found");
//         }

//         return res.status(200).json(movie);
        
//     } catch (error) {
//         console.log(error);
//         return res.status(400).end();
//     }
// }