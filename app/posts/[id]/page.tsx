import styles from "@/app/page.module.css";
import { getPostData } from "@/app/lib/post";
import { notFound } from "next/navigation";
import { Metadata, ResolvedMetadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvedMetadata,
): Promise<Metadata> {
  const id = params.id;
  const postData = await Promise.resolve(getPostData(id));

  if (!postData) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: postData.title,
  };
}

export default async function Page({ params }: Props) {
  const id = params.id;
  const postData = await Promise.resolve(getPostData(id));
  if (!postData) {
    notFound();
  }

  return (
    <article>
      <h1 className={styles.headingXl}>{postData.title}</h1>
      <div className={styles.lightText}>{postData.date}</div>
      <div
        className={styles.listDecimal}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      ></div>
    </article>
  );
}
