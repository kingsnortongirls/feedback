# KNGS Computer Science | Assessment Feedback

A collection of student-friendly assessment feedback pages for **Kings Norton Girls’ School (KNGS)** Computer Science.

The aim is to help pupils understand their assessment performance, celebrate what they have done well and take meaningful next steps to improve.

## What the site does

- **Personalised feedback:** pupils enter or select their own marks or results to generate feedback relevant to their performance.
- **WWW (What Went Well):** highlights strengths and successful knowledge or skills.
- **HTI (How To Improve):** identifies specific areas for development, with targeted follow-up tasks.
- **Student independence:** teachers do not need to enter each pupil's marks.
- **Print-friendly output:** feedback is designed to fit on **one side of A4** when printed, or to be saved as a PDF.
- **Simple access:** web pages can be shared through GitHub Pages without requiring pupils to install an app.

> **Feedback language:** This project uses **WWW** and **HTI**, not EBI.

## Available assessments

| Year | Assessment | Page |
| --- | --- | --- |
| Year 7 | Units 1 and 2 | [`y7/y7u1and2feedback.html`](y7/y7u1and2feedback.html) |

Additional year groups and assessments can be added as separate pages.

## How pupils use a feedback page

1. Open the assessment link provided by the teacher.
2. Enter or select the marks/results for their questions.
3. Review their personalised **WWW** and **HTI** feedback.
4. Complete the suggested improvement activities.
5. Print the feedback on one side of A4, or save it as a PDF, if required.

## Repository structure

```text
feedback/
├── README.md
└── y7/
    └── y7u1and2feedback.html
```

As the site grows, new folders can be added for other year groups, for example `y8/`, `y9/`, `y10/` and `y11/`.

## Publishing with GitHub Pages

This repository is intended to be published as a static site using **GitHub Pages**.

1. In the GitHub repository, open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose the publishing branch (usually `main`) and the root (`/`) folder.
4. Save the settings.

The published address normally follows this pattern:

```text
https://YOUR-USERNAME.github.io/feedback/
```

For the Year 7 Units 1 and 2 page, use:

```text
https://YOUR-USERNAME.github.io/feedback/y7/y7u1and2feedback.html
```

Replace `YOUR-USERNAME` with the repository owner's GitHub username. If the repository is owned by an organisation, use its name instead.

**Note:** GitHub Pages can serve HTML files inside subfolders. A homepage at the site root is optional; until one is added, link pupils directly to their assessment page.

## Adding a new assessment

1. Create or open the folder for the relevant year group.
2. Add a clearly named HTML file, for example `y8/y8u1and2feedback.html`.
3. Match feedback and improvement activities to the assessment's content and marking criteria.
4. Keep the student workflow straightforward: pupils input their own results and receive clear WWW and HTI feedback.
5. Test the page on desktop, tablet and mobile browsers.
6. Check **Print Preview** at A4 size, ensuring the feedback fits on one page without clipped content.
7. Add the new page to the **Available assessments** table above.

## Design principles

The feedback pages should be:

- **Clear:** straightforward language, readable text and accessible controls.
- **Actionable:** improvement tasks should tell pupils what to practise, not simply what they got wrong.
- **Positive and honest:** recognise success without hiding areas that need further work.
- **Accessible:** usable on typical school devices and with a keyboard where possible.
- **Printer-friendly:** screen controls and decorative elements should not crowd the A4 printout.
- **Privacy-conscious:** avoid collecting names or other personal information unless there is a defined need and an approved approach to handling it.

## Technology

The site uses static HTML pages hosted through GitHub Pages. Individual assessment pages may also use CSS and JavaScript for their interactive feedback features. No server-side application is required for the described workflow.

## Maintenance

Assessment criteria and feedback tasks should be checked whenever an exam paper, mark scheme or scheme of work changes. Before sharing an updated page with pupils, test both the on-screen experience and the final printed/PDF output.

---

**Kings Norton Girls’ School | Computer Science**

*Helping pupils recognise success and know how to improve.*
