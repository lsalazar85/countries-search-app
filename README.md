# countries-search-app
Countries search with map pin. Web app developed in Next.js & Typescript

## Technical Considerations
* The JSON file has been updated with all the countries in the Americas to enhance the interactivity when searching for a country within the continent.
* The app is developed in Next.js with Typescript to ensure type safety and better code quality.
* The entire user experience revolves around the map and the pin placement for each region, making the interaction more intuitive and visually engaging.

## Opportunities for Enhancement
* Enhance Error Handling: The API occasionally returns a 429 error when saturated, and there may be other similar errors due to excessive requests. Gathering all these errors and providing more descriptive messages to improve user feedback would be beneficial.
* Integrate Unit Testing: Adding unit tests for more complex functionalities, such as the Search and Map components, would help ensure their reliability, especially given the extensive processes involved in displaying data.
* Expand Data Coverage: Add more regions and countries to the countries.json file, and consider creating a backend with GraphQL to unify latitude and longitude data. This would streamline data management by reducing the need for extensive front-end data transformations.

## Deployment app
[https://countries-search-app-on.vercel.app/](https://countries-search-app-on.vercel.app/)

## Run
```
    npm install
    npm run dev
```

```
    yarn install
    yarn run dev
```
Starts on `http://localhost:3000`

## Build
```
    npm run build
```

## Development technologies and external packages
* Next.js
* Typescript
* GraphQL
* Leaflet Map
* Tailwind
* React Icons
