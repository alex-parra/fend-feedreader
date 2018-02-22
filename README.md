# Udacity FEND - Feed Reader Testing

A project to practice TDD in JS with Jasmine.  
Fork of: http://github.com/udacity/frontend-nanodegree-feedreader  
  

## Running this app
- No special build routines required.
- Just serve index.html through a webserver
- Direct file loading is not guaranteed to work


## Tests
All test suites described below are in ./jasmine/spec/feedreader.js
To see tests results, load index.html in a browser

- **RSS Feeds Suite**  
  Tests to ensure the ```allFeeds``` variable is set and filled as expected  
  - Ensures that ```allFeeds``` variable is set  
  - Ensures that every feed as a name  
  - Ensures that every feed as a URL  
  

- **The Menu Suite**  
  Tests to ensure the menu behaves has expected  
  - Ensures that the body has correct css class  
  - Ensures that the menu is off-screen  
  - Ensures that clicking ```menu-icon-link```, when menu is closed, it becomes open/visible  
  - Ensures that clicking ```menu-icon-link```, when menu is open, it becomes closed/invisible  
  

- **Initial Entries Suite**  
  Tests that the default feed entries are loaded and injected into the DOM  
  - Ensures at least 1 entry was loaded and is present in the feed entries list  
  

- **Feed Selection Suite**  
  Tests that there is more than one feed and that feed entries change after load  
  - Ensures ```allFeeds``` has more than 1 item
  - Ensures ```.feed``` contents change after loading a new feed


