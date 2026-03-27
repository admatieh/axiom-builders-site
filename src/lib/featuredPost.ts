import BlogPost from "@/lib/models/BlogPost";

export async function makePostFeatured(postId: string) {
  await BlogPost.updateMany(
    { _id: { $ne: postId }, featured: true },
    { $set: { featured: false } }
  );

  await BlogPost.updateOne(
    { _id: postId, status: "published" },
    { $set: { featured: true } }
  );
}

export async function ensureFeaturedPublishedPost() {
  const currentFeatured = await BlogPost.findOne({
    status: "published",
    featured: true,
  })
    .select("_id")
    .lean();

  if (currentFeatured && !Array.isArray(currentFeatured)) {
    await BlogPost.updateMany(
      { _id: { $ne: currentFeatured._id }, featured: true },
      { $set: { featured: false } }
    );
    return String(currentFeatured._id);
  }

  const randomPublished = await BlogPost.aggregate([
    { $match: { status: "published" } },
    { $sample: { size: 1 } },
    { $project: { _id: 1 } },
  ]);

  if (!randomPublished.length) {
    return null;
  }

  const randomId = String(randomPublished[0]._id);
  await BlogPost.updateOne({ _id: randomId }, { $set: { featured: true } });

  return randomId;
}
