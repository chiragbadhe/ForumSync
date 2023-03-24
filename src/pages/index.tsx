import Head from "next/head";
import Image from "next/image";
import UniswapForum from "@/components/UniswapForum";

export default function Home() {
  return (
    <>
      <main>
        <div>
          <UniswapForum />
        </div>
      </main>
    </>
  );
}
