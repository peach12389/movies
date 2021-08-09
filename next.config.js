const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "https://ik.imagekit.io/katch/",
  },
});
