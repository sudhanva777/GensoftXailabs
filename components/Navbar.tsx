import { getCurrentSession } from "@/lib/auth-helpers";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const session = await getCurrentSession();
  return <NavbarClient session={session} />;
}

