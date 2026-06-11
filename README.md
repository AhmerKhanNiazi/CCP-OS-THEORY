# Smart Health Insurance Claim Processing & Operating System Visualizer

**🚀 Live Interactive Demo (StackBlitz):** [Click Here to View and Edit the App Real-time](https://stackblitz.com/github/AhmerKhanNiazi/CCP-OS-THEORY/tree/main/Smart-Health-Insurance-System)

**💻 Code Sandbox Alternative:** [Click Here to View the App](https://codesandbox.io/s/github/AhmerKhanNiazi/CCP-OS-THEORY/tree/main/Smart-Health-Insurance-System)

---

**Submitted To:** Miss Umna Iftikhar  
**Submitted By:** Ahmer Khan #71725  
**Date:** 15/06/2026  

---

## 1. Abstract
The "Smart Health Insurance Claim Processing System" is an advanced Web Application specifically engineered to visually demonstrate **Operating System (OS) Concepts**. While it handles health insurance claims, under the hood, the entire logic is governed by classic OS algorithms including Process Scheduling, Banker's Algorithm (Deadlock Avoidance), Page Replacement, and Producer-Consumer synchronization.

## 2. Operating System Integrations
This project fulfills the OS CCP requirements by integrating the following modules:

* **Process Synchronization (Producer-Consumer):** Hospitals act as Producers submitting claims to a Bounded Buffer. Officers act as Consumers. Mutex semaphores prevent race conditions.
* **Deadlock Avoidance (Banker's Algorithm):** The system ensures that approving a claim's amount does not exceed the maximum allowed hospital limits or the total system available budget, preventing unsafe states.
* **CPU Scheduling (Task Scheduler):** Officers can process the pending claim buffer using FCFS, SJF, or Priority Scheduling, visualizing the execution via a Gantt chart.
* **Memory Management (Page Replacement):** An LRU (Least Recently Used) cache is maintained when officers view claim details, simulating Page Hits and Page Faults.

## 3. Features
* **Online Claim Submission:** Hospitals can submit claims and upload PDFs (Producer).
* **Automated OS Validation:** Banker's algorithm checks for safe state before accepting.
* **OS Task Scheduler:** Gantt chart-based Officer Review dashboard.
* **Audit Trail:** Complete system reporting of all OS and SE events.
* **Role-Based Dashboards:** Secure interfaces for Admins, Hospitals, Policyholders, and Officers.

## 4. Requirements Met
* Allow hospitals to submit insurance claims online & upload documents.
* Verify policy coverage and eligibility via Banker's Algo resource matrices.
* Assign a fraud risk score to each claim (Used for Priority Scheduling).
* Allow insurance officers to approve, reject, or request additional info.
* Maintain an updated Audit Trail / Logs database.
