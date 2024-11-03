import Link from "next/link";
import Head from "next/head";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Exam app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className="text-center md:mt-24 mx-auto md:w-3/5 lg:w-1/2">
        <h1>Tournamentz</h1>
      </main>
    </>
  );
}
