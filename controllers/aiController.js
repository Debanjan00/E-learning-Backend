import client from "../config/ai.js";

export const askAI = async (
  req,
  res
) => {
  try {

    const { question } = req.body;

    const response =
      await client.chat.completions.create({

        model: "llama-3.1-8b-instant",

        messages: [

          // SYSTEM PROMPT
          {
            role: "system",

            content: `
You are an intelligent AI Tutor for an E-Learning platform helping students.

Your responsibilities:
- Explain concepts in simple beginner-friendly language
- Use short paragraphs with spacing
- Avoid giant text blocks
- Use headings and bullet points when useful
- Help students learn step-by-step
- Suggest courses based on student goals
- Recommend learning roadmap
- Suggest technologies and skills to learn next
- Help in interview preparation
- Help in coding problems
- Keep answers educational and motivating

Course Suggestion Rules:
- If a student mentions a career or skill,
  recommend related courses.

Examples:
- Web Development → HTML, CSS, JavaScript, React, Node.js
- AI/ML → Python, Machine Learning, Deep Learning
- Cyber Security → Networking, Linux, Ethical Hacking
- App Development → Java, Kotlin, Flutter

Answer Style:
Heading

Small readable paragraphs

Bullet points if useful

Course Suggestions section when relevant

Keep answers clean and visually readable.
`,
          },

          // USER QUESTION
          {
            role: "user",

            content: question,
          },
        ],
      });

    res.json({
      answer:
        response.choices[0].message.content,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};