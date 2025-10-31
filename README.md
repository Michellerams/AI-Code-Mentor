# 🧠 AI Code Generation & Explanation Tool

The **AI Code Generation & Explanation Tool** is a React-based web prototype designed to demonstrate client-side integration with the **Google Gemini API**. It allows users to generate, analyze, and explain code in real time using Gemini’s multimodal capabilities, while emphasizing transparency, privacy, and ethical responsibility.
<img width="1540" height="727" alt="AICodeMentor" src="https://github.com/user-attachments/assets/0974fd79-4603-448d-b007-2a57e722de38" />

---

## 🧭 User Flow Diagram

1. User lands on the web application  
2. Enters a **prompt** or **code snippet** into the input field  
3. Selects a **tool type** (Code Generator or Code Explainer)  
4. Chooses a **programming language** (for generation tasks)  
5. Clicks “Generate”  
6. Application sends a request to the **Google Gemini API**  
7. Results stream back and display in real-time  
8. The user’s generation history is stored locally in their browser  

---

## ⚙️ API Connections & Dependencies

- **Primary API:** Google Gemini API via the `@google/genai` library  
- **Model Used:** `gemini-2.5-flash` — optimized for balanced speed and capability in both text and code tasks  
- **Frontend Framework:** React with TypeScript for a robust, component-driven interface  
- **Styling:** TailwindCSS for a responsive, utility-first styling approach  
- **Data Storage:** Browser `localStorage` for persisting user generation history (no external database or backend)  

---

## ⚖️ Potential Bias Sources in Training Data

The Gemini models are trained on vast public datasets that may reflect **societal and cultural biases**. These biases can appear in generated text or code outputs — for example, favoring certain programming languages or conventional patterns.

**Mitigation Strategies:**
- Encourage users to critically evaluate all generated content for **fairness, inclusivity, and accuracy**.  
- Position the tool as a **collaborative assistant**, not an absolute authority.  
- Collaborate with model providers and researchers to improve bias detection and mitigation over time.  

---

## 🔒 Privacy Implications & Mitigations

When generating content, user input (prompt, tool type, and language) is sent to the **Google Gemini API** for processing. This web app itself is **serverless** — all data remains within the user’s browser.

**Mitigation Guidelines:**
- Avoid inputting sensitive or proprietary information.  
- No data is stored externally; all history is saved locally in `localStorage`.  
- For further details on how data is handled by Google, visit the [Google Privacy Policy](https://policies.google.com/privacy).  

---

## ♿ Accessibility Considerations

Accessibility is built into the core design of this tool to support inclusive user experiences:

- ✅ **Semantic HTML:** Proper use of elements for structure and meaning  
- ⌨️ **Keyboard Navigation:** Full keyboard accessibility for all interactive components  
- 🦻 **ARIA Attributes:** Contextual labels and roles for screen reader support  
- 🎨 **Color Contrast:** Meets WCAG AA standards for readability  
- 🔁 **Focus Management:** Logical tab order and controlled focus trapping within modals  

---

## 🌍 Environmental Impact Assessment

AI models require substantial computational resources during both training and inference. This prototype acknowledges its **environmental footprint** and aims to minimize it where possible.

**Mitigation Efforts:**
- Utilizes **`gemini-2.5-flash`**, a model optimized for efficiency and low latency  
- Deployed on **Google Cloud**, which maintains a commitment to **carbon neutrality and energy efficiency**  
- For transparency, refer to [Google Data Center Efficiency Reports](https://www.google.com/about/datacenters/efficiency/)  

---

## ⚠️ Potential Unintended Consequences

While designed as an assistive tool, AI-powered systems introduce certain risks and dependencies:

- 🧩 **Over-Reliance:** Developers might depend too heavily on generated suggestions, reducing independent problem-solving.  
- 🛡️ **Security Vulnerabilities:** Generated code is not guaranteed to be secure — hidden flaws or unsafe patterns may exist.  
- 🪞 **Propagation of Errors:** Models may replicate poor coding practices found in training data.  

**Recommendation:**  
Treat AI-generated output as a **starting point**, not a final product. Always **review, understand, test, and verify** code before integrating it into production systems.  

---

## 🧰 Tech Stack Summary

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | React (TypeScript) |
| **AI Model** | Google Gemini 2.5 Flash |
| **API SDK** | @google/genai |
| **Styling** | Tailwind CSS |
| **Storage** | Browser localStorage |
| **Architecture** | Client-Side SPA (No Backend) |

---

## 🧑‍💻 Author

**Michelle Rammila**  
