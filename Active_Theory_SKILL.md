---
name: design-system-active-theory-creative-digital-experiences
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Active Theory · Creative Digital Experiences

## Mission
Deliver implementation-ready design-system guidance for Active Theory · Creative Digital Experiences that can be applied consistently across dashboard web app interfaces.

## Brand
- Product/brand: Active Theory · Creative Digital Experiences
- URL: https://activetheory.net/?utm_source=chatgpt.com
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations
- Visual style: structured, accessible, implementation-first
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
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
