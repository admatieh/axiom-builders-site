import dbConnect from "@/lib/mongodb";
import PageContent from "@/lib/models/PageContent";

/**
 * Fetch page content from MongoDB by slug, with a static fallback.
 * @param slug The page slug to look for in the database (e.g., "home", "about")
 * @param fallbackData The local static data to use if DB connection fails or page is missing
 * @returns The page data (either from DB or fallback)
 */
export async function getPageContent<T>(slug: string, fallbackData: T): Promise<T> {
  try {
    await dbConnect();
    const page = await PageContent.findOne({ slug }).lean() as any;
    
    if (page && page.sections) {
      return page.sections as T;
    }
    
    console.warn(`Page "${slug}" not found in DB, using fallback.`);
  } catch (error) {
    console.warn(`Failed to fetch page "${slug}" from DB, falling back to static data:`, error);
  }
  
  return fallbackData;
}
