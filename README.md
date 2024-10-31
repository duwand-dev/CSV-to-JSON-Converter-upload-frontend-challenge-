# MRF Generation from Claims File OON Rates

## Overview

This project is a React application designed to facilitate the generation of Machine-Readable Files (MRFs) from a CSV file containing claims data, in compliance with the Transparency in Coverage (TiC) regulations. The application allows users to upload, parse, validate, and approve claims data, which is then sent to a backend API to generate JSON MRF files.

## Features

- User-friendly interface for uploading claims data.
- CSV file parsing and validation using Papaparse and Zod.
- Approval workflow for claims data.
- Integration with a backend API for MRF generation.
- Fetch and display a list of generated MRF files.
- Public page displaying MRF files.
- Secure access to the claims upload page (optional).

## Technologies Used

- **Frontend**: React, Mantine, Tailwind CSS, MobX, AG Grid, React Router, Papaparse, Zod.
- **Backend**: Node.js (assumed for API), Express (assumed for API).

## Project Structure

```bash
/src
  /components       # Reusable UI components
  /pages            # Page-level components
  /stores           # MobX state management
  /services         # API calls and backend interaction
  /utils            # Utility functions
```

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone git@github.com:duwand-dev/CSV-to-JSON-Converter-upload-frontend-challenge-.git
   cd mrf-generation
   ```
2. **Install dependencies**:

   ```bash
   npm install
   ```
3. **Run the application**:

   ```bash
   npm start
   ```
4. **Open your browser and navigate to http://localhost:5137(frontend),  http://localhost:8080(backend) to access the application.**

## Application Workflow
1. **Upload CSV:** Users can upload a claims CSV file using the upload interface.
2. **Parsing & Validation:** The application uses Papaparse to parse the CSV file and Zod for validation against a defined schema.
3. **Approval of Claims:** Users can review the parsed claims data in a table format, approve or edit claims, and remove any unnecessary claims.
4. **MRF Generation:** Upon approval, the data is sent to the backend API to generate and store MRF files.
5. **Display MRF Files:** Users can view the list of generated MRF files on a public page.

## Design Documentation

### Components and Responsibilities

#### Frontend Components

1. **CSV Upload Component**
   - Allows users to upload a CSV file.
   - Displays the file name and handles error messages for incorrect formats.

2. **Claims Data Table Component**
   - Displays parsed and validated claims data using AG Grid.
   - Supports approval, editing, and removal of claims.

3. **Approval Workflow Component**
   - Manages the process of approving claims data before submission.
   - Displays validation errors and allows users to review changes.

4. **MRF File List Component**
   - Fetches and displays a list of generated MRF files from the backend.

5. **Public MRF Display Page**
   - A public page that displays the MRF files for user access.

#### State Management

- **MobX Store**
  - Centralizes application state management, handling claims data, loading states, and validation errors.
  - Allows for easy updates and reactivity across components.

#### Utility Functions

- **CSV Parsing**
  - Utilizes Papaparse to parse the CSV file and transform it into a JavaScript object.
  
- **Validation**
  - Uses Zod to define and enforce a schema for claims data validation.

#### API Interaction

1. **Generate MRF API Endpoint**
   - Endpoint: `POST /api/generate-mrf`
   - Accepts approved claims data and returns the status of MRF generation.

2. **Fetch MRF Files API Endpoint**
   - Endpoint: `GET /api/mrf-files`
   - Returns a list of generated MRF files stored on the server.

### Routing and Navigation

- Utilizes React Router for navigation between components and pages, ensuring a smooth user experience.
- Main routes include:
  - `/upload` - for CSV upload and approval.
  - `/mrf-files` - for viewing the list of generated MRF files.
  - `/public` - for public access to MRF files.

### Data Flow

1. **CSV Upload**: Users upload a CSV file, which is parsed and validated.
2. **Validation**: Claims data is validated against a predefined schema, and any errors are displayed.
3. **Approval**: Users approve claims before submission.
4. **API Call**: Approved data is sent to the backend API for MRF generation.
5. **MRF Generation**: Backend processes the data and generates MRF files.
6. **Display MRF Files**: Users can view and download MRF files from the list.

### Conclusion

This document provides a comprehensive overview of the MRF Generation application design, detailing the architecture, components, state management, and data flow. It serves as a guide for understanding the application's structure and functionality for future development and enhancements.

## API Endpoints
**Generate MRF:** POST request to /api/generate-mrf with approved claims data.

**Fetch MRF Files:** GET request to /api/mrf-files to retrieve the list of generated MRF files.

