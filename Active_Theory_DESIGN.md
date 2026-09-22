# Active Theory · Creative Digital Experiences

## Mission
Create implementation-ready, token-driven UI guidance for Active Theory · Creative Digital Experiences that is optimized for consistency, accessibility, and fast delivery across dashboard web app.

## Brand
- Product/brand: Active Theory · Creative Digital Experiences
- URL: https://activetheory.net/?utm_source=chatgpt.com
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations
- Visual style: minimal, utility-first, accessibility-prioritized
- Main font style: `font.family.primary=Times New Roman`, `font.family.stack=Times New Roman`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=normal`
- Typography scale: `font.size.xs=14px`, `font.size.sm=16px`
- Color palette: `color.text.primary=#ffffff`, `color.text.secondary=#0000ee`, `color.surface.base=#000000`
- Spacing scale: `space.1=1px`, `space.2=6px`, `space.3=14px`
- Radius/shadow/motion tokens: `radius.xs=5px` | `motion.duration.instant=400ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: buttons (6), links (5), inputs (1).

- Extraction diagnostics: Low sample size: fewer than 30 visible elements were extracted. Limited color diversity detected; color token inference confidence is low. Limited typography variety detected; size scale may need manual refinement. Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
