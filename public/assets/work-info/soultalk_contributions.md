# SoulTalk — Contribution Summary

**Contributor:** Vidish Raj
**Role:** Sole Developer (Full-Stack + Mobile + Infrastructure)
**Period:** September 6, 2025 — March 13, 2026
**Total Commits:** 216 (60 backend + 93 mobile + 46 web + 15 infra + 2 docs)

---

## Table of Contents

1. [Backend (SoulTalk-Backend)](#backend-soultalk-backend--60-commits)
   - [September 2025 — Keycloak Prototype](#september-2025--keycloak-prototype-4-commits)
   - [February 2026 — Custom Auth & Journal MVP](#february-2026--custom-auth--journal-mvp-24-commits)
   - [March 2026 — AI Pipeline V2 & Admin Tools](#march-2026--ai-pipeline-v2--admin-tools-32-commits)
2. [Mobile (SoulTalk-Mobile)](#mobile-soultalk-mobile--93-commits)
   - [September 2025 — Project Bootstrap](#september-2025--project-bootstrap-8-commits)
   - [January 2026 — Onboarding & Auth UI](#january-2026--onboarding--auth-ui-39-commits)
   - [February 2026 — Core Screens & Backend Integration](#february-2026--core-screens--backend-integration-42-commits)
   - [March 2026 — Documentation](#march-2026--documentation-1-commit)
3. [Web Landing Page (Soultalk)](#web-landing-page-soultalk--46-commits)
   - [November 2025 — Website V1 & V2](#november-2025--website-v1--v2-19-commits)
   - [December 2025 — V3 Typography & Design Overhaul](#december-2025--v3-typography--design-overhaul-21-commits)
   - [February–March 2026 — Animation & Content Updates](#februarymarch-2026--animation--content-updates-6-commits)
4. [Infrastructure (SoulTalk-Infra)](#infrastructure-soultalk-infra--15-commits)
   - [September 2025 — Docker Foundation](#september-2025--docker-foundation-1-commit)
   - [November 2025 — CI/CD & Content Sync](#november-2025--cicd--content-sync-8-commits)
   - [February–March 2026 — Updates](#februarymarch-2026--updates-6-commits)
5. [Documentation (SoulTalk-Docs)](#documentation-soultalk-docs)
6. [Summary & Impact](#summary--impact)

---

## Backend (SoulTalk-Backend) — 60 Commits

### September 2025 — Keycloak Prototype (4 commits)

| Date | Commit | Description |
|------|--------|-------------|
| Sep 6 | `4950382` | **Project scaffolding** — Python `.gitignore` for FastAPI project. (+201 lines) |
| Sep 6 | `a3f8db0` | **FastAPI backend with Keycloak auth** — Initial backend implementation with Keycloak-based authentication: FastAPI app structure, API routes, Keycloak service integration, models, and config. (+737 lines, 9 files) |
| Sep 6 | `e1bd875` | **Docker configuration** — Dockerfile for containerized backend deployment. (+23 lines) |
| Sep 7 | `c5cebea` | **Direct API call fallback** — Added direct API call path as fallback alongside Keycloak integration. (+83 lines) |

---

### February 2026 — Custom Auth & Journal MVP (24 commits)

#### Custom JWT Authentication System

| Date | Commit | Description |
|------|--------|-------------|
| Feb 4 | `7aa476d` | **Database models & Alembic migrations** — Built the complete data layer: User model (+83 lines), RefreshToken (+67 lines), EmailVerification (+63 lines), SocialAccount (+63 lines) with UUID primary keys. Configured Alembic with async SQLAlchemy 2.0. Auth schemas with Pydantic validation. (+755 lines, 17 files) |
| Feb 4 | `7ef9cc4` | **Core auth services** — Full authentication service layer: `auth_service.py` (+407 lines) with registration, login, token refresh, and logout flows. `user_service.py` (+204 lines) for user CRUD. `jwt_service.py` (+94 lines) with HS256 token generation (15-min access / 30-day refresh). bcrypt password hashing. (+745 lines, 5 files) |
| Feb 4 | `88f511c` | **Email verification service** — Email-link-based verification with SMTP integration, template rendering, and token generation. (+188 lines) |
| Feb 4 | `3bb9cb2` | **Social auth (Google + Facebook)** — OAuth2 integration for Google and Facebook login. Token exchange, profile extraction, and social account linking to local users. (+448 lines, 2 files) |
| Feb 4 | `42c485b` | **Replace Keycloak with custom JWT** — Removed the entire Keycloak service layer (-409 lines deleted) and rewrote `auth.py` API routes (+343 lines) to use custom JWT. Added dependency injection for auth (`deps.py`, +72 lines). Architecture shift from external auth provider to self-contained auth. (+290/-553 lines, 5 files) |
| Feb 4 | `cfb9d42` | **Config & dependency updates** — Updated settings, requirements, and environment configuration for the new auth system. (+107 lines, 6 files) |

#### OTP & Password Management

| Date | Commit | Description |
|------|--------|-------------|
| Feb 11 | `ca9b66d` | **Replace email-link with 6-digit OTP** — Replaced email verification links with 6-digit numeric OTP codes. Added auto-login after successful verification. Updated email templates and verification flow. (+110/-46 lines, 6 files) |
| Feb 11 | `b696c56` | **Main & requirements updates** — Minor updates to app entry point and dependencies for auth system. |
| Feb 21 | `c01028d` | **Change-password endpoint** — New password change API. Blocks social-auth users from password reset. Added deep link redirect (`soultalk://` URL scheme) for password reset from email. (+98 lines, 5 files) |
| Feb 21 | `fdcc152` | **Display name & username lock** — Added `display_first_name` column via migration. Username locked to one-time set after initial configuration. (+39 lines, 5 files) |

#### Journal System

| Date | Commit | Description |
|------|--------|-------------|
| Feb 14 | `53240de` | **Journal CRUD + AI tagging + WebSocket** — Complete journal feature: API routes (`journal.py`, +246 lines) with create/read/update/delete, service layer (+153 lines), journal entry model (+90 lines), OpenAI-powered AI tagging service (+70 lines) running as background task, WebSocket endpoint (+66 lines) for pushing AI analysis results to mobile in real-time. Alembic migration for journal table. Pydantic schemas. (+758 lines, 15 files) |
| Feb 18 | `07cc001` | **Journal filters, username check, daily mood** — Added date range and mood filtering to journal list. Built daily mood tracking system: `mood_service.py` (+55 lines), `daily_mood.py` model (+51 lines), mood API (+39 lines), migration for mood table. Username availability check endpoint. (+231 lines, 11 files) |
| Feb 18 | `fb7c1f2` | **AI background task tracing** — Added structured logging to AI analysis background tasks for debugging. (+12 lines, 3 files) |
| Feb 18 | `e77a691` | **Fix AI task session isolation** — Fixed critical bug: commit journal entry before scheduling AI background task so the new async session can find the entry. |
| Feb 23 | `7d22a1b` | **1-per-day limit, SoulBar float, mood bar** — Enforced single non-draft journal entry per day. Changed SoulBar points from integer to float for granular progress. Integrated mood bar into home screen display. (+145/-42 lines, 9 files) |

#### Gamification System

| Date | Commit | Description |
|------|--------|-------------|
| Feb 21 | `83d46c2` | **Streaks, SoulBar, drafts, moods, prompts** — Major gamification commit: `UserStreak` model (+53 lines) with streak tracking logic, `SoulBar` model (+49 lines) with 6-point fill cycle, streak service (+44 lines), draft journal support, expanded mood enum (beyond basic happy/sad), inspiration prompts API (+51 lines) serving random writing prompts. Migration for new tables. (+459 lines, 18 files) |
| Feb 21 | `ab4e78d` | **Whisper audio transcription** — OpenAI Whisper endpoint for server-side speech-to-text on audio journal entries. (+82 lines, 3 files) |

#### Production Deployment & Fixes

| Date | Commit | Description |
|------|--------|-------------|
| Feb 17 | `3888b05` | **Production Docker Compose** — Production-ready `docker-compose.prod.yml` with environment configuration. Updated `.env.example`. (+72 lines, 3 files) |
| Feb 17 | `e205287` | **Multi-connection WebSocket** — Fixed WebSocket to support multiple simultaneous connections per user (e.g., multiple devices). (+23/-11 lines) |
| Feb 17 | `50be2c7` | **DRY helpers, WS keepalive, validation** — Extracted response helper for DRY API responses. Added WebSocket keepalive pings to prevent idle disconnects. Added `max_length` validation on journal text. Removed `--reload` from production Dockerfile. (+40/-74 lines, 4 files) |
| Feb 17 | `04235a9` | **User profile endpoint** — PUT endpoint for updating `display_name`, `username`, `bio`, and `pronoun` fields. (+116 lines, 4 files) |
| Feb 17 | Various | **Production fixes** (4 commits) — Allow extra env vars in settings, fix TrustedHostMiddleware for `soultalkapp.com`, skip `create_all` in production to avoid enum conflicts, pin bcrypt to 4.0.1 for passlib compatibility. |
| Feb 24 | `88760d3` | **Security audit fixes** — Addressed critical findings: hardened email service, WebSocket authentication, AI service input validation, auth service edge cases, and Alembic env configuration. (+37/-17 lines, 5 files) |

---

### March 2026 — AI Pipeline V2 & Admin Tools (32 commits)

#### AI Provider Migration

| Date | Commit | Description |
|------|--------|-------------|
| Mar 6 | `c6d0d1c` | **Replace OpenAI with Anthropic** — Swapped OpenAI for Anthropic Claude as the AI provider for journal analysis. Removed Whisper transcription endpoint (mobile uses on-device speech recognition instead). Updated config and dependencies. (+38/-75 lines, 7 files) |
| Mar 6 | `84d8672` | **CLAUDE.md** — Added comprehensive architecture reference document for the backend. (+120 lines) |

#### AI Pipeline V2 — Database Layer (PR #1)

| Date | Commit | Description |
|------|--------|-------------|
| Mar 8 | `b6f67d2` | **pgvector + AI dependencies** — Added pgvector Docker image for vector similarity search. Added Anthropic SDK, Voyage AI, and numpy to requirements. |
| Mar 8 | `ff8b96d` | **AI pipeline models** — 6 new SQLAlchemy models: `EntryTags` (+124 lines) with pgvector embedding column, `AIResponse` (+71 lines), `Soulsight` (+79 lines) for periodic long-form reports, `ScenarioPlaybook` (+58 lines) for guided scenarios, `DailyAggregate` (+75 lines) for nightly analytics, `UserAIProfile` (+50 lines) for personalization state. (+457 lines, 6 files) |
| Mar 8 | `6367c61` | **Migrations 008–015** — 8 Alembic migrations creating all AI pipeline tables with indexes, foreign keys, and the pgvector extension. (+351 lines) |
| Mar 8 | `45f903c` | **Model registration** — Updated journal_entry model with AI processing status field, registered new models in `__init__` and Alembic env. |
| Mar 8 | `9766310` | **Journal API/service refactor** — Updated journal endpoints and service to expose AI processing status, tags, and response data via new schema joins. (+80/-106 lines, 4 files) |
| Mar 8 | `94ecdb2` | **Per-service AI config** — Separate Anthropic model configuration per service (Haiku for tagging, Sonnet for responses). Added Voyage AI embedding model config. (+18 lines) |
| Mar 8 | `1710caf` | **PR #1 squash merge** — Squash merge of the database layer branch with all 9 sub-commits above. (+1,139/-231 lines, 32 files) |

#### AI Pipeline V2 — Tags & Config (PR #2)

| Date | Commit | Description |
|------|--------|-------------|
| Mar 8 | `0d6fc2d` | **TagsV1 schema** — Comprehensive Pydantic schema defining all 12 tag sections: emotions (primary/secondary/intensity), cognitive patterns, themes, coping strategies, needs, growth indicators, relational context, temporal markers, somatic markers, resilience signals, meaning-making, and safety flags. Built-in validation and crisis detection logic. (+209 lines) |
| Mar 8 | `7ed750c` | **20 scenario playbooks** — Defined 20 guided scenario definitions (ST-SCEN-001 through ST-SCEN-020) covering emotional exploration, cognitive reframing, gratitude, boundary setting, self-compassion, grief, anxiety, anger, relationship, career, and more. Each with trigger conditions, prompts, and expected outcomes. (+222 lines) |
| Mar 8 | `57c7d19` | **Scenario seed migration** — Migration 016 to seed all 20 scenario playbooks into the database. (+60 lines) |
| Mar 8 | `5325229` | **PR #2 squash merge** — Tags config and scenario playbooks. (+491 lines, 4 files) |

#### AI Pipeline V2 — Core Services (PR #3)

| Date | Commit | Description |
|------|--------|-------------|
| Mar 8 | `5793c98` | **Prompt templates** — Three prompt template modules for tagging (+50 lines), response generation (+83 lines), and soulsight report generation (+73 lines). Structured prompts with system/user message separation and JSON output formatting. (+206 lines, 4 files) |
| Mar 8 | `315d678` | **Safety module** — Tag validation with crisis detection logic, safety flag checking, and automatic redirect to crisis resources when risk indicators are detected. 5-layer safety architecture. (+47 lines, 2 files) |
| Mar 8 | `88a91f4` | **Tagging service** — Anthropic Haiku-powered tag extraction from journal text. Structured JSON output with retry logic for malformed responses. Persists tags to `entry_tags` table. (+116 lines) |
| Mar 8 | `99faa4b` | **Embedding service** — Voyage AI integration for generating vector embeddings from journal entries. Stores embeddings in pgvector column for similarity search. (+53 lines) |
| Mar 8 | `7baa143` | **Mode selector** — Deterministic mode selection engine with 7 response modes (supportive, exploratory, reframing, celebratory, grounding, deepening, practical) and 4 hint types. Selects mode based on extracted tags, emotional state, and user history. (+121 lines) |
| Mar 8 | `11cdd40` | **Retrieval service** — Context retrieval for response generation: scenario matching based on tags, pgvector similarity search for related past entries, recent entry context window. SQL queries with cosine similarity ranking. (+328 lines) |
| Mar 8 | `ab30aa0` | **Response service** — Anthropic Sonnet-powered coaching response generation. Assembles context from tags, mode, retrieved scenarios, and similar entries. Crisis bypass for immediate safety responses. (+115 lines) |
| Mar 8 | `475dace` | **Pipeline orchestrator** — Wires together all AI services into a single pipeline: Tag → Embed → Mode Select → Retrieve → Respond → WebSocket Push → Soulsight Trigger Check. Error handling with partial result persistence. (+184 lines) |
| Mar 8 | `00afcc8` | **PR #3 squash merge** — All core AI services. (+1,170 lines, 12 files) |

#### AI Pipeline V2 — API Integration (PR #4)

| Date | Commit | Description |
|------|--------|-------------|
| Mar 8 | `f658424` | **Wire pipeline into journal** — Updated journal endpoints to join tags and AI responses in queries, trigger the new AI pipeline on entry creation, and push results via WebSocket. (+121/-26 lines) |
| Mar 8 | `6bc1925` | **AI profile endpoints** — GET/PUT endpoints at `/api/profile/ai-preferences` for reading and updating user AI personalization preferences. (+83 lines, 3 files) |
| Mar 8 | `b8db55e` | **Remove legacy AI service** — Deleted old monolithic `ai_service.py` (-76 lines), fully replaced by the modular `ai/` package. |
| Mar 8 | `fe46214` | **PR #4 squash merge** — API integration layer. (+204/-102 lines, 5 files) |

#### Testing & Validation

| Date | Commit | Description |
|------|--------|-------------|
| Mar 9 | `1a169b8` | **Pipeline test infrastructure** — Comprehensive test framework: `test_pipeline.py` (+514 lines) with end-to-end pipeline tests using mock personas. `personas.json` (+495 lines) defining 10+ mock user personas with varied emotional profiles. Kaggle emotion dataset validation suite (+253 lines) for benchmarking tag extraction accuracy against labeled data. Emotion mapping utility (+133 lines). (+1,395 lines, 6 files) |

#### Admin Dashboard & Operations

| Date | Commit | Description |
|------|--------|-------------|
| Mar 11 | `e9704d5` | **Admin dashboard** — Largest single commit (+2,864 lines, 12 files). Built a full admin dashboard: `admin.html` (+1,251 lines) — single-page admin UI with pipeline debugger (submit test entries, view tag extraction, response generation), configuration editor, and real-time monitoring. `admin.py` API (+900 lines) with admin-only endpoints for pipeline testing, config management, and system status. `config_service.py` (+402 lines) — dynamic AI pipeline configuration: adjustable model parameters, mode thresholds, prompt versions, and feature flags persisted to DB. Tag normalizer for cleaning and validating extracted tags. Migration 017 for config and prompt version tables. |
| Mar 11 | `17a1e3d` | **Pipeline calibration** — Tightened mode selector thresholds for more accurate mode assignment. Fixed retrieval SQL query for scenario matching. Refined tag normalizer rules. Updated tagging prompts (+128 lines of prompt engineering). (+236/-88 lines, 4 files) |
| Mar 11 | `e8dce8a` | **API usage tracking** — Persistent tracking of all Anthropic and Voyage AI API calls with cost estimation. New `ApiUsageLog` model (+23 lines), `usage_tracker.py` service (+45 lines), admin API endpoints (+93 lines), admin UI tab (+107 lines) showing per-model costs, daily/weekly aggregates. Migration 018 for usage log table. (+317 lines, 8 files) |
| Mar 11 | `4774dbc` | **CLAUDE.md update** — Added admin dashboard, config service, and usage tracking documentation. |

---

## Mobile (SoulTalk-Mobile) — 93 Commits

### September 2025 — Project Bootstrap (8 commits)

| Date | Commit | Description |
|------|--------|-------------|
| Sep 6 | `1ebfe14` | **Expo project initialization** — React Native project scaffolded with Expo. Base configuration, dependencies, and project structure. (+23,196 lines, 5 files) |
| Sep 6 | `53e1b36` | **Secure storage utility** — Platform-aware secure storage abstraction for iOS Keychain and Android Keystore. (+52 lines) |
| Sep 6 | `3b775fd` | **Auth service with biometric support** — Authentication service layer with biometric login support (Face ID / fingerprint), token storage, and API client. (+439 lines, 2 files) |
| Sep 6 | `8f90bad` | **Auth & navigation screens** — Initial Login and Register screens with React Navigation stack. (+805 lines, 4 files) |
| Sep 6 | `58bfe13` | **Web favicon** — Favicon for Expo web platform compatibility. |
| Sep 6 | `774fef3` | **Gitignore** — Comprehensive `.gitignore` for React Native Expo projects. (+182 lines) |
| Sep 7 | `6fac22c` | **Token management fixes** — Fixed token refresh flow and secure storage operations. (+88/-32 lines) |
| Sep 16 | `22eb7bf` | **Auth updates** — Major auth flow refactoring with improved state management and navigation. (+854/-402 lines, 12 files) |

---

### January 2026 — Onboarding & Auth UI (39 commits)

#### Onboarding Flow

| Date | Commit | Description |
|------|--------|-------------|
| Jan 26 | `1807e72` | **Build scripts & splash dependency** — Updated Expo build scripts and added `expo-splash-screen`. (+111/-53 lines) |
| Jan 26 | `337260f` | **App icon** — Added app icon asset and updated gitignore for native build artifacts. |
| Jan 26 | `29907b7` | **Onboarding carousel** — Built complete onboarding flow: `OnboardingScreen.tsx` (+160 lines) with horizontal carousel, `TermsScreen.tsx` (+125 lines) for terms acceptance, `WelcomeScreen.tsx` (+167 lines) for post-terms greeting. Reusable `OnboardingSlide.tsx` component (+75 lines). Theme system with `colors.ts` (+36 lines) and `typography.ts` (+72 lines). Mock content data. (+902 lines, 13 files) |
| Jan 26 | `45fddd6` | **Carousel images & slide layout** — Added onboarding illustration assets and updated slide component layout for image display. (+674 lines, 10 files) |
| Jan 26 | `f02322e` | **Gesture handling fix** — Fixed swipe gesture conflicts between carousel navigation and screen transitions. (+77/-91 lines, 6 files) |
| Jan 26 | `d785384` | **SoulTalk logo** — Added brand logo asset. |
| Jan 27 | `b41a669` | **Logo integration** — Added logo to onboarding and welcome screens with proper sizing. (+40/-55 lines) |
| Jan 27 | `e675eb4` | **UI styling pass** — Updated styling across onboarding and auth screens for visual consistency. (+146/-78 lines, 5 files) |
| Jan 31 | `723ef12` | **Character assets** — Added onboarding decoration images and SoulPal character illustrations. (10 files) |
| Jan 31 | `a71ecda` | **Video splash screen** — Replaced static splash with video intro animation using `expo-video`. Fade-out transition to onboarding. (+76/-42 lines, 3 files) |
| Jan 31 | `a0097b2` | **Crossfade carousel with morph transitions** — Rewrote onboarding carousel with advanced animations: crossfade image transitions, morph effects between slides, layered carousel image component (+202 lines), gesture-driven navigation. Massive `OnboardingScreen.tsx` rewrite (+1,026 lines). (+1,143/-220 lines, 3 files) |
| Jan 31 | `cbddab2` | **Animation system** — Animation constants module and reusable `AnimatedButton` component with press/release spring physics using `react-native-reanimated`. (+642 lines, 4 files) |
| Feb 4 | `f71fe27` | **Figma design alignment** — Updated onboarding screens to match final Figma mockups. Layout, spacing, and visual refinements. (+409/-565 lines, 7 files) |

#### Authentication Screens

| Date | Commit | Description |
|------|--------|-------------|
| Jan 27 | `6379336` | **Auth icon asset** — Added animated authentication character icon. |
| Jan 27 | `ee0119f` | **Auth screen redesign** — Complete visual overhaul of Login (+309 lines changed) and Register (+482 lines changed) screens with purple gradient header, form validation with inline errors, and improved layout. (+496/-306 lines, 3 files) |
| Jan 28 | `d9d9bb9` | **Splash & user setup flow** — Added splash screens and post-registration setup flow (name your SoulPal, set preferences). (+595 lines, 5 files) |
| Jan 28 | `8121046` | **Local auth for testing** — Mock authentication mode for UI development without backend dependency. (+87/-21 lines, 4 files) |
| Jan 28 | `7f382bf` | **Slide-up navigation animations** — Custom screen transition animations with slide-up modal effects. (+135/-18 lines) |
| Jan 28 | `96db835` | **OTP verification screens** — Built OTP input screen with auto-advance digit fields and splash-to-landing transition. (+289 lines, 4 files) |
| Jan 28 | `75e391f` | **Email verification before welcome** — Reordered onboarding flow to require email verification before showing welcome screen. |
| Jan 28 | `bc3c747` | **Test OTP validation** — Added hardcoded test OTP for UI testing without email delivery. |
| Jan 28 | `3e3adb3` | **OTP UX improvements** — Refined OTP screen with auto-focus, backspace handling, and paste support. |
| Jan 28 | `43cedca` | **Edensor & Outfit fonts** — Integrated brand fonts: Edensor (display/headers) and Outfit (body text). Typography hierarchy system. (+302/-112 lines, 38 files) |
| Jan 28 | `09d9ab1` | **Peeking auth icon** — Animated SoulPal character peeking into login and signup screens. (+87 lines) |
| Jan 28 | `e668cef` | **Italic fonts for tagline** — Added Edensor italic variants for brand tagline styling. |
| Jan 28 | Various | **Auth screen polish** (8 commits) — Tagline font adjustments, missing screen registrations, logo sizing, auth icon repositioning, slide-up welcome animation, splash fade-out with button press effects, input focus highlighting with validation, colorful social login buttons, SSO button replacement. |
| Jan 29 | `357787f` | **Input UX & auth bugs** — Improved text input behavior (keyboard dismiss, secure entry toggle) and fixed auth flow navigation bugs. (+95/-26 lines, 5 files) |
| Jan 31 | `5603d88` | **Auth screens & context** — Largest auth commit. Built `ForgotPasswordScreen.tsx` (+322 lines), `ResetPasswordConfirmScreen.tsx` (+427 lines), `EmailVerifiedScreen.tsx` (+167 lines). Expanded `AuthContext.tsx` (+169 lines) with full state management. Enhanced `AuthService.ts` (+131 lines) with password reset and OTP flows. (+1,483/-58 lines, 8 files) |
| Jan 31 | `92db8f0` | **Screen layout & animation updates** — Refined layouts and animations across auth and onboarding screens. (+808/-270 lines, 4 files) |
| Jan 31 | `eec6692` | **Custom hooks** — `useKeyboard.ts` for keyboard show/hide tracking with height, `useDeepLinking.ts` for handling `soultalk://` URL scheme. (+142 lines, 3 files) |
| Jan 31 | `8c0ff44` | **Config & theme updates** — Updated app configuration, theme colors (primary purple), and app assets. (+193/-40 lines, 9 files) |

---

### February 2026 — Core Screens & Backend Integration (42 commits)

#### Home Screen

| Date | Commit | Description |
|------|--------|-------------|
| Feb 3 | `c109a18` | **Home screen assets** — Added Figma-exported image assets for home screen cards and decorations. (+146 lines, 8 files) |
| Feb 7 | `1257c8c` | **SoulPal rotation animation** — Fixed SoulPal character rotation animation on the naming/setup screen using `react-native-reanimated`. (+49/-21 lines) |
| Feb 7 | `40be7a5` | **Asset cleanup** — Removed unused Figma export artifacts and updated gitignore. |
| Feb 7 | `565eeb1` | **Setup complete screen** — Updated post-onboarding "setup complete" screen to match Figma design. (+29/-91 lines) |
| Feb 8 | `da6b81a` | **Gradient & SVG support** — Added `expo-linear-gradient` and SVG type declarations. |
| Feb 8 | `19e5414` | **Home screen images** — Added all home screen illustration assets (goal garden, features, etc.). (15 files) |
| Feb 8 | `0224ab0` | **Navigation update** — Updated `AppNavigator.tsx` to include home screen in post-auth navigation stack. |
| Feb 8 | `0d504f0` | **Home screen implementation** — Built the complete home screen: Goal Garden section with interactive plant cards, Affirmation Mirror with character reflections, eye-tracking animation on SoulPal, feature cards (Journal, SoulGate, Library — with "coming soon" locks), custom bottom tab bar with animated active indicator. (+561/-104 lines) |
| Feb 8 | `ba371c7` | **Affirmation mirror characters** — Added 3 mirror character illustration variants. |
| Feb 8 | `7275b13` | **Home layout refinement** — Fixed card sizing, bottom nav positioning, and responsive layout. (+53/-27 lines) |
| Feb 8 | `fd6284d` | **Eye animation & layout** — Refined SoulPal eye-tracking animation behavior, updated layout and assets. (+102/-34 lines) |

#### Settings Screen

| Date | Commit | Description |
|------|--------|-------------|
| Feb 9 | `b552618` | **Settings screen** — Full settings screen with profile section (avatar, name, username), preferences (notifications, dark mode, privacy), and logout button. Custom toggle components. (+282 lines) |
| Feb 9 | `b5ba728` | **Settings refinement** — Added custom toggle switches, pronoun dropdown picker, and navigation to sub-screens. (+186/-29 lines, 4 files) |
| Feb 9 | `fae9582` | **Editable fields & auto-save** — Made profile fields inline-editable with validation and auto-save on blur. (+141/-30 lines) |
| Feb 9 | `392446d` | **Label & spacing fixes** — Refined field labels, focus highlights, and pronoun picker spacing. |
| Feb 9 | `149d46d` | **Toggle track color** — Added color change on toggle track for clearer on/off state. |

#### Profile Screen

| Date | Commit | Description |
|------|--------|-------------|
| Feb 9 | `d2cf8d4` | **Profile screen** — Built profile screen with animated tab bar navigation (crossfade transitions), personality card, SoulPal character, achievement section, and back/settings navigation icons. (+617 lines in `ProfileScreen.tsx`). (+696/-52 lines, 11 files) |
| Feb 9 | `6c25f72` | **Tab transitions** — Added crossfade transitions between profile tabs, fixed nav bar icon visibility and active state styling. (+93/-68 lines) |
| Feb 9 | `1d3e4d1` | **Profile layout refinement** — Refined personality card layout, tab transitions, and navigation UX. (+114/-80 lines) |
| Feb 10 | `2939345` | **Vertical bar & SoulPal alignment** — Added vertical progress bar to profile, aligned SoulPal character with achievement section edge. |
| Feb 10 | `1881d32` | **Smooth tab transitions** — Removed bounce effect on navbar, smoothed tab switching animations. |

#### Journal Screen

| Date | Commit | Description |
|------|--------|-------------|
| Feb 10 | `c13a6f3` | **Journal screen** — Complete journal screen with mood-tagged entry list, SoulPal character with speech bubble, mood filter icons, entry cards with date/mood/preview, and mock data. Added mood icon assets (Happy, Sad, Mad, Normal). `JournalScreen.tsx` (+537 lines). (+643 lines, 12 files) |
| Feb 10 | `91531a4` | **Journal SoulPal** — Updated SoulPal with arms illustration, fixed layout and filtering behavior. (+118/-96 lines) |
| Feb 10 | `2e63bc1` | **SoulPal sizing** — Refined SoulPal size, arm positions, and speech bubble layout. |
| Feb 10 | `9ac0245` | **Multi-select filter pills** — Added tag-style filter pills with multi-select and apply button for journal mood filtering. (+94/-18 lines) |
| Feb 10 | `2a6d5b1` | **Journal entry detail** — Entry detail screen with full journal text, AI analysis display area, and SoulPal mood meter. (+240 lines, 9 files) |

#### Branch Merging & Cleanup

| Date | Commit | Description |
|------|--------|-------------|
| Feb 11 | `ad5d413` | **ForgotPasswordScreen reformat** — Code formatting cleanup. |
| Feb 11 | `3c41056` | **OTP flow, expo-video migration** — Finalized OTP verification flow, migrated from `expo-av` to `expo-video`, removed dead screens. (+8,066/-19,954 lines — large due to dependency lockfile changes) |
| Feb 11 | `2ca526a` | **Asset & auth updates** — Updated assets, Google auth hook, and minor screen refinements. |
| Feb 11 | `ea006e0` | **HomeScreen & Onboarding merge** — Merged home-screen and onboarding feature branches into main. (122 files changed) |
| Feb 11 | `be795e1` | **Merge resolution** — Resolved diverged main with remote home-screen changes. |
| Feb 11 | `5ac47b2` | **Journal screens merge** — Merged journal screens feature branch with mood entries, filtering, and entry details. (+979 lines, 22 files) |
| Feb 12 | `ead260a` | **AppStack fix** — Fixed navigation stack ordering after branch merges. |
| Feb 12 | `17d4a67` | **Auth validation fix** — Matched login password validation rules with registration, fixed token refresh infinite loop, updated setup complete text. |
| Feb 12 | `ff5bd82` | **Gitignore update** — Added `app.json` to gitignore and removed from tracking (managed by `app.config.js`). |

#### Backend Integration

| Date | Commit | Description |
|------|--------|-------------|
| Feb 17 | `89a5099` | **Journal CRUD + WebSocket + AI display** — Full backend integration: `JournalContext.tsx` (+111 lines) for state management, `WebSocketContext.tsx` (+63 lines) for real-time updates, `useWebSocket.ts` hook (+124 lines) for connection management with auto-reconnect, `CreateJournalScreen.tsx` (+258 lines) for new entry creation, `JournalService.ts` (+121 lines) for API calls. Updated `JournalEntryScreen.tsx` (+208 lines) to display AI analysis results pushed via WebSocket. (+1,046/-70 lines, 9 files) |
| Feb 17 | `3ffeeeb` | **EAS config** — Added Expo Application Services configuration with `app.config.js` for environment-based API URL switching between dev and production. (+47 lines) |
| Feb 17 | `7bc8114` | **Polling fallback** — Added polling retry logic as fallback when WebSocket connection fails, retrying until AI processing completes. |
| Feb 17 | `1ba12ef` | **Settings → backend** — Wired settings screen to save profile changes to backend via `PUT /auth/me`. (+102/-36 lines) |
| Feb 17 | `405e967` | **Onboarding animation fix** — Fixed animation reset on screen revisit, removed peeking icon, prevented terms screen from reappearing after acceptance. |
| Feb 18 | `a1e6850` | **Setup flow fix** — Fixed setup flow for new signups, added iOS password autofill support via `textContentType`. |
| Feb 18 | `4523c62` | **App icon** — Added production app icon asset. |
| Feb 18 | `8b2eb59` | **Bug fix sweep** — Removed SSO button (not yet implemented), fixed status bar appearance, added `SoulTalkLoader` component (+57 lines), added "coming soon" overlays on locked features, journal mood filters, mood state persistence, username availability check. (+418/-76 lines, 13 files) |

#### Gamification & Voice Features

| Date | Commit | Description |
|------|--------|-------------|
| Feb 21 | `0b84cc9` | **Expanded moods, SoulBar, streaks** — Integrated backend gamification: expanded mood picker (12+ moods), SoulBar progress display on home screen (+77 lines), streak counter, AI analysis fields (tags, coaching response) on entry detail screen (+147 lines). Updated `JournalContext.tsx` (+101 lines) and `JournalService.ts` (+76 lines) for new API fields. (+583/-67 lines, 6 files) |
| Feb 21 | `330c221` | **Voice recording & drafts** — Built voice journaling: `VoiceRecordingIndicator.tsx` (+129 lines) with animated waveform, `useVoiceRecording.ts` hook (+93 lines) for audio capture. Auto-save drafts via `useAutoSave.ts` hook (+57 lines) saving every 30 seconds. `InspirationDropdown.tsx` (+115 lines) for writing prompt suggestions. `SaveAnimation.tsx` (+190 lines) with Lottie-style save confirmation. (+621 lines, 7 files) |
| Feb 21 | `a79a1ad` | **Change password & deep linking** — Built change password screen. Added `soultalk://` deep link handling for password reset emails. Blocked social auth users from password change. (+352/-22 lines, 7 files) |
| Feb 21 | `9feec48` | **UI fixes** — Minor UI refinements and gitignore updates. (+80/-125 lines) |
| Feb 21 | `34ab1b8` | **Display name greeting** — Home screen greeting uses `display_first_name`. Username locked after first set. (+21/-13 lines) |
| Feb 23 | `c089ae8` | **On-device speech recognition** — Replaced server-side Whisper with on-device speech recognition for zero-latency voice journaling. Built `JournalLoader.tsx` component (+191 lines). Major refactor: simplified `CreateJournalScreen.tsx` (-156 lines), cleaned up `JournalEntryScreen.tsx` (-240 lines), `JournalScreen.tsx` (-202 lines), `SettingsScreen.tsx` (-106 lines). Rewrote `useVoiceRecording.ts` (+147/-lines) for native speech API. Net code reduction. (+522/-739 lines, 13 files) |
| Feb 23 | `f7bd8ac` | **Production URL migration** — Replaced all `localhost` fallback URLs with production API endpoints. |
| Feb 24 | `b5f797f` | **Voice wave bars** — Auto-restart speech recognition on silence detection. Added animated volume wave bar visualization during recording. (+275/-86 lines) |
| Feb 24 | `8077e62` | **SoulBar & mood refresh** — Refetch SoulBar progress and mood data on screen focus. Used authenticated requests for mood API. (+31/-32 lines) |
| Feb 24 | `aa51721` | **SoulPal safe area** — Aligned SoulPal arm positions with safe area insets on journal screen. |

#### Documentation

### March 2026 — Documentation (1 commit)

| Date | Commit | Description |
|------|--------|-------------|
| Mar 6 | `54d54fc` | **CLAUDE.md** — Added comprehensive mobile architecture reference document. (+133 lines) |

---

## Web Landing Page (Soultalk) — 46 Commits

### November 2025 — Website V1 & V2 (19 commits)

#### Initial Website Build

| Date | Commit | Description |
|------|--------|-------------|
| Nov 19 | `bd907d3` | **Complete SoulTalk website** — Full marketing website with enhanced UX and mobile responsiveness: React + Vite SPA with fullpage scroll sections, SCSS modules, component library, responsive layouts, and content structure. (+7,483 lines, 53 files) |
| Nov 19 | `d42adcc` | **Original website with fullpage scrolling** — Alternative version with fullpage.js-style scrolling and enhanced design system. (+6,568 lines, 45 files) |
| Nov 19 | `1a6faa3` | **Content extraction** — Moved hardcoded text into content file for maintainability. (+216/-146 lines, 8 files) |
| Nov 20 | `ebe1923` | **Icon update** — Changed site favicon/icon. |

#### CI/CD & Email Integration

| Date | Commit | Description |
|------|--------|-------------|
| Nov 20 | `99b6e82` | **GitHub Actions workflow** — Deployment workflow for automated web content publishing. (+101 lines) |
| Nov 20 | `8b32035` | **Workflow test** — Added icon and tested deployment workflow. |
| Nov 20 | `385d1d0` | **Workflow fix** — Fixed workflow YAML syntax. |
| Nov 20 | `a8485eb` | **More workflow fixes** — Additional workflow corrections. |
| Nov 20 | `32051fc` | **Content update** — Updated marketing copy and section text. (+49/-33 lines) |
| Nov 21 | `5919aa3` | **EmailOctopus integration** — Built email subscription form with EmailOctopus API integration for mailing list capture. Added form validation, success/error states, and API client. (+345 lines, 5 files) |
| Nov 21 | `51d3aa9` | **EmailOctopus refinement** — Updated API implementation details. |
| Nov 21 | `9d3bf54` | **Deploy workflow update** — Added deployment steps. (+15 lines) |
| Nov 21 | `b770c15` | **Express.js server** — Added Express.js backend to manage API calls (EmailOctopus) server-side, avoiding CORS issues and API key exposure. Health check endpoint. (+293/-20 lines, 4 files) |
| Nov 21 | `df61929` | **Health API** — Added `/health` endpoint for monitoring. (+9 lines) |
| Nov 22 | `392f765` | **Restart command** — Added restart script to package.json for server management. (+986 lines — includes lockfile) |
| Nov 22 | `cdebbe5` | **Deploy workflow simplification** — Simplified deployment workflow. (+5/-26 lines) |
| Nov 22 | `b9fc13c` | **Branch merge** — Merged remote version2 changes. |
| Nov 22 | `9a26f92` | **Infra content sync** — Refined GitHub Actions to use infrastructure repo as single source for web content. (+12 lines) |
| Nov 22 | `271dc98` | **Restart command update** — Updated PM2 restart command. |

---

### December 2025 — V3 Typography & Design Overhaul (21 commits)

#### Responsive Design & Styling

| Date | Commit | Description |
|------|--------|-------------|
| Dec 23 | `c08dcf5` | **UI styling overhaul** — Comprehensive responsive design update across 20 files: section layouts, breakpoints, spacing, and mobile adaptations. (+680/-245 lines) |
| Dec 23 | `7cdb9e9` | **PR #1 merge** — Merged styling overhaul. |
| Dec 23 | `8f3f48b` | **Hero section & navigation** — Updated Hero section layout and sidebar navigation behavior. (+16/-22 lines) |

#### Typography & Brand Fonts

| Date | Commit | Description |
|------|--------|-------------|
| Dec 23 | `1d9c3cc` | **Edensor font family** — Implemented Edensor brand font across the entire website with complete typography hierarchy: display headings, section titles, body text, captions. Added font files and `@font-face` declarations. Updated all components. (+2,912/-54 lines, 30 files) |
| Dec 23 | `1dd793f` | **Hero text & icon colors** — Updated feature text and icon colors in Hero section. |
| Dec 23 | `3410e83` | **Responsive fixes** — Fixed layout issues on tablet and mobile breakpoints. |
| Dec 23 | `3aa16c0` | **Mobile overlay fix** — Ensured full overlay coverage on mobile for Footer and Journal sections. |
| Dec 23 | `245abed` | **PR #2 merge** — Merged typography and font changes. |

#### Visual Enhancements

| Date | Commit | Description |
|------|--------|-------------|
| Dec 23 | `a0cc742` | **Sidebar scroll fix** — Fixed sidebar navigation to correctly scroll to target sections. (+9/-5 lines) |
| Dec 23 | `46b1ad5` | **Gradient text** — Added CSS gradient text effects to section headers. (+46/-20 lines, 5 files) |
| Dec 23 | `6efd35e` | **CTA button icons** — Added icons to call-to-action buttons in Journal and Footer sections. (+34 lines, 4 files) |
| Dec 23 | `50ada23` | **Typography & footer styling** — Enhanced typography consistency, added gradient text to more elements, improved footer styling. (+100/-69 lines, 10 files) |
| Dec 23 | `fefe654` | **Hero mobile responsiveness** — Improved Hero section layout on mobile devices. |
| Dec 23 | `a00f97a` | **SoulPal tooltip** — Rewrote SoulPal character tooltip from first-person perspective with improved readability. |
| Dec 23 | `cff6e05` | **Tooltip refinement** — Shortened tooltip message and added quotation marks. |
| Dec 24 | `ff9c27a` | **V2→V3 merge** — Merged version2 branch into version3. |
| Dec 24 | `88c9145` | **PR #3 merge** — V3 typography, styling, and layout bug fixes squash merge. (+3,101/-155 lines, 42 files) |
| Dec 29 | `9d0d334` | **CSS fixes** — Minor CSS adjustments. (+14/-7 lines) |
| Dec 29 | `a211fbd` | **More CSS fixes** — Additional CSS refinements. |
| Dec 29 | `148597d` | **Typography style improvement** — Fine-tuned typography rendering. |
| Dec 29 | `66f0fe2` | **Disable action** — Disabled a GitHub Action temporarily. |
| Dec 29 | `54f23d0` | **Button improvement** — Enhanced button styling and hover states. |

---

### February/March 2026 — Animation & Content Updates (6 commits)

| Date | Commit | Description |
|------|--------|-------------|
| Feb 11 | `e6807b7` | **Character morph animation** — Replaced static Lottie hero with interactive SoulPal character morph animation. Updated marketing content copy. (+400/-45 lines, 20 files) |
| Feb 11 | `8094b64` | **Action fix** — Re-enabled and fixed GitHub Actions workflow. (+12/-3 lines) |
| Feb 11 | `53c90f8` | **Further action fixes** — Additional CI/CD corrections. |
| Feb 11 | `9e93061` | **Restore restart command** — Restored PM2 restart command in package.json. |
| Feb 26 | `0f70352` | **Lottie SoulPal hero** — Added Lottie-based SoulPal hero animations, redesigned feature cards to horizontal layout, and fixed hero section spacing. (+242/-130 lines, 14 files) |
| Mar 6 | `5149949` | **CLAUDE.md** — Updated architecture reference document for web repo. (+63/-53 lines) |

---

## Infrastructure (SoulTalk-Infra) — 15 Commits

### September 2025 — Docker Foundation (1 commit)

| Date | Commit | Description |
|------|--------|-------------|
| Sep 7 | `8cbca67` | **Docker infrastructure** — Complete local development infrastructure: `docker-compose.yml` with PostgreSQL, Keycloak 23.0 (2 realm clients), Redis, Mailhog for email testing, and backend service. Helper scripts for start/stop/reset. Keycloak realm JSON export with pre-configured clients for backend and mobile. Environment templates. (+550 lines, 14 files) |

### November 2025 — CI/CD & Content Sync (8 commits)

| Date | Commit | Description |
|------|--------|-------------|
| Nov 20 | `8497073` | **Content sync workflow** — GitHub Actions workflow to sync web content from infra repo to web repo, establishing infra as single source of truth for marketing copy. (+213 lines, 2 files) |
| Nov 20 | `3eb6d9f` | **Gitignore** — Added `.gitignore`. |
| Nov 20 | `66b65aa` | **Remove ignored files** — Cleaned tracked files that should have been ignored. (-77 lines) |
| Nov 20 | `1727c44` | **Workflow fix** — Fixed content sync workflow YAML. |
| Nov 20 | `83850d3` | **Workflow update** — Updated sync-content workflow. |
| Nov 20 | `54cc279` | **Content update** — Updated marketing content text. |
| Nov 20 | `98f5212` | **Content restore** — Restored text formatting in content file. (+49/-33 lines) |
| Nov 21 | `df6fced` | **Web content update** — Updated web content. |

### February/March 2026 — Updates (6 commits)

| Date | Commit | Description |
|------|--------|-------------|
| Feb 10 | `7c1424b` | **Infrastructure updates** — Updated Docker configuration and content. |
| Feb 11 | `3fa671d` | **Action fix** — Fixed GitHub Actions workflow. (+8/-2 lines) |
| Feb 11 | `b1b3ed8` | **Content update** — Updated `content.ts`. |
| Feb 11 | `e703af4` | **Content restore** — Restored content.ts after accidental change. |
| Feb 11 | `8220c91` | **Copy change** — Updated "receive insights" marketing copy. |
| Mar 6 | `5716aae` | **CLAUDE.md** — Added infrastructure reference document. (+21 lines) |

---

## Documentation (SoulTalk-Docs)

### Committed (2 commits)

| Date | Commit | Description |
|------|--------|-------------|
| Sep 7 | `e1e6711` | **Initial documentation** — Consolidated project documentation: development setup, infrastructure guide, SMTP configuration, and README index. (+1,011 lines, 5 files) |
| Sep 7 | `1c5bc40` | **Documentation fixes** — Fixed outdated information and updated file paths across docs. (+317/-559 lines, 4 files) |

### Uncommitted (Major Restructuring)

The documentation repo has been significantly restructured from flat files into organized subdirectories with new content:

| Directory | Document | Description |
|-----------|----------|-------------|
| `architecture/` | `overview.md` | System architecture diagram, tech stack, auth flow, data models, coding conventions |
| `architecture/` | `ai-pipeline-v2.md` | Comprehensive AI pipeline V2 architecture document (~1,354 lines): 7-step immediate response pipeline, Soulsight generation, dashboard analytics, 6 new DB tables, 9 service modules, 6-phase implementation plan, cost estimation (~$0.02/entry), 5-layer safety architecture |
| `deployment/` | `production.md` | Production environment variables, deploy checklist, Nginx config, deep linking setup, EAS/TestFlight build steps |
| `deployment/` | `troubleshooting.md` | Common errors (405, 502), debugging steps, quick fix commands |
| `logs/` | `time-estimates.md` | Detailed breakdown of 77 hours of development across 19 work items: Mobile 49 hrs, Backend 21.5 hrs, Web 6.5 hrs |
| `logs/` | `work-summary-feb12-19.md` | Weekly work log (Feb 12–19): ~32 hours covering journal backend, production deployment, mobile journal, gamification, voice-to-text, TestFlight build |
| `product/` | `product-bible.md` | Full product specification: all screens, SoulBar calculation, badge categories, subscription pricing ($9.99/mo), Phase 2 features, data privacy, glossary |
| `product/` | `journal-plan.md` | 8-phase journal implementation plan: DB model → schemas → service → API → mobile service → context → create screen → wire screens |
| `setup/` | `development.md` | Local development guide: Docker quick start, service URLs, auth flow testing |
| `setup/` | `infrastructure.md` | Docker Compose services (PostgreSQL, Redis, Backend, Mailhog), helper scripts |
| `setup/` | `email-setup.md` | SMTP config for dev (Mailhog) and prod (Gmail/SendGrid) |

---

## Summary & Impact

### Overall Numbers

| Metric | Backend | Mobile | Web | Infra | Docs | Total |
|--------|---------|--------|-----|-------|------|-------|
| Commits | 60 | 93 | 46 | 15 | 2 | **216** |
| Lines Added (est.) | ~15,000+ | ~20,000+ | ~7,500+ | ~900+ | ~1,300+ | **~44,700+** |
| Files Touched | 150+ | 200+ | 100+ | 30+ | 15+ | **495+** |

### Development Timeline

| Phase | Period | Focus |
|-------|--------|-------|
| **Phase 1 — Prototype** | Sep 2025 | Backend with Keycloak auth, mobile scaffolding with Expo, Docker infrastructure, initial documentation |
| **Phase 2 — Landing Page** | Nov–Dec 2025 | Marketing website V1→V3 iterations, EmailOctopus email capture, Edensor brand typography, CI/CD with GitHub Actions |
| **Phase 3 — Mobile App** | Jan 2026 | Onboarding carousel with morph transitions, video splash, auth screens (Login, Register, OTP, Forgot Password, Reset), brand fonts, animation system |
| **Phase 4 — Full Stack MVP** | Feb 2026 | Custom JWT auth replacing Keycloak, journal CRUD with OpenAI tagging, WebSocket real-time updates, gamification (streaks, SoulBar), voice recording with on-device speech recognition, home/journal/profile/settings screens, production deployment, TestFlight build |
| **Phase 5 — AI Pipeline V2** | Mar 2026 | Anthropic Claude (Haiku + Sonnet), Voyage AI embeddings with pgvector, 7-step AI pipeline, 20 scenario playbooks, 12-section tag schema, safety architecture, admin dashboard with pipeline debugger, API usage tracking, test infrastructure with mock personas |

### Major Feature Areas Delivered

| Feature | Scope | Description |
|---------|-------|-------------|
| **Custom JWT Authentication** | Backend + Mobile | Complete auth system: registration, login, JWT (15-min access / 30-day refresh), bcrypt passwords, OTP email verification, Google/Facebook OAuth, password reset with `soultalk://` deep linking, biometric support |
| **Journal System** | Backend + Mobile | Full CRUD with AI-powered analysis, mood tagging, date/mood filtering, 1-per-day non-draft limit, auto-save drafts every 30 seconds |
| **AI Pipeline V2** | Backend | 7-step pipeline: Haiku tagging (12 tag sections) → Voyage AI embedding → deterministic mode selection (7 modes) → pgvector retrieval (scenarios + similar entries) → Sonnet response generation → WebSocket push → Soulsight trigger. 5-layer safety architecture with crisis detection |
| **Voice Journaling** | Mobile | On-device speech recognition (zero-latency), animated volume wave bars, auto-restart on silence, replaced server-side Whisper |
| **Gamification** | Backend + Mobile | Streaks with daily tracking, SoulBar with 6-point fill cycle (float precision), expanded mood system (12+ moods), inspiration prompts |
| **Real-Time Updates** | Backend + Mobile | WebSocket connection with keepalive pings, multi-device support, polling fallback, AI analysis push notifications |
| **Onboarding Experience** | Mobile | Video splash screen, crossfade carousel with morph transitions, animated SoulPal character, terms acceptance, email verification, SoulPal naming, setup complete flow |
| **Home Screen** | Mobile | Goal Garden with interactive plant cards, Affirmation Mirror, SoulPal eye-tracking animation, feature cards with coming-soon locks, custom bottom tab bar |
| **Profile & Settings** | Mobile | Animated tab bar navigation, personality card, achievement section, inline-editable profile fields with auto-save, custom toggles, pronoun picker, backend sync |
| **Admin Dashboard** | Backend | Pipeline debugger for test entries, dynamic AI config editor, tag normalizer, API usage tracking with cost estimation, real-time monitoring |
| **Test Infrastructure** | Backend | End-to-end pipeline tests, 10+ mock personas, Kaggle emotion dataset validation for tag accuracy benchmarking |
| **Marketing Website** | Web | 3 version iterations, fullpage scroll sections, Edensor brand typography, EmailOctopus email capture, Express.js API proxy, Lottie SoulPal animations, mobile-responsive design |
| **Production Deployment** | Backend + Infra | Docker Compose (PostgreSQL, Redis, Mailhog), production Docker config, Nginx, SSL, TrustedHostMiddleware, EAS builds, GitHub Actions CI/CD |
| **Product Documentation** | Docs | Product bible, AI pipeline architecture spec (~1,354 lines), development/deployment guides, time estimates, work logs |

### Estimated Development Hours

Based on tracked work logs (77 hrs pre-Feb 12 + 32 hrs Feb 12–19 = 109 hrs tracked) and estimates for untracked periods:

| Area | Hours | Source |
|------|-------|--------|
| Mobile — Auth UI | 9 | tracked |
| Mobile — Onboarding Flow | 11 | tracked |
| Mobile — Post-Login Setup | 8.5 | tracked |
| Mobile — Home Screen | 7 | tracked |
| Mobile — Journal System | 5 | tracked |
| Mobile — Profile & Settings | 5 | tracked |
| Mobile — Theme System & Design Tokens | 1 | tracked |
| Mobile — Bug Fixes & Maintenance | 2.5 | tracked |
| Mobile — Journal CRUD + WebSocket Integration | 2 | tracked |
| Mobile — Journal Enhancements (voice, drafts, moods) | 3 | tracked |
| Mobile — Screen Updates & Polish | 3.25 | tracked |
| Mobile — EAS/TestFlight Config | 0.75 | tracked |
| Mobile — On-Device Speech Recognition & Voice UX (Feb 23–24) | 6 | estimated |
| Mobile — Change Password, Deep Linking (Feb 21) | 3 | estimated |
| Backend — DB Models & Migrations | 4 | tracked |
| Backend — Core Auth Services | 4.5 | tracked |
| Backend — Email Verification Service | 1 | tracked |
| Backend — Social Auth (Google + Facebook) | 4.5 | tracked |
| Backend — Keycloak to Custom Auth Migration | 2.5 | tracked |
| Backend — Config & Dependencies | 1 | tracked |
| Backend — OTP Verification + Password Complexity | 3.5 | tracked |
| Backend — Journal CRUD + AI + WebSocket | 4.25 | tracked |
| Backend — Production Deployment & Infra | 3.5 | tracked |
| Backend — Bug Fixes & Polish | 2.25 | tracked |
| Backend — Gamification (Streaks, SoulBar, Drafts) | 2.5 | tracked |
| Backend — Transcription & Prompts API | 0.75 | tracked |
| Backend — User Profile & WebSocket | 1.75 | tracked |
| Backend — 1-per-day Limit, SoulBar Float, Mood Bar (Feb 23) | 3 | estimated |
| Backend — Security Audit Fixes (Feb 24) | 2 | estimated |
| Backend — Anthropic Migration (Mar 6) | 2 | estimated |
| Backend — AI Pipeline V2: Database Layer (Mar 8) | 6 | estimated |
| Backend — AI Pipeline V2: Tags & Config (Mar 8) | 4 | estimated |
| Backend — AI Pipeline V2: Core Services (Mar 8) | 10 | estimated |
| Backend — AI Pipeline V2: API Integration (Mar 8) | 3 | estimated |
| Backend — Test Infrastructure & Kaggle Validation (Mar 9) | 6 | estimated |
| Backend — Admin Dashboard + Pipeline Debugger (Mar 11) | 10 | estimated |
| Backend — Pipeline Calibration & Prompt Engineering (Mar 11) | 4 | estimated |
| Backend — API Usage Tracking (Mar 11) | 3 | estimated |
| Web — Website V1 & V2 (Nov 2025) | 12 | estimated |
| Web — V3 Typography & Design Overhaul (Dec 2025) | 10 | estimated |
| Web — Hero Animation Overhaul (Feb 2026) | 6 | tracked |
| Web — Lottie Animations & Layout (Feb 26) | 3 | estimated |
| Web — CI/CD Pipeline Fixes | 0.5 | tracked |
| Infra — Docker Compose Setup (Sep 2025) | 3 | estimated |
| Infra — CI/CD & Content Sync Workflows (Nov 2025) | 3 | estimated |
| Infra — Updates (Feb–Mar 2026) | 1 | estimated |
| Docs — Architecture, Setup, Deployment Guides | 4 | estimated |
| Docs — AI Pipeline V2 Architecture Spec (~1,354 lines) | 6 | estimated |
| Docs — Product Bible | 4 | estimated |
| Non-Code — OpenAI Setup & Research | 1 | tracked |
| Non-Code — Apple Developer / TestFlight | 3 | tracked |
| Non-Code — Server Deployment (DNS, SSL, VPS) | 1.5 | tracked |
| Non-Code — Product Planning & Design | 4 | estimated |
| Non-Code — Research & Planning | 1 | tracked |
| | |
| **Mobile Subtotal** | **~67 hrs** | |
| **Backend Subtotal** | **~83.5 hrs** | |
| **Web Subtotal** | **~31.5 hrs** | |
| **Infra Subtotal** | **~7 hrs** | |
| **Docs Subtotal** | **~14 hrs** | |
| **Non-Code Subtotal** | **~10.5 hrs** | |
| **Grand Total** | **~200 hrs** | |
