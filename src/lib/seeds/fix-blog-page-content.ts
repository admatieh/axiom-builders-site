import * as dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

import PageContent from "../models/PageContent";
import { blogPageContent } from "../../data/blogPageContent";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function fixBlogPageContent() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("Error: MONGODB_URI is not defined in .env");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");

    const result = (await PageContent.findOneAndUpdate(
      { slug: "blog" },
      {
        $set: {
          title: "Blog",
          status: "published",
          sections: blogPageContent,
        },
      },
      { upsert: true, new: true, runValidators: true }
    ).lean()) as any;

    const page = Array.isArray(result) ? result[0] : result;

    console.log("✓ Fixed blog page content in PageContent");
    console.log(
      JSON.stringify(
        {
          slug: page?.slug,
          sectionsType: Array.isArray(page?.sections) ? "array" : typeof page?.sections,
          sectionKeys:
            page?.sections && !Array.isArray(page.sections)
              ? Object.keys(page.sections)
              : [],
        },
        null,
        2
      )
    );
  } catch (error) {
    console.error("Failed to fix blog page content:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

fixBlogPageContent();
