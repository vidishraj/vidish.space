# PwC — Contribution Summary

**Contributor:** Vidish Raj
**Role:** Software Engineering Intern
**Period:** ~Early 2022 – Mid 2022 (6 months)
**Team:** Internal Innovation — Contract Management POC

---

## Context

PwC is one of the Big Four global professional services firms. During my internship, I was embedded with a newly formed internal innovation team tasked with building a **proof-of-concept contract management tool** to help employees dramatically reduce the time spent on contract auditing workflows — a process that was largely manual, error-prone, and slow.

I joined the team from the ground up, contributing to architecture decisions, full-stack development, deployment, and testing across the entire 6-month engagement.

---

## Contributions

### A. GUI Application — Tkinter Desktop Client

| Area | Description |
|------|-------------|
| **Desktop UI** | Built a fully functional desktop GUI using Tkinter, providing a clean and intuitive interface for non-technical employees to interact with the contract management system |
| **Workflow Design** | Designed the end-to-end user workflow — from contract upload through to summary review and action — minimizing the number of steps required for auditors to process a contract |
| **Form & Input Handling** | Implemented form validation, dynamic field rendering, and contextual UI state management to guide users through multi-step auditing workflows |
| **Responsiveness & Feedback** | Added loading states, progress indicators, and error messaging to keep users informed during PDF processing and email dispatch operations |

---

### B. Backend — Flask CRUD API

| Area | Description |
|------|-------------|
| **API Development** | Designed and built a complete RESTful CRUD backend in Flask, serving as the core engine for the contract management tool |
| **Contract Storage** | Implemented endpoints for creating, reading, updating, and deleting contract records, with structured data persistence |
| **PDF Parsing & Processing** | Built a PDF ingestion pipeline capable of parsing uploaded contract documents — extracting clauses, key dates, parties, and obligations from raw PDF content |
| **Summarization** | Integrated automated contract summarization logic, condensing lengthy legal documents into structured, human-readable summaries to accelerate auditor review |
| **Outbound Email** | Implemented an outbound email service for notifying relevant stakeholders upon contract processing completion, flagging anomalies, or dispatching summaries for review |
| **Error Handling** | Built robust error handling across all endpoints, with meaningful status codes and response messages to surface failures gracefully to the GUI client |

---

### C. Deployment — Windows Server (Apache + WSGI)

| Area | Description |
|------|-------------|
| **Server Configuration** | Configured and deployed the Flask application on a Windows Server environment using Apache HTTP Server with mod_wsgi |
| **WSGI Integration** | Set up the WSGI interface layer to correctly bridge Apache and the Flask application, handling process management and request routing |
| **End-to-End Testing** | Conducted thorough end-to-end testing of the full system — from GUI interactions through to backend API responses and email delivery — in the production server environment |
| **Environment Management** | Managed Python environment, dependencies, and configuration files across the Windows Server deployment, ensuring clean and reproducible builds |

---

## Summary & Impact

| Metric | Value |
|--------|-------|
| **Duration** | 6 months |
| **Team** | New internal innovation team (greenfield project) |
| **Deliverable** | Fully functional, deployed POC — GUI + Flask backend + PDF pipeline + email service |
| **Deployment Environment** | Windows Server, Apache, mod_wsgi |
| **Outcome** | POC successfully demonstrated accelerated contract auditing workflows for internal stakeholders |
| **Offer** | Received a return offer from PwC; declined to join Societe Generale |

### Key Contributions

| Area | Description |
|------|-------------|
| **Full-Stack Ownership** | Sole developer responsible for both the desktop GUI and the entire Flask backend — from first line of code to deployed POC |
| **Document Intelligence** | Built a PDF parsing and summarization pipeline capable of extracting structured information from complex legal contracts, replacing a previously manual review process |
| **Greenfield Delivery** | Delivered a working, deployed product within a 6-month internship window on a brand new team with no existing codebase or infrastructure |
| **Cross-Functional Collaboration** | Worked directly with business stakeholders to understand auditing pain points and translate them into concrete software features |
| **Production Deployment** | Took full ownership of the deployment stack — configuring Apache, WSGI, and the Windows Server environment — well beyond a typical intern scope |
