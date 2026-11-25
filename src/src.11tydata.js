// Defaults for every page: each template is built twice, once per language.
// Indonesian is served at the root, English under /en/. A page sets `slug` (e.g. "/ppdb/")
// and its text in `copy.id` / `copy.en`.
export default {
  layout: "layouts/base.njk",
  pagination: { data: "site.langs", size: 1, alias: "lang" },
  permalink: (data) => `${data.lang === "en" ? "/en" : ""}${data.slug}index.html`,
  eleventyComputed: {
    c: (data) => data.copy?.[data.lang] ?? {},
    title: (data) => data.copy?.[data.lang]?.title,
    description: (data) => data.copy?.[data.lang]?.description,
  },
};
