const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Copy any static assets for the blog (images/css)
  eleventyConfig.addPassthroughCopy({"blog-src/assets": "assets"});

  // Collections: all posts
  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("blog-src/posts/*.md")
              .sort((a,b) => b.date - a.date)
  );

  return {
    dir: { 
      input: "blog-src", 
      output: "_site/blog", 
      includes: "_includes" 
    },
    templateFormats: ["md", "liquid", "njk", "html"]
  };
};