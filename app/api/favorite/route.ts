// Versi App Router
import { NextResponse } from "next/server";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

// ✅ Menangani penambahan favorit (POST)
export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { movieId } = body;

    if (!movieId) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      );
    }

    // Cek apakah movie ID valid
    const existingMovie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Pastikan favoriteIds adalah array
    const favoriteIds = currentUser.favoriteIds || [];

    // Jika film sudah ada di favorit, hentikan
    if (favoriteIds.includes(movieId)) {
      return NextResponse.json(
        { message: "Movie already in favorites" },
        { status: 200 }
      );
    }

    // Tambahkan movie ke daftar favorit user
    const user = await prismadb.user.update({
      where: { email: currentUser.email || "" },
      data: { favoriteIds: [...favoriteIds, movieId] },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// ✅ Menangani penghapusan favorit (DELETE)
export async function DELETE(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { movieId } = body;

    if (!movieId) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      );
    }

    // Cek apakah movie ID valid
    const existingMovie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Pastikan favoriteIds adalah array
    const favoriteIds = currentUser.favoriteIds || [];

    // Hapus movie dari daftar favorit user
    const updatedFavoriteIds = without(favoriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: { email: currentUser.email || "" },
      data: { favoriteIds: updatedFavoriteIds },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}



// Versi Page Router
// import { NextApiRequest, NextApiResponse } from "next";
// import { without } from "lodash";

// import prismadb from "@/lib/prismadb";
// import serverAuth from "@/lib/serverAuth";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "POST") {
//       const { currentUser } = await serverAuth(req, res);

//       const { movieId } = req.body;

//       const existingMovie = await prismadb.movie.findUnique({
//         where: {
//           id: movieId,
//         },
//       });

//       if (!existingMovie) {
//         throw new Error("Invalid ID");
//       }
      
//         const user = await prismadb.user.update({
//             where: {
//                 email: currentUser.email || '',
//             },
//             data: {
//                 favoriteIds: {
//                     push: movieId,
//                 }
//             }
//         });

//         return res.status(200).json(user);
//       }
      
//       if (req.method === "DELETE") {
//           const { currentUser } = await serverAuth(req , res);

//           const { movieId } = req.body;

//           const existingMovie = await prismadb.movie.findUnique({
//               where: {
//                   id: movieId,
//               }
//           });

//           if (!existingMovie) {
//               throw new Error('Invalid ID');
//           }

//           const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

//           const updatedUser = await prismadb.user.update({
//               where: {
//                   email: currentUser.email || '',
//               },
//               data: {
//                   favoriteIds: updatedFavoriteIds,
//               }
//           });

//           return res.status(200).json(updatedUser);
//       }
    
//       return res.status(405).end();
//   } catch (error) {
//     console.log(error);
//     return res.status(400).end();
//   }
// }
