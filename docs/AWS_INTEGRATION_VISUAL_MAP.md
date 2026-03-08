# 🗺️ AWS Integration Visual Map - SHE-BALANCE

## Frontend to AWS Services Mapping

This document provides visual diagrams showing how each frontend file connects to AWS services.

---

## 📱 Frontend File: `api-client.js`

```
┌─────────────────────────────────────────────────────────────────┐
│                        api-client.js                             │
│                    (Core API Client)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY                                 │
│              (REST API with CORS enabled)                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┬──────────────┐
         │               │               │              │
         ▼               ▼               ▼              ▼
    ┌────────┐     ┌────────┐     ┌────────┐     ┌────────┐
    │ Auth   │     │ User   │     │ Order  │     │Artisan │
    │Lambdas │     │Lambdas │     │Lambdas │     │Lambdas │
    └───┬────┘     └───┬────┘     └───┬────┘     └───┬────┘
        │              │              │              │
        └──────────────┴──────────────┴──────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │  DynamoDB   │
                  │  (10 Tables)│
                  └─────────────┘
```

### Methods → Lambda Functions Mapping:

```
register()          → auth-register          → DynamoDB (users)
login()             → auth-login             → DynamoDB (users)
getProfile()        → user-get-profile       → DynamoDB (users, profiles)
updateProfile()     → user-update-profile    → DynamoDB (users, profiles)
getArtisans()       → artisan-list           → DynamoDB (artisan-profiles)
getArtisanDetails() → artisan-get-details    → DynamoDB (artisan-profiles)
createOrder()       → order-create           → DynamoDB (orders)
getOrders()         → order-list             → DynamoDB (orders)
updateOrderStatus() → order-update-status    → DynamoDB (orders)
submitSkillScan()   → skillscan-analyze      → S3 + SageMaker + DynamoDB
getSkillScanHistory()→ skillscan-history     → DynamoDB (skillscan-results)
logLabourHours()    → labour-log             → DynamoDB (labour-tracking)
getLabourHistory()  → labour-history         → DynamoDB (labour-tracking)
getAllUsers()       → admin-users-list       → DynamoDB (users)
getPlatformStatistics()→ admin-statistics    → DynamoDB (aggregation)
```

---

## 📊 Frontend File: `dashboard.js` (Artisan Dashboard)

```
┌─────────────────────────────────────────────────────────────────┐
│                       dashboard.js                               │
│                   (Artisan Dashboard)                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┬──────────────┐
         │               │               │              │
         ▼               ▼               ▼              ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ Profile │    │ Orders  │    │ Labour  │    │AI Sakhi │
    │ Loading │    │ Loading │    │Tracking │    │  Chat   │
    └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    API Gateway    API Gateway    API Gateway    API Gateway
         │              │              │              │
         ▼              ▼              ▼              ▼
    user-get-     order-list     labour-log     ai-sakhi-chat
    profile       (artisan)                      (Bedrock)
         │              │              │              │
         └──────────────┴──────────────┴──────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │  DynamoDB   │
                  └─────────────┘
```

### Key Features → AWS Services:

```
loadUserProfile()        → Lambda (user-get-profile)      → DynamoDB
loadBulkOrders()         → Lambda (order-list)            → DynamoDB
updateBulkOrder()        → Lambda (order-update-progress) → DynamoDB + EventBridge
showBulkOrderUpdate()    → Lambda (order-update-progress) → DynamoDB
showHealthIssue()        → Lambda (support-create)        → DynamoDB + SNS
showAdvancePayment()     → Lambda (payment-advance)       → DynamoDB
showPaymentRequest()     → Lambda (payment-request)       → DynamoDB
```

---

## 🛒 Frontend File: `buyer-dashboard.js` (Buyer Dashboard)

```
┌─────────────────────────────────────────────────────────────────┐
│                    buyer-dashboard.js                            │
│                    (Buyer Dashboard)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┬──────────────┐
         │               │               │              │
         ▼               ▼               ▼              ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ Artisan │    │Portfolio│    │ Orders  │    │Messages │
    │  List   │    │ Images  │    │ Create  │    │  Send   │
    └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    API Gateway    CloudFront     API Gateway    API Gateway
         │              │              │              │
         ▼              ▼              ▼              ▼
    artisan-list      S3          order-create   message-send
         │          Bucket            │              │
         └──────────────┴──────────────┴──────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │  DynamoDB   │
                  └─────────────┘
```

### Key Features → AWS Services:

```
loadArtisans()           → Lambda (artisan-list)          → DynamoDB
filterByCategory()       → Lambda (artisan-filter)        → DynamoDB (GSI)
searchArtisans()         → Lambda (artisan-search)        → DynamoDB + ElasticSearch
viewPortfolio()          → CloudFront                     → S3
contactArtisan()         → Lambda (message-send)          → DynamoDB + SES
toggleFavorite()         → Lambda (favorite-toggle)       → DynamoDB
createOrder()            → Lambda (order-create)          → DynamoDB
```

---

## 👨‍💼 Frontend File: `admin-dashboard.js` (Admin Dashboard)

```
┌─────────────────────────────────────────────────────────────────┐
│                    admin-dashboard.js                            │
│                    (Admin Dashboard)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┬──────────────┬─────────┐
         │               │               │              │         │
         ▼               ▼               ▼              ▼         ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐ ┌────────┐
    │Platform │    │  User   │    │ Orders  │    │ Labour  │ │ Health │
    │  Stats  │    │  Mgmt   │    │  Mgmt   │    │Tracking │ │Monitor │
    └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘ └────┬───┘
         │              │              │              │           │
         ▼              ▼              ▼              ▼           ▼
    API Gateway    API Gateway    API Gateway    API Gateway  API Gateway
         │              │              │              │           │
         ▼              ▼              ▼              ▼           ▼
    admin-         admin-         admin-         admin-      admin-health-
    statistics     users-list     orders-list    labour-view    monitor
         │              │              │              │           │
         └──────────────┴──────────────┴──────────────┴───────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │  DynamoDB   │
                  │ + CloudWatch│
                  └─────────────┘
```

### Key Features → AWS Services:

```
loadDashboardData()      → Lambda (admin-statistics)      → DynamoDB (aggregation)
loadRecentUsers()        → Lambda (admin-users-list)      → DynamoDB
loadRecentOrders()       → Lambda (admin-orders-list)     → DynamoDB
loadLabourTable()        → Lambda (admin-labour-view)     → DynamoDB
triggerPayout()          → Lambda (admin-emergency-payout)→ DynamoDB + Payment API
alertCommunity()         → Lambda (admin-community-alert) → SNS + WhatsApp API
checkWellness()          → Lambda (admin-wellness-check)  → Step Functions
initializeCharts()       → Lambda (admin-analytics)       → DynamoDB + QuickSight
```

---

## 🤖 Frontend File: `ai-sakhi-chat.js` (AI Assistant)

```
┌─────────────────────────────────────────────────────────────────┐
│                     ai-sakhi-chat.js                             │
│                     (AI Assistant)                               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
                   API Gateway
                         │
                         ▼
                  ai-sakhi-chat
                    (Lambda)
                         │
         ┌───────────────┼───────────────┬──────────────┐
         │               │               │              │
         ▼               ▼               ▼              ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ Bedrock │    │  User   │    │ Intent  │    │ Action  │
    │ Claude  │    │ Context │    │Detection│    │Trigger  │
    └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘
         │              │              │              │
         │              ▼              │              ▼
         │         DynamoDB            │         Step Functions
         │         (orders,            │         (workflows)
         │         profile,            │
         │         labour)             │
         │              │              │              │
         └──────────────┴──────────────┴──────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │  Response   │
                  │  + Actions  │
                  └─────────────┘
```

### AI Sakhi Flow:

```
User Message
    │
    ▼
API Gateway → ai-sakhi-chat (Lambda)
    │
    ├─→ Fetch User Context (DynamoDB)
    │   ├─ Orders
    │   ├─ Profile
    │   ├─ Labour Hours
    │   └─ Payment Status
    │
    ├─→ Process with Bedrock (Claude 3 Haiku)
    │   ├─ Analyze intent
    │   ├─ Generate response
    │   └─ Suggest actions
    │
    ├─→ Detect Intent
    │   ├─ Payment request
    │   ├─ Health issue
    │   ├─ Order update
    │   └─ General support
    │
    └─→ Trigger Actions (if needed)
        ├─ Create support ticket
        ├─ Initiate payment
        ├─ Alert community
        └─ Schedule wellness check
```

---

## 🎤 Frontend File: `voice-services.js` (Voice Assistant)

```
┌─────────────────────────────────────────────────────────────────┐
│                    voice-services.js                             │
│                    (Voice Assistant)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┬──────────────┐
         │               │               │              │
         ▼               ▼               ▼              ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │  Text   │    │ Speech  │    │Translate│    │  Audio  │
    │   to    │    │   to    │    │  Text   │    │ Upload  │
    │ Speech  │    │  Text   │    │         │    │         │
    └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    API Gateway    API Gateway    API Gateway    API Gateway
         │              │              │              │
         ▼              ▼              ▼              ▼
    voice-text-    voice-speech-  voice-         voice-upload-
    to-speech      to-text        translate      audio
         │              │              │              │
         ▼              ▼              ▼              ▼
    Amazon         Amazon         Amazon         S3 Bucket
    Polly          Transcribe     Translate      (audio files)
         │              │              │              │
         └──────────────┴──────────────┴──────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │   Audio     │
                  │   Files     │
                  └─────────────┘
```

### Voice Features → AWS Services:

```
textToSpeech()           → Lambda (voice-text-to-speech)  → Polly → S3
speechToText()           → Lambda (voice-speech-to-text)  → Transcribe
translateText()          → Lambda (voice-translate)        → Translate
uploadAudio()            → Lambda (voice-upload-audio)     → S3
```

---

## 📱 Frontend File: `whatsapp-service.js` (WhatsApp Integration)

```
┌─────────────────────────────────────────────────────────────────┐
│                   whatsapp-service.js                            │
│                  (WhatsApp Integration)                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
                   EventBridge
                   (Scheduled)
                         │
                         ▼
                  Step Functions
                  (Reminder Workflow)
                         │
         ┌───────────────┼───────────────┬──────────────┐
         │               │               │              │
         ▼               ▼               ▼              ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │  Scan   │    │  Send   │    │  Check  │    │Generate │
    │ Orders  │    │WhatsApp │    │  Reply  │    │  Voice  │
    └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    reminder-      reminder-send-  reminder-      reminder-
    scan-orders    whatsapp        check-reply    generate-voice
         │              │              │              │
         ▼              ▼              ▼              ▼
    DynamoDB       WhatsApp API    DynamoDB       Polly + S3
    (orders)       + SNS            (replies)      (audio)
         │              │              │              │
         └──────────────┴──────────────┴──────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │  Reminders  │
                  │    Sent     │
                  └─────────────┘
```

### Reminder Workflow:

```
EventBridge (Daily 9 AM)
    │
    ▼
Step Functions Start
    │
    ├─→ Scan Orders (Lambda)
    │   └─→ Find orders with no progress for 3+ days
    │
    ├─→ Send WhatsApp (Lambda)
    │   └─→ Send reminder via WhatsApp Business API
    │
    ├─→ Wait 24 Hours
    │
    ├─→ Check Reply (Lambda)
    │   └─→ Check if artisan replied
    │
    ├─→ If No Reply:
    │   ├─→ Generate Voice Call (Lambda)
    │   │   └─→ Use Polly to create audio
    │   │
    │   └─→ Alert Community (Lambda)
    │       └─→ Notify support team via SNS
    │
    └─→ Update Metrics (Lambda)
        └─→ Update resilience scores in DynamoDB
```

---

## 🔄 Complete Data Flow Example: Order Creation

```
┌─────────────────────────────────────────────────────────────────┐
│                    BUYER CREATES ORDER                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
                  buyer-dashboard.js
                  createOrder()
                         │
                         ▼
                  api-client.js
                  createOrder(orderData)
                         │
                         ▼
                  API Gateway
                  POST /api/orders
                         │
                         ▼
                  Lambda: order-create
                         │
         ┌───────────────┼───────────────┬──────────────┐
         │               │               │              │
         ▼               ▼               ▼              ▼
    Validate        Generate        Save to         Create
    Input           Order ID        DynamoDB        Notification
         │               │               │              │
         └───────────────┴───────────────┴──────────────┘
                         │
                         ▼
                  DynamoDB: orders
                  (New order record)
                         │
         ┌───────────────┼───────────────┬──────────────┐
         │               │               │              │
         ▼               ▼               ▼              ▼
    Notify          Update          Trigger         Return
    Artisan         Artisan         EventBridge     Response
    (SNS)           Stats           (Reminder)      to Frontend
         │               │               │              │
         └───────────────┴───────────────┴──────────────┘
                         │
                         ▼
                  Frontend Updates UI
                  Shows success message
```

---

## 🎯 Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                           │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │Dashboard │  │  Buyer   │  │  Admin   │  │AI Sakhi  │       │
│  │(Artisan) │  │Dashboard │  │Dashboard │  │   Chat   │       │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
│       │             │              │              │              │
│       └─────────────┴──────────────┴──────────────┘              │
│                          │                                       │
│                   ┌──────▼──────┐                               │
│                   │ API Client  │                               │
│                   │(api-client.js)                              │
│                   └──────┬──────┘                               │
└──────────────────────────┼──────────────────────────────────────┘
                           │
                           │ HTTPS
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                      AWS CLOUD LAYER                             │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                    API GATEWAY                          │    │
│  │              (REST API with Authorizer)                 │    │
│  └────────────────────────┬───────────────────────────────┘    │
│                           │                                     │
│         ┌─────────────────┼─────────────────┬─────────────┐   │
│         │                 │                 │             │   │
│         ▼                 ▼                 ▼             ▼   │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐  ┌────────┐│
│  │  Lambda  │      │  Lambda  │      │  Lambda  │  │ Lambda ││
│  │   Auth   │      │  Orders  │      │AI Sakhi  │  │ Voice  ││
│  └────┬─────┘      └────┬─────┘      └────┬─────┘  └───┬────┘│
│       │                 │                 │            │     │
│       └─────────────────┴─────────────────┴────────────┘     │
│                           │                                   │
│  ┌────────────────────────▼───────────────────────────────┐  │
│  │                     DynamoDB                            │  │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │  │
│  │  │Users │ │Orders│ │Labour│ │Artisan│ │ AI   │        │  │
│  │  │      │ │      │ │Track │ │Profile│ │Convos│        │  │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                  AI/ML SERVICES                         │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │  │
│  │  │ Bedrock  │  │  Polly   │  │SageMaker │            │  │
│  │  │ (Claude) │  │  (TTS)   │  │(SkillScan)│            │  │
│  │  └──────────┘  └──────────┘  └──────────┘            │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              ORCHESTRATION & AUTOMATION                 │  │
│  │  ┌──────────────┐  ┌──────────────┐                   │  │
│  │  │     Step     │  │  EventBridge │                   │  │
│  │  │  Functions   │  │  (Scheduler) │                   │  │
│  │  │  (Reminders) │  │              │                   │  │
│  │  └──────────────┘  └──────────────┘                   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                STORAGE & DELIVERY                       │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │  │
│  │  │    S3    │  │CloudFront│  │   SNS    │            │  │
│  │  │ (Files)  │  │  (CDN)   │  │(Notify)  │            │  │
│  │  └──────────┘  └──────────┘  └──────────┘            │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              MONITORING & LOGGING                       │  │
│  │  ┌──────────────┐  ┌──────────────┐                   │  │
│  │  │  CloudWatch  │  │  CloudWatch  │                   │  │
│  │  │    Logs      │  │    Alarms    │                   │  │
│  │  └──────────────┘  └──────────────┘                   │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 Service Dependency Matrix

| Frontend File | API Gateway | Lambda | DynamoDB | S3 | Bedrock | Polly | SNS | Step Functions |
|--------------|-------------|--------|----------|----|---------| ------|-----|----------------|
| api-client.js | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| dashboard.js | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ |
| buyer-dashboard.js | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| admin-dashboard.js | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| ai-sakhi-chat.js | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ |
| voice-services.js | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| whatsapp-service.js | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |

---

## 🎯 Next Steps

1. **Review** these visual maps with your team
2. **Identify** any missing integrations
3. **Prioritize** which services to implement first
4. **Start building** Lambda functions
5. **Test** each integration thoroughly

---

**Generated:** March 5, 2026  
**Version:** 1.0  
**Status:** Ready for Implementation
