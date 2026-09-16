# 📱 M-Pesa Daraja API Integration

A clean and modular **Node.js + Express** backend that integrates with the **Safaricom M-Pesa Daraja API** to enable mobile payments via STK Push (Lipa na M-Pesa Online).

---

## 🚀 Features

- 🔐 **OAuth 2.0 Authentication** — Automatically fetches M-Pesa access tokens
- 📲 **STK Push** — Initiate payment prompts directly to a customer's phone
- 📩 **Callback Handling** — Receives and logs M-Pesa payment callbacks
- 🧩 **Modular Architecture** — Clean separation of routes, services, and config
- ⚙️ **Environment-based Configuration** — Sensitive credentials managed via `.env`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express 5** | HTTP server & routing |
| **Axios** | HTTP client for Daraja API calls |
| **dotenv** | Environment variable management |
| **Nodemon** | Auto-reload during development |

---

## 📁 Project Structure

```
mpesa-daraja-course/
├── src/
│   ├── config/
│   │   └── mpesa.js          # M-Pesa configuration (loads from .env)
│   ├── routes/
│   │   └── mpesaRoutes.js    # API route definitions
│   ├── services/
│   │   ├── mpesaAuthService.js   # Access token generation
│   │   └── stkPushService.js     # STK Push initiation logic
│   └── server.js             # App entry point
├── .env                      # Environment variables (not committed)
├── .gitignore
├── package.json
└── request.rest              # Sample API requests (REST Client)
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Safaricom Developer](https://developer.safaricom.co.ke/) account with a **Sandbox** app

### 1. Clone the repository

```bash
git clone https://github.com/jeremi563/nexora-daraja-training.git
cd nexora-daraja-training
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000

# From your Safaricom Developer App
MPESA_CONSUMER_KEY=your_consumer_key_here
MPESA_CONSUMER_SECRET=your_consumer_secret_here

# Sandbox shortcode & passkey
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
```

> **Note:** The passkey and shortcode above are the official Safaricom sandbox test credentials.

### 4. Run the development server

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

---

## 📡 API Endpoints

### Base URL

```
http://localhost:5000
```

---

### `GET /`
Health check — confirms the server is running.

**Response:**
```json
{
  "message": "Mpesa daraja api server is running"
}
```

---

### `GET /api/mpesa/access-token`
Generates an OAuth 2.0 access token from Safaricom.

**Response:**
```json
{
  "access_token": "...",
  "expires_in": "3599"
}
```

---

### `POST /api/mpesa/stkpush`
Initiates an STK Push payment request to the customer's phone.

**Request Body:**
```json
{
  "phoneNumber": "254700000000",
  "amount": 1,
  "accountReference": "ORDER-001",
  "transactionDescription": "Payment for order"
}
```

**Response:**
```json
{
  "MerchantRequestID": "...",
  "CheckoutRequestID": "...",
  "ResponseCode": "0",
  "ResponseDescription": "Success. Request accepted for processing",
  "CustomerMessage": "Success. Request accepted for processing"
}
```

---

### `POST /api/mpesa/callback`
Receives the M-Pesa payment result callback from Safaricom.

> **Note:** This endpoint must be publicly accessible. Use a tool like [ngrok](https://ngrok.com/) to expose your local server during development.

---

## 🌐 Exposing Localhost with ngrok

For M-Pesa callbacks to reach your local server, expose it with ngrok:

```bash
ngrok http 5000
```

Then update the `CallBackURL` in `src/services/stkPushService.js` with your ngrok URL:

```js
CallBackURL: "https://your-ngrok-url.ngrok-free.app/api/mpesa/callback"
```

---

## 📮 Testing with REST Client

If you use VS Code, install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension and use the included `request.rest` file to test all endpoints directly from the editor.

---

## 📌 Environment Variables Reference

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (default: `5000`) |
| `MPESA_CONSUMER_KEY` | App Consumer Key from Safaricom Developer portal |
| `MPESA_CONSUMER_SECRET` | App Consumer Secret from Safaricom Developer portal |
| `MPESA_BUSINESS_SHORT_CODE` | Your M-Pesa business shortcode (sandbox: `174379`) |
| `MPESA_PASSKEY` | Lipa Na M-Pesa Online passkey |

---

## 📚 Resources

- [Safaricom Daraja API Documentation](https://developer.safaricom.co.ke/Documentation)
- [M-Pesa Daraja Sandbox](https://developer.safaricom.co.ke/test_credentials)
- [ngrok](https://ngrok.com/)

---

## 📄 License

This project is licensed under the **ISC License**.
