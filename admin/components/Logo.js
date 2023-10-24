import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href={"/"} className="flex gap-2">
      Orion
      <span className="">E-commerce admin</span>
    </Link>
  );
}

export default Logo;
