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

  /*
   * Tests to the RSS Feeds 'allFeeds' variable
   */
  describe('RSS Feeds', function() {

    it('> Feeds list is defined and not empty', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // Test that every feed has a url property, it is a string and it is not empty
    allFeeds.forEach(function(f, i) {
      it('> Feed at index '+ i +' has url property and is not empty', function() {
        expect(f.url).toBeDefined(); // ensure it is set
        expect(f.url).toEqual(jasmine.any(String)); // ensure it's a string
        expect(f.url).not.toBe(''); // ensure it's not an empty string
      });
    });

    // Test that every feed has a name property, it is a string and it is not empty
    allFeeds.forEach(function(f, i) {
      it('> Feed at index '+ i +' has name property and is not empty', function() {
        expect(f.name).toBeDefined(); // ensure it is set
        expect(f.name).toEqual(jasmine.any(String)); // ensure it's a string
        expect(f.name).not.toBe(''); // ensure it's not an empty string
      });
    });

  }); // RSS Feeds suite



  /*
   * Tests to the Menu behavior
   */
  describe('The menu', function() {

    // Test that the body has expected class on load
    it('> Menu is hidden by default: body class', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    // Test that the menu is in fact offscreen
    it('> Menu is hidden by default: menu is Off-Screen', function() {
      // tests if left edge of menu is off to the left of the screen (negative offset)
      expect($('.slide-menu').offset().left).toBeLessThan(0);
    });

     // Test that the menu responds correctly to clicks
    describe('> Menu changes visibility on click', function(){

      // Before each test, toggle the menu by simulating a click
      beforeEach(function(done){
        $('.menu-icon-link').trigger('click');
        setTimeout(() => done(), 250); // we need to wait a bit while the animation runs
      });

      // Test that the menu, when closed, opens:
      // > body does not have related css class and menu is in fact visible (css testing)
      it('> Test open menu: body class + is On-Screen', function() {
        expect($('body').hasClass('menu-hidden')).toBe(false);
        expect($('.slide-menu').offset().left).toBe(0);
      });

      // Test that the menu, when open, closes:
      // > body has css class (js testing) and menu is in fact off screen (css testing)
      it('> Test close menu: body class + is Off-Screen', function() {
        expect($('body').hasClass('menu-hidden')).toBe(true);
        expect($('.slide-menu').offset().left).toBeLessThan(0);
      });
    });

  }); // The menu suite



  /*
   * Tests to the initial feed items
   */
  describe('Initial Entries', function() {

    // Ensure the feed is loaded before running tests
    beforeEach(function(done){
      loadFeed(0, done);
    });

    it('> At least 1 entry was loaded and added to the DOM', function() {
      var entries = $('.feed .entry');
      expect(entries.length).toBeGreaterThan(0);
    });

  }); // Initial entries suite



  /*
   * Tests to changing Feeds
   */
  describe('New Feed Selection', function() {
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

  }); // Changing feeds suite



}());
