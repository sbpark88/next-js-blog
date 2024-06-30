import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const POSTS_DIRECTORY = path.join(process.cwd(), "/markdown");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const allPostsData = fileNames.map(parsePostData);
  return allPostsData.sort(ascendingByDate);
}

function parsePostData(fileName: string): {
  id: string;
  title: string;
  date: string;
} {
  const id = fileName.replace(/\.md$/, "");
  const fullPath = path.join(POSTS_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    id,
    ...(matterResult.data as { title: string; date: string }),
  };
}

function ascendingByDate<T extends { date: string }>(a: T, b: T) {
  return a.date < b.date ? 1 : -1;
}

function descendingByDate<T extends { date: string }>(a: T, b: T) {
  return a.date > b.date ? 1 : -1;
}

export async function getPostData(id: string) {
  const fileName = `${id}.md`;
  const fullPath = path.join(POSTS_DIRECTORY, fileName);
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const processedContent = await remark()
      .use(remarkHtml)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...(matterResult.data as { title: string; date: string }),
    };
  } catch (error) {
    console.error("File not found: ", error);
    return null;
  }
}
