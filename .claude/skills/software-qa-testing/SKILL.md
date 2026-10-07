---
name: software-qa-testing
description: "Use this skill when the task involves: - Test case creation - Functional testing - Smoke or sanity testing - Regression testing - API testing - Bug reporting - Test execution - Test documentation - QA planning"
---
1. Understand the requirement before creating test cases.
2. Identify positive, negative, boundary, validation, and error scenarios.
3. Do not assume missing requirements.
4. Clearly identify assumptions.
5. Prioritize business-critical flows.
6. Maintain traceability between requirements and test cases.
7. Report actual results separately from expected results.
8. Never mark a test as Passed without evidence or execution confirmation.

## Test Case Standards
Each test case should include:
- Test Case ID
- Module
- Scenario
- Preconditions
- Test Steps
- Test Data
- Expected Result
- Priority
- Severity
- Actual Result
- Status

## Defect Standards
Every defect should contain:
- Defect ID
- Title
- Environment
- Preconditions
- Steps to Reproduce
- Expected Result
- Actual Result
- Severity
- Priority
- Evidence
- Status

## Communication
Use clear and professional language.
Do not claim testing was completed when it was only planned.
Clearly distinguish:
- Planned
- In Progress
- Passed
- Failed
- Blocked
- Not Tested

## Completion Criteria
A QA task is complete only when:
- The agreed scope has been covered.
- Results have been verified.
- Defects have been documented.
- Outstanding limitations are identified.
- The agreed deliverable has been provided.
```

### Useful Skills for Your Agent

For a **Software QA / Coding Agent**, I would create separate skills such as:

1. **`qa-testing`** — Functional, smoke, sanity, regression, UAT
2. **`api-testing`** — REST API, Postman, HTTP, JSON
3. **`sql-testing`** — SQL validation and database testing
4. **`playwright-testing`** — Playwright automation standards
5. **`selenium-testing`** — Selenium/TestNG/POM standards
6. **`performance-testing`** — JMeter, load/stress testing
7. **`bug-reporting`** — Professional defect documentation
8. **`test-case-design`** — Positive/negative/boundary test design
9. **`security-qa`** — QA-level security and data-protection checks
10. **`release-validation`** — Smoke/regression/release readiness
11. **`github-workflow`** — Branches, commits, PRs, reviews
12. **`documentation`** — BRD/SRS/SOP/MOM/release notes
13. **`client-testing`** — Freelance/client testing workflow, scope, quotation, reporting

### Skill Selection Rule

The agent should **automatically select the relevant skill based on the task**.

For example:

> “Create Playwright tests for the login page.”

→ `playwright-testing` + `test-case-design`

> “Check whether the API stores the correct user data.”

→ `api-testing` + `sql-testing`

> “Prepare smoke testing report for release.”

→ `qa-testing` + `release-validation` + `documentation`

> “Create a GitHub branch and raise a PR.”

→ `github-workflow`

**Core principle:**

> **Skills should provide specialized instructions, not duplicate general agent behavior. Keep each skill focused, reusable, and actionable.**
