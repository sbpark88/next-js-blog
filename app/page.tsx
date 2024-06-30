import styles from "./page.module.css";
import { getSortedPostsData } from "@/app/lib/post";
import Link from "next/link";

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <section className={styles.headingMd}>
        <p>[SB Park Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${styles.headingMd} ${styles.padding1px}`}>
        <h2 className={styles.headingLg}>Blog</h2>
        <ul className={styles.list}>{allPostsData.map(PostCard)}</ul>
      </section>
    </>
  );
}

type PostProps = {
  id: string;
  title: string;
  date: string;
};

function PostCard({ id, title, date }: PostProps) {
  return (
    <li key={id} className={styles.listItem}>
      <Link href={`/posts/${id}`}>{title}</Link>
      <br />
      <small className={styles.lightText}>{date}</small>
    </li>
  );
}
