Since the project includes a `docker-compose.yml` file, I'll update the README to incorporate instructions for running the application using Docker Compose.

# Project Title: Microservice-Based Angular Web Application

## Overview

This project is a **Microservice-based architecture** designed for a dynamic Angular web application. The system serves as a robust platform offering room bookings, event management, a media gallery, weather updates, and more. It uses a modular approach to deliver high scalability, ease of maintenance, and efficient resource utilization.

## Architecture Overview

### **Frontend**
- **Angular Web Application**:
  - Hosted on an **nginx server**.
  - Implements **Client-Side Rendering** for dynamic, low-latency user interactions.
  - Features include:
    - Room listing and booking with images and timeframes.
    - Event listing and booking.
    - Media gallery.
    - Weather display.

### **Backend Microservices**
- Built using **Node.js Express**.
- Each microservice is designed for a specific domain:
  - **Gateway Microservice**:
    - Central API gateway for all other microservices.
    - Handles user authentication.
  - **Rooms Microservice**:
    - Manages room data with images stored in a **MinIO storage** system.
    - Fetches data from a dedicated **MySQL database**.
  - **Events Microservice**:
    - Similar to the Rooms Microservice, handles event data and associated images.
  - **Weather Microservice**:
    - Provides current weather data from a **MySQL database**.
  - **Videos Microservice**:
    - Handles video content storage and retrieval.
  - **Sales Microservice**:
    - Facilitates order management and storage in a **MySQL database**.

### **Deployment**
- **AWS Elastic Beanstalk**:
  - Used for deploying backend microservices with **elastic horizontal scaling**.
- **AWS App Runner**:
  - Hosts the Angular web application, managing load balancing and SSL certificates.

## Prerequisites

- Docker and Docker Compose installed on your machine.
- Optional: AWS CLI for cloud deployment.

## Running Locally with Docker Compose

To simplify setup and deployment, the project uses Docker Compose. Follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Start the services**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - The Angular web application will be available at `http://localhost:4200`.
   - Microservices will run on their respective ports as defined in the `docker-compose.yml`.

4. **Stop the services**:
   ```bash
   docker-compose down
   ```

## Docker Compose Services

The `docker-compose.yml` file defines the following services:
- **Frontend**: Angular application served via nginx.
- **Microservices**: Node.js Express services for Gateway, Rooms, Events, Weather, Videos, and Sales.
- **Database**: MySQL databases for each microservice.
- **Storage**: MinIO service for media storage.

## How to Contribute

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License.

---

For further details, refer to the architectural documentation and the `docker-compose.yml` file.