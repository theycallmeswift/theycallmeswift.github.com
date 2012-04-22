---
layout: post
title: Using SendGrid with Node.js
---

_TLDR; If you want to send email with your Node.js app, it's super easy to get
set up with [SendGrid](http://sendgrid.com/) via SMTP using
[node_mailer](https://github.com/marak/node_mailer)._

## Okay, so here's the scenario

You've just finished building the most amazing Node app ever.  You
painstakingly wrote enough tests to get 100% coverage and you've designed the
whole application to scale flawlessly. Awesome. And, thanks to [Nodejitsu's 
great documentation](https://github.com/nodejitsu/handbook#hiworld),
you've even managed to get it deployed in the wild. Even better.

Suddenly, a wild TechCruch appears! Before you know what hit you, you're
blowing up on Twitter and you've made the front page of Hacker News. Users are
signing up left and right and the app is really taking off.
Things are going exactly to plan. The app scaled and you've gained instant
celebrity status over night.  Everything is awesome right?  __Wrong.__  Nobody's
clicking through on all the emails you've been sending.

Somewhere along the line, your emails got black-listed and your they're ending up
in your new users' spam folders, not their inboxes.  So, what do you do? Well,
with a little Node.js magic and some help from
[SendGrid](http://sendgrid.com), we'll have you back up and running in no
time.

## Joining the cool kids club

Step one is getting yourself an account on SendGrid.  Head over to [the sign
up page](https://sendgrid.com/user/signup/) and enter in all your deets.  If
you're just testing things out, then the free plan should get you by for now.
Otherwise, you're going to need to sign up for one of the [more advanced
packages](http://sendgrid.com/pricing.html) based on your monthly email
volume.

Once you get all the required stuff filled out, it'll probably take a few
minutes for your actual account to get provisioned.  In the mean time, let's
start writing some code!

## Tools of the trade

<div class="image-frame right">
  <a href="https://github.com/marak/node_mailer">
  <img src="http://pinkyurl.com/i?url=https%3A%2F%2Fgithub.com%2Fmarak%2Fnode_mailer&out-format=png&resize=250"
alt="Node Mailer on Github" />
  </a>
</div>

Luckily for us there are a number of packages that we can use to easily
integrate with SendGrid.  If you're looking for a solid layer of abstraction
between you and your SMTP settings, I recommend checking out the
[sendgrid-nodejs](https://github.com/sendgrid/sendgrid-nodejs) package.  For
the purposes of this tutorial and to show you how easy it is to swap out your
existing SMTP server for a Sendgrid server, we're going to use the
[node_mailer](https://github.com/marak/node_mailer) package written by [Marak
Squires](https://twitter.com/#!/marak) from
[Nodejitsu](http://nodejitsu.com/).

### Install node_mailer && profit

So, lets start by installing node_mailer using [npm](http://npmjs.org/).
Don't forget to update your package JSON to reflect this.

{% highlight bash %}
  $ npm install mailer
{% endhighlight %}

Once we have it installed, hooking it in to our existing app should be
relatively straight forward. All we really have to do is require the package,
design a quick mustache template (optional), and then call the send function
with out SendGrid account settings. I recommend keeping your email settings in
a common config file, since otherwise you'll be typing the following snippet
over and over again in your app.

###### server.js

{% highlight javascript %}
  var email = require('mailer')
    , settings = {
        domain: "smtp.sendgrid.net",
        host: "smtp.sendgrid.net",
        port : 587,
        authentication: "login",
        username: "your_sendgrid_username",
        password: "your_sendgrid_password",
        to : "your_user@their.domain.com",
        from : "you@yourdomain.com",
        subject : "Hello from [Your App]!",
        data: {
          name: "Swift"
        },
        template: "./template.mustache"
    };

  email.send(settings, function(err, result) {
      if(err) {
        // An error occurred. Handle it
      }
      // Your message has been sent!
  });
{% endhighlight %}


###### template.mustache

<div class="highlight">
  <pre><code class="django">
    <span class="x"></span><span class="cp">&#x7b;&#x7b;</span><span class="nv">name</span><span class="cp">&#x7d;&#x7d;</span><span class="x">, I'm writing to tell you that you're awesome!</span>
  </code></pre>
</div>

_Note: If you don't want to use templates, you can omit the
`template.mustache` file and replace the `template` attribute of your settings
with `body` and a text string._

That's it! Done. No problem.  Your app now sends emails using Sengrid and your
messages are making it to the inbox, not the spam folder.

## What if I get stuck?

<div class="image-frame left">
  <a href="http://sendgrid.com">
  <img src="/img/sendgrid_logo.jpg" alt="Node Mailer on Github" class="span3" />
  </a>
</div>

Despite this being a pretty simple process, it's understandable that you might
get stuck somewhere along the way.  Luckily, there are a number of awesome
resources at your disposal, and you should be able to get all your questions
answered right away.  The best place to go for reference is the [SendGrid
docs](http://docs.sendgrid.com/).  There's a pretty extensive collection of
references and tools listed there.  [StackOverflow](http://stackoverflow.com/questions/tagged/sendgrid) 
has also proven to be pretty useful tool for me personally.  And of course, you 
can always tweet at [@SendGrid](https://twitter.com/#!/sendgrid) for help too!
