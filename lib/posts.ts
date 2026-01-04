import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    console.log("POSTS DIR:", postsDirectory);
console.log("FILES:", fs.readdirSync(postsDirectory));

    const { data, content } = matter(fileContents);

    return {
      slug,
      headline: data.title,
      subheadline: data.excerpt ?? "",
      author: data.author ?? "Unknown",
      date: data.date ?? "",
      category: data.category ?? "General",
      featured: data.featured ?? false,
      contentText: content,
    };
  });
}


export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const contentHtml = await remark().use(html).process(content);

return {
  slug,
  headline: data.title,
  subheadline: data.subheadline ?? "",
  author: data.author ?? "Unknown",
  date: data.date ?? "",
  category: data.category ?? "General",
  featured: data.featured ?? false,
  tags: data.tags ?? [],
  contentText: contentHtml.toString(),
};

}

