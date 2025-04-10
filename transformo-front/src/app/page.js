'use client'
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-screen overflow-hidden">
        <div className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply h-full">
          <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
            <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
              Transformo Docs: Effortless Document Management with AI-Powered OCR Extraction
            </h1>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
              <Link href={'/pages/regi'} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
              </Link>
              <Link href={'/pages/regi'} className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
