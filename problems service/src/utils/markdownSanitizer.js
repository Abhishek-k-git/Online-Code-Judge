const marked = require("marked");
const sanitizeHtmlLib = require("sanitize-html");
const TurnDownService = require("turndown");

function markdownSanitizer(content) {
  const turnDownService = new TurnDownService();

  // convert markdown to html
  const convertedHtml = marked.parse(content);

  // sanitize html
  const sanitizedHtml = sanitizeHtmlLib(convertedHtml, {
    allowedTags: sanitizeHtmlLib.defaults.allowedTags.concat(["img"]),
  });

  // convert back to markdown
  const sanitizedMarkDown = turnDownService.turndown(sanitizedHtml);

  return sanitizedMarkDown;
}

module.exports = markdownSanitizer;
