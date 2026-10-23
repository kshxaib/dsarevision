export const htmlCssVault = {
  id: 'html-css',
  title: 'HTML5 & CSS3 Web Fundamentals',
  shortTitle: 'HTML & CSS',
  category: 'Web & Frameworks',
  icon: 'Globe',
  accentColor: '#F97316', // orange-500
  description: 'Box Model, Flexbox vs CSS Grid, CSS Specificity, Critical Rendering Path, Web Storage (LocalStorage, SessionStorage, Cookies), and Semantic HTML.',
  tags: ['Box Model', 'Flexbox & Grid', 'CSS Specificity', 'Critical Rendering Path', 'Web Storage', 'Semantic HTML'],
  questions: [
    {
      id: 'htmlcss-q1',
      number: '01',
      topic: 'CSS Layouts',
      question: 'Explain the CSS Box Model and standard box-sizing: content-box vs border-box.',
      interviewTips: 'Almost every modern production project sets *, *::before, *::after { box-sizing: border-box; } to ensure padding does not inflate element dimensions.',
      answer: `• The 4 Box Model Layers (Inside Out):
  1. Content: The actual text, image, or media.
  2. Padding: Transparent area clearing space around content, inside the border.
  3. Border: Border wrapping padding and content.
  4. Margin: Transparent area outside the border, separating element from neighboring elements.

• box-sizing: content-box (Default browser behavior):
  - Total Width = width + padding-left + padding-right + border-left + border-right.
  - Specifying width: 200px and padding: 20px yields an actual rendered width of 240px!

• box-sizing: border-box (Industry Best Practice):
  - Total Width = width (padding and border are absorbed inside the defined width).
  - Specifying width: 200px and padding: 20px retains exactly 200px total rendered width.`
    },
    {
      id: 'htmlcss-q2',
      number: '02',
      topic: 'CSS Layouts',
      question: 'CSS Flexbox vs CSS Grid: When to use which?',
      interviewTips: 'Flexbox is 1-Dimensional (Row OR Column); CSS Grid is 2-Dimensional (Rows AND Columns simultaneously).',
      answer: `• CSS Flexbox (1-Dimensional):
  - Focuses on content distribution along a single axis (either main-axis or cross-axis).
  - Perfect for: Navbars, button groups, centering items (justify-center items-center), tags, linear card lists.
  - Content-out approach: Sizes are primarily determined by content size.

• CSS Grid (2-Dimensional):
  - Focuses on structural grid alignment across both columns and rows at the same time.
  - Perfect for: Full page layouts, dashboard widgets, photo galleries, responsive masonry cards (grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))).
  - Layout-in approach: Content is placed into predefined track slots.`
    },
    {
      id: 'htmlcss-q3',
      number: '03',
      topic: 'CSS Specificity',
      question: 'How is CSS Specificity calculated? (Inline styles, IDs, Classes, Elements).',
      interviewTips: 'Specificity is represented as a 4-part weight: (Inline, IDs, Classes/Attributes/Pseudo-classes, Elements/Pseudo-elements).',
      answer: `• Specificity Hierarchy (Highest to Lowest):
  1. !important: Overrides normal declarations (use sparingly).
  2. Inline Styles (<div style="...">): Weight (1, 0, 0, 0)
  3. IDs (#header, #user-profile): Weight (0, 1, 0, 0)
  4. Classes, Attributes, Pseudo-classes (.btn, [type="text"], :hover): Weight (0, 0, 1, 0)
  5. Element Selectors & Pseudo-elements (div, h1, p, ::before): Weight (0, 0, 0, 1)
  6. Universal Selector (*), Combinators (+, >, ~): Weight (0, 0, 0, 0)

• Comparison Example:
  - #nav .item: (0, 1, 1, 0) beats .nav .item a: (0, 0, 2, 1) because the ID weight (1) in column 2 wins.`
    },
    {
      id: 'htmlcss-q4',
      number: '04',
      topic: 'Web Storage',
      question: 'Compare LocalStorage vs SessionStorage vs Cookies.',
      interviewTips: 'Always point out security flags for cookies: HttpOnly (blocks XSS access from document.cookie) and SameSite=Strict (mitigates CSRF).',
      answer: `• LocalStorage:
  - Capacity: ~5MB - 10MB per origin.
  - Lifetime: Persists indefinitely until cleared by user or JavaScript.
  - Scope: Shared across all tabs/windows of the same origin.
  - Transmission: Stored on client only; never sent with HTTP headers.

• SessionStorage:
  - Capacity: ~5MB per origin.
  - Lifetime: Cleared when browser tab/window is closed.
  - Scope: Scoped to the specific browser tab.
  - Transmission: Client only.

• Cookies:
  - Capacity: ~4KB per cookie.
  - Lifetime: Configurable via Expires or Max-Age (session cookie if omitted).
  - Scope: Configurable by Domain and Path.
  - Transmission: Automatically sent with EVERY HTTP request to the server in the 'Cookie' header.
  - Security Flags: HttpOnly (prevents JS theft via XSS), Secure (HTTPS only), SameSite (Strict/Lax/None for CSRF protection).`
    }
  ]
};
