# VelvetFusion (Spring Boot API)

A Java-based REST API for calculating Persona fusions, inspired by the Persona video game series. This Spring Boot application provides HTTP endpoints for searching personas and calculating fusion results between different personas.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Database](#database)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Dependencies](#dependencies)
    - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
    - [Get All Personas](#get-all-personas)
    - [Get Specific Persona](#get-specific-persona)
    - [Fuse Personas](#fuse-personas)
- [Usage Examples](#usage-examples)
- [How Fusion Works](#how-fusion-works)
- [Features in Detail](#features-in-detail)
    - [Fuzzy Search](#fuzzy-search)
    - [Spring Boot Architecture](#spring-boot-architecture)
- [Current Limitations](#current-limitations)
- [Roadmap](#roadmap)

## Features

- **REST API**: HTTP endpoints for persona operations
- **Persona Search**: Fuzzy search functionality with case-insensitive matching and special character normalization
- **Fusion Calculator**: Calculate the result of fusing two personas based on arcana rules and level calculations
- **Spring Boot Integration**: Dependency injection, auto-configuration, and embedded web server
- **PostgreSQL Integration**: Persistent persona data storage using PostgreSQL database
- **JSON Responses**: All endpoints return JSON data
- **Data-Driven**: Fusion chart still maintained in JSON for flexibility

## Project Structure

```
src/
├── main/
│   ├── java/com/velvetfusion/velvetfusion_api/
│   │   ├── archive/
│   │   │   ├── DataLoader.java
│   │   │   ├── PersonaSearchService.java
│   │   ├── controller/
│   │   │   └── PersonaController.java         # REST API endpoints
│   │   ├── model/
│   │   │   └── Persona.java                   # JPA entity representing persona
│   │   ├── repository/
│   │   │   └── PersonaRepository.java         # JPA repository interface
│   │   ├── service/
│   │   │   └── FusionCalculatorService.java   # Core fusion logic service
│   │   ├── PersonaNotFoundException.java      # Custom exception
│   │   └── VelvetfusionApiApplication.java
│   └── resources/
│       ├── application.properties             # Spring Boot configuration (includes PostgreSQL settings)
│       └── fusionChart.json                   # Arcana fusion rules (JSON)
└── pom.xml                                    # Maven dependencies
```

## Database

This application uses PostgreSQL for persistent storage of persona data. The database connection is configured via `application.properties`, including URL, username, and password. Persona entities are managed using Spring Data JPA, enabling CRUD operations and queries through the `PersonaRepository` interface.

The fusion chart remains in a JSON file (`fusionChart.json`) for easy modification and extension of fusion rules.

## Development Status

**🚧 Work in Progress**: This is the Spring Boot API version currently under development.

### Current State
- ✅ REST API endpoints functional
- ✅ Persona search and fusion logic working
- ✅ Spring Boot architecture implemented with PostgreSQL integration
- ✅ Database integration complete (Phase 3)
- 🔄 Frontend interface pending (Phase 4)

### Tech Stack
- Spring Boot
- Java
- Maven
- Jackson for JSON processing
- PostgreSQL for data storage

## Planned API Design

### Get All Personas
```
GET /api/v1/persona
```
Returns all personas in the database.

### Get Specific Persona
```
GET /api/v1/persona/{name}
```
Returns details for a specific persona. Uses fuzzy search for name matching.

### Fuse Personas
```
GET /api/v1/persona/fuse?name1={persona1}&name2={persona2}
```
Calculates the fusion result between two personas.

## Architecture Overview

The application follows a clean 3-layer architecture:
- **Controller Layer**: `PersonaController` handles HTTP requests/responses
- **Service Layer**: `PersonaSearchService` and `FusionCalculatorService` contain business logic
- **Data Layer**: `PersonaRepository` handles database access via JPA

Spring Boot manages all component lifecycles through dependency injection.

## How Fusion Works

1. **Arcana Lookup**: Determines result arcana based on the fusion chart
2. **Level Calculation**: `(level1 + level2) / 2 + 1`
3. **Persona Selection**: Finds the lowest-level persona of the result arcana that meets the minimum level requirement

## Features in Detail

### Fuzzy Search
The search function normalizes input by:
- Converting to lowercase
- Removing special characters and spaces
- Matching against all persona names in the database

Examples that work:
- "jack frost" → "Jack Frost"
- "jacko lantern" → "Jack-o'-Lantern"
- "ARSENE" → "Arsene"

## Current Limitations
- Fusion chart is still maintained as a JSON file (not yet migrated to database)
- No special fusion cases implemented yet
- Skill inheritance features not supported
- Limited persona database (dependent on PostgreSQL data)
- No reverse fusion lookup
- No fusion chain calculations

## Roadmap
✅ **Phase 1 (v0.1)**: CLI Version (Complete)  
✅ **Phase 2 (v0.2)**: Spring Boot REST API (Complete)  
✅ **Phase 3 (v0.3)**: Database Integration (PostgreSQL) (Complete)  
🔜 **Phase 4 (v0.4)**: Frontend Interface (React/Next.js)  
🔜 **Phase 5 (v1.0)**: Production Release (Advanced features, polish)

---

**Version**: v0.3 (Spring Boot API)  
**Status**: Core API functionality and database integration complete, frontend pending