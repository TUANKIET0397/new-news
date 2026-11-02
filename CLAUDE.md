# Hướng dẫn viết bản tin Tech Radar

File này bổ sung cho prompt của routine hằng ngày. Mỗi bài trong `posts/` phải có thêm hai section bắt buộc dưới đây, đặt sau "## Góc học sâu" và trước "## Nguồn".

## AI hôm nay (bắt buộc)
- 1-3 tin về xu hướng AI cho developer trong 24-72 giờ qua: model mới (Claude, Gemini, ChatGPT/GPT, model open-weight), tính năng API, AI coding tool (Claude Code, Cursor, Copilot, Codex, Gemini CLI...), chuẩn mở (MCP, Agent Skills, AGENTS.md).
- Chỉ dùng tin xác minh được từ trang chính thức (anthropic.com/news, openai.com/news, blog.google, github.blog/changelog, docs chính thức). Trang tổng hợp ghi tên model mâu thuẫn thì không dùng. Nếu không truy cập được nguồn chính thức của một vendor, ghi rõ điều đó thay vì đoán.
- Mỗi tin nêu: nó là gì, áp dụng vào công việc backend/fullstack thế nào, link nguồn.
- Không lặp tin đã đăng ở các ngày trước, trừ khi có cập nhật mới.

## Tối ưu dùng AI (bắt buộc, mỗi ngày một chủ đề khác)
- Mở đầu bằng `### Chủ đề hôm nay: <tên chủ đề>`.
- Một kỹ thuật cụ thể để dùng AI hiệu quả hơn khi lập trình, kèm cách áp dụng ngay: ví dụ prompt hoặc template trong code block, quy trình từng bước, hoặc checklist.
- Ưu tiên nội dung từ tài liệu chính thức (Claude docs prompting best practices, OpenAI prompting guide, Gemini prompting strategies, Claude Code best practices) và ghi nguồn.
- Kết thúc bằng `### Áp dụng ngay hôm nay`: một việc cụ thể làm được trong 15 phút.
- Xoay vòng chủ đề, kiểm tra các bài cũ để không trùng. Gợi ý danh sách:
  1. Prompt cho coding agent: rõ ràng, lý do, ví dụ, tách khối, động từ hành động
  2. Quy trình khám phá, plan, làm, kiểm chứng
  3. Viết CLAUDE.md / AGENTS.md hiệu quả
  4. Context engineering: đưa đúng file, bớt ngữ cảnh thừa
  5. Chọn model theo độ khó và chi phí, router model trong backend
  6. Prompt để debug: cung cấp log, repro, giả thuyết
  7. Dùng AI viết test và review code
  8. Structured output và JSON schema khi gọi API
  9. Prompt caching và giảm chi phí token
  10. Tool use / function calling và thiết kế tool cho agent
  11. Subagent và chia nhỏ task dài
  12. Viết spec/PRD ngắn trước khi giao cho agent
  13. Eval: đo chất lượng prompt bằng bộ test nhỏ
  14. Agent Skills và MCP server cho workflow của team
  15. So sánh cách prompt hiệu quả giữa Claude, Gemini, ChatGPT
  16. Bảo mật khi dùng AI: prompt injection, không lộ secret

## Quy ước chung
- Tiếng Việt, giữ thuật ngữ kỹ thuật tiếng Anh, không emoji, không dấu gạch ngang dài.
- Chỉ dùng Markdown cơ bản mà `assets/md.js` hỗ trợ.
- Thêm tag `ai` và `prompting` vào `posts/index.json` cho mỗi bài.
