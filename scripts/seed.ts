import { NewCategories, insertCategory } from "@/lib/db";

async function main() {
  const defaultCategory: NewCategories = {
    category: "Personal"
  }
  const res = await insertCategory(defaultCategory);
  console.log("insert user success", res);
  process.exit();
}

main();