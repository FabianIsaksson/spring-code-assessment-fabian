![LOGO](logo.png)

> I have added the following sections to the readme
>
> 1. [A description of the app and how to run it locally](#spring-music)
> 2. [Images that show the design process](#design-artefacts)
>
> Since I have had limited time for this code test, the app is not responsively styled. I ask that you use dev-tools device emulation when viewing the app (preferably IPhone XR dimensions but any phone screen size should work).
>
> NOTE: To run the app locally you will need the `CLIENT_SECRET` for communication with the spotify api.
> And to authenticate in this service with your own spotify-account you need to be whitelisted by me (Fabian) in the Spotify Developer Console, please send me your profile name on Spotify and the email adress for your account.
>
> fabi.isak@gmail.com
>
> / Fabian

# Code test instructions

Build an application that fetches public playlists via an API from YouTube, Spotify or SoundCloud, present the content and create features that lets the user add their favourites to their own list. A good example of UI for this could be https://screenlane.com/screen/breethe-ios-app-05c-1/, but feel free to present it in which ever way you like.

The choice of technologies to solve this are up to you. How would you have solved this if the brief from a client was to use technology that was the best fit for this problem?

## Things we will look at at the follow up meeting

- Your approach to the problem as a whole
- How you structure your code
- Your git workflow
- CSS methodologies
- Code design patterns and architecture

## Spring Music

A music app that let's you add songs to your existing playlists!
The frontend part of the app has been setup using create-react-app with the typescript template.

There are two parts to the service `spring-music` which is the frontend built with React.
And `spotify-service` which is the backend built with express.

### Local development / testing

You need to run both the frontend and the backend service locally for the app to work as a whole.

**Requirements**

- Node (preferably v16 or later)

#### Frontend

Go to `./spring-music`.

Run in terminal:

```
$ yarn
$ yarn start
```

or with npm

```
$ npm install
$ npm run start
```

#### Backend

Go to `./spotify-service`.
Copy the contents of the file `.sample.env` to a new file called `.env` and paste the client secret in the corresponding environment variable field (`CLIENT_SECRET`).

Run in terminal:

```
$ yarn
$ yarn start
```

or with npm

```
$ npm install
$ npm run start
```

## Design artefacts

**UI design from figma**
![FIGMA](spring-music-figma-design.png)

**Early skethes**
![SKETCH1](sketch1.png)
![SKETCH2](sketch2.png)
