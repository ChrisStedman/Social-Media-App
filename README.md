# COMP3120 Social Media Project

An individual project for COMP3120 Advanced Web Devleopment

The project should implement a micro-blog similar to Twitter that supports at least these
__core requirements__:

* User registration, login, user profile including an avatar
* Users post short messages up to N characters for some value of N
* Messages can contain user mentions @username and #hashtags 
* Users can 'like' messages
* Users can follow other users

To achieve a PASS mark (50%) you must implement at least these requirements.  You can
implement more requirements for higher marks, however, don't go overboard - quality is
more important than quantity here.

The detailed design of the application is up to you but it should at least have:

* a view for non-authenticated users showing the most recent messages
* a view for authenticated users showing messages from followed users
* a profile view for each user
* some display of likes with messages

Some sample data is provided in sampledata.json that includes a number of users
and 100 sample posts.  You can modify this as you wish. Note that plain text
passwords are included for each user which is not a good idea.

Run a sample server with:

```
npx json-server --port 3001 --watch sampledata.json 
```

see [the text](https://fullstackopen.com/en/part2/getting_data_from_server) for details of 
using json-server.



