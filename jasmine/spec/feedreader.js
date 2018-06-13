/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /* This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* It tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* It loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL defined', function() {
            allFeeds.forEach(function(index) {
                expect(index.url).toBeDefined();
                expect(index.url.length).not.toBe(0);
            });
         });

        /* It loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name defined', function() {
            allFeeds.forEach(function(index) {
                expect(index.name).toBeDefined();
                expect(index.name.length).not.toBe(0);
            });
         });
    });

    /* This suite is about the menu and its visibillity
     * by default and after several clicks.
     */
    describe('The menu', function() {
        let body;
        let menuIcon;

        beforeEach(function() {
            body = $('body');
            menuIcon = $('.menu-icon-link');
        });

        // It ensures the menu element is hidden by default.
        it('is hidden', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
         });

         // It ensures the menu changes visibility when the menu icon is clicked.
        it('changes visibility', function() {

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
          });
    });

    // This suit is about loadFeed function and content of the feed
    describe('Initial Entries', function() {

        /* It ensures when the loadFeed function is called 
         * and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
         });

        it('there is at least a single .entry element within the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
         });

    });

    // This suit is about the difference of feed content
    describe('New Feed Selection', function() {
        let firstFeed, secondFeed;
        /* It ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         beforeEach(function(done) {
            loadFeed(0, function() {

                firstFeed = document.querySelector('.feed').innerHTML;

                loadFeed(1, function() {
                    secondFeed = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
         });

         it('the content actually changes', function() {
            expect(secondFeed).not.toEqual(firstFeed);
         });
    });
}());
