# iMovieRate

<p float="left">
  <img src="./assets/splash.png" width="70%" height="70%">
</p>

## Table of Contents

  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Gifs](#gifs)
  - [ScreenShots](#screenshots)
  - [Videos](#videos)
  - [Planned Features](#planned-features-in-development)
  - [License](#license)


## Description
Mobile iOS/Android app for searching movie data and creating "to-watch" lists. Allows user to search, browse and store most relevant information on thousands of movies. Displays most trending movies of the day/week and movies that are screened in theaters today.
App utilizes fetching data from several API's ([The Movie Database](http://https://www.themoviedb.org/), [The Open Movie Database](http://www.omdbapi.com/), Kinopoisk Unofficial) and displays it in a user friendly manner.

Supports both iOS and Android, utilizes React Native and Expo frameworks on client side and custom-build Express server with MongoDB on the server side.

For each user-selected movie displays:
  * general information:
    * title
    * release year
    * MPA rating
    * runtime
  * official poster
  * list of genres
  * plot description
  * movie tagline
  * ratings from world famous review-aggregation resources
    * [IMDb](http://https://www.themoviedb.org/)
    * [Metascore](https://www.metacritic.com/)
    * [Rotten Tomatoes](https://www.rottentomatoes.com/)
  * top billed cast:
    * actor image
    * name
    * character
  * director and writers
  * official movie trailer
  * similar movies recommended for the user:
    * poster
    * title
    * release year
  * movie stills and images

App provides a user friendly interface for creating to-watch lists. Add or remove movies with just one tap on a screen, the app will do the rest of the job for you by securely storing your wish list in a database and updating all actual information on the screen in a real time manner. On every online search user can see which movies were already added to the list (just look for 'green star'), the same check happens on a Home screen where 'Trending' and 'In Theaters Now' collections are displayed.

## Installation
**IMPORTANT:** <br>
App utilizes http requests to several API.
To get full functionality, including search on user input, you will need to obtain API keys (~6 mins), see below for instructions:<br>
<br>
<details>
  <summary>installation with API keys (~10 mins)</summary>

  1. clone this repository

    git clone https://github.com/ozzychel/iMovieRate.git

  2. go to root folder

    cd iMovieRate

  3. run npm install

    npm install

  4. in root folder open `config.js' file with your favorite IDE and follow the instructions
  5. to obtain TMDb api key:

  - visit https://www.themoviedb.org/ and sign up for an account
  - in your account "Settings" click "API" in left sidebar
  - obtain your API key and paste it as a value of tmbd_api_key in config.js

  6. to obtain OMDb api key:
  - visit http://www.omdbapi.com/, in top navbar click 'API key'
  - type your email, obtain API key and paste it as a value of omdb_api_key in config.js

  7. to obtain KP api key:
  - visit https://kinopoiskapiunofficial.tech/ and click 'Sign Up'
  - obtain your API key and paste it as a value of kp_unof_api_key in config.js

  8. ...add more actions here
  9. in newly opened browser window:

  - click `"Run on iOS simulator"` for iOS (requires Xcode installed)
  - click `"Run on Android device/emulator"` for Android (requires Android Studio installed)
  - scan QR code with Expo Client app on your mobile phone (easiest way)
    - link to [App store](https://apps.apple.com/us/app/expo-client/id982107779) for Apple device
    - link to [PlayStore](https://play.google.com/store/apps/details?id=host.exp.exponent) for Android device

  <br>
</details>


<br>

If you **don't want to mess with api keys** its ok, use app with **mock data** provided, continue as follows:
<br>
<br>

<details>
  <summary>installation without API keys with mock data (search option unavailable)</summary>

  1. clone this repository

    git clone https://github.com/ozzychel/iMovieRate.git

  2. go to root folder

    cd iMovieRate

  3. run npm install

    npm install

  4. in root folder open `config.js' file with your favorite IDE and follow the instructions

  5. ...add more actions here

  6. in newly opened browser window:

  - click `"Run on iOS simulator"` for iOS (requires Xcode installed)
  - click `"Run on Android device/emulator"` for Android (requires Android Studio installed)
  - scan QR code with Expo Client app on your mobile phone (easiest way)
    - link to [App store](https://apps.apple.com/us/app/expo-client/id982107779) for Apple device
    - link to [PlayStore](https://play.google.com/store/apps/details?id=host.exp.exponent) for Android device

  <br>
</details>
<br>

## Gifs

<p float="left">
  <img src="./assets/perf.gif"/>
</p>

## Screenshots

<p float="left">
  <img src="./assets/shots/shot1.png" width="200" style="border:1px solid grey" alt="Home.tab -In theatres now-"/>
  <img src="./assets/shots/shot2.png" width="200" style="border:1px solid grey" alt="Home.tab -Trending today/week-"/>
  <img src="./assets/shots/shot3.png" width="200" style="border:1px solid grey" alt="Home.tab -on Search icon press, modal visible="/>
  <img src="./assets/shots/shot4.png" width="200" style="border:1px solid grey" alt="Search.tab active" />
</p>
<p float="left">
  <img src="./assets/shots/shot5.png" width="200" style="border:1px solid grey" alt="Search.tab -Load more button-"/>
  <img src="./assets/shots/shot6.png" width="200" style="border:1px solid grey" alt="MovieView.tab -Info block, ratings block and top billed cast-"/>
  <img src="./assets/shots/shot7.png" width="200" style="border:1px solid grey" alt="MovieView.tab -Top billed cast, director and writers-"/>
  <img src="./assets/shots/shot8.png" width="200" style="border:1px solid grey" alt="MovieView.tab -Trailer and Similar Movies-"/>
</p>
<p float="left">
  <img src="./assets/shots/shot9.png" width="200" style="border:1px solid grey" alt="MovieView.tab -Images block-"/>
  <img src="./assets/shots/shot10.png" width="200" style="border:1px solid grey" alt="MovieView.tab -Images block full-screen-"/>
  <img src="./assets/shots/shot11.png" width="200" style="border:1px solid grey" alt="MovieView.tab -Images block full-screen-"/>
  <img src="./assets/shots/shot12.png" width="200" style="border:1px solid grey" alt="WatchList.tab -User saved movies-"/>
</p>

## Video

app video on [Youtube](https://youtu.be/bd-IM4Bdd7I)

## Planned Features in development
* browsing actors and displaying relevant information
* browsing tv shows and tv series
* login screen with biometrics support
* display movie of the day in Home tab


## License
[MIT](https://choosealicense.com/licenses/mit/)