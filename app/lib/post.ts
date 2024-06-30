import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
