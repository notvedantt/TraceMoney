# Spendr — AI-Powered Personal Finance Tracker

## Overview

Spendr is a full-stack personal finance tracker built for the Indian market, where spending is fragmented across UPI apps, credit cards, wallets, and subscriptions with no unified plain-language view. The project combines LLM-based transaction intelligence, a data analytics layer, and a conversational AI interface — delivered as a web dashboard with WhatsApp as a secondary interaction channel.

**Problem statement:** Individuals lose control over spending because transactions are scattered across UPI apps, cards, wallets, and subscriptions, with no single, simple view of everyday expenses in plain language.

Itch score: **90.5** | TAM score: **10/10** | Severity: **8/10** | Frequency: **8/10**

\---

## Tech Stack

|Layer|Technology|
|-|-|
|Frontend|Next.js 14 (App Router), Tailwind CSS, Recharts|
|Backend|Next.js API Routes (Node.js)|
|Database|PostgreSQL via Supabase|
|Auth|Supabase Auth + JWT|
|AI / LLM|Claude API (claude-sonnet-4, Anthropic)|
|Data pipeline|Python, Pandas, NumPy|
|Financial data|RBI Account Aggregator (AA) framework + SMS parsing fallback|
|WhatsApp|Twilio WhatsApp Business API|
|Deployment|Vercel|

\---

## Architecture

```
User
 ├── Web Dashboard (Next.js PWA)
 └── WhatsApp Bot (Twilio)
          │
          ▼
     Backend API (Next.js API Routes)
          │
          ├── AI Layer (Claude API)
          │     ├── Transaction categorisation
          │     ├── NL query answering
          │     └── Monthly insight generation
          │
          ├── Data Layer (Supabase / PostgreSQL)
          │     ├── transactions
          │     ├── categories (12 seeded)
          │     ├── payment\\\_sources
          │     ├── budgets
          │     ├── insights (cached AI output)
          │     └── whatsapp\\\_sessions + messages
          │
          └── Data Sources
                ├── RBI Account Aggregator API (consent-based)
                └── SMS parser (UPI alert fallback)
```

\---

## Core Features

### 1\. Transaction Aggregation

* Ingests data from UPI apps (GPay, PhonePe, Paytm), credit/debit cards, wallets, and subscriptions via RBI's Account Aggregator framework
* SMS parsing fallback for UPI transaction alerts where AA is unavailable
* 341 transactions seeded across 90 days for demo mode

### 2\. LLM-Based Categorisation

* Raw transaction descriptions (e.g. `UPI/SWIGGY\\\*388389`, `POS/MCDONALDS\\\*7834`) are passed through a prompt pipeline to Claude API
* Outputs structured JSON: `{ merchant, category, confidence, is\\\_recurring }`
* 12 default categories: Food \& Dining, Transport, Shopping, Subscriptions, Entertainment, Health, Utilities, Groceries, Travel, Education, Transfers, Others
* `ai\\\_categorised` flag stored per transaction for audit and retraining purposes

### 3\. Spending Analytics

* Month-over-month category comparison (grouped bar chart)
* Daily spending intensity heatmap (90-day grid)
* Subscription tracker — detects recurring charges, projects next charge date, calculates monthly burn
* Category deep dive — weekly trend line, top merchants, average transaction value
* Budget vs actual progress bars with overspend alerts

### 4\. Natural Language Query Interface

* Conversational chat UI on the dashboard — same backend as the WhatsApp bot
* User asks in plain English or Hinglish: *"Where did my money go this month?"*
* Backend builds a context string from last 90 days of transaction data and injects it into Claude API
* Streaming response — tokens rendered progressively in the UI
* 5 core queries handled: total spend, top category, food spend, subscription list, month comparison

### 5\. WhatsApp Integration

* Twilio WhatsApp sandbox for demo; production uses Meta Business API
* Webhook receives inbound messages → same `/api/ask` route as dashboard chat
* Conversation history stored per phone number in `whatsapp\\\_messages` table
* No separate model — same Claude API call, same context injection

### 6\. Security

* RBI Account Aggregator framework — user explicitly consents to each data fetch, revocable at any time
* Row Level Security (RLS) enabled on all Supabase tables — users can only access their own data
* JWT-based auth with short expiry
* No bank credentials stored at any point
* Raw transaction data never forwarded to third-party APIs — summarised on backend before Claude call
* Demo mode uses seeded data — no real financial data exposed in presentations

\---

## Database Schema

8 tables with full Row Level Security:

* `profiles` — extends Supabase auth, auto-created on signup via DB trigger
* `categories` — 12 system categories with icon, colour, seeded on schema creation
* `payment\\\_sources` — UPI, card, wallet, netbanking per user
* `transactions` — core table; stores amount, merchant, raw description, category, recurring flag, AI categorisation flag
* `budgets` — monthly spend limits per category
* `insights` — cached AI-generated monthly summaries (avoids redundant API calls)
* `whatsapp\\\_sessions` — maps phone number to user
* `whatsapp\\\_messages` — full conversation history per session

\---

## Dashboard Pages

|Page|Purpose|
|-|-|
|Landing|Marketing page — problem, product showcase, features, security trust|
|Dashboard|Home — summary cards, category donut chart, recent transactions, AI insight, subscriptions, budget progress|
|Transactions|Full ledger — search, filter by category/source/type/date, edit category, add notes, export CSV|
|Analytics|Category trends, spending heatmap, subscription tracker, category deep dive|
|Budgets|Monthly limits per category, progress bars, overspend alerts|
|Ask Spendr|Conversational AI chat — same engine as WhatsApp bot|

\---

## DS / ML Highlights

* **Prompt engineering** — structured output extraction from noisy financial text using chain-of-thought prompting and JSON mode
* **Time-series analysis** — month-over-month spend aggregation, weekly trend detection, anomaly flagging for unusual category spikes
* **Retrieval-augmented context** — last 90 days of transaction data summarised and injected as context for NL query answering
* **Recurring charge detection** — heuristic + LLM hybrid to identify subscription patterns from transaction history
* **Spend forecasting** — linear projection of monthly spend based on daily average (days elapsed / days in month)

\---

## Demo Mode

A `demo mode` toggle loads a seeded dataset of 341 realistic transactions across 90 days covering:

* Daily food orders (Swiggy, Zomato, McDonald's, Starbucks, Domino's)
* Transport (Ola, Uber, Rapido, Mumbai Metro, petrol)
* Groceries twice weekly (BigBasket, Blinkit, D-Mart, Zepto)
* 7 subscriptions on fixed dates (Netflix, Spotify, Amazon Prime, Airtel, Jio, YouTube Premium, Notion)
* Utilities on the 15th (electricity, broadband, gas)
* Monthly salary credit of ₹70,000 on the 1st

No real financial data is used or exposed during demo or presentation.

\---

## Resume Summary

Built a full-stack personal finance dashboard aggregating transactions across UPI apps, cards, and wallets using RBI's Account Aggregator framework. Integrated the Claude LLM API to automatically categorise raw transaction descriptions and generate natural language spending insights via prompt engineering. Developed a conversational AI query interface enabling plain-language financial queries over structured time-series data, accessible via both a web dashboard and WhatsApp.

**Resume bullets:**

* Engineered an LLM-based categorisation pipeline processing 300+ monthly transactions using prompt chaining and structured JSON output extraction
* Built a time-series spending analytics layer with month-over-month trend analysis, daily heatmap visualisation, and recurring charge detection across 12 categories
* Designed a natural language query interface over structured financial data using retrieval-augmented context injection and streaming API responses



