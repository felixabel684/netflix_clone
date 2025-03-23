import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);
  // const session = await getServerSession(req, res, authOptions); // Versi Page Router

  if (!session?.user?.email) {
    throw new Error("Not Signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  return { currentUser };
};

export default serverAuth;  