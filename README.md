🚀 Getting Started

1. Clone the Repository

git clone https://github.com/YOUR_GITHUB_USERNAME/SecureConnect.git
cd SecureConnect

2. Install Dependencies

npm install

or

yarn install

3. Set Up Environment Variables

Create a .env.local file in the root directory and add the following variables:

MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/your-database-name?retryWrites=true&w=majority
JWT_SECRET=your-random-secret-key

Replace your-username and your-password with your MongoDB credentials.

Replace your-database-name with your actual database name.

Replace your-random-secret-key with a secure random string (generate using openssl rand -base64 32 (for Linux/macOS) or pwsh -Command [System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32)) (for Windows)`).

4. Start the Development Server

npm run dev

or

yarn dev

The application will run at http://localhost:3000


🔐 JWT Authentication

Generating a JWT Token

Upon successful login, the API generates a JWT token using the jsonwebtoken package.

The token is stored in localStorage and is used to authenticate protected routes.

Verifying the Token in API Requests

Include the JWT token in the Authorization header of protected API requests:

Authorization: Bearer your-jwt-token

💡 Contributors Guide

Want to contribute? Follow these steps:

Fork the repository.

Create a feature branch (git checkout -b feature-branch).

Commit your changes (git commit -m "Added a new feature").

Push to GitHub (git push origin feature-branch).

Open a Pull Request.

📜 License

This project is open-source and available under the MIT License.

📞 Contact

For any issues, feel free to open an issue in the GitHub repository or reach out to the project maintainers.

🚀 Happy Coding! 🎉

