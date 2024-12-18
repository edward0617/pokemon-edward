# Pokemon Dashboard
This project is a Pokemon Dashboard web application, built to provide a detailed interface for exploring Pokemon Data. Users can navigate through a list of Pokemon, view individual Pokemon details, explore their evloutionary chains, and paginate through the data seamlessly.

## Features
- **Dashboard**: Displays a list of Pokemon with essential details.
- **Detail View**: Provides in-depth information about each Pokemon.
- **Evolution Chain**: Visualizes the evolution chain of a selected Pokemon.
- **Pagination**: Enables smooth navigation across pages of Pokemon data.
- **Responsive Design**: Ensures optimal viewing across devices.

## API Description
1. Base URL https://pokeapi.co/api/v2
2. Key Endpoints
  - Get All Pokemon
    - Endpoint: /pokemon
    - Purpose: Fetch a paginated list of all Pokemon, including basic details like name and URL for further queries.
    - Example Request: GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
  - Get Pokemon Details
    - Endpoint: /pokemon/{id or name}
    - Purpose: Fetch detailed information about a specific Pokemon, including stats, abilities, types, and more.
    - Example Request: GET https://pokeapi.co/api/v2/pokemon/1
  - Get Evolution Chain
    - Endpoint: /evolution-chain/{id}
    - Purpose: Retrieve the evolution chain for a specific Pokemon, showing its evolutions and conditions for evolving.
    - Example Request: GET https://pokeapi.co/api/v2/evolution-chain/1/
  - Get Pokemon Species
    - Endpoint: /pokemon-species/{id or name}
    - Purpose: Retrieve species-specific data such as flavor text, habitat, and gender differences.
    - Example Request: GET https://pokeapi.co/api/v2/pokemon-species/1
  - Get Type Information
    - Endpoint: /type/{id or name}
    - Purpose: Get information about a specific type, including Pokemon of that type and damage relations.
    - Example Request: GET https://pokeapi.co/api/v2/type/1

## Project Start
1. clone the repository.
```bash
  git clone <repository_url>
  cd <repository_folder>
```
2. install dependencies.
```bash
  npm install
```
3. Start the Server
```bash
  npm start
```
## Implementation
1. Add the Search Autocomplete: Improve the search experience by suggesting Pokemon names as users type.
2. Preload Images: Use lazy loading or preloading strategies to improve performance for image-heavy pages.
3. Dark Mode: Implement a light/dark mode toggle to enhance usability and aesthetic appeal.
4. Testing: Implement the test using Jest or React Testing Library.