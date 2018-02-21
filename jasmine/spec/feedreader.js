/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('> Feeds list is defined and not empty', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    allFeeds.forEach(function(f, i) {
      it('> Feed at index '+ i +' has url property and is not empty', function() {
        expect(f.url).toBeDefined();
        expect(f.url.length).not.toBe(0);
      });
    });


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    allFeeds.forEach(function(f, i) {
      it('> Feed at index '+ i +' has name property and is not empty', function() {
        expect(f.name).toBeDefined();
        expect(f.name.length).not.toBe(0);
      });
    });
  });


  /* TODO: Write a new test suite named "The menu" */
  describe('The menu', function() {
    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('> Menu is hidden by default: body class', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    it('> Menu is hidden by default: menu is Off-Screen', function() {
      // tests if left edge of menu is off to the left of the screen (negative offset)
      expect($('.slide-menu').offset().left).toBeLessThan(0);
    });


     /* TODO: Write a test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should have two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */
    describe('> Menu changes visibility on click', function(){
      beforeEach(function(done){
        $('.menu-icon-link').trigger('click');
        setTimeout(() => done(), 250);
      });

      it('> Test open menu: body class + is On-Screen', function() {
        expect($('body').hasClass('menu-hidden')).toBe(false);
        expect($('.slide-menu').offset().left).toBe(0);
      });

      it('> Test close menu: body class + is Off-Screen', function() {
        expect($('body').hasClass('menu-hidden')).toBe(true);
        expect($('.slide-menu').offset().left).toBeLessThan(0);
      });
    });
  });

  /* TODO: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done){
      loadFeed(0, done);
    });

    it('> At least 1 entry was loaded and added to the DOM', function() {
      var entries = $('.feed .entry');
      expect(entries.length).not.toBeLessThan(1);
    });
  });

  /* TODO: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    var firstFeedEntries = [];

    beforeAll(function(done){
      loadFeed(0, function(){
        // first load done. store a list of the feed entries to compare later
        firstFeedEntries = $('.feed .entry-link');

        // Grab a list of feed ids so we can get the last id in the list
        var feedIds = Array.from(allFeeds.keys());
        loadFeed(feedIds.pop(), done);
      });
    });

    it('> More than one feed exists', function() {
      expect(allFeeds.length).toBeGreaterThan(1);
    });

    it('> Feed content changes on change feed', function() {
      var entries = $('.feed .entry-link');
      expect(entries.eq(0).attr('href')).not.toBe(firstFeedEntries.eq(0).attr('href'));
    });

  });

}());
