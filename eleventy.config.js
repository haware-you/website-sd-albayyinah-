export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Build a URL for the given language: "id" lives at the root, "en" under /en/.
  eleventyConfig.addFilter("langUrl", (path, lang) => (lang === "en" ? "/en" + path : path));

  // Swap the language prefix of the current page URL (used by the ID/EN switch).
  eleventyConfig.addFilter("otherLangUrl", (url, lang) =>
    lang === "en" ? url.replace(/^\/en/, "") || "/" : "/en" + url
  );

  // Previous / next page within the same menu section, for the links at the bottom of a page.
  eleventyConfig.addFilter("sectionNeighbors", (nav, url, lang) => {
    const toUrl = (u) => (lang === "en" ? "/en" + u : u);
    for (const item of nav) {
      const kids = item.children || [];
      const i = kids.findIndex((c) => toUrl(c.url) === url);
      if (i === -1) continue;
      const pick = (c) => c && { url: toUrl(c.url), title: c.label[lang] };
      return { prev: pick(kids[i - 1]), next: pick(kids[i + 1]) };
    }
    return { prev: null, next: null };
  });

  return {
    dir: { input: "src", output: "_site" },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
  };
}
