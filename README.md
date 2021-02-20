# CyChat Social Media Application Readme
I developed this social media application as an assignment for an advanced web development course. It uses React on the front-end, Express on the backend, MongoDB for data storage and is hosted using Heruko. All parts were completed by myself

## Link to deployed application
### [https://cs-social-media-app.herokuapp.com/](https://cs-social-media-app.herokuapp.com/)
Note: There is a waiting time of approximately 20 seconds the first time the application is opened as Heroku temporarily shuts down applications which are not in use.

## Table of Contents

- [Development](#Development)

  - [Front-End](#Front-End)

  - [IBack-End](#Back-End)

- [Deployment](#Deployment)

  - [Project Details](#Project_Details)

  - [Procfile Contents](#Procfile_Contents)

  - [Configuration Variables](#Configuration_Variables)

  - [Streamlining Deployment](#Streamlining_Deployment)

- [Storage](#Storage)

  - [User](#User)

    - [Schema](#User_Schema)

    - [Example Data](#User_Example_Data)

    - [Transform](#User_Transform)

  - [Post](#Post)

    - [Schema](#Post_Schema)

    - [Example Data](#Post_Example_Data)

    - [Transform](#Post_Transform)

- [Application Features](#Application_Features)

  - [Responsive mobile-friendly website – Additional Feature](#RMFW)

  - [Unauthenticated View](#Unauthenticated_View)

  - [Create new account](#Create_New_Account)

  - [Login](#Login)

  - [View Posts](#View_Posts)

  - [Create Post](#Create_Post)

  - [Likes](#Likes)

  - [Follows](#Follows)

  - [Delete Post](#Delete_Post)

  - [Delete User](#Delete_User)

  - [Process Text](#Process_Text)

  - [Search View](#Search_View)

  - [My Follows](#My_Follows)

  - [Change user avatar](#Change_User_Avatar)

  - [Automatic Update](#Automatic_Update)

- [References](#References)


## Development <a name="Development"></a>
### Back-End <a name="Back-End"></a>

- **Start command:** npm run dev
  - Server will run on port 3001


### Front-End <a name="Front-End"></a>

- **Start command:** npm start
  - **Message**: Something is already running on port 300 Would you like to run the app on another port instead? (Y/n)
  - Press Y
  - Front-end will run on port 3002
- **Create production build:** npm run build:ui

By starting the back-end first followed by the front-end, the production build of the application can be accessed on port 3001 while the development build can be run on port 3002.


## Deployment <a name="Deployment"></a>

Project deployed using the free service offered by Heroku.


### Project details <a name="Project_Details"></a>

- **Project Name**** :** cs-social-media-app
- **URL:** [https://cs-social-media-app.herokuapp.com/](https://cs-social-media-app.herokuapp.com/)
- **Region:** United States
- **Framework:** Node.js
- **Slug size:** 65.2mb of 500mb
- **Dynos:** Utilises 1 dyno
- **Heroku git URL:** https://git.heroku.com/cs-social-media-app.git


### Procfile Contents <a name="Procfile_Contents"></a>

release: npm run build

web: node server/server.js


### Configuration Variables <a name="Configuration_Variables"></a>

- **MONGODB\_URI:** MongoDB connection – _Not Shown_
- **Secret:** JWT Secret Key– _Not Shown_


### Streamlining Deployment <a name="Streamlining_Deployment"></a>
#### **build:ui**

  - &quot;rm -rf build &amp;&amp; npm run build&quot;
  - Remove current production build and replace with new production build

#### **deploy**

  - &quot;git push heroku master&quot;
  - Push current snapshot of project to heroku master branch

#### **deploy: full**

  - &quot;npm run build:ui &amp;&amp; git add . &amp;&amp; git commit -m &amp;&amp; npm run deploy&quot;
  - Stage and commit all modified files and reploy

#### **log:prod**

  - &quot;heroku logs --tail&quot;
  - View project logs

## Storage <a name="Storage"></a>

Application data is stored using MongoDB Atlas under the collection name &#39;cs-social-media-app&#39;. Post data and user data are both stored, each with a schema defined using mongoose within the models directory of the server.


### User <a name="User"></a>
#### Schema <a name="User_Schema"></a>

new mongoose.Schema({

    username: String,

    password: String,

    avatar : String,

    follows: [String],

  })


#### Example Data <a name="User_Example_Data"></a>

```
{
      "id" : 1,
      "username": "Jimbulator",
      "password": "$2b$10$h32EzyIkOYQhZPIGSnHa3.lh9nvD7RDWBiPj4Tr VYn5qjBw2ncxIi",
      "avatar": "http://robohash.org/jim",
      "follows": [
        "Bean",
        "Contrary"
      ]
 }
 ```



#### Transform <a name="User_Transform"></a>

Data returned from MongoDB requests transformed to match expected field names and remove unnecessary fields

- \_id field copied to id field and then removed
- \_\_v field removed


### Post <a name="Post"></a>

#### Schema <a name="Post_Schema"></a>

new mongoose.Schema({

    user: String,

    timestamp: String,

    content : String,

    likes: [String],

  })


#### Example Data <a name="Post_Example_Data"></a>

```
{
      "id": 9,
      "user": "Mandible",
      "timestamp": "2020-07-15 00:43:44",
      "content": "Mandible mrapyijlbo xngriq @Bean kpjiiegu wmry oq hovze awzebeu",
      "likes": [
        "Jimbulator",
        "Bean",
        "Barfoo",
        "Contrary",
        "Bobalooba"
      ]
}
```


#### Transform <a name="Post_Transform"></a>

Data returned from MongoDB requests transformed to match expected field names and remove unnecessary fields

- \_id field copied to id field and then removed
- \_\_v field removed


## Application Features <a name="Application_Features"></a>


### Responsive mobile-friendly website – Additional Feature <a name="RMFW"></a>

As most users today access social media websites on their mobile devices, it was important that the website was made responsive and mobile friendly. To implement this functionality the CSS framework Bulma ([https://bulma.io/](https://bulma.io/)) was selected as it is relatively lightweight, easy to use and provides an effective way to style an entire project. This framework is included in the project through a link in index.html.

Bulma uses flexbox and a column layout to enable responsiveness, allowing pages to be rendered dynamically as screen sizes change. As the website was designed with mobile in mind, there is no difference in the content or features available between desktop and mobile users. To ensure visibility of content, &#39;is-mobile&#39; and &#39;is-desktop&#39; class names are used throughout the project to indicate how elements are displayed. This class is built into the Bulma framework to allow easy customisation.

To improve usability on mobile devices, when the website is viewed on a screen with a width narrower than 1024px, the navigation bar is changed into a burger menu. This menu contains the same links available to desktop users to offer a comparable experience. The implementation of this burger menu consists of a simple &#39;isActive&#39; toggle contained within the NavigationBar component. When the burger menu is clicked, the variable is toggled to display or hide the menu.


### Unauthenticated View <a name="Unauthenticated_View"></a>

Users who are not logged into an account are displayed a limited view of the website. While they are free to view recent posts, they are unable to use the search functionality, see users or make posts of their own. Additionally, views of likes are also hidden and the CyChat banner is always displayed beneath the navigation bar.


### Create new account <a name="Create_New_Account"></a>

To create a new account, users simply navigate to the &#39;Create Account&#39; link in the navigation bar and fill in the displayed form. This form contains input for a username and two inputs for username to ensure passwords are entered correctly. Before the request is made to the server, these passwords and compared to ensure equality.

UserServices are then used to send a POST request to the server to the path &#39;/api/users&#39;. The server first checks if another user exists with the provided username and returns an error if one is found, resulting in an alert to the user about the issue. Otherwise a new user is created using the provided username, a hashed version of the password, an avatar using the provided username and an empty array of follows. These details and then sent to MongoDB for storage.

Once stored, a token is created using the user id and username, and returned to the user along with a copy of the user details with the password removed. The front-end will then add the new user data to the redux store using createUser() function of userReducer. The token and user data is also stored in the redux store using the setUserLogin() function of currentUserReducer, automatically logging in the user after account creation


### Login <a name="Login"></a>

To facilitate a simply login process, a login form is displayed using the LoginForm component in the top right corner of the application as a part of the navigation bar. The login details are submitted using a POST request to path &#39;/api/login&#39;, initiated by the login() function of loginServices. To authenticate the user, the backend first retrieves the user details from MongoDB using the provided username and uses bcrypt.compare() to verify the provided password matches the stored has password. If successful, a token is created using the user id and username and is returned to the user along with the corresponding user details with the password removed. The token and user details are then stored in the redux store using the setUserLogin() function of the currentUserReducer.

When a user is already logged in, a logout button is displayed instead of the login form. When clicked, the user details are set to null using the setUserLogin() function from currentUserReducer.

To maintain authentication when refreshing the application, the user token and details returned from the server are stored in the browser using the function window.localStorage.setItem(), and storing the user against the key &#39;loggedUser&#39;. To access this data on refresh, the useEffect hook is executed when the App component is rendered to look in the store for a value against the &#39;loggedUser&#39; key. If found, these details are parsed and a request for the user&#39;s details are requested using the getUser() function of userServices. This function sends a GET request to the server to the path &#39;/api/users/&#39; with the user id as a parameter. The server finds the requested user and returns the details to the front end with the password removed. The front-end then uses this data to set the user in the redux store using the setUserLogin() function of the currentUserReducer. When the user logs out of their account, the user information stored in the browser is also removed.


### View Posts <a name="View_Posts"></a>

As a social media platform, a key feature is the display of user posts. The rendering of all posts is handled by the Posts component contained within Posts.js to ensure a consistent display. This component takes the list of posts as a parameter as opposed to retrieving the posts itself as it allows for different views of the application to select the views it wants displayed. To prevent all posts from being displayed by default, a post limit of 10 is enforced by this component. If users wish to see additional posts, a &#39;see more&#39; button is included at the end of the list of posts which will increase the limit by 10.

To render the posts, the Posts components uses map to pass posts individually to the DisplayPosts component which is also found within Posts.js, as it should not be called directly from anywhere else in the application. This component is responsible for the design of each posts, rendering associated user details, passing content to the essText component for processing, displaying likes information and delete functionality.

The Posts component is accessed from the following components:

- Home
- Explore
- Search
- User
- MyFollows

To retrieve posts, a GET request is sent to the server using postServices. When the data is returned it is first sorted by date (most recent first) and then stored in a Redux store using the initialisePosts() function of postReducer. This ensures that recent posts are always displayed first without requiring sorting elsewhere in the project.



### Create Post <a name="Create_Post"></a>

When a user is authenticated, a post creation form is displayed in the Home view, rendered by the PostForm component. A user can type their message and click submit to initiate a server call. While a user types their post, the character length of the post is being compared to the predefined maximum post length defined within the component as _maxPostLength_ (default 144 characters). If the post length exceeds this post, a notification is displayed informing the user, and the post cannot be submitted until the post is below the maximum length.

When the &#39;Submit New Post&#39; button is click, the createPost function() from postServices is called which sends a POST request to &#39;/api/posts&#39;. The server first checks the request has content field containing the post, verifies the token of the logged in user and creates a new post using the Post schema defined for MongoDB. In this object the initiating user&#39;s username is included, the current date is defines, the provided content is utilised and the likes array is empty. The post is then sent to MongoDB for storage and the returned result is sent in the response to the user.

The response from the server is then stored in the redux store using the createPost() function in postReducer which appends the new post to the front of the stored posts as it is the most recent. This post will now be displayed along with other posts.


### Likes <a name="Likes"></a>

Each post has a defined likes field which contains an array of all users who have liked the post. When a user is authenticated, each post has a &#39;Like Post!&#39; button which allows users to like a post and a &#39;\* Likes&#39; (\* represents a number) button which displays the number of likes and can be clicked to the show 3 users who have liked the post.

When the &#39;Like Post&#39; button is clicked, depending on if the user has/has not liked the post previously, their username will be appended/removed from the post&#39;s likes array. First the updated likes list is determined and then the updatePost() function within postServices is used to send a PUT request to &#39;/api/posts/:id&#39;. The server first verifies the user&#39;s token and uses a set query to directly update the post on MongoDB. The updated post is then returned to the front-end and the redux store is updated using the &#39;TOGGLE\_LIKES&quot; action within postReducer.

When a user clicks the &#39;\* Likes&#39; button, a state variable is toggled to reveal 3 users who have liked the post. Each username is a link which when clicked, directs the user to that user&#39;s individual user page.

The explore page utilises the likes field by sorting posts by the number of the length of their likes variable. This displays posts from the highest number of likes to the lowest.


### Follows <a name="Follows"></a>

When a post is displayed, the user details of the user who created the post are included to the left of the post including their avatar, username and a Follow/Unfollow button for all users apart from the authenticated user. Depending on whether the authenticated user is already following the user who created the post, a follow or unfollow button will be displayed. While each button executes a different function within userServices (either followUser() or unfollowUser()), they function in a similar manner. First, the function within userServices either adds the username to the users list of current follows (followUser()) or removes the username (unfollowUser()). This information, along with the field name that is being updated, is then sent to the server as a PUT request to the path &#39;/api/users/id&#39;.

The server first verifies the users token, and then stores the field name to be updated and the data in variables. A set query is then used to directly update the user on MongoDB, updating the specified field name with the provided data (_shown below_). The updated user is then returned to the front-end. where it is used to updated the current user in the redux store using the updateCurrentUer() function in currentUserReducer and the users list in the redux store using the updateUser() function in userReducer.

_Server – Update user with set query using provided field name and data_

//Extract field to be updated and corresponding data

  const fieldName = request.body.fieldName

  const data = request.body.data

  //Use query to set specified field with the corresponding data

  User.findByIdAndUpdate(request.params.id, {$set: {[fieldName] : data}}, {new: true})


### Delete Post – Additional Feature <a name="Delete_Post"></a>

When a post is displayed, if the user who created the post is currently logged in, a DELETE POST button is displayed, allowing hem to remove their post from the application. When this button is clicked, the deletePost() function within psotServices is called to initiate a DELETE request to the path &#39;/app/posts/:id&#39;. When the server receives this request it verifies the user token, removes the post from MongoDB using the id specified in the path and returns a 204 status code (No Content). The posts in the redux store are then updated using the deletePostID() function in postReducer which removes the post from the stored posts.


### Delete User – Additional Feature <a name="Delete_User"></a>

When a user is logged in and navigates to their user page they will see a Delete Account button which can be used to delete their account from the application. When this button is clicked a confirm window is displayed so a user can confirm the action. If clicked, the user&#39;s details are removed from local storage and the deleteUser() function with userServices creates a DELETE request to path &#39;/api/users/id&#39;.

When the server receives this request it verifies the user token, removes the user from MongoDB using the id specified in the path and returns a 204 status code (No Content).

The users in the redux store are then updated using the removeUser() function in userReducer which filters the user out of the stored list of users. The current user is also logged out of the account using the setUser() function in currentUserReducer, setting the stored value to null.

_It should be noted that while a user is deleted, their posts remain in the database so other uses can continue to view and like the post_. _However, as the user&#39;s account no longer exists, the avatar of the post is set to the logo of CyChat (robot.logo.png) stored within the public directory. This is displayed alongside the post as per usual, but the username is not clickable and no follow button is displayed._


### Process Text <a name="Process_Text"></a>

_ **Note that the react-string-replace library was installed to complete this task efficiently. The purpose of this library is to use regex to find matching strings and replace the matched string with the defined string.** _ [_ **https://www.npmjs.com/package/react-string-replace** _](https://www.npmjs.com/package/react-string-replace)

To render hastags (#) and user mentions (@) differently to regular text, post content is passed to the ProcessText component for processing. To ensure that only valid usernames are rendered in mentions, the component retrieves a list of usernames from the redux store and loops over each, creating a regular expression which is used to detect mentions of the user in the content of the post. All mentions of the user are replaced with a clickable link which directs the application to the user&#39;s page.

After the mentions are processed, hashtags are identified using a regular expression of a hashtag follows by alphanumeric characters. All detected hashtags are replaced with a link which directs the application to the search page to display posts containing the same hashtag.


### Search View – Additional feature <a name="Search_View"></a>

The search component allows users to search posts for specific content and used to display clicked hashtags.

This component uses local state and filter in the redux store to set the current search and filter posts.

- _searchText_: State which manages search terms
- _passParam_: Stores current path parameter.

If the URL includes a parameter, this value is first checked against the value of _passParam_ which at this point holds the value of the previous parameter. If these values are not equal it means a new parameter has been used (new hashtag clicked), so the _passParam_ variable is set to the current parameter and the filter in the redux store is updated using the setSearch() function in the filterPostReducer. Otherwise, the current parameter must be the same as the previous parameter so the _passParam_ and filter values should not be modified. The reason for this implementation is that clicking a hashtag link does not refresh the page, meaning the page is not re-rendered from scratch. This allows the page to store the past parameter to as a form of history to determine current use, so when a new hashtag filters using the new hashtag.

At the top of the page is a input field which users can type their search terms into. When the input is submitted, the filter in the redux store is updated with the input text using the setSearch() function in filterPostReducer.

Before rendering, all posts are filtered according to the currently set filter defined in the redux store. Filtering is based on this value because any update of this filter triggers a re-render of the page, so when either the URL parameter or search text changes a re-render is triggered.


### My Follows – Additional feature <a name="My_Follows"></a>

The MyFollows view provides the user with a range of options for filtering displayed posts. By clicking one of the buttons beneath the user&#39;s avatar, the filtering of the posts will be modified.

By clicking the &#39;Show Recent Mentions&#39; button, the _selectMentions_ variable will be toggled which controls whether user mentions are displayed or the posts of followers. When true, all posts containing a mention of the user (tag) will be displayed. This is implemented via a filter which finds mentions within the content of a post.

Beneath the &#39;Display Follower Posts&#39; header, the username of each user followed by the current user will be displayed as button, as well as a &#39;View All&#39; option. Clicking any of these buttons will trigger an update of filter in the redux store using the function userPosts within filterPostReducer, set the _selectedUsername_ local state within the component and set _selectMentions_ to false.

This will trigger a re-render, and all posts will be filtered according to the value of filter and displayed using the Posts component. The _selectedUsername_ variable is used to display the username of the selected user above the displayed posts.


### Change user avatar – Additional feature <a name="Change_User_Avatar"></a>

When a user creates their account, they are assigned a robohash URL based on their selected username. To change this avatar, a user can navigate to their user page and use the Change Avatar feature which is only displayed to the currently logged in user. When this button is clicked, a variable is toggled to display a pop-up window containing 6 avatars based on randomly generated robohash strings created by the getOptions() function. When a user clicks an avatar, the background will be highlighted to show the current selection. To see a new set of avatars, the user can click the &#39;See More Options&#39; button which calls the getOptions() function, resulting in a new set of avatars being displayed.

To use a new avatar, the user must first select an avatar from the options presented and click the &#39;Save&#39; button. This will call the setAvatar() function within userServices, creating a PUT request to &#39;/api/users/:id&#39; with a body containing the name of the field to be updated and the new avatar hash.

This is the same path sued to update a user&#39;s followers, so the same process is followed. First the user token is verified, the field name and data are extracted from the request body, and a set query is used to directly update the field (avatar) on MongoDB with the provided avatar string. The server then returns the updated user information.

When the response is received by the front-end, the redux store is updated; the logged in user is updated using the updateCurrentUser() function in currentUserReducer, and the user list is updated using the updateUser() function is userReducer.


### Automatic Update <a name="Automatic_Update"></a>

To trigger an automatic update every 20 seconds, a _updateData_ variable is declared using the useState hook within App. When this variable is set to true, the useEffect hook initiate a request for data from the server which is used to update the redux store. After this update is triggered the updateDataCheck() function is called which sets the _updateData_ variable to false to prevent constant updates, and the setTimeout() function is used to set the _updateData_ variable to true in 20 seconds. This ensures that the app receives regular, fresh data.


## References <a name="References"></a>

robot\_log.png by tabble available at: [https://pixabay.com/vectors/robot-icon-flat-flat-design-2192617/](https://pixabay.com/vectors/robot-icon-flat-flat-design-2192617/) under a Pixabay License.

Full terms at [https://pixabay.com/service/license/](https://pixabay.com/service/license/)

background.png by TheRealEnzo available at: [https://pixabay.com/illustrations/banner-background-banner-background-1504653/](https://pixabay.com/illustrations/banner-background-banner-background-1504653/) under a Pixabay License.

Full terms at [https://pixabay.com/service/license/](https://pixabay.com/service/license/)
