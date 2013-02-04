---
layout: post
title: "The elements of a great API demo."
---

Recently, I've been thinking about what it is that makes a great API demo.  Not
a good API demo, *a great API demo*.  There's probably no 100% formula, but I've
come up with some tips that will definitely get you going in the right
direction.

My current demo is something that I'm particularly proud of.  If you haven't
seen it already, here's a decent recording of it from PennApps.

<iframe width="560" height="315" src="http://www.youtube.com/embed/-5gZ4FwL-ro"
frameborder="0" allowfullscreen></iframe>

Even with the Tweetdeck mishap, the whole thing is streamlined down to a
science.  And there's a reason for that.  The thing that people often don't
realize is that this demo is the product of dozens of iterations.  I've been
carefully optimizing it for a while now, trying to take full advantage of every
precious second I get.  Which leads me to my first point.

## Know your audience.

The demo you give to a room of student hackers and the demo you give to a
room of potential customers *should be different*.

Knowing your audience is about understanding their goals and problems.  You should 
be tailoring what you're saying specifically to people in the room.  That group
of CTOs doesn't want to see you use your API to spam your friends with cat photos,
and the hackers at a hackathon don't want to hear about how your API can grow their 
business.  Know who you're talking to and make it relevant to them.

A great example of this is the [SendGrid newsletter app](http://blog.sendgrid.com/new-marketing-newsletter-application/).
If I'm talking to a room of developers, I don't even mention the newsletter app at all.
If I have a lot of time, I might mention that we have an API for sending newsletters,
but the UI just isn't relevant to them.  On the other hand, if I'm addressing a group of
marketers, the newsletter UI is the main focus of my talk.

## Use the right medium.

There's this common belief among developer evangelists that live coding
is better than a slide deck during a demo.  I actually disagree even though
you'll rarely catch me using slides.  You see, there's a right medium for
everyone.  I'm very comfortable in a console, so live coding works for me.  That
said, I've seen a ton of great demos given from the browser and from a slide deck
too.

I want to take a minute to talk about slides in more depth.  Slides are **not**
the enemy. We think that slides are bad because we're used to seeing bad slides.
Let me illustrate.  Have a look at this slide:

![Bad Slide](/img/bad_slide.png)

And then compare it to this one:

![Good Slide](/img/good_slide.png)

It's pretty obvious which one is better.  Slides don't *need* to be boring.
They can be simple and fun.  You just have to go the extra mile and put some
personality into them.

## Keep it simple.

Whether you're using slides or live coding an app, always keep things simple.  When I
first started demoing SendGrid, I was trying to figure out a way to incorporate
[all the APIs into one demo](https://speakerdeck.com/theycallmeswift/sendgrid-del).
The result was a super complicated demo with a lot of moving parts.

If things get complicated or you unleash a flood of information, people will
start dropping like flies.  The best way to combat this is to ask yourself a
simple question:

> When I finish this demo, what's the one thing I want people to
remember?

In the case of the SendGrid demo, I want people to remember that we make it
super easy to send email.  Once I figured that out, I focused on getting
people excited about sending email and dropped the rest of the APIs entirely.
My demos started getting better immediately and people understood what we did a
lot faster.

## Things will go wrong. Be Ready.

If you're going to give a lot of demos, accept now that you're going to mess up.
Even the most practiced presenters will have a typo or skip an important point
on a slide, there's no avoiding it.

But messing up doesn't have to ruin your demo.  In fact, you can use it to your
advantage if you're really good.  The key is being able to recover once it happens.

The best advice I can give to this point is **breathe**.  When I mess up, I tend to 
find myself starting to rush things because I get nervous.  When this happens, I end 
up skipping more things or messing up worse.

**Stop.  Breathe.  Collect your thoughts and then continue.**

Here are a few things you can do to help avoid problems from the start:

 - Check that the internet is working
 - Make sure you shut down Tweetdeck, IRC, GChat, etc.
 - Run through your demo to make sure it works
 - Have backup slides and be ready to talk without anything

## Practice & Iterate.

I've given my current demo about 10 times publicly, but I must have run through
it by myself 100 times before that.  Know what you're going to say before you
say it and know it well.  Plenty of good API demos were given on the fly, but if
you want to be *great*, you need to practice.

Another thing that can help make a demo great is experimentation.  Every time
I give my demo, I try to make at least one test change.  For example, I tried
giving the talk with the Arduino plugged in from the start instead of starting
with it unplugged.  I noticed that things went a lot smoother when I wasn't fumbling
with the cord, so it stuck.  After that, I tried starting with the code
pre-written, which had too much magic and didn't stick.  Experiment and make
changes based on what performs well and what doesn't.

## &lt;/tips&gt;

The tips should be enough to get you heading in the right direction.  Of course
the best way to get better at your demo is to, well, give it.  So get out there 
and put this stuff to practice.
