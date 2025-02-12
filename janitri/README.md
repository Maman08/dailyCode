# Janitri Backend Assignment

##  Overview
This is a **scalable, high-performance** backend for a healthcare management system built using **Node.js, Express, and PostgreSQL**. It provides RESTful APIs for managing users, patients, and heart rate records with a focus on **security, efficiency, and best practices**.

---

##  Features Implemented

###  Database Design & Optimization (PostgreSQL)
- **Used PostgreSQL** as the relational database for its **reliability, performance, and scalability**.
- **Used UUIDs for primary keys** instead of auto-incremented integers to ensure **uniqueness and scalability**.
- **Implemented Indexing** for performance optimization:
  - Indexed frequently queried fields such as `email` (Users) and `patient_id` (Heart Rate Records) to improve search performance.
- **Normalized Data**:
  - Separated `Patients` and `Heart Rate Records` to **eliminate redundancy** and ensure **data consistency**.
- **Used ENUMs where necessary** (e.g., `role`, `gender`) to **restrict values and improve data integrity**.
- **Implemented Soft Deletes**:
  - Instead of permanently deleting records, a `deleted_at` column is used, allowing records to be restored if necessary.
## Optimized Queries with JOIN Operations

- Used **SQL JOINs** to efficiently retrieve related data in a **single query** rather than making multiple queries, improving performance.

### Example Query:
```sql
SELECT p.id, p.name, p.age, p.gender, h.heart_rate, h.recorded_at
FROM patients p
JOIN heart_rate_records h ON p.id = h.patient_id
WHERE p.deleted_at IS NULL;
```

###  API Documentation (Swagger)
- Integrated **Swagger UI** (`/api-docs`) for **interactive API documentation**.
- Provides clear **request & response** formats with validation.
- Helps in **quick onboarding** for developers and API consumers.

###  RESTful API Endpoints
#### **User Management**
- `GET /users` → Retrieve all users.
- `POST /adduser` → Add a new user.
- `DELETE /deleteuser/:id` → Delete a user (soft delete).
- `PATCH /updateuser/:id` → Update user details.
- `DELETE /permanentdeleteuser/:id` → Delete a user Permanently from table.

#### **Patient Management**
- `GET /patient` → Retrieve all patients.
- `POST /addpatient` → Add a new patient.
- `DELETE /deletepatient/:id` → Remove a patient (soft delete).

#### **Heart Rate Records**
- `GET /record` → Retrieve all heart rate records.
- `POST /addrecord` → Add a new heart rate record.
- `DELETE /deleterecord/:id` → Delete a heart rate record (soft delete).

###  Testing & Code Quality
- **Unit Tests**: Written using **Jest** for automated API testing.
- **Supertest**: Used for API request-response validation.
- **CI/CD Ready**: Code is structured to easily integrate with CI/CD pipelines.


### Monitoring API Health with Grafana and Prometheus

We have set up **Grafana** to monitor the health of the API using **Prometheus** as the data source. The dashboard includes metrics such as API response times, error rates, and uptime, giving us visibility into the performance of the backend system.

Below is an example of our Grafana dashboard showing key API health metrics:

<div style="display: flex;">
  <img src="https://github.com/user-attachments/assets/f8959861-94c6-48d4-9011-5d6e12ccdc6a" width="45%" />
  <img src="https://github.com/user-attachments/assets/72c7e2f0-1103-43f1-a875-caab42d51a5b" width="45%" />
</div>

---

##  Why This Solution?
###  **Performance & Scalability**
- **Optimized Queries** with indexing.
- **Normalized Data** for efficient storage.
- **Asynchronous Processing** using Node.js.


###  **Developer-Friendly**
- **Swagger API Docs** for easy testing & integration.
- **Clear Modular Code Structure** for maintainability.

---

##  Tech Stack
- **Backend**: Node.js, Express.js, Typescript
- **Database**: PostgreSQL
- **Documentation**: Swagger
- **Testing**: Jest, Supertest

---

##  Setup & Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Maman08/dailyCode/tree/main/janitri.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up PostgreSQL database and configure `.env` file:
   ```env
   POSTGRES_DB=node-postgres-demo
   POSTGRES_HOST=localhost
   POSTGRES_PASSWORD=postgres
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   JWT_SECRET=secret
   PORT=8000
   ```
4. Run the server:
   ```bash
   npm run dev
   ```
5. Run tests:
   ```bash
   npm test
   ```

---

##  Final Thoughts
This project was built with a strong focus on **scalability, performance**. The use of **PostgreSQL, indexing, UUIDs, and API best practices** ensures a solid foundation for any healthcare application. 


---



### 🔗 Contact

GitHub: [Maman08](https://github.com/Maman08)

![image](https://github.com/user-attachments/assets/626c6720-5e5f-481f-ac3f-3f3e78546eda)
![image](https://github.com/user-attachments/assets/f8959861-94c6-48d4-9011-5d6e12ccdc6a)
![image](https://github.com/user-attachments/assets/72c7e2f0-1103-43f1-a875-caab42d51a5b)



