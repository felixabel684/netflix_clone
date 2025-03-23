// Versi App router
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
// import { getServerSession } from "next-auth"; // Jika pakai autentikasi

export async function GET() {
  try {
    await serverAuth(); // Tidak perlu req dan res di App Router
    // const session = await getServerSession(authOptions); // Jika pakai autentikasi
    // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const movies = await prismadb.movie.findMany();

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Versi Pages Router
// import { NextApiRequest, NextApiResponse } from "next";

// import prismadb from "@/lib/prismadb";

// import serverAuth from "@/lib/serverAuth";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'GET') {
//         return res.status(405).end();
//     }

//     try {
//         await serverAuth(req, res);

//         const movies = await prismadb.movie.findMany();

//         return res.status(200).json(movies);
//     } catch (error) {
//         console.log(error);
//         return res.status(400).end();
//     }
// }
