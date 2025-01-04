# Parcel Monitor App

## 🚀 Introduction

The **Parcel Monitor App** is an innovative solution designed to address the increasing issues of **parcel theft, misplacement, and damage** that many individuals, particularly students, face when receiving packages. With the rise in online shopping and parcel deliveries, these problems have become more prevalent, leaving many consumers frustrated and helpless.

---

### What problem does your project solve?

1. **Parcel Theft**:
   - In urban areas, particularly on college campuses or apartment buildings, parcel theft has become a common issue. Once a package is delivered, it is often left unattended and becomes vulnerable to theft.
   
2. **Parcel Misplacement or Damage**:
   - Parcels are sometimes misplaced by delivery companies or left in inappropriate locations, leading to damage or loss. Additionally, inaccurate or incomplete tracking systems make it difficult for recipients to know the exact status of their packages.

3. **Lack of Secure Monitoring**:
   - There's often no dedicated monitoring system that keeps track of the parcels and ensures their safety. Users may not know where their package is or if it's been safely delivered.
   
4. **Limited Job Opportunities for Admins**:
   - The parcel management process could benefit from dedicated admin oversight to ensure smooth operation. The app creates job opportunities for individuals who can serve as admins, helping oversee deliveries and keeping track of parcel statuses.

---

### Who is it for?

The **Parcel Monitor App** is designed for a wide range of users who are looking for a more reliable and secure way to track and manage their parcels. Specifically, the app is for:

1. **Students**:
   - College students who frequently receive packages, especially in shared dorms or apartment buildings where packages are often left in lobbies or hallways.
   - Students looking for a better way to track their parcels and ensure they are delivered safely without the risk of theft or damage.

2. **Admins**:
   - Individuals looking for a job opportunity to serve as an admin in the parcel management system.
   - Admins who will be responsible for overseeing parcel deliveries, ensuring packages are properly stored, and notifying users once parcels arrive.

3. **Businesses & E-Commerce Stores**:
   - E-commerce stores or businesses that need to streamline their parcel delivery system and ensure better customer communication and satisfaction.
   - Businesses that want to offer a safe and secure solution for their customers' package deliveries.

---

### Why is it useful?

In urban areas, especially college campuses and apartments, theft of parcels has become a rampant issue. **Students** and **residents** often face the inconvenience of missing or damaged packages that were either stolen or misplaced during delivery. The lack of a secure, monitored delivery system has created a growing need for a service that ensures the safe tracking, storage, and delivery of parcels.

The **Parcel Monitor App** is designed to act as a **middleman** between the delivery company and the recipient, creating a more secure environment for parcel management. By using an **admin-backed monitoring system**, this app helps:
- **Prevent theft**: Through better tracking and monitoring of packages.
- **Reduce misplacement**: Ensures that parcels are safely delivered and tracked.
- **Create job opportunities**: Admins are responsible for overseeing the system, which opens up opportunities for individuals to manage parcel deliveries and assist in customer service.

This app serves as both a **solution to a growing problem** and a **means to create jobs** for those looking to assist in the parcel management process.

---

## Features

- **User Authentication**:
  - **Admin** and **Regular Users** are supported with different levels of access.
  - **Admins** can monitor all parcels, update their statuses, and send notifications.
  - **Users** can submit parcels and track the status of their own shipments.
  
- **Parcel Tracking and Management**:
  - **Users** can submit parcel details to be monitored by the admin.
  - **Admins** can see a list of all parcels, update their status (e.g., marked as "arrived"), and trigger notifications to users when the parcel status changes.

- **Email Notifications**:
  - The system sends **automatic email notifications** to users when their parcels arrive.
  - Emails are sent from a **noreply** address, ensuring no direct replies are expected.

- **Admin Monitoring**:
  - Admins have access to all parcels and their current statuses.
  - Admins can mark parcels as **"arrived"**, which triggers an email notification to the user.

---

## Tech Stack

- **Frontend**:
  - React.js (with React Router for routing)
  - Axios for making API requests
  - Bootstrap or Material UI for styling

- **Backend**:
  - Node.js with Express.js
  - MongoDB for database storage
  - JWT (JSON Web Tokens) for authentication
  - Nodemailer for sending emails

- **Database**:
  - MongoDB to store **user** and **parcel** data



