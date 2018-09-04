# Insiten Coding Challenge
 
## Business Problem:

A company is looking to achieve inorganic growth through acquisitions. They have asked us to develop an online tool to track and analyze potential target companies.

### Challenge:

Develop a prototype that will allow the client to perform the following activities:

    •	View a list of targets
    •	Edit an existing target
    •	Create a new target
    •	Delete a target


### Assumptions:

    •	Use a modern JavaScript framework (e.g., React, Angular)
    •	Data does not need to be persisted (use mock data)
    •	Examples of data to be captured:
    •	Status (e.g., researching, pending approval, approved, declined)
    •	Company Info
    •	Key Contacts
    •	Financial Performance


---

Hi, I'm Sean. Welcome to this repo!  

I plagiarize myself a bit in this README, I've done a few of these kinds of projects recently and it just makes sense to re-use the descriptions.

## Brief Overview

I used `create-react-app` and spun up a quick React App for this exercise. I've been writing a _lot_ of React recently, so I went with that framework to keep context switching to a minimum.  I wanted to just jump into the project, and React was my most accessible tool at the moment.  This could just as easily have been done using just about any other modern framework. My two current favorites are React and Vue.

Since moving to component based architecture, I prefer to localize my CSS to each individual component, and keep my global selectors somewhat lean.
For this exercise, global selectors are in `index.css`, some app globals are in `App.css`, and everything else is in a a CSS file in its associated component folder. I'm using a BEM-lite type syntax to manage namespacing and keep things sane in relation to my components. Overall, this project's scope was small enough that I didn't need to get too into the weeds with regards to namespacing. For a larger project, I'd probably be a bit more rigid with my BEM syntax (or, finally sort out CSS Modules in React). 

I didn't use an pre-existing front-end style frameworks like Material, Foundation, or Bootstrap. I have some reservations with the "one-size fits all" approach many of those use. I've got a base set of styles and practices that I've carried with me, so, again, they're the most accessible tool at the moment.


## What can the app do?

It will load 60 entries making up possible acquisition targets. They're all fake (run by, or named after, Marvel and DC Comics characters), and you'll notice I basically just copy/pasted the same 4 records to get a bigger sample size.  I just needed a large enough mock data set to get up to speed.

Ideally, this is setup to allow a person to do a quick scan of targets, see their current status, and get some basic information. More information on each company is available by clicking the info (i) icon.  You can edit a company's status by clicking on the edit (pencil) icon, and lastly, you can remove an entry entirely by clicking on the delete (trash) icon. You can reduce the set of companies by their status and view just the entries that are Approved, Pending, Researching, or Declined. This makes it easier to drill down a bit.

I used some simple color coding and revenue graphs to make it scannable at a high level. The colors indicate the status, as indicated by the sort legend at the top, and the revenue is charted in the graphs. 

They layout is responsive, and the design _should_ work across multiple devices with relatively few problems.

That being said, there are quite a few areas of improvement I would undertake if I were to roll this out into more than an proof-of-concept, notably to the graphs. That library works well in this instance, but could be tweaked a lot in a final product.

### Instructions

* To install the app: 
    * clone this repo
    * switch to the `develop` branch
    * `cd app/`
    * `yarn install`
* To run app: 
    * `cd app/`
    * `yarn run`
* To view it online:
    * http://torchcodelab.com/insiten/
