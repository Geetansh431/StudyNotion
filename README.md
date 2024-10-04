
# StudyNotion - EducationHub 📚


StudyNotion is a fully functional ed-tech platform that enables users to create, consume, and rate educational
content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and
ExpressJS.
• StudyNotion aims to provide: A seamless and interactive learning experience for students, making education
more accessible and engaging.A platform for instructors to showcase their expertise and connect with learners
across the globe.
• unique QR code generated for each order, Used RAZORPAY for payment integration




## Features

- User Authentication: Study Notion provides secure user registration and authentication using JWT (JSON Web Tokens). Users can sign up, log in, and manage their profiles with ease.

- Courses and Lessons: Instructors can create and edit created courses. Students can enroll in courses, access course materials, and track their progress.

- Progress Tracking: Study Notion allows students to track their progress in enrolled courses. They can view completed lessons, scores on quizzes and assignments, and overall course progress.

- Payment Integration: Study Notion integrates with Razorpay for payment processing. Users can make secure payments for course enrollment and other services using various payment methods supported by Razorpay.

- Search Functionality: Users can easily search for courses, lessons, and resources using the built-in search feature. This makes it convenient to find relevant content quickly.

- Instructor Dashboard: Instructors have access to a comprehensive dashboard to view information about their courses, students, and income. The dashboard provides charts and visualizations to present data clearly and intuitively. Instructors can monitor the total number of students enrolled in each course, track course performance, and view their income generated from course sales.
## Tech Stack

**Client:** React, Redux, TailwindCSS, SwiperJs, 

**Server:** Node, Express, MongoDB, Cloudinary, Razorpay, NodeMailer


## API Design

StudyNotion's API follows the REST architectural style, implemented using Node.js and Express.js. It uses JSON for data exchange and standard HTTP request methods. Sample API endpoints include:

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in and generate a JWT token.
- `POST /api/auth/verify-otp`: Verify OTP sent to the user's email.
- `POST /api/auth/forgot-password`: Send a password reset link.
- `GET /api/courses`: Get a list of all available courses.
- `GET /api/courses/:id`: Get details of a specific course.
- `POST /api/courses`: Create a new course.
- `PUT /api/courses/:id`: Update an existing course.
- `DELETE /api/courses/:id`: Delete a course.
- `POST /api/courses/:id/rate`: Add a course rating (out of 5).

Sample API requests and responses:
- `GET /api/courses`: Get all courses
- Response: A list of all courses in the database
- `GET /api/courses/:id`: Get a single course by ID
- Response: The course with the specified ID
- `POST /api/courses`: Create a new course
- Request: The course details in the request body
- Response: The newly created course
- `PUT /api/courses/:id`: Update an existing course by ID
- Request: The updated course details in the request body
- Response: The updated course
- `DELETE /api/courses/:id`: Delete a course by ID
- Response: A success message indicating that the course has been deleted.

---
## Run Locally

Clone the project

```bash
  git clone https://github.com/Geetansh431/StudyNotion
```
Go to the backend directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

create **.env file** 

Start the server

```bash
  npm run dev
```

Go to the frontend directory using Other Terminal

```bash
  cd ../
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MAIL_HOST = SMTP.EXAMPLE.COM`

`MAIL_USER = YOUR_EMAIL@EXAMPLE.COM`

`MAIL_PASS = YOUR_MAIL_PASSWORD`

`JWT_SECRET = YOUR_JWT_SECRET_KEY`

`FOLDER_NAME = YOUR_FOLDER_NAME`

`RAZORPAY_KEY = YOUR_RAZORPAY_KEY`

`RAZORPAY_SECRET = YOUR_RAZORPAY_SECRET`

`CLOUD_NAME = YOUR_CLOUD_NAME`

`API_KEY = YOUR_API_KEY`

`API_SECRET = YOUR_API_SECRET`

`MONGODB_URL = YOUR_MONGO_URI`

`PORT = YOUR_PORT_NUMBER`


## Demo

link - updating soon ...
## Contributing to StudyNotion 🤝

We welcome and appreciate contributions from the community to enhance and improve StudyNotion. Whether you're a developer, designer, tester, or someone with valuable feedback, your input is valuable to us.

## Thank You!❤️

Thank you for considering contributing to the StudyNotion. Your efforts help make this project better for everyone. If you have any questions or need assistance, feel free to reach out through the issue tracker or discussions. Happy coding🤩!
