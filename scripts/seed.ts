import { NewCategories, insertCategory } from "@/lib/db";

async function main() {
  const defaultCategory: NewCategories = {
    category: "Personal",
    userId:"1"
  }
  const res = await insertCategory(defaultCategory);
  console.log("insert user success", res);
  process.exit();
}

main();