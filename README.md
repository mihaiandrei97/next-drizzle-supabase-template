## Features

The project is organized around the "feature-first" approach, where each feature of the application resides in its own directory within the `features` folder. This structure promotes modularity and scalability, making it easier to manage and develop the application as it grows.

### Directory Structure

Within each feature directory, you will find the following subdirectories and files:

- `services/`: Contains the business logic and data fetching mechanisms. Services are responsible for communicating with external APIs or databases.
- `components/`: Holds the React components specific to this feature. 
- `api/`: Contains api calls (for ex: react-query calls) 
- Other files: Depending on the feature's needs, you might find additional files and directories here, such as utilities, hooks, or context providers.

## Getting Started

To get the project up and running on your local machine, follow these steps:

1. Install dependencies:

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
