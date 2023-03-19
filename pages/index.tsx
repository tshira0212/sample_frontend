import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <h1 className="title">
        Unit Test Sample
        </h1>


      <h1 className="title">
          <Link href="/SimpleNavPage" data-testid='nav-test'
         className='text-gray-300 hover:bg-gray-700 px-3 py-2 rounded'>
            1.SimpleNavTest
          </Link>
        </h1>

        <h1 className="title">
          <Link href="/GetStaticPropsPage" 
         className='text-gray-300 hover:bg-gray-700 px-3 py-2 rounded'>
            2.GetStaticPropsTest
          </Link>
        </h1>

        <h1 className="title">
          <Link href="/PropsPage" 
         className='text-gray-300 hover:bg-gray-700 px-3 py-2 rounded'>
            3.PropsTest
          </Link>
        </h1>

        <h1 className="title">
          <Link href="/SWRPage"
         className='text-gray-300 hover:bg-gray-700 px-3 py-2 rounded'>
            4.SWRTest
          </Link>
        </h1>


      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
