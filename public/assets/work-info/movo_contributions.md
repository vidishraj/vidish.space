# Movo AI — Contribution Summary

**Contributor:** Vidish Raj
**Period:** December 10, 2025 — March 5, 2026
**Total Commits:** 84 (55 merged backend + 14 unmerged backend + 15 frontend)

---

## Table of Contents

1. [Backend (movo-be) — Merged](#backend-movo-be--merged)
   - [December 2025](#december-2025-14-commits)
   - [January 2026](#january-2026-22-commits)
   - [February–March 2026](#februarymarch-2026-19-commits)
2. [Backend (movo-be) — Unmerged Branches](#backend-movo-be--unmerged-branches-14-commits)
   - [feat/edit-campaign](#featedit-campaign-1-commit)
   - [feat/leadsImprovement](#featleadsimprovement-3-commits)
   - [faet/tools](#faettools-8-commits)
   - [feat/static-context-wizard-enrollment](#featstatic-context-wizard-enrollment-1-commit)
   - [feat/insightsFixes](#featinsightsfixes-1-commit)
3. [Frontend (movo-dashboard)](#frontend-movo-dashboard)
   - [January 2026](#dashboard--january-2026)
   - [February–March 2026](#dashboard--februarymarch-2026)
4. [Summary & Impact](#summary--impact)

---

## Backend (movo-be)

### December 2025 (14 commits)

#### Mindbody-to-VAPI Knowledge Base Pipeline

| Date | Commit | Description |
|------|--------|-------------|
| Dec 12 | `57d53128` | **Normalize Mindbody API to Markdown** — Built two converter functions that transform raw Mindbody enrollment and appointment data into clean markdown for voice agents. Parsed recurring schedules, day-of-week patterns, instructor info, and availability while stripping HTML and decoding entities. For appointments: grouped by instructor and session type, formatted datetimes, sorted chronologically. Added shared TypeScript types and 41 unit tests. (+1,026 lines) |
| Dec 14 | `209d27eb` | **Cron for Mindbody→VAPI file sync** — Implemented a cron pipeline via Pandium that fetches enrollment data (2-month window) and availability data (3-week window) from Mindbody, converts to markdown, and uploads to VAPI knowledge base. Built VAPI client CRUD operations for file management. Created cron controller and routes. (+899 lines, 11 files) |
| Dec 15 | `66ad7a58` | **Fix endpoint prefix** — Corrected URL path in Pandium runtime routing. |
| Dec 15 | `4568c105` | **Fix site ID source** — Fixed incorrect Mindbody site ID reference in the knowledge base job processor. |
| Dec 16 | `dac70f0d` | **Revise markdown format** — Reworked markdown output structure for VAPI knowledge base files. Updated filename conventions and file replacement logic, fixed location bug for appointments, corrected SessionId handling. |
| Dec 19 | `edef1863` | **Update KB with new file IDs** — Added VAPI client methods to attach/detach files from knowledge bases, updated the job processor to wire new files into the correct knowledge base after upload. (+185 lines) |

#### Person Context & AI Summarization

| Date | Commit | Description |
|------|--------|-------------|
| Dec 18 | `46a908f7` | **Context injection system** — Major feature introducing per-person context management. Built `personContext` service and controller with dedicated API endpoints. Integrated OpenAI with retry and exponential backoff for generating conversation summaries. Added `summary` column to `InteractionEvent`. Created `PersonContext` DB table with partial unique index for race condition prevention. Implemented transactional row-level locking for safe concurrent updates. Refactored person enrichment worker to use Prisma ORM upserts. Added Twilio message history extraction script. (+1,078 lines, 18 files) |
| Dec 19 | `773f86cb` | **Backfill interaction summaries** — Created a 169-line backfill script to retroactively generate OpenAI summaries for existing interaction events. |
| Dec 19 | `f60b2ec3` | **Backfill external IDs** — Added `externalId` column via migration and built a 218-line backfill script to populate external IDs for linking internal records to external system counterparts. |
| Dec 21 | `693d25f3` | **Table updates for SMS context** — Database schema changes and service layer updates preparing for SMS context support. Added new columns via two migrations, renamed columns for consistency, updated personContext service, callContext service, and OpenAI client. |

#### SMS Conversational AI Pipeline

| Date | Commit | Description |
|------|--------|-------------|
| Dec 27 | `339b7ba7` | **SMS context injection** — Largest December commit (+4,446 lines, 20 files). Built a full SMS conversational AI pipeline: Twilio webhook integration for inbound SMS, OpenAI-powered contextual response generation, local knowledge base service for appointment/enrollment enrichment, Twilio webhook authentication middleware, multi-SMS splitting for long responses, clarifying questions flow, unsubscribe handling, multi-model OpenAI support, token count and cost tracking, prompt data storage. Included 3 comprehensive test suites (1,061 lines). |
| Dec 30 | `0f42577d` | **Message queue for SMS** — Introduced BullMQ-based async processing architecture. Built dedicated `messageQueueService` and `smsWorker`. Added re-engagement flow support, unsubscribe keyword handling, new prompt column in DB, race condition prevention via transactions, idempotency checks for batches. (+905 lines, 11 files) |
| Dec 30 | `55a43d78` | **Outbound SMS endpoint** — Added outbound controller and routes for programmatic outbound messaging. Massively expanded SMS conversation processor (+930 lines) to handle outbound flows alongside inbound. Included BullMQ queue infrastructure, new DB migrations, and updated test coverage. (+1,464 lines, 16 files) |

#### CI/Infrastructure

| Date | Commit | Description |
|------|--------|-------------|
| Dec 17 | `db32b6d3` | **GitHub Actions CI** — Added PR workflows for automated linting and build checks. |

---

### January 2026 (22 commits)

#### Link Tracking (Short.io Integration)

| Date | Commit | Description |
|------|--------|-------------|
| Jan 2 | `79d8d309` | **Integrate Short.io for link tracking** — Created HTTP client for Short.io API, link shortening service module, webhook controller for receiving click events, URL processor utility, and new routes. Updated Prisma schema with models for shortened links and click data. Modified SendGrid client and Twilio SMS service to use tracked links. (+486 lines, 11 files) |
| Jan 2 | `4a6bbecc` | **Migration & env updates** — Added Prisma migration SQL for Short.io tables, updated `.env.example` with new variables, extended Short.io client, updated SMS tests. |
| Jan 2 | `f6da491e` | **Improve InteractionEvent insertion** — Small refactor to insertion logic in Twilio SMS service. |
| Jan 3 | `d1cf891f` | **Remove email link tracking, update CORS** — Scoped Short.io link tracking to SMS-only by removing email link rewriting. Updated CORS configuration and academy integration settings. |
| Jan 3 | `0d651c0a` | **Improve domain-in-DB logic** — Refactored Short.io client and link shortening service to derive domain info from DB rather than environment config, improving flexibility. |
| Jan 3 | `81742ee2` | **Fix outbound status tracking** — Refactored Twilio webhook controller to only update delivery status for outbound messages, preventing inbound messages from incorrectly triggering status updates. |
| Jan 6 | `98168363` | **AI review fixes** — Applied fixes identified through AI code review: addressed race conditions in Twilio SMS service and improved URL processor robustness. |

#### Purchase History from Mindbody

| Date | Commit | Description |
|------|--------|-------------|
| Jan 8 | `d6415bc7` | **Mindbody purchase tracking** — Built complete Mindbody webhook system: controller (268 lines), routes, subscription service for real-time purchase events. Expanded static context service (+297 lines) to process and store purchase data for person context. Added DB migration with performance indexes. Created comprehensive test suite (424 lines). (+1,108 lines, 9 files) |

#### Vector Database / Knowledge Base V1

| Date | Commit | Description |
|------|--------|-------------|
| Jan 14 | `f87fb02c` | **Vector DB V1** — Largest January commit (+5,298 lines, 24 files). Full vector database implementation: embedding service for generating vector embeddings, vector store service with HNSW indexing for similarity search, knowledge base controller (1,791 lines) and service (301 lines). Built normalizer framework (base, appointment, enrollment, service normalizers) to transform Mindbody data into structured chunks. Added content deduplication via content hashing, parallelized embedding and intent extraction, performance logging service (413 lines), and refined AI prompts for context-aware querying. Includes 3 DB migrations for vector storage tables and indexes. |
| Jan 14 | `603873a2` | **Simplify vector store operations** — Refactored create/update operations in vector store service for cleaner code (-24 lines net). |
| Jan 15 | `fc13a6c7` | **Server debugging logs** — Added extensive logging (+119 lines) to KB controller for production debugging and validation of vector DB behavior. |
| Jan 16 | `2b93c032` | **Campaign-KB relation migration** — Restructured how campaigns link to knowledge base entries via new migration and schema update. |
| Jan 22 | `c7839569` | **Add sessionId to enrollment chunks** — Enriched enrollment data in KB normalizer with session identifiers for better vector search results. |

#### Pandium & Integration Runtime

| Date | Commit | Description |
|------|--------|-------------|
| Jan 15 | `7e0fe59e` | **New Pandium runtime** — Rewrote Pandium integration runtime (+201 lines) for third-party integration orchestration. Updated Mindbody webhook controller alignment. |
| Jan 30 | `421ce8d9` | **New Pandium cron** — Added new scheduled task definition for periodic data synchronization. (+59 lines) |

#### SMS System Overhaul

| Date | Commit | Description |
|------|--------|-------------|
| Jan 21 | `cb3a6250` | **SMS improvements** — Second-largest January commit (+6,851 lines, 23 files). Major refactoring of SMS conversation processor, enhanced KB service (+357 lines), updated OpenAI client and SMS worker. Built development tooling suite: SMS benchmark tool, visual SMS conversation viewer (HTML + Node server), test conversation simulator, conversation extraction tool, DB sync script. Added comprehensive SMS flow documentation (1,268 lines). |

#### Email Channel

| Date | Commit | Description |
|------|--------|-------------|
| Jan 28 | `7f88f4d7` | **Email enhancements** — Complete inbound email processing pipeline (+2,578 lines, 12 files). Built SendGrid webhook controller (688 lines) with ECDSA signature verification. Created email conversation processor (1,492 lines) handling threading, content sanitization, automated reply detection. Added Message-ID and threading headers to SendGrid client. Updated NBA email applier for thread continuity. Built email content sanitization to strip signatures, disclaimers, and auto-reply patterns. |

#### Campaign & Other Features

| Date | Commit | Description |
|------|--------|-------------|
| Jan 18 | `098bc46d` | **Save original messages in copilot mode** — When operating in copilot mode (AI drafts reviewed before sending), original unedited messages are now preserved alongside edits. |
| Jan 20 | `8cac6046` | **Assistant prompt edit endpoint** — New CRUD module with controller (71 lines), routes (31 lines), and service (147 lines) for managing AI assistant prompt configurations. (+251 lines) |
| Jan 20 | `bf08911c` | **Campaign worker refactor** — Reused existing transient function in campaign worker to reduce code duplication. |
| Jan 23 | `5f4b5f22` | **Campaign enrollment migration** — Refactored campaign enrollment data model across 27 files. Updated lifecycle engine and service, interaction and campaign workers, insights/analytics queries. Refactored backfill script for VAPI calls. Updated 7 test files. |
| Jan 23 | `34fa3afb` | **Exclude scripts from build** — Updated tsconfig to prevent development/utility scripts from being compiled into the production build. |

---

### February/March 2026 (19 commits)

#### Email v1.5

| Date | Commit | Description |
|------|--------|-------------|
| Feb 5 | `aa3e6377` | **Email v1.5** — Major email system overhaul (+4,189 lines, 27 files). Introduced BullMQ-based queue service for email processing with dedicated email worker. Built thread context management via `emailThreadBuilder`, email content sanitization (stripping quoted replies and signatures), branded email template with logo header and contact footer. Full attachment management system for SMS/MMS and Email with AI-powered attachment analysis via document extraction service. Added human escalation to AutoPilot mode. Fixed WhatsApp sandbox auto-detection and number formatting. Replaced inbound email processor with new queue-based architecture. Added Prisma migrations for supporting tables. |
| Feb 5 | `7581be36` | **Fix email attachment analysis** — Added missing `interactionEventId` parameter for batch email attachment processing. |

#### Interaction Event Normalization

| Date | Commit | Description |
|------|--------|-------------|
| Feb 5 | `82464340` | **Interaction event normalization** — Massive schema refactor (60 files, +4,407/-2,258 lines). Created dedicated `CallEvent`, `SmsEvent`, and `EmailEvent` tables replacing the previous polymorphic single-table approach. Implemented dual-write pattern for backward compatibility. Migrated all read operations across the entire codebase to use type-specific tables. Migrated UNION queries to use unified `InteractionEvent` table with `direction` column and foreign key links. Touched virtually every module: interactions service, webhook controllers, SMS service, lifecycle service, campaign performance, insights, cron controllers. Extensive test updates. |
| Feb 6 | `0e8ae58f` | **Fix SMS worker** — Post-normalization fix addressing error handling and processing flow issues in the SMS worker. |

#### Knowledge Base Improvements

| Date | Commit | Description |
|------|--------|-------------|
| Feb 4 | `d63cd998` | **Fix KB chunk generation** — Consolidated service normalizer (deleted 266-line standalone file) into Mindbody service module (+199 lines). Enhanced enrollment normalizer with additional normalization logic (+72 lines). |

#### Insights Engine

| Date | Commit | Description |
|------|--------|-------------|
| Feb 11 | `1a15a555` | **Insights system** — Full LLM-driven business insights engine (+6,210 lines, 31 files). Built `Insight` and `InsightSnapshot` database tables. Created complete insight generation pipeline: 4 data aggregators (campaign, conversation, funnel, trend) gathering structured data; 5 LLM-driven agent generators (growth, market, pipeline, strategic, voice-of-customer); LLM curator agent for deduplication and curation; scheduler with hourly/daily/weekly job cadence; CRUD API endpoints for dashboard consumption; InsightBuilder fluent API for flexible category selection. Used gpt-5-mini with context-aware incremental generation and minimum conversation thresholds. |
| Feb 18 | `8fe2c7f7` | **Replace legacy insight system** — Swapped old insight cache-warming system with v2 InsightBuilder generation. Trimmed legacy insights worker, updated cron controller, removed extensive old test code. Net reduction of 378 lines. |

#### LeagueApps Integration

| Date | Commit | Description |
|------|--------|-------------|
| Feb 20 | `a89899ca` | **LeagueApps integration** — Largest single commit across both repos (+8,280 lines, 53 files). Complete sports management platform integration: LeagueApps sync service pulling members, programs, registrations via Pandium; Chrome extension for intercepting LeagueApps API tokens with service worker, content scripts, and popup UI; 5 knowledge base normalizers (programs, registrations, schedules, locations, blogs); LA Bridge module providing convenience API endpoints for player, member, and program writes; encrypted API key credential management; DB-based sync locking for serverless safety; batch member upserts in transactions; Postman collection for API testing. |

#### Salesforce + Multi-Location System

| Date | Commit | Description |
|------|--------|-------------|
| Feb 25 | `bda9e091` | **Salesforce + Locations** — Major multi-feature commit (+3,160 lines, 48 files). **Salesforce integration:** Complete module using Merge.dev CRM SDK — sync service, credential management, contact-to-person mapping, KB normalizer for Salesforce contacts, webhook handler. **Location management:** Full CRUD system with LRU TTL caching (500 entries, 5-min TTL), Zod request validation, phone number uniqueness validation, soft-delete support, operating hours management. **Location-aware KB selection:** KB selector service with 4-tier priority fallback (campaign+location > campaign-only > location-only > academy-wide). **Mindbody location mapping:** Location resolver mapping homeLocationId to Location entities. Wired locationId through entire agent context pipeline. Fixed first touchpoint routing and OpenAI structured output schema compliance. |

#### Lead Score v2

| Date | Commit | Description |
|------|--------|-------------|
| Feb 25 | `a87b86cd` | **Add lead score columns** — Added `leadScoreBreakdown` and `intentData` JSON columns to Prisma schema with migration, laying groundwork for Lead Score v2. |
| Feb 27 | `b7548bd4` | **Lead Score v2 engine** — Multi-dimensional scoring engine (+2,311 lines, 23 files). Scores leads across engagement, responsiveness, and momentum dimensions rather than a single composite number. Modality-agnostic, working across calls, SMS, and email uniformly. Features: configurable cap for `not_interested` leads (default 4.0), per-member lead scores on listings endpoint, GET endpoint for individual enrollment lead score with on-demand calculation, average lead score per household. Enhanced lifecycle analyzers for call, email, and SMS with richer intent signal extraction. Complete test suite rewrite (1,519 lines changed). |

#### Campaign Wizard & Edit Endpoints

| Date | Commit | Description |
|------|--------|-------------|
| Mar 3 | `15e8aebe` | **Campaign wizard audit** — Hardening pass on campaign wizard module (13 files, +323/-194 lines). Refactored VAPI client (157 lines of changes), cleaned up enrollment and launch services, created `llmSanitize` utility (63 lines) for sanitizing LLM outputs, improved campaign worker flow, fixed CSV column mapper and extraction service, modernized Vitest config (.ts → .mts). |
| Mar 5 | `14bcc3d3` | **Edit campaign endpoints** — New API endpoints for editing live campaigns: adding enrollees to existing campaigns and updating campaign settings post-launch. Controller (+136 lines), service (+158 lines), 4 new routes. |

#### Schema & Infrastructure Fixes

| Date | Commit | Description |
|------|--------|-------------|
| Feb 11 | `9a2ea179` | **Scheduled action migration** — Added new tracking columns for scheduled actions. Updated first touchpoint service, follow-up scheduler, and NBA call applier. |
| Feb 11 | `961c5af6` | **Fix Prisma migration ordering** — Renamed migration directories for correct chronological ordering, added `prod_sync.sql` script (79 lines) for production DB state synchronization. |
| Feb 12 | `cd0e7c3f` | **Filter products from purchases** — Updated Mindbody webhook to skip retail product sales, processing only service/membership purchases. |
| Feb 22 | `255f51a5` | **Dedup fix** — Fixed enrollment deduplication using `paymentReferenceId` as primary dedup key. Added `Number.isFinite` validation to prevent `NaN` corruption. Allows legitimate duplicate purchases (e.g., family buying same class for multiple children). |
| Feb 22 | `a22f0eed` | **Prisma migration fix** — Schema drift correction via standalone 42-line migration. |
| Feb 26 | `cf3b68e7` | **Staging migration workflow** — GitHub Actions workflow (72 lines) for deploying Prisma migrations to staging environment. |

---

## Backend (movo-be) — Unmerged Branches (14 commits)

These branches contain work-in-progress features that are ahead of `main` as of March 5, 2026.

---

### feat/edit-campaign (1 commit)

| Date | Commit | Description |
|------|--------|-------------|
| Mar 5 | `7802159c` | **Remove enrollees endpoint** — New `POST /:campaignDefinitionId/remove-enrollees` API to manually exit enrollees from active/paused campaigns. Zod-validated input accepts an array of up to 500 enrollment IDs with optional reason. Processes removals in batches of 50: cancels pending `ScheduledAction` rows and removes their BullMQ jobs, rejects pending `PendingAction` rows (status → "REJECTED"), marks enrollment as exited with timestamp and reason. Skips enrollments already in "exited" or "completed" state. Returns counts of exited vs. already-exited. (+145 lines, 3 files) |

---

### feat/leadsImprovement (3 commits)

| Date | Commit | Description |
|------|--------|-------------|
| Mar 5 | `bf6e532b` | **Fix lead score v2 algorithm** — Four targeted fixes: (1) Response rate penalty — responsiveness score now multiplies by a response rate factor (replies / outbound messages), penalizing leads who responded once then ghosted. (2) `latestSignal` tracking bug — previously overwritten by every interaction including outbound events with no lifecycle signal; fixed to only track interactions with actual `lifecycleSignal`. (3) Enrollment lifecycle cap — composite score now considers enrollment-level lifecycle state as primary signal (event-level as fallback), with override if recent events show "interested" or "purchased". (4) Lower momentum default — insufficient data score reduced from 5 → 3 to prevent inflated scores for low-activity leads. (+49 lines, 3 files) |
| Mar 5 | `c47f7884` | **Person-level lead score** — Introduced pre-computed `Person.leadScore` column (with partial index) = `MAX(enrollment.leadScore)` across qualifying enrollments (active/paused campaigns, or completed within 30 days). Added DB migration with backfill query. New `updatePersonLeadScore()` method using raw SQL, called from interaction worker, lifecycle retry, and cron refresh. **Architecture shift from compute-on-read to compute-on-write** — removed complex `enrollment_scores` and `person_lead` CTEs from person search query, now reads directly from `Person.leadScore`. (+91 lines, 7 files) |
| Mar 5 | `bdd2d619` | **Fix failing tests** — Updated test expectations for momentum insufficient_data score (5 → 3), search assertions for Person.leadScore column reads, and added `updatePersonLeadScore` mock to interaction worker test. |

---

### faet/tools (8 commits)

This is the largest unmerged branch — a complete **agent tool configuration system**.

| Date | Commit | Description |
|------|--------|-------------|
| Mar 2 | `18afc656` | **Tool config foundation** — Added `toolConfig` JSONB column to `Assistant` table via migration. Defined TypeScript types for tool configuration (`ToolConfig` with keys: `calendly`, `mindbody_booking`, `mindbody_checkout`, `kb_search`). Created centralized `toolRegistry.ts` (455 lines) with: full VAPI function schemas for voice, UI metadata (labels, descriptions), integration availability checks (Mindbody, Calendly, KB), and builder functions (`buildVapiToolsFromConfig`, `isToolEnabledInConfig`, `getAvailableToolsForAcademy`). Updated VAPI assistant template to include `parameters` in tool type definition and `tool-calls` in `serverMessages`. (+499 lines, 5 files) |
| Mar 2 | `1e1a8b62` | **Stamp toolConfig at campaign launch** — When a campaign launches, `toolConfig` from wizard state is stored in campaign definition metadata, written to each assistant's `toolConfig` column, and used to build VAPI function tools for voice assistants. (+21 lines) |
| Mar 2 | `114e0f8f` | **Calendly SMS tools + isEnabled gating** — Two new Calendly tools: `calendlyAvailability` (list event types / check time slots with optional event type URI filtering) and `calendlyBookAppointment` (book using confirmed slot). All existing tools (`checkCardOnFile`, `getCheckoutLink`, `searchKnowledgeBase`) gain `isEnabled` guards checking `runContext.context.toolConfig`. Added `toolConfig` to `AgentContext` type. `smsConfig.ts` loads and caches toolConfig from assistant record. Triage processor propagates toolConfig to agent context. Added cache invalidation helper. (+258 lines, 9 files) |
| Mar 2 | `4dcfc16e` | **API endpoints for tool management** — `GET /campaigns/available-tools` returns which tools the academy can enable based on connected integrations (for campaign wizard toggles). `updateAssistantTools` service function writes toolConfig to assistant, rebuilds VAPI tools for voice (keeping non-registry tools like voicemail/transferCall intact), and invalidates SMS config cache. Webhook controller gains defense-in-depth: checks `isToolEnabledInConfig` before executing any VAPI tool call. (+143 lines, 4 files) |
| Mar 2 | `54fdcf12` | **Fix non-voice assistant IDs** — Changed non-voice assistant creation to use `local-{modality}-{timestamp}` placeholder for `vapiAssistantId` instead of `null`, so the `startsWith("local-")` guard correctly skips VAPI sync for non-voice assistants. |
| Mar 3 | `cb6f89fd` | **Unify tool config — remove legacy system** — Deleted old `assistants/toolRegistry.ts` (182 lines) and three legacy functions (`toggleAssistantTool`, `updateAssistantTool`, `checkIntegrationConnected`). Rewrote `getAssistantTools` to use shared registry with fallback chain (assistant.toolConfig → campaign metadata → defaults). Replaced `toggleTool` and `updateTool` with single `updateTools` endpoint accepting full `toolConfig` object. Removed `PATCH /:id/toggle-tool` route. Net **-472 lines**. |
| Mar 5 | `94debcc3` | **Fix VAPI sync ordering** — Reordered `updateAssistantTools` so VAPI API call happens before DB write. Previously toolConfig was written to DB first, then VAPI synced — if VAPI failed, DB would be left inconsistent. Now for voice assistants, VAPI syncs first, then both `toolConfig` and `vapiData` persist atomically in a single DB update. |
| Mar 5 | `765daf61` | **Guard on booking tool** — Added `isEnabled` guard to `executeBookingDeterministicTool`, gated on `toolConfig.mindbody_booking.enabled` (defaults to true for backward compatibility). This was the last remaining tool missing the isEnabled check. |

---

### feat/static-context-wizard-enrollment (1 commit)

| Date | Commit | Description |
|------|--------|-------------|
| Feb 27 | `e63a7b0d` | **Provider-aware static context** — Changed static context population architecture: before queuing, the service now looks up the academy's integration provider. If no integration exists, logs a warning and skips queuing entirely. Added `provider` string to `PopulateStaticContextPayload`. Worker early-returns for non-MINDBODY providers with a TODO, making it explicit that static context is currently Mindbody-only while structured for future provider support. (+43 lines, 2 files) |

---

### feat/insightsFixes (1 commit)

| Date | Commit | Description |
|------|--------|-------------|
| Mar 5 | `ff119a16` | **Insights dedup & TTL fixes** — Four targeted fixes: (1) Removed `suggestedTitle` from `entityId` hash so same-subcategory insights properly deduplicate on upsert instead of creating near-duplicates with slightly different titles. (2) Added per-category `validUntil` TTL: SALES_PIPELINE 3 days, CUSTOMER_VOICE/GROWTH_OPPORTUNITIES 14 days, COMPETITIVE_MARKET/STRATEGIC 45 days. (3) Added LLM curator prompt rule: "Two insights in the SAME subcategory MUST be merged" to enforce at most one insight per subcategory. (4) Lowered `MIN_CONVERSATIONS` from 5 → 3 to allow insight generation for smaller academies. (+14 lines, 3 files) |

---

## Frontend (movo-dashboard)

### Dashboard — January 2026

#### Enrollment & People Data

| Date | Commit | Description |
|------|--------|-------------|
| Jan 16 | `bf85726` | **Added enrollment info** — Created `use-enrollments.ts` React Query hook (83 lines) for fetching enrollment data. Expanded person details sheet to display enrollment info (+146 lines). Refactored dashboard section cards and campaign stats. Added new API client functions. Updated people table columns. (+359 lines, 9 files) |
| Jan 16 | `6e8b440` | **Simplified enrollment query** — Streamlined the enrollments hook by reducing type definitions and simplifying query logic. |

#### Assistants Tab Overhaul

| Date | Commit | Description |
|------|--------|-------------|
| Jan 18 | `2c4de31` | **Refactor Assistant tab** — Created prompt editor modal component (210 lines) for editing assistant prompts. Built `use-assistants.ts` React Query hook (149 lines) for assistant CRUD operations. Reworked assistants table with improved layout and functionality. (+551 lines, 7 files) |
| Jan 20 | `666234a` | **Add alert dialog and sanitize input** — Created reusable alert dialog UI component (141 lines, Radix UI-based). Integrated into prompt editor modal with input sanitization to prevent unsafe content. (+179 lines) |
| Jan 20 | `75b5d10` | **Replace with rehype** — Switched HTML sanitization in prompt editor to use the `rehype` library for more robust sanitization. |
| Jan 20 | `23f8c41` | **Package-lock update** — Dependency resolution update following rehype addition. |

---

### Dashboard — February/March 2026

#### NBA Attachments

| Date | Commit | Description |
|------|--------|-------------|
| Feb 11 | `31869d0` | **Add attachments to NBA** — Created attachment preview component (242 lines) for displaying file attachments inline in the Next Best Action review queue. Built `use-attachments.ts` hook for fetching attachment data. Added authenticated API client functions for attachment retrieval. Updated action timeline preview with attachment rendering and loading states. (+381 lines, 5 files) |

#### Insights Page

| Date | Commit | Description |
|------|--------|-------------|
| Feb 11 | `38ae916` | **Insights page** — Largest frontend commit (+2,080 lines, 11 files). Built complete Insights page: main page layout with filters, summary cards, and category sidebar; individual insight cards with rich data display (433 lines); conversations sheet view showing source conversations for each insight (411 lines); category navigation (156 lines); period-based filtering (190 lines); regenerate insights button (85 lines); summary statistics (101 lines). Added `use-insights.ts` hook with `useInfiniteQuery` for paginated data (120 lines). Added Insights link to app sidebar. Extended API client with 245 lines of v2 insights endpoints. |
| Feb 12 | `a6e70fa` | **Insights page tag fix** — Minor HTML/component tag adjustment for correct rendering. |

#### Real-time Inbox

| Date | Commit | Description |
|------|--------|-------------|
| Feb 11 | `a568004` | **Real-time inbox updates** — Extended pending actions and scheduled actions hooks with real-time subscription logic (~67-70 lines each) so the inbox auto-refreshes on server-side data changes. Added support for DELETE event listening and `academyId` filtering. (+139 lines, 3 files) |

#### CRM Integration UI

| Date | Commit | Description |
|------|--------|-------------|
| Feb 20 | `9f87186` | **CRM contact selector & integrations settings** — Built comprehensive integrations settings page (842 lines) supporting Mindbody, LeagueApps, and Salesforce credential management. Created CRM contact selector component (326 lines) for campaign wizard allowing users to pick contacts from connected CRMs. Added supporting hooks for CRM integration state and contact selection. Built data source toggle and "no CRM connected" fallback component. Expanded API client (+173 lines). Updated campaign wizard navigation and schema. Modified onboarding to include integration setup. (+1,858 lines, 19 files) |
| Feb 22 | `bf392af` | **Direct CRM API contact fetching** — Refactored CRM contact selector to pull contacts directly from Mindbody and Salesforce APIs instead of the internal People table. Substantially rewrote selector (+566 lines changed) for improved data freshness. |
| Feb 23 | `f2aab01` | **Track location on CRM contacts** — Added `locationId` and `locationName` fields to Mindbody contact data model in the campaign wizard. |

#### Lead Score UI

| Date | Commit | Description |
|------|--------|-------------|
| Feb 27 | `eb216b6` | **Lead score UI** — Introduced lead scoring across the application (+560 lines, 11 files). Created lead score breakdown popover component (260 lines) showing detailed score via API. Added lead score column with sorting to campaign enrollments table. Built range-based lead score filters. Added lead score sorting to people table and badge to person details sheet. Updated family/household masonry view with average household lead score. |
| Mar 3 | `187d357` | **Lead score improvements** — Renamed `successScore` to `leadScore` for consistency. Applied consistent decimal formatting in hot leads tables. Refactored person details sheet to remove IIFE patterns and `as any` type casts. Improved API call patterns. Enhanced lead score breakdown layout. |

---

## Summary & Impact

### Overall Numbers

| Metric | Backend (merged) | Backend (unmerged) | Frontend | Total |
|--------|------------------|--------------------|----------|-------|
| Commits | 55 | 14 | 15 | **84** |
| Lines Added (est.) | ~60,000+ | ~1,500+ | ~6,900+ | **~68,400+** |
| Lines Removed (est.) | ~10,000+ | ~600+ | ~700+ | **~11,300+** |
| Files Touched | 200+ | 40+ | 50+ | **290+** |

### Major Feature Areas Delivered

| Feature | Scope | Description |
|---------|-------|-------------|
| **SMS AI Pipeline** | Backend | Full Twilio integration, OpenAI-powered conversational AI, BullMQ message queuing, outbound/inbound flows, re-engagement, unsubscribe handling |
| **Email AI Pipeline** | Backend | SendGrid webhook with ECDSA verification, email conversation processor, threading, attachment analysis with AI-powered document extraction, branded templates, human escalation |
| **Vector Database & Knowledge Base** | Backend | HNSW-indexed vector store, embedding service, normalizer framework, content deduplication, location-aware KB selection with 4-tier fallback |
| **LeagueApps Integration** | Backend + Frontend | Complete sports platform integration with sync service, Chrome extension, 5 KB normalizers, Bridge API, credential management, settings UI |
| **Salesforce Integration** | Backend + Frontend | Merge.dev CRM SDK integration, sync service, contact mapping, credential management, settings UI, CRM contact selector |
| **Insights Engine** | Backend + Frontend | LLM-driven business insights with 5 agent generators, 4 data aggregators, curator, scheduler — plus full dashboard page with filters, categories, and conversations view |
| **Lead Score v2** | Backend + Frontend | Multi-dimensional scoring engine (engagement, responsiveness, momentum), modality-agnostic, per-household averages — plus breakdown popovers, table columns, and filters |
| **Interaction Normalization** | Backend | Decomposed polymorphic table into typed `CallEvent`/`SmsEvent`/`EmailEvent` tables with dual-write migration across 60 files |
| **Multi-Location System** | Backend + Frontend | Location CRUD with LRU caching, Mindbody location resolver, location-aware agent context, location tracking on CRM contacts |
| **Person Context & Summarization** | Backend | AI-generated conversation summaries, per-person context injection into voice calls, backfill scripts |
| **Campaign Management** | Backend + Frontend | Enrollment migration, edit endpoints for live campaigns, wizard audit & hardening, enrollment info display |
| **Mindbody KB Sync** | Backend | Markdown converters, cron-based VAPI file sync pipeline, purchase history tracking via webhooks |
| **Link Tracking** | Backend | Short.io integration for SMS link click tracking with webhook-based analytics |
| **Assistants Tab** | Frontend | Prompt editor modal, CRUD operations, input sanitization with rehype |
| **Real-time Inbox** | Frontend | Live subscription-based auto-refresh for pending and scheduled actions |
| **Agent Tool Configuration System** | Backend (unmerged) | Centralized tool registry with VAPI schemas, toolConfig JSONB on assistants, Calendly SMS tools, isEnabled gating on all tools, campaign launch stamping, legacy system removal |
| **Lead Score v2 Fixes & Person-Level Score** | Backend (unmerged) | Response rate penalty, latestSignal bug fix, person-level pre-computed lead score (compute-on-write architecture shift) |
| **Insights Dedup & TTL** | Backend (unmerged) | Entity-level deduplication, per-category TTL expiry, subcategory merging enforcement |
| **Remove Enrollees Endpoint** | Backend (unmerged) | Batch exit enrollees from live campaigns with cascading action cleanup |
| **Provider-Aware Static Context** | Backend (unmerged) | Integration provider detection before job queuing, structured for multi-provider support |
| **CI/CD** | Backend | GitHub Actions for lint, build, and staging Prisma migration deployments |
