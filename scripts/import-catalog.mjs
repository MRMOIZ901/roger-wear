import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const ROOT = "K:/wetransfer_roger-data_2026-05-15_0537/Roger - Final";
const PUBLIC_DIR = "public/products";

const env = fs.readFileSync(".env.local", "utf-8");
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const key = env.match(/SUPABASE_SECRET_KEY=(.*)/)[1].trim();
const supabase = createClient(url, key);

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeBase(filenameNoExt) {
  // strip trailing copy markers
  if (/-\s*copy$/i.test(filenameNoExt)) return null;
  // strip trailing separators+digits e.g. "-2", "--5", "-6-", " 1"
  return filenameNoExt.replace(/[\s-]*\d+[\s-]*$/, "").trim();
}

function collectStyles(folder) {
  const files = fs.readdirSync(folder).filter((f) => f.toLowerCase().endsWith(".jpg"));
  const groups = new Map();

  for (const file of files) {
    const noExt = file.replace(/\.jpg$/i, "");
    const base = normalizeBase(noExt);
    if (!base) continue;
    if (!groups.has(base)) groups.set(base, []);
    groups.get(base).push(file);
  }

  // sort each group's files: the one with no trailing number first, then numerically
  for (const [base, list] of groups) {
    list.sort((a, b) => {
      const numA = parseInt((a.match(/(\d+)(?=\.jpg$)/i) || [])[1] || "0", 10);
      const numB = parseInt((b.match(/(\d+)(?=\.jpg$)/i) || [])[1] || "0", 10);
      return numA - numB;
    });
  }

  return groups;
}

const allStyles = [];

for (const color of ["Black", "Brown"]) {
  const folder = path.join(ROOT, color);
  const groups = collectStyles(folder);
  for (const [base, files] of groups) {
    allStyles.push({ color, base, files, folder });
  }
}

console.log(`Found ${allStyles.length} styles total.`);

const products = [];

for (const style of allStyles) {
  const slug = slugify(`${style.base}-${style.color}`);
  const destDir = path.join(PUBLIC_DIR, slug);
  fs.mkdirSync(destDir, { recursive: true });

  const images = [];
  style.files.forEach((file, i) => {
    const destName = `${i + 1}.jpg`;
    fs.copyFileSync(path.join(style.folder, file), path.join(destDir, destName));
    images.push(`/products/${slug}/${destName}`);
  });

  products.push({
    slug,
    name: `${style.base} (${style.color})`,
    price: 10000,
    description: `The ${style.base} is a premium ${style.color.toLowerCase()} leather shoe, hand-finished for comfort and built to last.`,
    features: [
      "Genuine leather upper",
      "Reinforced stitching",
      "Cushioned comfort sole",
      `${style.color} leather finish`,
    ],
    images,
    category: "men",
    sizes: [39, 40, 41, 42, 43, 44],
    in_stock: true,
  });
}

console.log(`Prepared ${products.length} products. Inserting into Supabase...`);

const { data, error } = await supabase
  .from("products")
  .upsert(products, { onConflict: "slug" })
  .select("slug");

if (error) {
  console.error("Insert error:", error);
  process.exit(1);
}

console.log(`Inserted/updated ${data.length} products.`);
