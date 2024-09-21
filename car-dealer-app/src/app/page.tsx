/* eslint-disable @typescript-eslint/no-unused-vars */
import { Filter } from "@/components/FilterPage/Filter";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-[calc(100vh-70px)] w-screen flex justify-center items-center">
      <Filter />
    </main>
  );
}
