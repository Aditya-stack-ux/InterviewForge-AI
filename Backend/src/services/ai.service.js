const Groq = require("groq-sdk");
const puppeteer = require("puppeteer-core")
const chromium = require("@sparticuz/chromium")

const groq = new Groq({
  apiKey: process.env.GROQ_API
});

const interviewReportSchema = {
  type: "json_schema",
  json_schema: {
    name: "interview_report",
    strict: true,
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "The title of the job role based on the job description"
        },
        matchScore: {
          type: "number",
          description: "A score between 0 and 100 indicating how well the candidate matches the job"
        },

        technicalQuestions: {
          type: "array",
          description: "MUST contain at least 4 technical questions",
          minItems: 4,
          items: {
            type: "object",
            properties: {
              question: { type: "string" },
              intention: { type: "string" },
              answer: { type: "string" }
            },
            required: ["question", "intention", "answer"],
            additionalProperties: false
          }
        },

        behavioralQuestions: {
          type: "array",
          description: "MUST contain at least 4 behavioral questions",
          minItems: 4,
          items: {
            type: "object",
            properties: {
              question: { type: "string" },
              intention: { type: "string" },
              answer: { type: "string" }
            },
            required: ["question", "intention", "answer"],
            additionalProperties: false
          }
        },

        skillGaps: {
          type: "array",
          items: {
            type: "object",
            properties: {
              skill: { type: "string" },
              severity: {
                type: "string",
                enum: ["low", "medium", "high"]
              }
            },
            required: ["skill", "severity"],
            additionalProperties: false
          }
        },

        preparationPlan: {
          type: "array",
          description: "MUST contain exactly 7 days of preparation, day 1 to day 7",
          minItems: 7,
          items: {
            type: "object",
            properties: {
              day: { type: "number" },
              focus: { type: "string" },
              tasks: {
                type: "array",
                minItems: 3,
                description: "MUST contain at least 3 tasks per day",
                items: { type: "string" }
              }
            },
            required: ["day", "focus", "tasks"],
            additionalProperties: false
          }
        }
      },

      required: [
        "title",
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan"
      ],

      additionalProperties: false
    }
  }
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) { 

  const prompt = `
Generate an interview report using the following candidate information.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const MAX_RETRIES = 3

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: `
You generate structured interview reports.
The output MUST be valid JSON matching the schema exactly.
The JSON must include these fields:
- matchScore
- technicalQuestions
- behavioralQuestions
- skillGaps
- preparationPlan
Each section must contain meaningful data.
Do not omit any fields.
Return ONLY JSON.
`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: interviewReportSchema
      })

      const result = JSON.parse(response.choices[0].message.content || "{}")

      // ✅ validate result has required fields before returning
      if (
        result.matchScore &&
        result.technicalQuestions &&
        result.behavioralQuestions &&
        result.skillGaps &&
        result.preparationPlan
      ) {
        console.log(`✅ Success on attempt ${attempt}`)
        return result
      }

      console.log(`⚠️ Attempt ${attempt} returned incomplete data, retrying...`)

    } catch (err) {
      console.log(`❌ Attempt ${attempt} failed:`, err.message)
      if (attempt === MAX_RETRIES) throw err  // throw after last attempt
    }
  }

  throw new Error("Failed to generate valid report after 3 attempts")
}

async function generatePdfFromHtml(htmlContent) {
  let browser = null;

  try {
    const isDev = process.env.NODE_ENV === "development";

    browser = await puppeteer.launch(
      isDev
        ? {
            // Local: uses your machine's Chrome
            channel: "chrome",
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          }
        : {
            // Render: uses bundled Chromium binary
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
          }
    );

    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
    });

    return pdfBuffer;

  } finally {
    if (browser) await browser.close();
  }
}

async function generateResumePdf({resume, selfDescription, jobDescription}){
const prompt = `
You are an expert resume writer and HTML designer.

Using the information below, generate a clean and professional resume in HTML format optimized for Puppeteer PDF generation.

Candidate Resume Information:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}

Design Instructions:
- Use a clean single-column layout suitable for A4 PDF.
- Use simple CSS inside a <style> tag.
- Use professional fonts such as Arial, Helvetica, or system-ui.
- Use subtle professional colors (not flashy).

Recommended color palette:
- Main text: #333333
- Headings: #1f2937
- Accent color for section titles or lines: #85aafa
- Light divider/borders: #e5e7eb
- Background: white

Layout Rules:
- Center the resume with max-width around 800px.
- Use clear section headings.
- Add spacing between sections.
- Use bullet points for experience and skills.

Sections:
Header (Name / Title / Contact)
Professional Summary
Skills
Work Experience
Projects
Education

Technical Rules:
- No external CSS, images, or frameworks.
- Avoid complex positioning.
- Ensure content fits well for PDF printing.

Output Rules:
- Return only valid HTML.
- Start with <html> and end with </html>.
`; 

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content: `
Generate a clean HTML resume string.

Rules:
- Use simple inline CSS.
- Avoid curly braces mistakes.
- Return only valid HTML in the "html" field.
`
      },
      {
        role: "user",
        content: prompt
      }
    ]
  }) 

  const html = (response.choices[0].message.content || "{}")
  const pdfBuffer = await generatePdfFromHtml(html)
 
  return pdfBuffer
}




module.exports = {generateInterviewReport,generateResumePdf};   