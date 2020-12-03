module.exports = {
  src: "./app/javascript",
  extensions: ["js", "jsx", "ts", "tsx"],
  schema: "./schema.graphql",
  language: "typescript",
  customScalars: {
    "ISO8601DateTime": "String",
    "ISO8601Date": "String"
  }
}