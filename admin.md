# Admin Sheet
    Administrative control panel for tournament configuration and player/team logic
## Backend Sheets 
> [!WARNING]
Do not touch unless you know what you’re doing
#### _api
Stores raw and parsed osu! API data and attributes for each user. Contains attributes including User ID, username, Country Code, Global Rank, Country Rank, etc.
#### _var
A configuration backend feeding variables into logic in the other sheets. Allows for easier references to Settings
#### _google_forms
Holds and parses structured data directly from a Google Form for Team/Player Registration to a format that is friendly to the osu! API
#### _player_data
Filters and organizes view of all participating players. Contains parsed stats and management flags, including team assignment, removal toggles, and more
#### _team_data
Stores final team compositions, including metadata and player links. Central record for sorting, ranking, and displaying team results
#### _player_badges 
Detailed log of badge achievements per user. Filters all badges by whether they were achieved from a valid tournament. 

## Configuration Sheets
### Settings
Serves as the central control panel for the tournament. It defines key configurations such as tournament metadata, rank and badge eligibility rules, form source mappings, display preferences, and logic toggles. All other sheets reference values from this sheet to ensure consistency and automation across team listings, screening, and frontend panels. Here is a summary of the settings:
#### Tournament Metadata
- Tournament Name: Defines the full official name of the tournament. Used in public-facing panels and generated exports
- Tournament Acronym: A short identifier for the tournament, typically 2-5 characters. Used in internal references and UI labeling
- Game Mode: Specifies the game mode for the tournament (Standard, Taiko, Catch the Beat, Mania). Affects Display logic and some filters
- Format: Declares the competition structure. Must be one of the following:
    - 1v1: A solo player tournament.
    - Team vs.: A team-based format (e.g., 2v2, 4v4).
- Region Lock: Boolean toggle to enforce geographic participation restrictions. Ued in eligibility checks and filtering
- Host(s): List of host usernames or Discord tags. Can be used in auto-generated staff bbCode or info Panels
- Start Date: Indicates when the tournament begins. Useful for scheduling, countdowns, or archiving logic

#### Screening & Rank Rules
- Form Badges: Enables use of badge counts submitted via forms instead of relying purely on API
    - Yes: Replaces the badge count with the manually entered form badges
    - No: Uses exclusively the badges from the API
    - Pending: Form badges are added to the API badges
- Use BWS: Enables or disables BWS (Badge-Weighted Seeding). When enabled, it alters global ranks based on badge counts
- BWS Formula: defines the mathematical formula used to calculate BWS-adjusted rank. Must reference badges and either global or country rank
BWS Constants (X, Y, Z): Constants used within the BWS formula to scale or weight results. These control how badges affect seeding
- Rank Range: Defines the range of global (or country) ranks eligible for the tournament. The lower bound is the highest-ranked player allowed, and the upper bound is the lowest-ranked player allowed. Players outside this range will be filtered out. Leave it blank for no filtering
- Max Badges: Optional cap on how many badges a player may have to remain eligible. Primary used in more casual or beginner-focused tournaments. Leave it blank if you don’t want to have a badge cap

### Google Form Settings
#### Team Form Settings
- Team Registrations Form Sheet Name: The exact name of the sheet where team registrations are stored. Required for dynamic column mapping
- Team Name Column: Column reference (e.g., B, C) where team names are located in the registration sheet
- Team Timezone Column: Column containing the team’s listed timezone. Important for scheduling and matchup generation
- Team Availability Column: Column containing availability data (e.g., preferred match days/times)

#### Team Players Setup
This table defines how player-specific data is extracted from the Team Registration Form based on column position. It allows the system to support flexible team sizes and form layouts by assigning exact column locations for each field.		

- Columns: Represents Player 1 through Player 10. Automatically calculates Team Size based on ID
#### Rows:
- ID: Column letter or index for the osu! user ID or username.
- Discord: Player’s Discord handle (used for communication).
- Timezone/avail: Timezone and/or availability input. Used for scheduling.
- Badges: Optional field for player-submitted badge counts (If enabled in screening).
#### Free Agent Form Settings (Use this for 1v1)
- FA Registrations Form Sheet Name: The sheet name for the free agent or solo player Google Form responses.
- User ID Column Column: osu! User ID field submitted by the player.
- Discord Column: Column containing the player’s Discord username for contact purposes.
- Badges Column: Column containing the player’s manually inputted number of badges (optional)
- Description Column: Column containing a self-written description (optional)
- Timezone Column: Column containing the user’s listed timezone. Important for scheduling and matchup generation
- Availability Column: Column containing the user’s availability data (e.g., preferred match days/times)

This mapping ensures that each player’s info is pulled correctly from the Google Form and passed into screening, team listing, and DIY panel logic.

#### Display/Output Settings
- Sort Teams by: Defines default team sorting method
- Team Name: Sorts teams by their names alphabetically A-Z
- Team Average Rank: Sorts teams by their average rank
- Timestamp: Sorts teams based on registration timestamp, with the earliest submissions appearing first.
- Team Avatar: The size (in pixels) of the team’s avatar (Default is 50x50)
- Team Player Avatar: The size (in pixels) of the player’s avatar (Default is 50x50)
1v1/FA Player Avatar: The size (in pixels) of each free agent’s avatar (Default is 25x25)
- Country Flag: The size (in pixels) of each country flag (Default is 25x25)


## Team Search & Filter
Provides an interactive dashboard for reviewing all registered teams. It allows organizers, referees, or captains to search, sort, and filter teams based on eligibility criteria and tournament settings.

This sheet pulls live data from the team listing and applies manual overrides, filters, and flags to help streamline decision-making and validation.

- Auto-Exclude Team if Out of Range: Controls how team-level eligibility is evaluated
- Don’t Exclude: Never exclude teams
- At Least 1 Player: Require at least 1 eligible player
- Average Rank: Use the team’s Average Rank for evaluation
- Whole Team: All players must be within range to include the team

#### Sort Teams by (Optional Toggle for Ascending vs. Descending):
- Team Average Rank: Sorts by the team’s average BWS rank (if enabled)
- Team Name: Sorts by the Team Name alphabetically 
- Timestamp: Sorts by whoever submitted their form first

#### Displaying Toggle: 
- Whitelisted: Displays all teams eligible for the tournament
- Blacklisted: Displays all teams NOT eligible for the tournament

#### Manually Removed Teams: Enter a list of team names to manually disqualify them
Manually Overridden Teams: Enter a list of team name names to manually override their disqualification, if they are disqualified

#### diy_team

Provides a customizable dashboard that allows users to directly configure the backend of the Team Display sheet used in an =IMPORTRANGE() function.

- Rows: Determines the number of rows each entry will take in a multi-level display	