# AWS Lambda Functions - SHE-BALANCE Platform

## Overview

This directory contains all AWS Lambda functions for the SHE-BALANCE platform. These serverless functions provide the complete backend API for authentication, user management, orders, artisans, and AI features.

---

## 📦 Lambda Functions (14 Total)

### Authentication (2 functions)
- **auth-login** - User authentication with JWT tokens
- **auth-register** - New user registration

### User Management (2 functions)
- **user-get-profile** - Get user profile with additional data
- **user-update-profile** - Update user profile information

### Order Management (4 functions)
- **order-create** - Create new orders
- **order-list** - List orders for users
- **order-update-status** - Update order status
- **order-update-progress** - Update order progress percentage

### Artisan Management (2 functions)
- **artisan-list** - List and search artisans
- **artisan-get-details** - Get detailed artisan profile

### AI Sakhi (4 functions)
- **ai-sakhi-chat** - Main chat handler with Amazon Bedrock
- **ai-sakhi-context** - Fetch user context
- **ai-sakhi-intent** - Detect user intent
- **ai-sakhi-action** - Trigger automated actions

---

## 🚀 Quick Start

### 1. Install Dependencies

**Windows:**
```cmd
deploy-core-lambdas.bat
```

**Linux/Mac:**
```bash
chmod +x deploy-core-lambdas.sh
./deploy-core-lambdas.sh
```

### 2. Deploy to AWS

See deployment guides:
- `CORE_LAMBDAS_DEPLOYMENT_GUIDE.md` - Core functions
- `AI_SAKHI_DEPLOYMENT_GUIDE.md` - AI Sakhi functions

---

## 📁 Directory Structure

```
aws-lambda/
├── auth-login/
│   ├── index.js
│   └── package.json
├── auth-register/
│   ├── index.js
│   └── package.json
├── user-get-profile/
│   ├── index.js
│   └── package.json
├── user-update-profile/
│   ├── index.js
│   └── package.json
├── order-create/
│   ├── index.js
│   └── package.json
├── order-list/
│   ├── index.js
│   └── package.json
├── order-update-status/
│   ├── index.js
│   └── package.json
├── order-update-progress/
│   ├── 
The Lambda execution role needs:
- `bedrock:InvokeModel` - For Claude 3 Haiku
- `dynamodb:*` - For data access
- `sns:Publish` - For notifications
- `states:StartExecution` - For Step Functions
- `logs:*` - For CloudWatch Logs

---

## 💰 Cost Estimate

For 10,000 conversations/month:
- Lambda: $0.73
- Bedrock (Claude 3 Haiku): $3.75
- DynamoDB: $0.50
- **Total: ~$5/month**

---

## 📊 Architecture

```
Frontend → API Gateway → Lambda (ai-sakhi-chat) → Bedrock (Claude)
                              ↓
                         DynamoDB (context)
                              ↓
                         Lambda (intent)
                              ↓
                         Lambda (action)
```

---

## 🧪 Testing

Test the main chat Lambda:
```bash
aws lambda invoke \
  --function-name shebalance-ai-sakhi-chat \
  --payload '{"body":"{\"message\":\"Hello\",\"userId\":\"test-123\"}"}' \
  response.json

cat response.json
```

---

## 📞 Support

For issues:
1. Check CloudWatch Logs
2. Review deployment guide
3. Verify AWS credentials
4. Check Bedrock model access

---

## 🎯 Next Steps

After deployment:
1. ✅ Enable Claude 3 Haiku in Bedrock
2. ✅ Create API Gateway integration
3. ✅ Update frontend API URL
4. ✅ Test end-to-end
5. ✅ Set up monitoring

---

**Ready to deploy!** 🚀
