# Seattle Flu Study

This is the website for [seattleflu.org](https://seattleflu.org).

- [Seattle Flu Study](#seattle-flu-study)
  - [Season two / 2019–20](#season-two--2019%e2%80%9320)
    - [Starting the server](#starting-the-server)
    - [Development](#development)
      - [Structure](#structure)
      - [Adding new React applications](#adding-new-react-applications)
  - [Season one / 2018–19](#season-one--2018%e2%80%9319)

## Season two / 2019–20

The work-in-progress website for the second study season, not yet deployed live, is on the branch `season-two/master`.

This version is being developed as a collaboration between the [Bedford Lab](https://bedford.io) and [Formative](https://formativeco.com).


### Starting the server

Make sure the dependencies are installed by running `npm run install`.

Then, start the server with `npm run start`.
The development server is now running at http://localhost:8080


### Development

The Seattle Flu Website is built using [Embedded Javascript Templates](https://ejs.co) and [Express](https://expressjs.com).


#### Structure

The main application is the Seattle Flu Study website.
It comprises multiple React applications that are added via routes and views.
These applications can be developed in isolation from the main application (i.e. website) by starting the server within each application's top-level directory.

* **Main application**

    The code for the `express` server lives at [app.js](./app.js).
    `app.js` starts the app, sets up the engine, mounts middleware to the declared routers, loads static files from provided paths, and declares error handling.

* **Routes**

    Routers live at `routes/`.
    They perform minimal work, declaring `GET` endpoints at the paths provided by the middleware.
    Routers also pass context to `this` for `ejs` to render in its templates, e.g. `title`.

* **Views**

    Views live at `views/` as `.ejs` files.
    These files are only loaded in the main application.
    Views that require JavaScript need two things:
    1. A `div` with an `id` that the JavaScript file will use to manipulate the DOM.
    2. A `script` tag of type `text/javascript` that loads the desired JavaScript bundle from the top-level directory.
        >Recall: Available static files (like JavaScript bundles) are declared by adding their paths in `app.js`.

* **React applications**

    Smaller React applications live within this repository.
    They are named after the web page they represent (e.g. `enroll`).
    They consist of an `index.html` file under `src/` which is only visible to the React application.

    >Recall: The main application instead renders a view of the React application from a bundled JavaScript file.

    * **Starting the server**

        Make sure the dependencies are installed by running `npm run install`.

        Then, start the server with `npm run start`.
        The development server is now running at http://localhost:8080

    * **Building JavaScript bundles**

        Make sure the dependencies are installed by running `npm run install`.

        Then, run webpack with `npm run build`.
        The bundled React application now lives at `dist/`.


#### Adding new React applications

Adding new React applications to the main website is a fairly involved process with many moving pieces. However, this guide should help you through, step-by-step!
1. At the top level of this repo, copy `template-react-app/` and name your desired webpage.
   For example, if we want our new page on the website to be named `my-component`, we run

        cp -r template-react-app/ my-component
        cd my-component/

2. Inside the newly created `my-component/` directory, open up the `webpack.config.js` file.
   Near the top of the file, you should see an `output` key that looks like this:

        output: {
            filename: 'js/template-bundle.js'
        },

    Rename `template-bundle.js` to a uniquely appropriate name for your new web page.
    Following our `my-component` example, we replace `template-bundle` in the filename with `my-component-bundle`.
    > Note: it's important to keep the `js/` prefix on your new bundle file name!

3. Open up the `src/index.html` file.
   Find the lines near the middle of the file that look like this:

    ```html
        <div id="target-dom-element">
            <!-- React app inserts itself here -->
        </div>
    ```

    This is the DOM element our React app will target.
    You may rename the `div id` later to something more appropriate, but for now, we'll keep it as `target-dom-element`.

4. Now you're ready to start writing your React components!
   Open up `src/index.js`.
   This is your main React component (currently named `App`).
   Feel free to import components from external files here and develop with React as normal.

   Find the following code near the bottom of your `App` React component:

    ```js
        const wrapper = document.getElementById('target-dom-element')
    ```

    The argument passed to `document.getElementById()` must match an `id` in `src/index.html`, or the JavaScript will not load on the web page.

5. When you're ready to view your React app in action, run the following code inside your React app directory:

        npm install
        npm run start

   Once you're satisfied with your app, create bundled JavaScript files using Webpack by running:

        npm run build

6. Make sure you're back at the top-level of the repo.
   Create a new file under `routes/`, following the convention of naming the newly created file after the desired path to your new webpage.

        cd ..
        touch routes/my-component.js

    Paste the following code into the newly created JavaScript file:

    ```js
        var express = require('express')
        var router = express.Router()

        router.get('/', function (req, res, next) {
        res.render('my-component', { title: 'My Component Page' })
        })

        module.exports = router
    ```

    Now the `GET` endpoint is ready to serve the home page of our newly created React app.

7. Next, open up `app.js` from the current directory.
   At the top of the page, import your newly created router from step 6.

    ```js
        var myComponentRouter = require('./routes/my-component')
    ```

   Then add a path to the static, bundled JavaScript files.

    ```js
        app.use(express.static(path.join(__dirname, 'my-component/dist/js')))
    ```

   After that, add a new path to your new webpage with `app.use()`.

    ```js
        app.use('/my-component', myComponentRouter)
    ```

8. Almost there!
   Now create a new file under `views/`, following the same naming convention we've employed so far.

        touch views/my-component.ejs

    Paste the following code in your newly created `ejs` file.

    ```js
        <% include ./partials/header  %>

        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4 offset-md-1">
                    <h1><%= title %></h1>
                    <div id="target-dom-element">
                        <!-- React app inserts itself here -->
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript" src="/my-component-bundle.js"></script>

        <% include ./partials/footer  %>
    ```

    There are two parts working together in this code that load your React app.
    1. The `div id`, `target-dom-element`, is the target DOM element specified by your React app's `app.js` file. This is the `div` where your app will render.
    2. The `script` tag near the bottom of the file.
       The `src` specifies which JavaScript bundle will be loaded among those declared in the main application `app.js`.

9. You're done! From the top-level directory, run

        npm run start


## Season one / 2018–19

The website for the first study season, and what’s live currently, is on the branch `master`.