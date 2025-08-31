# LinIlog Movement

**Alon ng Pagbabago**

The LinIlog Movement is an information and advocacy platform dedicated to restoring river health through cleanup operations, public awareness, and community partnerships. The project supports the United Nations Sustainable Development Goals (SDGs) by focusing on clean water, life on land, sustainable communities, and partnerships.

## Features

- **Homepage:** Overview of the movement, mission, SDG support, initiatives, and impact statistics.
- **About Page:** Meet the development team and learn about the project’s background.
- **Signup Page:** Allows volunteers, donors, and partners to join the movement by submitting their interest.
- **Admin Portal:**
  - Admin registration and login
  - Dashboard to view and manage signup submissions
  - Secure access with authentication
- **Impact Tracking:** Displays real-time statistics on volunteers, events, waste collected, and communities impacted.
- **Modern UI:** Responsive, animated, and visually engaging design.

## Tech Stack

- **Frontend:** React (Create React App), React Router, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT-based admin authentication
- **Deployment:** Vercel (frontend), compatible with cloud MongoDB

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository:**
	```sh
	git clone <repo-url>
	cd LinIlog
	```
2. **Install frontend dependencies:**
	```sh
	npm install
	```
3. **Install backend dependencies:**
	```sh
	cd server
	npm install
	```
4. **Configure environment variables:**
	- Create a `.env` file in the `server` directory with your MongoDB URI and JWT secret:
	  ```env
	  MONGO_URI=your_mongodb_connection_string
	  JWT_SECRET=your_jwt_secret
	  ```
5. **Run the backend server:**
	```sh
	npm start
	```
6. **Run the frontend app:**
	```sh
	cd ..
	npm start
	```

The frontend will be available at [http://localhost:3000](http://localhost:3000) and the backend API at [http://localhost:5000](http://localhost:5000).

## Usage

- **Join the Movement:** Go to the Signup page to volunteer, donate, or partner.
- **Admin Access:** Register or log in as an admin to view and manage submissions.
- **Explore Impact:** See real-time stats and learn about ongoing initiatives.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License

This project is open source and available under the [MIT License](LICENSE).
