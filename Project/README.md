# 💼 JobSphere - Full-Stack Job Portal

A modern, responsive job portal built with **Spring Boot 3 (Java 17)**, **React 18 + Vite + Tailwind CSS**, and **PostgreSQL**.

---

## 🌟 Features

### 👤 For Job Seekers
- **Search & Filter:** Search jobs by role keywords, company name, location, and employment type (Full-time, Remote, Part-time, Contract, Internship).
- **Job Details View:** View detailed role responsibilities, requirements checklist, salary range, and company contact information.
- **One-Click Application:** Apply directly with full name, email, phone, experience level, resume/portfolio URL, and a cover note.
- **Instant Status Feedback:** Clear confirmations and visual status indicators.

### 🏢 For Recruiters & Employers
- **Employer Dashboard:** Centralized management center with live metrics (Total jobs, active openings, candidate applications, shortlisted/hired counters).
- **Job Vacancy Posting:** Form to publish new job listings or edit existing ones.
- **Active / Closed Toggle:** Easily close applications or reopen job postings with one click.
- **Applicant Tracking Pipeline:** Review candidate profiles, resumes, and cover letters. Move candidates through stages:
  - `APPLIED` ➔ `UNDER_REVIEW` ➔ `SHORTLISTED` ➔ `ACCEPTED` / `REJECTED`

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Spring Boot 3.3.4, Spring Data JPA, Hibernate, Java 17 |
| **Database** | PostgreSQL 18 (`jobportal_db`) |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons |
| **API Architecture** | RESTful JSON APIs with CORS enabled |

---

## 🚀 Getting Started

### 1. Database Setup
PostgreSQL database credentials configured in `backend/src/main/resources/application.properties`:
- **Database Name:** `jobportal_db`
- **Username:** `postgres`
- **Password:** `jojo#2006`
- **Port:** `5432`

> *Note: Database `jobportal_db` has already been created, and schema tables (`jobs`, `applications`) are automatically generated and seeded by Hibernate on startup.*

### 2. Running the Backend (Spring Boot)
```powershell
cd backend
mvn spring-boot:run
```
The backend server runs at: **`http://localhost:8080`**

### 3. Running the Frontend (React + Vite)
```powershell
cd frontend
npm install
npm run dev
```
The React frontend runs at: **`http://localhost:5173`**

---

## 📡 REST API Reference

### Jobs (`/api/jobs`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/jobs` | Retrieve all jobs (supports `?keyword=...&location=...&jobType=...&status=...`) |
| `GET` | `/api/jobs/{id}` | Get specific job by ID |
| `POST` | `/api/jobs` | Post a new job |
| `PUT` | `/api/jobs/{id}` | Update existing job |
| `DELETE` | `/api/jobs/{id}` | Delete job and its applications |
| `GET` | `/api/jobs/{id}/applications` | Get all applicants for a specific job |

### Applications (`/api/applications`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/applications` | Retrieve applications (optional `?jobId=...`) |
| `GET` | `/api/applications/{id}` | Get application details |
| `POST` | `/api/applications` | Submit application for a job |
| `PATCH` | `/api/applications/{id}/status` | Update candidate status (`UNDER_REVIEW`, `SHORTLISTED`, `ACCEPTED`, `REJECTED`) |
| `DELETE` | `/api/applications/{id}` | Withdraw / delete application |

### Metrics (`/api/stats`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/stats` | Live hiring metrics for the hero and dashboard |

---

## 📁 Project Structure

```
project/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/jobportal/
│       │   ├── JobPortalApplication.java
│       │   ├── config/ (WebConfig CORS, DataInitializer seed data)
│       │   ├── controller/ (JobController, ApplicationController, StatsController)
│       │   ├── dto/ (JobRequestDto, JobResponseDto, ApplicationRequestDto, DashboardStatsDto)
│       │   ├── model/ (Job, Application entities)
│       │   ├── repository/ (JobRepository, ApplicationRepository)
│       │   └── service/ (JobService, ApplicationService)
│       └── resources/
│           └── application.properties
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── services/api.js
│       └── components/
│           ├── Navbar.jsx
│           ├── HeroSection.jsx
│           ├── JobCard.jsx
│           ├── JobDetailModal.jsx
│           ├── ApplyModal.jsx
│           ├── PostJobModal.jsx
│           ├── EmployerDashboard.jsx
│           └── Toast.jsx
└── README.md
```

