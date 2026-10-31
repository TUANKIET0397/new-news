# new-news

Daily tech radar for developers, published at 06:00 (Asia/Ho_Chi_Minh) every day.

Site: https://tuankiet0397.github.io/new-news/

## Structure

- `index.html`, `assets/` : static reader (no build step), renders Markdown with marked + DOMPurify
- `posts/YYYY-MM-DD.md` : one digest per day
- `posts/index.json` : list of digests `{ date, title, file, tags }`, newest first

## Adding a post manually

1. Create `posts/YYYY-MM-DD.md`
2. Prepend an entry to `posts/index.json`
3. Commit and push to `main`; GitHub Pages redeploys automatically
