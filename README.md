# 🌸 SheBalance - AI-Powered Artisan Marketplace

An innovative platform empowering women artisans through AI-driven features, connecting them with buyers and providing tools for skill development, order management, and community support.

![SheBalance](logo%20She%20balance.png)

## 🎯 Overview

SheBalance is a comprehensive digital platform designed to empower women artisans by:
- Connecting artisans with buyers through a digital marketplace
- Providing AI-powered assistance and skill analysis
- Enabling multi-language support (12+ languages)
- Tracking invisible labor and providing fair compensation
- Facilitating community collaboration and resource sharing

## ✨ Key Features

### 🤖 AI Features
- **AI Sakhi**: Conversational AI chatbot powered by AWS Bedrock (Claude/Llama 3)
- **SkillScan**: AI-powered skill analysis using AWS SageMaker
- **Resource Circularity**: Waste-to-wealth matching engine
- **Digital Twin**: Invisible labor visualization and tracking
- **Virtual Factory**: Community stock-pooling system
- **Learning Mentor**: Personalized skill development guidance

### 🌐 Multi-Language Support
Support for 12+ languages including:
- English, Hindi, Tamil, Bengali, Telugu, Marathi
- Gujarati, Kannada, Malayalam, Punjabi, Urdu, Odia

### 🎤 Voice Interface
- Voice commands in multiple languages
- AWS Polly for text-to-speech
- AWS Transcribe for speech-to-text
- Natural language processing

### 📱 Core Platform Features
- Multi-role authentication (Artisan, Buyer, Corporate, Admin)
- Product marketplace with detailed listings
- Order management and tracking
- Bulk corporate orders
- Payment processing integration
- Reviews and ratings system
- WhatsApp notifications via Twilio

## 🏗️ Architecture

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Express.js server (port 8080)
- Responsive design for all devices

### Backend
- Node.js + Express.js (port 5001)
- AWS DynamoDB for database
- JWT authentication
- RESTful API architecture

### AWS Services
- **Bedrock**: AI chatbot (Claude, Llama 3)
- **SageMaker**: Skill classification ML model
- **DynamoDB**: NoSQL database
- **Lambda**: Serverless functions
- **S3**: File storage
- **Polly**: Text-to-speech
- **Transcribe**: Speech-to-text
- **Translate**: Multi-language translation
- **Step Functions**: Workflow orchestration
- **SNS**: Notifications

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- AWS account (for production features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/M-Mahek-03/SheBalance.git
   cd SheBalance
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Configure environment**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your AWS credentials and configuration
   ```

4. **Set up database**
   ```bash
   cd backend
   npm run setup-dynamodb
   npm run init-sample-data
   ```

5. **Start the servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5001
   - Test Connection: http://localhost:8080/test-connection.html

## 👥 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shebalance.com | admin123 |
| Artisan | priya@example.com | artisan123 |
| Artisan | rukaiya@example.com | artisan123 |
| Buyer | rahul@example.com | buyer123 |
| Corporate | corporate@shebalance.com | corporate123 |

## 📁 Project Structure

```
SheBalance/
├── frontend/
│   ├── index.html              # Landing page
│   ├── dashboard.html          # Main dashboard
│   ├── login.html              # Authentication
│   ├── ai-sakhi-chat.js        # AI chatbot
│   ├── voice-12-languages.js   # Voice interface
│   └── ...
├── backend/
│   ├── server-dynamodb.js      # Main API server
│   ├── dynamodb-client.js      # Database client
│   ├── package.json            # Dependencies
│   ├── .env.example            # Environment template
│   └── scripts/
│       └── init-dynamodb-data.js
├── aws-backend/
│   ├── lambda_*.py             # Lambda functions
│   ├── step-function-definition.json
│   └── dynamodb-schema.json
├── docs/                       # Documentation
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server
PORT=5001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=shebalance

# JWT
JWT_SECRET=your-secret-key

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret

# Twilio (WhatsApp)
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_WHATSAPP_NUMBER=+14155238886
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status

### AI Features
- `POST /api/ai-sakhi/chat` - Chat with AI Sakhi
- `POST /api/skillscan/analyze` - Analyze skills
- `GET /api/skillscan/history` - Get scan history

## 🧪 Testing

### Test Connection
Visit: http://localhost:8080/test-connection.html

This page tests:
- Backend server connection
- Login functionality
- Profile fetching
- Orders API

### Manual API Test
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@shebalance.com","password":"admin123"}'
```

## 🌟 Features in Detail

### AI Sakhi Chatbot
- Multi-language conversational AI
- Context-aware responses
- Integration with user data
- Powered by AWS Bedrock

### SkillScan
- Upload work samples
- AI-powered skill classification
- Skill level assessment (Beginner/Intermediate/Advanced)
- Personalized learning recommendations

### Resource Circularity
- Match waste materials with artisan needs
- Sustainable resource utilization
- Community resource sharing

### Digital Twin
- Track invisible labor hours
- Visualize work contributions
- Fair compensation calculation

### Virtual Factory
- Community collaboration
- Shared resources and orders
- Collective bargaining power

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Environment variable protection
- CORS enabled for API security
- Input validation and sanitization

## 📱 Mobile Support

The platform is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - See LICENSE file for details

## 👥 Team

Developed by the SheBalance Team

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Email: mnmukadam04@gmail.com

## 🎉 Acknowledgments

- AWS for cloud infrastructure
- Twilio for WhatsApp integration
- All the amazing artisans who inspired this platform

---

**🌸 SheBalance - Empowering Artisans Through AI Innovation**

Visit: [https://github.com/M-Mahek-03/SheBalance](https://github.com/M-Mahek-03/SheBalance)
