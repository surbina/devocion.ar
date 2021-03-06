# devocion.ar

## Synopsis

devocion.ar is a simple application designed to share daily devotional within your church or community. You can register, create devotionals, read them and create comments.

## Technologies

devocion.ar is mainly built on top of three technologies:

1. [ReactJS](https://facebook.github.io/react/)
2. [Redux](http://redux.js.org/)
3. [Firebase](https://firebase.google.com/)
4. [Bootstrap 3](http://getbootstrap.com/)

## Installation

To install this project follow you will need to have installed NodeJS, NPM and webpack and webpack-dev-server installed globally. You will also need to have a valid Google account in order to access to the Firebase service.

First of all, login to your Google account and create a Firebase project. To achieve that you will need to:

1. Create a Firebase project in the [Firebase console](https://firebase.google.com/console/), if you don't already have one.
2. Click **Add Firebase to your web app**
3. Note the initialization code snippet, which you will use in a minute.
4. Then go to the **Database** section and click on the **RULES** tab. Copy the content from ``db.rules``, paste it there and click the **PUBLISH** button.
 
Then you'll need to install NodeJS and NPM. For that you'll need to downloaded the latest installer from [NodeJS website](https://nodejs.org/en/) and run it. Then you can install webpack and webpack-dev-server thought npm.

```
npm install -g webpack webpack-dev-server
```

After that clone this repository and install dependencies

```
git clone https://github.com/surbina/devocion.ar.git
npm install
```

Then you'll need to update src/firebase_config.js with the values from the initialization code snippet you got while creating the Firebase project.

At this point you are ready to either modify the application or deploy it.

To deploy the application you need to bundle it first:

```
NODE_ENV='production' webpack -p
```

Once you have bundled it you can deploy it following the [instructions from this site](https://firebase.google.com/docs/hosting/deploying)

Once everything is ready you should be able to access your app!

If you happen to run into any troubles while following any of this instruction feel free to reach me at sebita.urbina [at] gmail.com

## Admin users

The first admin user must have its admin rights asigned through Firebase's database editor.

1. Go to your firebase console and select your project
2. Go to the **Database** section
3. Under the **DATA** tab, expand the ``users`` node
4. Search for the admin user id node and expand it
5. Add an entry under that node with the key ``admin`` and ``value``

Once you are finished your first admin user should be ready. From now on, you can give admin rights to other users from the **Admin Panel**.

## DevocionApp

devocion.ar has a mobile version called DevocionApp, be sure to [check it out!](https://github.com/surbina/DevocionApp)

## License

###The MIT License (MIT)
Copyright (c) 2016 Sebastian Urbina

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
