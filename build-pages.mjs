import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "pages-dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(resolve(root, "pages-src"), output, { recursive: true });
await cp(resolve(root, "public", "policies"), resolve(output, "policies"), { recursive: true });
await cp(resolve(root, "public", "pink-rose-logo.png"), resolve(output, "pink-rose-logo.png"));
await cp(resolve(root, "public", "robots.txt"), resolve(output, "robots.txt"));
await cp(resolve(root, "public", "sitemap.xml"), resolve(output, "sitemap.xml"));
