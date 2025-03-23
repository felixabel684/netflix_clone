// Versi App Router
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoriteMovies, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 400 }
    );
  }
}



// Versi Page Router
// import { NextApiRequest, NextApiResponse } from "next";

// import prismadb from "@/lib/prismadb"
// import serverAuth from "@/lib/serverAuth";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'GET') {
//         return res.status(405).end();
//     }

//     try {
//         const { currentUser } = await serverAuth(req, res);

//         const favoriteMovies = await prismadb.movie.findMany({
//             where: {
//                 id: {
//                     in: currentUser?.favoriteIds,
//                 }
//             }
//         });

//         return res.status(200).json(favoriteMovies);
//     } catch (error) {
//         console.log(error);
//         return res.status(400).end();
//     }
// }