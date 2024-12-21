# Event Management Web App (Project Overview)

## Introduction

### Purpose
Build a fully functional event management web application to streamline event booking and management for users and admins. It provides features like authentication, event creation, search and filters, and dynamic user roles.

### Scope
The web app includes: 
1. User and Admin roles with login and registration features.
2. Event management with CRUD operations for admins.
3. Search and filter functionalities for events.
4. Integration of email notifications using Firebase.
5. Image storage and hosting via Firebase.

## Problem Statement
Managing events manually or through non-specialized tools can be tedious and error-prone. This application aims to provide an efficient, secure, and user-friendly interface for managing events, ensuring better user experience and streamlined operations.

## Objectives

### User Authentication and Roles
1. Implement a secure multi-user authentication system using JWT and bcryptjs for password hashing.
2. Create two user roles: normal users and administrators.

### Event Management (Admin)
3. Admins can create, edit, and delete events based on organizer requests.
4. Event forms include event details (name, date/time, location), media support, and multiple ticket types with customizable names, prices, and limits.
5. Once an event is created, it is listed on the homepage and available for booking by normal users.

### Booking and Payments
6. Normal users can book events by paying online and confirming their slots.
7. Integrate Stripe payment gateway for secure online payments.
8. Users can view their bookings, cancel tickets, and request refunds in their profile.
9. Users can generate reports of their booked tickets.

### Admin Features
10. Admins can view all user bookings, user data, and booking reports.
11. Admins can block users and promote other users to admin status.
12. Admin reports provide detailed event analytics, including revenue and tickets sold.

### Support
13. Provide complete source code access and Q&A support for students.

## Methodology

### Tools/Technologies
- **Frontend**: React with Vite, Tailwind CSS, Ant Design for UI components, Zustand for state management.
- **Backend**: Node.js, Express.js for server and API routing.
- **Database**: MongoDB for data persistence.
- **Cloud Services**: Firebase for storage and email notifications.
- **Management**: Zustand
- **UI Components**: AntDesign

### Implementation Process

#### 1. Setup
- Initialize the project structure using Vite and configure Tailwind and Ant Design.
- Set up Zustand for state management.

#### 2. Authentication
- Build authentication using Node.js (bcrypt for password hashing, JWT for tokens).
- Firebase for sending email notifications.

#### 3. Backend Development
- Create a RESTful API with Express for user management, event creation, and filtering.
- Integrate MongoDB with Mongoose for database operations.

#### 4. Frontend Development
- Create reusable components with Tailwind CSS and Ant Design.
- Implement Zustand for state management.
- Develop pages for registration, login, home, and admin dashboard.

#### 5. Features
- **Event Management**:
  - Admins can add, update, and delete events.
  - Dynamic pricing management for events.
- **Search and Filters**:
  - Implement search functionality by name, date, and clear filters for users.
- **Email Notifications**: Use Firebase to notify users of bookings or cancellations.
- **Image Uploads**: Utilize Firebase for uploading and hosting images.

#### 6. Testing
- Conduct unit and integration testing for key components and features.

## Project Plan

### Timeline & Milestones
- **Week 1**: Set up the project environment, install dependencies, and configure Firebase.
- **Week 2**: Develop authentication module (login, register).
- **Week 3**: Build backend APIs and integrate MongoDB.
- **Week 4**: Implement UI components and pages for user/admin functionality.
- **Week 5**: Add search, filter, and notification features.
- **Week 6**: Finalize testing, debugging, and deployment.

## Expected Deliverables
1. **Codebase**: Complete MERN stack application source code.
2. **Documentation**: A detailed report with setup instructions, features, and testing outcomes.
3. **Deployment**: Fully deployed app on a hosting platform (e.g., Vercel, Firebase).
4. **Presentation**: Slide deck summarizing the project, its challenges, and achievements.

## Evaluation Criteria
- **Code Quality & Functionality**: 40%
- **Implementation of Features**: 30%
- **Report Quality**: 20%
- **Presentation Skills**: 10%

## Submission Guidelines
- **GitHub Repository Link**: [Event Management App](https://github.com/mohdalipatel8976/event-management-app)
- **Deadline**: 20 to 40 days

## References
- MERN Stack Event Booking & Management App 2024 | Udemy

