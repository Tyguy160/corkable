# Corkable

## The Best Alternative to that _other_ pinboard site 🧐

### Reflections

I built this Pinterest clone to showcase my abilities as a full stack developer. Overall, I found it to be a really fun project and I learned a ton. I've built full-stack web apps in the past, but generally with a partner and I tended to specialize more on the frontend while he worked on the backend. This was the first time I've ever written every line of code for the entire stack. It was pretty neat to see it come together and to have full autonomy over the stack, but I did find it a bit challenging since it was such a blank canvas. With only a week to execute the task, I had to focus all of the efforts on the MVP and be incredibly judicious about scope creep. Early on, I spent a large amount of time making the app look nice. Although I probably went a bit deep on that front initially, I find that work incredibly rewarding, so it didn't feel like wasted time. Plus, I prefer to look at a pretty app as I continue to flesh out its functionality than to have to stare at an ugly thing as I implement the interaction between frontend and backend.

### The Technology Stack

#### Frontend
- React Framework: Next.js/React
- CSS Framework: Tailwind CSS
- Various node packages
    - React-Masonry
    - Popper
    - React-Query

#### Backend
- Database/ODM: MongoDB/Mongoose.js
- Server: Express.js
- Authentication: JWT

### Development Environment

I used VS Code to develop the app and used Node version 14.15.1. I built and tested the app exclusively with Chrome Version 87.0.4280.88. I used Insomnia for testing the endpoints on the backend.

### What It Does

Because of the constraint on time, I tried to keep my web app true to the MVP I laid out on the first day.

The original MVP was an app that could:

- Create an account
- Create/edit/delete a pinboard
- Create/edit/delete a pin

On that first day, I also put together a list of features that I thought would be good 'reach' goals after completing the MVP.

The stretch goals were:

- User authentication (Logging in and logging out)
- Password recovery
- Sharing/liking boards
- Notifications
- Sorting boards
- Sorting pins
- Emails to user for account creation, password reset
- Auto import image from URL
- Ability to upload image file to site and store on backend

I wasn't able to get to any of the other features (aside from authentication), but if I had another week, I know exactly how I'd implement several of them. Unfortunately, authentication took me _a lot_ longer than I thought it would. It's been quite awhile since I wrote an auth schema from scratch and I had some bumps along the road.

### What It Doesn't Do (But Should!)

If I did have more time, I would implement the following in the application:

#### Notification Emails

This is _super_ easy to implement. I've used Mailgun in the past because it's free for small-time operations and their docs are very easy to follow. I chose not to implement this because I don't own a domain for this site and didn't want to buy one just to implement mail 😉

#### Password Recovery

I've done this in the past and I don't find it particularly challenging, but it does require email which I didn't set up. Essentially, when a user clicks the recovery button, they are sent a link that includes a specific ID that relates to their user on the backend and in the database. Upon clicking that link, the user hits an endpoint that allows for updating the password because you know the user wouldn't have gained access to that specific ID without accessing their email first.

#### Public/Private Boards

Making boards public and private would be as easy as adding a toggle switch on the frontend and an additional key in the database. The backend would then check to see if the specific boardID is public or private before responding with a 401 or a 200.

#### Sharing and Liking Boards/Pins

Sharing and liking boards or pins is contingent on some boards being public. Due to the time constraint, I had to pick between fully locking down the app or keeping it completely open. I felt that a fully locked down web app better showcased my full stack abilities than a fully open one. If I had more time, I would have implemented the public/private feature above, which then would have allowed for easy implementation of liking and sharing boards/pins.

#### Unit Testing

I've never done unit testing in the JavaScript ecosystem, but I did some research and learned a bit about Jest; it seems to be the testing framework of choice for most JavaScript projects. With time being short and since I haven't had much exposure to testing, I decided to focus my efforts on the core of the application, but I can say with certainty that I will experiment with Jest in the future. There were a few bugs I accidentally wrote into the backend that could have been identified earlier if I had used unit tests against the endpoints. I'm excited to experiment more with testing during my next project.

#### Other Features

Other things that I wish the app had are notifications, autoimporting images from URLs, and ability to upload custom images (store them on the cloud) and then attach them to the board or pin. I'm sure I could implement these features as well, but they would have taken some time to learn the best practices before diving in.

### Getting Started

To get started running this project locally, you'll want to clone this repository to your local directory:

`git clone https://github.com/sdvicorp/interview-tyler-maschino`

To get started running this locally, create two terminal windows and navigate into the `frontend` and `backend` folders, respectively.

From here, I'll pass you off to the [Frontend README.md](https://github.com/sdvicorp/interview-tyler-maschino/blob/main/frontend/README.md) and the [Backend README.md](https://github.com/sdvicorp/interview-tyler-maschino/blob/main/backend/README.md), which will walk you through the setup instructions for each side of the stack.
