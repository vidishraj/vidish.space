# Societe Generale — Contribution Summary

**Contributor:** Vidish Raj
**Role:** Software Development Engineer
**Period:** July 4, 2022 – March 2026 (~4 years)
**Teams:** Internal Tools → Core Migration Team → Maintenance & Enhancement

---

## Table of Contents

1. [Phase 1 — Internal Dashboard (Jul 2022 – Nov 2022)](#phase-1--internal-dashboard)
2. [Phase 2 — Legacy Migration Project (Nov 2022 – 2025)](#phase-2--legacy-migration-project)
   - [Backend — Java 17 Microservices](#a-backend--java-17-microservices)
   - [Frontend — React Client-Facing Application](#b-frontend--react-client-facing-application)
   - [Data Extraction & Ingestion Engine](#c-data-extraction--ingestion-engine)
   - [Authentication & Security](#d-authentication--security)
   - [CI/CD Pipeline & Infrastructure](#e-cicd-pipeline--infrastructure)
   - [AWS & Container Management](#f-aws--container-management)
   - [Databricks & Data Pipeline](#g-databricks--data-pipeline)
3. [Phase 3 — Maintenance & Enhancement (2025 – Mar 2026)](#phase-3--maintenance--enhancement)
4. [Summary & Impact](#summary--impact)

---

## Context

Societe Generale is the 6th largest investment bank in the world. The core project I was embedded in was a mission-critical regulatory pipeline responsible for **aggregating exposure data from global operations**, storing it in a data lake, processing it, and generating reports for French regulatory authorities.

The project was a **4-year migration plan** to move a fragile legacy system — a Java 8 monolith running on on-premise servers with no CI/CD — to a modern cloud-native architecture: Java 17 microservices, React, AWS, and clean CI/CD pipelines.

I joined the core migration team 4 months after onboarding and spent **3 years** embedded in it. The team had 18 members (7 developers, 6 Business Analysts, 1 Scrum Master, and supporting roles). I was **one of only 2 team members based in India**, working in close coordination with the primary team in France.

---

## Phase 1 — Internal Dashboard

> **Jul 2022 – Nov 2022 (4 months) | Stack: Angular, Java**

First rotation post-joining. Built and contributed to an internal operations dashboard used by clients to visualize the health and metrics of the data pipeline.

| Area | Description |
|------|-------------|
| **Pipeline Health Visualization** | Built dashboard components to surface real-time pipeline metrics and health indicators for internal stakeholders |
| **Angular Frontend** | Developed Angular components for data display, filtering, and navigation within the dashboard UI |
| **Java Backend** | Contributed to backend APIs serving metrics data to the frontend |
| **Onboarding & Ramp-up** | Learned SocGen's internal tooling, engineering standards, and banking domain knowledge in a production environment |

---

## Phase 2 — Legacy Migration Project

> **Nov 2022 – 2025 (~3 years) | Stack: Java 17, Spring Boot, React, AWS (ECS, ECR, RDS, Secrets Manager), Jenkins, Databricks, PostgreSQL, Python, Linux**

Core team embedded in the flagship multi-year migration initiative. Worked across the full stack — backend microservices, React frontend, data pipelines, infrastructure, and deployment — contributing to all major feature areas of the client-facing regulatory reporting application.

---

### A. Backend — Java 17 Microservices

| Area | Description |
|------|-------------|
| **Microservice Development** | Built and maintained 5+ Spring Boot microservices as part of the migration from the Java 8 monolith |
| **RESTful API Design** | Implemented RESTful APIs following best practices across services; achieved **15% reduction in API response times** through query optimization |
| **Design Patterns** | Applied Factory and Singleton patterns across Java services to improve code maintainability and reduce technical debt |
| **SOLID Principles** | Maintained SOLID design principles and enforced code coverage above 70% through regular code reviews with a team of 8 developers |
| **Logging & Observability** | Implemented comprehensive structured logging across microservices, reducing average debugging time for production issues by **30%** |
| **Code Reviews** | Participated actively in peer reviews, enforcing architecture standards and catching regressions across the distributed team |

**Key outcome:** Contributed to a deployment pipeline that cut deployment time by **20%** compared to the legacy on-premise process.

---

### B. Frontend — React Client-Facing Application

The React application was the primary interface for users interacting with the regulatory pipeline — regulators and internal users who needed to view, extract, insert, and monitor millions of rows of exposure data.

| Area | Description |
|------|-------------|
| **Component Development** | Developed and maintained React components for a customer-facing application serving **1,000+ daily users** |
| **UI Responsiveness** | Improved UI responsiveness by **25%** through optimized rendering, state management, and efficient API consumption |
| **Data Display** | Built data tables, dashboards, and filtering interfaces for visualizing aggregated global exposure data |
| **User Actions** | Implemented UI flows for data extraction (up to 1 million rows to Excel), bulk insertion, and in-place data modification |
| **Monitoring Views** | Built monitoring interfaces allowing users to track the status of ongoing and historical extraction and ingestion jobs |
| **Error Handling & UX** | Added error states, loading indicators, and progress feedback for long-running operations (large ingestion/extraction jobs) |

---

### C. Data Extraction & Ingestion Engine

One of the core technical challenges of the application was handling very large-scale data operations — users could extract or ingest up to **1 million rows** in a single operation.

| Area | Description |
|------|-------------|
| **Bulk Extraction** | Engineered extraction pipeline to export up to 1 million rows to Excel format, handling streaming, chunking, and memory constraints |
| **Bulk Ingestion** | Built ingestion endpoints accepting large-scale data uploads (up to 1 million rows) with validation, error reporting, and rollback support |
| **Transaction Processing** | Designed and optimized PostgreSQL queries handling **50,000+ daily transactions** across the pipeline |
| **Database Design** | Designed PostgreSQL database tables for transaction processing and reporting data, writing optimized queries for high-throughput operations |
| **Job Monitoring** | Implemented backend services for tracking and exposing the status of extraction and ingestion jobs to the frontend monitoring UI |

---

### D. Authentication & Security

| Area | Description |
|------|-------------|
| **Auth Implementation** | Built and integrated authentication flows across the client-facing application, securing access to regulatory data |
| **Secrets Management** | Used AWS Secrets Manager for managing application credentials and sensitive configuration across environments |
| **Environment Security** | Maintained separation of configs and secrets across dev, staging, and production environments |

---

### E. CI/CD Pipeline & Infrastructure

| Area | Description |
|------|-------------|
| **Jenkins Pipelines** | Utilized and maintained Jenkins CI/CD pipelines for automated builds and deployments across microservices |
| **Pipeline Troubleshooting** | Debugged and resolved build failures, maintaining deployment documentation for the distributed team |
| **Deployment Time** | Contributed to pipeline improvements that reduced overall deployment time by **20%** |
| **Migration from On-Premise** | Part of the foundational effort to move from a zero-CI/CD on-premise setup to a fully automated cloud deployment pipeline |

---

### F. AWS & Container Management

| Area | Description |
|------|-------------|
| **ECS Deployments** | Deployed containerized applications on AWS ECS — created and updated task definitions, configured environment variables, and managed service rollouts |
| **ECR** | Managed container image lifecycle in AWS ECR, including image tagging, pushing, and cleanup |
| **Task Definition Management** | Created and updated ECS task definitions across multiple microservices for each release cycle |
| **CloudWatch Debugging** | Diagnosed production and staging issues using CloudWatch logs, identifying runtime errors and infrastructure anomalies |
| **RDS** | Managed application database configurations on AWS RDS (PostgreSQL), handling connection tuning and environment-specific configurations |
| **Secrets Manager** | Integrated AWS Secrets Manager for secure credential injection into containerized services at runtime |

---

### G. Databricks & Data Pipeline

| Area | Description |
|------|-------------|
| **Databricks Environment** | Worked within the Databricks environment for data processing tasks upstream of the reporting pipeline |
| **SQL Queries** | Wrote and optimized SQL queries for analytics pipelines and data aggregation workflows |
| **Workflow Orchestration** | Developed understanding of and contributed to Databricks workflow orchestration for the global exposure data aggregation pipeline |
| **Data Lake Integration** | Worked with the data lake layer where global exposure data was stored before processing and report generation |

---

## Phase 3 — Maintenance & Enhancement

> **2025 – March 2026 | Core team reduced from 60+ → 30 members**

After the migration reached ~90% completion, Societe Generale reduced the total project team from 60+ employees to approximately 30. I was **selected as one of the remaining engineers** to continue supporting the application through the final phase.

| Area | Description |
|------|-------------|
| **Production Stability** | Monitored and maintained production stability of the regulatory reporting pipeline serving French authorities |
| **Enhancements** | Delivered incremental feature enhancements to the React frontend and Java backend based on user feedback and evolving regulatory requirements |
| **Bug Triage & Fixes** | Triaged and resolved production bugs across the full stack — frontend components, backend APIs, and infrastructure |
| **Legacy Cleanup** | Continued reducing remaining technical debt from the migration, decommissioning legacy code paths and on-premise dependencies |
| **Knowledge Retention** | Served as one of the key knowledge holders for both the legacy system context and the new architecture, supporting onboarding and cross-team queries |

---

## Summary & Impact

### Overall Numbers

| Metric | Value |
|--------|-------|
| **Tenure** | ~4 years (July 2022 – March 2026) |
| **Teams** | Internal Tools → Core Migration Team → Maintenance & Enhancement |
| **Microservices Contributed To** | 5+ Spring Boot services |
| **Daily Users Served** | 1,000+ (client-facing React app) |
| **Daily Transactions Handled** | 50,000+ |
| **Max Data Operation Scale** | 1,000,000 rows (extraction & ingestion) |
| **Sprint Commitment Completion** | 90% average |
| **Code Coverage Maintained** | 70%+ |
| **Performance Rating** | Top rating (highest available) |

### Key Outcomes & Metrics

| Area | Outcome |
|------|---------|
| **Deployment Time** | Reduced by **20%** via CI/CD pipeline improvements |
| **UI Responsiveness** | Improved by **25%** through React optimization |
| **API Response Times** | Reduced by **15%** through query optimization |
| **Debugging Time** | Reduced by **30%** via structured logging implementation |
| **Team Retention** | Selected as one of ~30 engineers retained post-project completion (from 60+) |

### Major Contribution Areas

| Area | Description |
|------|-------------|
| **Legacy-to-Cloud Migration** | Core contributor to 4-year migration of a Java 8 monolith + servlet app with no CI/CD into Java 17 microservices on AWS with automated pipelines |
| **Regulatory Reporting Pipeline** | Worked on a mission-critical system aggregating global exposure data for Societe Generale — one of the world's largest investment banks — and generating reports for French regulatory authorities |
| **Full-Stack Feature Delivery** | Delivered end-to-end features across Java 17 backend, React frontend, PostgreSQL, and AWS infrastructure |
| **Bulk Data Operations** | Engineered extraction and ingestion systems handling up to 1 million rows, serving 1,000+ daily users |
| **Container & Cloud Infrastructure** | Managed ECS deployments, ECR image lifecycle, RDS, Secrets Manager, and CloudWatch observability across multiple microservices |
| **Data Engineering** | Contributed to Databricks-based analytics pipelines and data lake workflows for global exposure aggregation |
| **Cross-Continental Collaboration** | Operated as one of 2 India-based members in an 18-person core team, maintaining close coordination with the France-based team across time zones |
| **Dev Standards & Quality** | Enforced SOLID principles, 70%+ code coverage, and structured logging across all contributed services |
