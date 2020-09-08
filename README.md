# Work Hours Manager

A simple React web responsive app that allows you to manage your work hours.

>

(Verify folder permissions when setting up the application)

>

### Requirements

- npm
- Nodejs 13.x
- Visual Studio Code (Optional)

### Technologies

- React (Hooks)
- Typescript
- MaterialUI

# Run Application

Clone the project:

HTTPS:

> `git clone https://github.com/MateusVT/Work-Hours-Manager.git`

OR

SSH:

> `git clone git@github.com:MateusVT/Work-Hours-Manager.git`

To run the application you need to run 2 terminals:

### Running the project

Install Dependencies:

```console
root@root:~$ cd Work-Hours-Manager
root@root:~$ npm install
```

Running:

```console
root@root:~$ npm run start-server
```

Your interface should be up and runnig on http://localhost.com:3000 while Json-Server is running on http://localhost.com:8000

Access [http://localhost.com:3000](http://localhost.com:3000)

### Authentication

> **Username:** mvtorres

> **Password:** 123

### Project Decisions
- Use of useContext() to manage shared states between components instead of Redux due to the low complexity of the project.

- Use of in-line styling due to the deadline. With a longer time, it would use preprocessors like SASS, which would make the code cleaner.

- Minimum data processing possible on the front-end. Data should be provided from the back-end (json-server) in its final form, in order to consumption by the interface.

-- **Disclaimer**: This decision can result in inconsistent information on the work-hours data, thats is cause de json-server doesn't really process the data. In a real API, everything should work fine.


All Set!

![alt tag](https://github.com/MateusVT/Work-Hours-Manager/blob/master/public/imgs/login.jpg)
![alt tag](https://github.com/MateusVT/Work-Hours-Manager/blob/master/public/imgs/home.jpg)
![alt tag](https://github.com/MateusVT/Work-Hours-Manager/blob/master/public/imgs/home-mobile.jpg)

You should be able to use the application now!
