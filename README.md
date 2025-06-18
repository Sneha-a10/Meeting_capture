# 🎙️ MeetingAI - Transform Your Meetings Into Actionable Insights

A professional meeting transcription and summarization web application built with Next.js, React, and Tailwind CSS. Automatically transcribe and summarize your meetings with AI-powered precision.

## ✨ Features

- **AI-Powered Transcription** - Accurate speech-to-text conversion with speaker identification
- **Smart Summaries** - Automatically generate key points, action items, and meeting highlights
- **Real-time Recording** - Live meeting recording with instant transcription
- **File Upload Support** - Upload audio/video files for processing
- **Guest & Registered Users** - Full functionality for guests, enhanced features for registered users

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** package manager
- **Git**

### Required Commands

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/meeting-transcriber.git
   cd meeting-transcriber
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize shadcn/ui**
   ```bash
   npx shadcn@latest init
   ```
   
   Use these settings when prompted:
   - TypeScript: **Yes**
   - Style: **Default**
   - Base color: **Slate**
   - Global CSS: **app/globals.css**
   - CSS variables: **Yes**
   - Tailwind config: **tailwind.config.ts**
   - Components alias: **@/components**
   - Utils alias: **@/lib/utils**

4. **Add required UI components**
   ```bash
   npx shadcn@latest add button card badge separator progress input
   ```

5. **Install additional dependencies**
   ```bash
   npm install @radix-ui/react-progress class-variance-authority lucide-react
   ```

6. **Start the application**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
meeting-transcriber/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── login/page.tsx           # Login page
│   ├── meetings/page.tsx        # All meetings page
│   └── transcribe/page.tsx      # Transcription page
├── components/ui/               # UI components
└── lib/utils.ts                 # Utilities
```

## 🛠️ Essential Commands

```bash
# Start the application
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

That's it! Your MeetingAI application should now be running at [http://localhost:3000](http://localhost:3000)

---

⭐ **Star this repo** if you find it helpful!

