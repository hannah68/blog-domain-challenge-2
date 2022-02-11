-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
