# Models Folder

### TL;DR
Has all the types used in connecting to the database. Don't use the types that end in `Data`, those are for the raw data.

### Purpose:
Used to store the types of data in the database for typescript.

### Structure:
1. `note.ts`: 
   - Contains the `Note` type - the type of the data that will be stored in the `notes` collection.
   - Contains the `NoteData` type (Don't use this)
2. `user.ts`:
    - Contains the `User` type - the type of the data that will be stored in the `users` collection.
    - Contains the `UserData` type (Don't use this)
3. `section.ts`:
    - Contains the `Section` type - the type of the data that will be stored in the `sections` collection.
    - Contains the `SectionData` type (Don't use this)
    