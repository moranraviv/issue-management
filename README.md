# issue-management
Issue entity management that allows user to get, create and update entities via RESTful apis

## Issue Entity
- "host": mandatory, must be a valid domain
- "path": mandatory, must be a valid path
- "method": mandatory, by config
- "module": must be a string,
- "type": by config
- "status": by config
- "severity": by config
- "description": must be a string

## Issue Entity Example:
{
    "host": "some.domain.com",
    "path": "/some/path",
    "method": "GET",
    "module": "DETECTION",
    "type": "Excessive Data Exposure",
    "status": "OPEN",
    "severity": "HIGH",
    "description": "API returns sensitive user data."
}

## Requirements:
- MongoDB for data persistence

## Configuration:
- db.config - for connection string
- validation.constants - for entity fields supported values
  update supported method, status, severity and type via it
  module and description are free texts. 

Note: module is free text for simplicity. If we would like data distribution by module we better change it to a supported value list as other fields are.

## Apis:
- GET /issues
Get all issues

- GET /issues?host={}&path={}&method={}
Get issues by host and/or path and/or method

- GET /issues?api={}
Get issues by full api - example: /issue?api=POST www.domain.com/path/to/api
If using api query param, no other param is allowed

- POST /issues
Create a new issue
method, host and path are mandatory
Return: entity id

- PATCH /issues
Upsert issues by method, host and path
method, host and path are mandatory
If there are matching issues they will be updated - meaning, only its relevant fields are changed
Otherwise a new issue will be created
Return: matchedCount: number of entities that matched the filters criteria  
        modifiedCount : number of entities that were updated
        upsertedId: issue id if one was created  

- PUT /issues/:id
Update issue by id
If issue exist it will be replaced with the new one

Notice:
Query params that are not supported are ignored
Body fileds that are not supported are ignored
