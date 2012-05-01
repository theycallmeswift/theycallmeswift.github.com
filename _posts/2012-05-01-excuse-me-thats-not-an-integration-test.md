---
layout: post
title: Excuse me, that's not an integration test
---

At some point yesterday, I discovered [this article](http://open.bekk.no/integration-testing-backbone-js/)
about integration testing Backbone.js apps.  Much to my surprise, the article 
was really about unit testing, not integration testing.  I think there was a
bit of confusion on [the difference between the two](http://osherove.com/blog/2008/5/31/unit-testing-vs-integration-testing-the-restaurant-analogy.html),
and I'd like to take this opportunity to clear things up a bit and to show you 
some examples of what __true, full-stack integration
testing__ for client-side Javascript applications looks like.

### The Anatomy of Full-stack Testing

Testing Javascript applications is a subject that's near and dear to my heart.
I spent most of the last six months working on migrating a lot of the existing 
functionality from [Crowdtap](http://www.crowdtap.com/) over to a client side 
Javascript application.  As an agile Rails shop, we're firm believers in both
Test-driven Development and Behavior-driven Development, so translating these
practices over to our new JS app was absolutely essential.  We also wanted to
make sure it was fast.  When we started this project, it took
nearly an hour to run just the features for the Rails app.  Thanks to a little
[Node.js](http://nodejs.org) magic, all the tests (both unit and
integration!) for the new client-side application run in under 5 minutes.

_Note: This example uses [Spine](http://spinejs.com/) and
[Coffeescript](http://coffeescript.org/), but the same principles would apply
to Backbone and Javascript._

#### Unit testing

For our unit tests, we ended up using a pretty standard stack of
[Jasmine](http://pivotal.github.com/jasmine/) and [Sinon.js](http://sinonjs.org/) 
(which is what the author of the article used).  Together, these
tools make it easy to isolate specific functionality and test that it works
given a specific set of inputs / conditions.  Take this model spec for
example:

{% highlight coffeescript %}
  describe "#isNew", ->
    beforeEach ->
      timestamp = (new Date("11/20/89")).getTime()
      clock = Sinon.useFakeTimers(timestamp, "Date")

      newMission = Mission.create({ created_at: "11/18/89" })
      oldMission = Mission.create({ created_at: "11/01/89" })

    it "returns true if the mission was created less than a week ago", ->
      expect(newMission.isNew()).toEqual(true)

    it "returns false if the mission was created over a week ago", ->
      expect(oldMission.isNew()).toEqual(false)

    afterEach ->
      clock.restore()
      Mission.deleteAll()

{% endhighlight %}

Cool, huh? It's simple, it's fast, and it isolates functionality from the 
rest of the application.  All the things a good unit test should do!  So now
you're saying "That's awesome! But, I just read an entire article about how to
unit test my client-side JS app..."

Fair enough. So, now let's move on to the part where our stack really shines - 
the integration tests!

#### Integration Tests... Powered by Zombies!

There are really three main properties that define our integration tests:

 1. __Tests are run in the target environment__ - In our case, since we're writing
a web app, all our tests should be run in a browser (the
[headless](http://phantomjs.org/) and [simulated](http://zombie.labnotes.org/)
 kind are acceptable).

 2. __We perform all the necessary interactions__ - If we want to see the
application in a certain state, we need to actually perform every step to get
us there (clicking links, filling in text boxes, hovering over images).

 3. __The only thing we mock is data__ - Of course we're going to need some
kind of data to interact with during our tests.  Mocking out JSON responses is
a completely acceptable method of accomplishing this.

At Crowdtap, we use the Javascript port of [Cucumber](https://github.com/cucumber/cucumber-js)
to structure our tests.  [Zombie.js](http://zombie.labnotes.org/) loads up the
actual application and handles all the actual interactions we have with the
page.  Obviously, we've made some choices as to the languages and tools we
used, but you could easily swap them out for your own preferences.
Next, let's actually see what some code would look like.

Imagine, if you will, that you have a Javascript app.  It can be as simple or as complex as you
would like.  For simplicity's sake, we're going to assume it lives at
`index.html`, but realistically you could put it where ever you want as long
as you can access it through a browser.  So maybe that looks something like
this:

###### index.html

{% highlight html %}
  <!DOCTYPE html>
  <html>
    <head>
      <title>App</title>
      <link rel='stylesheet' href='/application.css' type='text/css'>
      <script src="/jquery.min.js" type="text/javascript" charset="utf-8"></script>
      <script src="/application.js" type="text/javascript" charset="utf-8"></script>
      <script type="text/javascript" charset="utf-8">
        $(function(){
          var MyApplication = require("my_application");
          new MyApplication({ el: $("body") });
        });
      </script>
    </head>
    <body></body>
  </html>
{% endhighlight %}

Pretty simple. You could literally open up `index.html` in any old web browser
and your app would work.  But, now comes some Cucumber magic.  In our World
file, we're going to actually start the server.  If you're using
[Spine](http://spinejs.com/), there's a handy little tool called Hem that
handles all that magic for you.  You could easily swap this out with your
node.js http server of choice.

###### world.coffee

{% highlight coffeescript %}
  Browser = require 'zombie' # our headless browser
  nock    = require 'nock' # An awesome tool for stubbing out HTTP requests

  # Swap this out with your HTTP server of choice
  Hem = require 'hem'
  App = new Hem
  App.server()

  class World
    constructor: (callback) ->
      @browser = new Browser()
      @apiMock = nock("http://localhost")
      callback(this)

    visit: (url, next) ->
      @browser.visit url, next

{% endhighlight %}

All we're doing in world is instantiating a new Zombie browser to load our app
with and giving Cucumber access to it.  We also included some handy helpers
for API mocking and actually visiting the web page.  Now let's say we wanted to 
write the following feature:

{% highlight cucumber %}
  Feature: Viewing awesome people
    In order to figure out who is awesome
    As a visitor
    I want to see a list of awesome people

    Background:
      Given the API returns the following JSON response for the awesome people index:
       """
        [{ "name": "Swift" }]
        """

    Scenario: Viewing the list
      When I am on the home page
      Then I should not see "Swift"
      But I should see "Awesome people"
      When I click "Awesome people"
      Then I should see "Swift"

{% endhighlight %}

Pretty straight forward.  Now all we need are the step definitions to power it:

###### shared_steps.coffee

{% highlight coffeescript %}
  sharedSteps = module.exports = ->
    @World = require("../support/world").World

    @Given /^I am on the home page$/, (next) ->
      @visit "/", next

    @Given /^the API returns the following JSON response for ([^:]+):$/, (pathMatcher, jsonString, next) ->
      # We have a set of path selectors that map to API endpoints
      path = @pathFor(pathMatcher)
      @apiMock.get(path).reply(200, JSON.parse(jsonString))
      next()

    @When /^I click "([^"]*)"$/, (link, next) ->
      @browser.clickLink link, next

    @Then /^I should (not )?see (.+)$/, (negation, namedElement, next) ->
      # We have a set of named elements that map to jQuery selectors
      selector = @selectorFor(namedElement)
      element = @browser.queryAll(selector)

      if negation
        element.length.should.eql 0, "Number of elements with selector #{selector}"
      else
        element.length.should.eql 1, "Number of elements with selector #{selector}"

      next()

{% endhighlight %}

With these four step definitions, we can effectivly recreate any enviornment
we need to with our app.  Of course, you'll have to implement more specific
ones as you go alone, but this covers visiting the page, data stubs, clicking
links, and element visibility.  

And that's it.  Now we have a true, full-stack integration test.  When we run 
our feature, if at some point in our application we forgot to call, say,
 `fetch()`, we're going to know immediately because we're never going to see 
"Swift" anywhere on the page.

_P.S. If you think this stuff is awesome and  you're looking for a great place
to work, I would highly recommend checking out the [Crowdtap jobs board](http://crowdtap.it/jobs/)._
