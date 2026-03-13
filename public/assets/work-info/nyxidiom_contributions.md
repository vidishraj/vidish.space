# Nyxidiom — Paka Raspberry Contribution Summary

**Contributor:** Vidish Raj
**Client:** Nyxidiom
**Repository:** Paka_raspberry
**Period:** July 17, 2025 — October 28, 2025
**Total Commits:** 71

---

## Table of Contents

1. [July 2025 — Foundation & Architecture](#july-2025--foundation--architecture-18-commits)
2. [August 2025 — API Integration, Stabilization & Hardware](#august-2025--api-integration-stabilization--hardware-32-commits)
3. [September 2025 — Protocol Overhaul & Secure Mode](#september-2025--protocol-overhaul--secure-mode-10-commits)
4. [October 2025 — QR Fixes & Sequence Hardening](#october-2025--qr-fixes--sequence-hardening-11-commits)
5. [Summary & Impact](#summary--impact)

---

## July 2025 — Foundation & Architecture (18 commits)

### Project Bootstrap (Jul 17)

| Date | Commit | Description |
|------|--------|-------------|
| Jul 17 | `443b530` | **Database layer** — Built the entire persistence backbone: SQLAlchemy models (92 lines) defining the schema, connection manager (217 lines) handling database lifecycle and pooling, comprehensive CRUD module (427 lines) with create/read/update/delete for all models. (+739 lines, 4 files) |
| Jul 17 | `787f369` | **Configuration subsystem** — Config manager (85 lines) for `.env` file loading, validator (83 lines) for required config checks, logging configuration (60 lines) for structured logging. (+242 lines, 4 files) |
| Jul 17 | `7a912d1` | **UART communication layer** — First version of serial communication with the STM microcontroller: message encoding, decoding, and validation (324 lines). Handles the Raspberry Pi side of the UART protocol. (+327 lines, 2 files) |

### Rapid Feature Build-Out (Jul 18)

| Date | Commit | Description |
|------|--------|-------------|
| Jul 18 | `3c3fe96` | **Config refinement** — Added new environment variable definitions and additional validation rules for integration requirements. |
| Jul 18 | `a63eab8` | **UART handler refactor** — Renamed `simple_uart.py` → `uart.py`, substantial rewrite of communication logic (104 insertions, 101 deletions) shifting from prototype to permanent implementation. |
| Jul 18 | `35bde46` | **QR code scanning module** — Scanner (188 lines) for camera/QR device interface, processor (187 lines) for interpreting decoded QR data and extracting container information. Placeholders for real hardware with microcontroller hookup for testing. (+388 lines, 3 files) |
| Jul 18 | `8eb979e` | **Sequence state machine** — First version of operational sequences (250 lines) mapping the state machine / workflow logic that orchestrates hardware and software steps: scan QR, validate container, communicate with STM, update database. (+263 lines, 2 files) |
| Jul 18 | `0e7d748` | **Query bug fixes** — Fixed SQL query parameters, column references, and filter conditions in the CRUD layer. |
| Jul 18 | `9a54c0d` | **Audit logging subsystem** — Structured audit trail (269 lines) for tracking system events, user actions, and operational decisions. (+272 lines, 2 files) |
| Jul 18 | `ecab5cb` | **Hardware manager** — Abstraction layer (215 lines) for interacting with physical hardware components: sensors, actuators, GPIO pins on the Raspberry Pi. (+231 lines, 2 files) |
| Jul 18 | `c8bdda4` | **Main entry point & project scaffolding** — Main application (`main.py`, 346 lines) wiring all subsystems together. Comprehensive README (277 lines), `.gitignore` (116 lines), `env.template` (33 lines), `requirements.txt`. (+781 lines, 6 files) |
| Jul 18 | `05cbb71` | **Developer tooling** — STM32 hardware simulator (288 lines) mimicking microcontroller responses over virtual COM port for desktop testing. App launcher script, database viewer utility (135 lines), shared UART helpers. (+535 lines, 4 files) |
| Jul 18 | `408827e` | **Import fix** — Corrected import path in sequences module. |
| Jul 18 | `5ee223a` | **Remove legacy simulation mode** — Streamlined startup flow by removing old simulation code path from main. Refactored UART handler and app runner. |
| Jul 18 | `65882e3` | **README expansion** — Added 45 lines of setup instructions and architecture documentation. |
| Jul 18 | `868366f` | **README correction** — Minor typo/formatting fix. |
| Jul 18 | `294c605` | **README cleanup** — Removed stray line. |

### Documentation (Jul 19)

| Date | Commit | Description |
|------|--------|-------------|
| Jul 19 | `9c33ac2` | **README update** — Quick fix via GitHub web UI. |

---

## August 2025 — API Integration, Stabilization & Hardware (32 commits)

### Architecture Simplification (Aug 6)

| Date | Commit | Description |
|------|--------|-------------|
| Aug 6 | `9d052c4` | **Fix env variable loading** — Corrected `.env` parsing in config manager, added new dependency. |
| Aug 6 | `e1eb885` | **Remove sequences module** — Major refactor: eliminated the separate `sequences` module entirely (250+ lines deleted), moved sequence orchestration logic directly into `src/uart/uart.py` (+207 lines). Flattened architecture by removing unnecessary abstraction layer. |
| Aug 6 | `dd7c564` | **Improve Sequence 1** — Added 49 lines of refined logic for the container deposit workflow: better error handling, state transitions, and STM communication patterns. |
| Aug 6 | `805ceda` | **Improve Sequence 2** — Added 80 lines of refined logic for the container retrieval/validation workflow with more robust handling. |
| Aug 6 | `51c3275` | **API integration layer** — Built HTTP client (`client.py`, 90 lines) for backend server communication and API service (`service.py`, 247 lines) implementing health check, sync, and container validation endpoints. Added 47 new CRUD methods. Wired API layer into main. (+402 lines, 6 files) |
| Aug 6 | `7ee9738` | **Remove hardware module** — Deleted separate hardware manager (231 lines), absorbed hardware interaction logic into `src/uart/uart.py` (+158 lines). Consolidated UART communication and hardware control into single module. |

### QR Scanner & UART Specs (Aug 7)

| Date | Commit | Description |
|------|--------|-------------|
| Aug 7 | `4ae3a12` | **Complete QR scanner** — Replaced placeholder/test QR scanner with production-ready implementation. Scanner rewritten (+343/-188 lines), processor overhauled (+212/-187 lines). Added image processing dependencies (OpenCV, pyzbar). (+385 lines, 4 files) |
| Aug 7 | `fcdde6a` | **UART protocol refinement** — Major rewrite of `uart.py` (+384/-113 lines) aligning message format, command codes, and response parsing exactly with the hardware specification. Added formal protocol specification as `specs.json` (145 lines). |
| Aug 7 | `fdbdb3d` | **Config extension** — Added new environment variables for API endpoints, keys, and timeouts. Updated API client to read from config instead of hardcoded values. |
| Aug 7 | `57849c1` | **Hardware simulator overhaul** — Extensively expanded STM32 simulator (+654 lines rewrite) to accurately mimic real hardware behavior based on refined UART specs. Added testing bypass shortcuts. (+523 lines, 3 files) |
| Aug 7 | `7c9ae84` | **README update** — Updated module structure docs to reflect architecture changes (removed sequences/hardware modules, added API layer). |
| Aug 7 | `e76ae66` | **Env template update** — Minor variable update. |

### Sequence 3 & Sync Mechanism (Aug 16)

| Date | Commit | Description |
|------|--------|-------------|
| Aug 16 | `9b9f56d` | **Sequence 3 rework** — Complete rewrite of container QR validation flow. Changed from local-only validation to server-first approach with offline fallback: tries HTTP validation first, falls back to local DB check if server unreachable. Added audit logging throughout. QR scanner simplified with `_process_scan()` routing. (+268 lines, 3 files) |
| Aug 16 | `363387f` | **QR scanner library migration** — Migrated from `evdev` (Linux-only) to `pynput` (cross-platform). Replaced entire device-discovery and keycode-mapping approach with keyboard listener. Added enable/disable scanning toggles. Updated port config to use environment variables. (+492 lines, 7 files) |
| Aug 16 | `7dd0ff9` | **Container sync overwrite** — Changed sync strategy from incremental updates to full table overwrite: `delete_all()` then bulk insert, ensuring local DB mirrors server state exactly. |
| Aug 16 | `26c9f2b` | **Sync CRUD operations** — Added `delete_all()` and `create_with_id()` methods. Fixed sync timestamp to read from DB on each sync. Fixed QR code slicing bug. |
| Aug 16 | `12662bc` | **Audit logger fixes** — Handled FOREIGN KEY constraint failures gracefully (retry with `container_id=None`). Added `log_qr_scan()` method. Fixed server response parsing to match actual API format (`validReturn`/`containerData`). |
| Aug 16 | `db2295d` | **Remove debug log** — Removed stray `logger.warning(response)` dumping raw response. |
| Aug 16 | `c09914d` | **SQLite boolean fix** — Fixed boolean storage: explicitly convert to `1`/`0` integers since SQLite has no native boolean type. Fixed field name casing (`is_returnable` vs `isReturnable`). |
| Aug 16 | `7b44c2a` | **Device status on healthcheck** — Enhanced healthcheck to extract and apply `active` status from server, allowing remote device activation/deactivation. |

### Sync Refinement & Field Fixes (Aug 17)

| Date | Commit | Description |
|------|--------|-------------|
| Aug 17 | `3fd23a4` | **Field rename** — Changed container due date field from `DateTime` to `dueTime` to match actual API response format. |
| Aug 17 | `7f92f31` | **Bearer token handling** — Automatically prepends "Bearer " to API key in config, simplifying environment setup. |

### Device Inactive Mode & Sync Finalization (Aug 19–25)

| Date | Commit | Description |
|------|--------|-------------|
| Aug 19 | `4830bba` | **Reduce log noise** — Removed excessive audit logging from QR validation pipeline. Kept only final accept/reject decisions. (-41 lines) |
| Aug 19 | `82eef43` | **Merge from remote** — Pulled in README changes from remote main. |
| Aug 19 | `799a6c5` | **Device inactive mode** — Full inactive/active device lifecycle. When server marks device inactive via healthcheck: sets all lights to red, disables QR scanning, ignores button presses and sensor changes. Callback system between APIService and UART manager. Startup checks last known status. (+178 lines, 3 files) |
| Aug 19 | `29fcf00` | **Fix initial sync** — Changed initial sync timestamp from current time to Unix epoch so ALL existing audit logs are synced on first run. |
| Aug 19 | `c3f29bb` | **Response parsing fix** — Fixed server response field access from nested `response['data']['validReturn']` to direct `response['validReturn']`. |
| Aug 21 | `95d52de` | **Initial sync: send all local data** — Rewrote initial sync to send all local containers and audit logs to server. Added timestamp formatting to match server expectations. |
| Aug 21 | `1f1f58e` | **Multiple small fixes** — Added debug logging to API client sync, removed debug print statement, fixed server response parsing for container data. |
| Aug 21 | `6899e28` | **Prevent double sync** — Set `_last_sync` after initial sync completes to prevent periodic sync from firing immediately after. Capture sync timestamp before fetch to avoid missing logs. |
| Aug 25 | `ab29c0e` | **Door control for inactive mode** — New UART message type `DOOR_CONTROL` (0x08) with BLOCK/UNBLOCK actions. Added `control_door()`, `block_doors()`, `unblock_doors()` methods. Inactive mode now also blocks physical doors. Updated UART spec. (+55 lines, 3 files) |
| Aug 25 | `323ceda` | **Reverse sync strategy** — Changed initial sync to delete all local data first, then receive fresh data from server. Server is source of truth — clean slate on every startup. Added `delete_all()` for audit logs. |

---

## September 2025 — Protocol Overhaul & Secure Mode (10 commits)

### UART Protocol Rework (Sep 10–15)

| Date | Commit | Description |
|------|--------|-------------|
| Sep 10 | `13b099d` | **Update message formats** — Revised UART message format definitions in protocol handler and updated specs. |
| Sep 10 | `51bced2` | **Limit message IDs** — Constrained UART message ID field to minimum of -99 to stay within valid protocol range. |
| Sep 10 | `6c99d4e` | **Align with Xavier's testing** — Synchronized Raspberry Pi code with changes from collaborator Xavier's hardware testing sessions. Substantial protocol handling additions (+72 lines). Updated specs. |
| Sep 12 | `021f5ca` | **Sequence overhaul** — Major rewrite of UART sequence state machine (503 lines of diff in `uart.py`). Heavily reworked sequence flow control, message handling, and state transitions. One of the largest single commits. (+387/-130 lines) |
| Sep 15 | `d598250` | **Sequences + simulator overhaul** — Largest commit in the project (~1,600 total line changes). Further UART sequence refactoring (631 lines of diff) plus massive hardware simulator rewrite (963 lines of diff) ensuring simulation parity with the real protocol. |

### Secure Mode (Sep 15)

| Date | Commit | Description |
|------|--------|-------------|
| Sep 15 | `a0e11a9` | **Secure mode implementation** — Added authentication/authorization gate to the system. API service gained 66 lines of secure-mode logic, main app added 112 lines for initialization and enforcement. Controls access to device operations. (+173 lines, 2 files) |
| Sep 15 | `d87675e` | **Secure mode refinement** — Fixed timezone-related date bug. Changed secure mode to only check at healthcheck intervals rather than every request, reducing overhead. |

### QR Scanner Rewrite (Sep 29–30)

| Date | Commit | Description |
|------|--------|-------------|
| Sep 29 | `5ecca38` | **Complete QR scanner overhaul** — Replaced entire scanning approach with raw HID device input. New scancode mapping table (99 lines) for raw HID scancodes to characters. New device detection utility (78 lines). Scanner heavily rewritten (226 lines of changes). Updated config, env template, and dependencies. (+355 lines, 7 files) |
| Sep 30 | `028d2a1` | **QR regex fix** — Corrected the regular expression pattern for parsing/validating scanned QR code content. |
| Sep 30 | `7eb4ccd` | **QR validation flow rework** — Significant rework of validation pipeline: processor heavily modified (195 lines of diff), new dependencies added, UART integration updated (+43 lines) to connect validation results into communication sequences. (+159 lines, 4 files) |

---

## October 2025 — QR Fixes & Sequence Hardening (11 commits)

### QR Stabilization (Oct 3–18)

| Date | Commit | Description |
|------|--------|-------------|
| Oct 3 | `f8a7e31` | **Scanner cleanup** — Improved resource cleanup logic (file handles, device connections, threads) when scanner stops or encounters errors. |
| Oct 5 | `a1c02bf` | **Fix QR race condition** — Resolved concurrency issue in QR scanning where the scanning thread and processor were accessing the same data simultaneously. Enhanced logging for debugging. |
| Oct 5 | `7230ca3` | **Byte-to-int fix** — Corrected type conversion where raw HID scancode bytes were not being properly interpreted as integers for scancode mapping lookup. |
| Oct 7 | `087cc63` | **QR pipeline fixes** — Cross-module stabilization: audit logger improvements, scanner refinements, UART simplification (removed 10 lines of misplaced QR logic), main integration adjustments. |
| Oct 18 | `b147187` | **QR validation library swap** — Switched to the correct library for QR code data validation/cryptographic verification. |
| Oct 18 | `7e78064` | **Windows testing support** — Adapted application for cross-platform Windows testing: conditional imports, different device paths, mock hardware. Removed Linux/Raspberry Pi-specific dependencies. (+45 lines) |

### Sequence Hardening (Oct 25–28)

| Date | Commit | Description |
|------|--------|-------------|
| Oct 25 | `77c9b9b` | **Fix sequence 4 recursion** — Fixed critical recursion bug that could cause stack overflow or infinite loops. Added 53 lines of iterative logic with proper exit conditions and state tracking. |
| Oct 28 | `1cf15a1` | **Solenoid safety on shutdown** — Added explicit solenoid block command during system shutdown to prevent doors from being left unlocked when Raspberry Pi powers off. Physical security fix. |
| Oct 28 | `f8f9f9e` | **Comprehensive sequence improvements** — Four changes: (1) ACK timeout increased to 30 seconds for reliability. (2) Guard conditions added to ALL sequences preventing invalid state transitions. (3) Sequence 4 infinite loop fully resolved. (4) Button press made instantly responsive (no polling wait) and door unlock triggers immediately after sequence 2. (+89 lines) |
| Oct 28 | `1be9b37` | **Remove redundant door commands** — Cleaned up unnecessary solenoid block commands that were duplicated or made redundant by the new sequence guards. (-14 lines net) |
| Oct 28 | `3bb4141` | **Sequence concurrency protection** — Prevents sequences 2 and 3 from being retriggered while sequence 4 is in progress. Guards against conflicting UART commands from concurrent user actions (button press during active operation). |

---

## Summary & Impact

### Overall Numbers

| Metric | Value |
|--------|-------|
| Total Commits | **71** |
| Period | Jul 17 — Oct 28, 2025 (~3.5 months) |
| Files Touched | **30+** unique files |
| Estimated Lines Added | **~10,000+** |

### System Architecture Built

This is a **Raspberry Pi-based container return/deposit system** that communicates with an STM32 microcontroller via UART serial protocol. The full system was built from scratch:

| Layer | Components |
|-------|------------|
| **Database** | SQLAlchemy models, connection manager, comprehensive CRUD operations (SQLite) |
| **Configuration** | Environment variable loading, validation, structured logging |
| **UART Communication** | Message encoder/decoder, protocol-compliant serial communication with STM32, 4 operational sequences |
| **QR Scanning** | Raw HID device input, scancode mapping, QR data processing & validation |
| **API Integration** | HTTP client for backend server, health check, data sync, container validation (server-first with offline fallback) |
| **Audit Logging** | Structured audit trail for all system events and operational decisions |
| **Device Management** | Remote activate/deactivate via healthcheck, door control (solenoid block/unblock), secure mode |
| **Developer Tooling** | STM32 hardware simulator, database viewer, device detection utility, cross-platform testing support |

### Major Feature Areas Delivered

| Feature | Description |
|---------|-------------|
| **UART Protocol Engine** | Full serial communication with STM32: message encoding/decoding, 4 operational sequences with state machine logic, guard conditions, concurrency protection, ACK timeouts |
| **Container QR Validation** | Server-first validation with offline fallback, QR scanner supporting raw HID devices, three iterations of the scanning subsystem (evdev → pynput → raw HID) |
| **Server Sync** | Bidirectional data synchronization between Raspberry Pi and backend server. Server as source of truth. Container table overwrite strategy. Audit log upload and cleanup |
| **Device Lifecycle** | Remote activation/deactivation via healthcheck. Inactive mode: red lights, blocked doors, disabled QR, ignored inputs. Solenoid safety on shutdown |
| **Secure Mode** | Authentication/authorization gate controlled via server healthcheck responses |
| **Hardware Simulator** | Full STM32 simulator (650+ lines) for desktop testing without physical hardware, maintained in parity with real protocol |
| **Cross-Platform Support** | Adapted for Windows testing with conditional imports and mock hardware |

### Development Phases

1. **Jul 17–18 (Phase 1):** Built entire project from scratch in 2 days — database, config, UART, QR, sequences, audit logging, hardware manager, main app, dev tooling, documentation.
2. **Aug 6–7 (Phase 2):** Architecture simplification — removed unnecessary abstraction layers (sequences module, hardware module), added API integration layer, completed QR scanner, refined UART to match hardware specs.
3. **Aug 16–25 (Phase 3):** Intensive stabilization — server-first QR validation, sync mechanism (multiple iterations), device inactive mode with door control, SQLite boolean fixes, field alignment with API.
4. **Sep 10–15 (Phase 4):** Protocol overhaul — UART sequences rewritten based on real hardware testing with collaborator Xavier, secure mode added, hardware simulator overhauled.
5. **Sep 29 – Oct 28 (Phase 5):** QR scanner rewrite (raw HID approach), race condition fixes, sequence 4 recursion/infinite loop fixes, comprehensive sequence guards, solenoid safety, concurrency protection.
