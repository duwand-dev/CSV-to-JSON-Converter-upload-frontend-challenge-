# Evaluation Rubric

Your project will be evaluated based on the following criteria:

### Functionality (50%)

#### 1. CSV Upload Interface (5%)

- Users can upload a CSV file using the interface.
- Appropriate feedback is provided upon file selection.

#### 2. Parsing and Validation (15%)

- CSV files are correctly parsed using Papaparse.
- Claims data is validated against the defined schema.
- Errors are handled gracefully with informative messages.

#### 3. Data Presentation and Approval (10%)

- Parsed data is displayed using AG Grid.
- Users can approve, edit, or remove claims.
- Changes are reflected accurately in the data.

#### 4. Backend API Interaction (10%)

- Approved data is sent to the backend API.
- The API generates JSON MRF files and stores them.
- API interaction is properly implemented (mocked if necessary).

#### 5. Fetching and Displaying MRF Files (10%)

- The application fetches the list of MRF files from the API.
- The list is displayed in a user-friendly manner.

### Code Quality (20%)

#### 1. Code Organization (10%)

- Code is organized into the correct folders.
- Files and components are logically structured.

#### 2. Readability and Maintainability (5%)

- Code is clean with proper spacing and indentation.
- Comments are used where necessary to explain complex logic.

#### 3. Naming Conventions (5%)

- Variables, functions, and components have meaningful names.
- Consistent naming conventions are followed throughout the project.

### Design and User Experience (15%)

#### 1. Use of Mantine Components (5%)

- Mantine components are effectively utilized.
- No custom components are created from scratch unnecessarily.

#### 2. Styling with Tailwind CSS (5%)

- Tailwind classes are used appropriately for styling.
- The application has a consistent and clean design.

#### 3. Overall UI/UX (5%)

- The interface is intuitive and easy to navigate.
- User interactions are smooth and responsive.

### Documentation (10%)

#### 1. README.md (5%)

- Contains clear instructions on setting up and running the application.
- Includes any necessary information about dependencies and configurations.

#### 2. DESIGN.md (5%)

- Provides a comprehensive explanation of the application architecture.
- Details components, state management, and API interactions.

### Following Instructions (5%)

- All the specified requirements and instructions are followed.
- You do not improvise or deviate from the given tasks.
- The application meets the objectives outlined in the challenge.

### Version Control and Commit Structure (5%)

- Commits are well-structured and follow a logical progression.
- Commit messages are clear, concise, and descriptive.
- Commits are made frequently, showing incremental progress.
- Each commit represents a single, coherent change or feature.

### Delivery Speed

- While there is no strict deadline, the ability to deliver a functional application promptly is appreciated and will be taken into consideration.

## Additional Considerations

- **State Management**: Use MobX for all state management, and keep it confined to one file as specified.
- **Routing**: Implement routing using React Router to navigate between the upload page, approval page, and the public MRF files page.
- **Error Handling**: Ensure that all forms of errors (network issues, validation errors, etc.) are handled gracefully with user-friendly messages.
- **Testing**: While not mandatory, adding basic tests can showcase attention to quality.

---

We look forward to seeing your solution!
