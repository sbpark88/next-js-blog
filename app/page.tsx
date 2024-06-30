import styles from "./page.module.css";
import { getSortedPostsData } from "@/app/lib/post";

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <main>
      <section className={styles.headingMd}>
        <p>[SB Park Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${styles.headingMd} ${styles.padding1px}`}>
        <h2 className={styles.headingLg}>Blog</h2>
        <ul className={styles.list}>{allPostsData.map(PostCard)}</ul>
      </section>
    </main>
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
      <a>{title}</a>
      <br />
      <small className={styles.lightText}>{date}</small>
    </li>
  );
}
