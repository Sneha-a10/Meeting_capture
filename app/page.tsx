"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Upload, FileText, Clock, Users, Zap, ArrowRight, Square } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  const recentMeetings = [
    {
      id: 1,
      title: "Q4 Strategy Planning",
      date: "2024-01-15",
      duration: "45 min",
      participants: 8,
      status: "completed",
    },
    {
      id: 2,
      title: "Product Review Meeting",
      date: "2024-01-14",
      duration: "32 min",
      participants: 5,
      status: "completed",
    },
    {
      id: 3,
      title: "Client Presentation",
      date: "2024-01-12",
      duration: "28 min",
      participants: 3,
      status: "completed",
    },
  ]

  const handleStartRecording = () => {
    setIsRecording(true)
    // Start recording logic would go here
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setRecordingTime(0)
    // Stop recording and process logic would go here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">MeetingAI</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                Dashboard
              </Link>
              <Link href="/meetings" className="text-slate-600 hover:text-slate-900 transition-colors">
                Meetings
              </Link>
            </nav>
            <Link href="/login" className="hidden md:block">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Transform Your Meetings Into
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Actionable Insights
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Automatically transcribe and summarize your meetings with AI-powered precision. Never miss important details
            again.
          </p>

          {/* Quick Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
              <Card className="border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <Upload className="w-12 h-12 text-slate-400 group-hover:text-blue-500 mx-auto mb-4 transition-colors" />
                  <h3 className="font-semibold text-slate-900 mb-2">Upload Recording</h3>
                  <p className="text-sm text-slate-600">Drop your audio or video file here</p>
                </CardContent>
              </Card>

            <Card className="border-2 border-slate-200 hover:border-blue-400 transition-colors cursor-pointer group">
              <CardContent className="p-8 text-center">
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center transition-all ${
                      isRecording ? "bg-red-500 animate-pulse" : "bg-slate-100 group-hover:bg-blue-100"
                    }`}
                  >
                    {isRecording ? (
                      <Square className="w-6 h-6 text-white" />
                    ) : (
                      <Mic
                        className={`w-6 h-6 transition-colors ${
                          isRecording ? "text-white" : "text-slate-400 group-hover:text-blue-500"
                        }`}
                      />
                    )}
                  </div>
                  {isRecording && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                  )}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {isRecording ? "Recording..." : "Start Recording"}
                </h3>
                <p className="text-sm text-slate-600">
                  {isRecording
                    ? `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, "0")}`
                    : "Record live meeting"}
                </p>
                {!isRecording ? (
                  <Button onClick={handleStartRecording} className="mt-4" size="sm">
                    Start Recording
                  </Button>
                ) : (
                  <Button onClick={handleStopRecording} variant="destructive" className="mt-4" size="sm">
                    Stop & Process
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Powerful Features</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Everything you need to make your meetings more productive and actionable
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>AI Transcription</CardTitle>
              <CardDescription>
                Accurate speech-to-text conversion with speaker identification and timestamps
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Smart Summaries</CardTitle>
              <CardDescription>Automatically generate key points, action items, and meeting highlights</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>Share transcripts and summaries with your team for better follow-up</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Recent Meetings */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-900">Recent Meetings</h3>
          <Button variant="outline" size="sm">
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid gap-4">
          {recentMeetings.map((meeting) => (
            <Card key={meeting.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{meeting.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {meeting.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {meeting.participants} participants
                        </span>
                        <span>{meeting.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {meeting.status}
                    </Badge>
                    <Link href="/transcribe">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <Mic className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold text-slate-900">MeetingAI</span>
            </div>
            <p className="text-sm text-slate-600">© 2024 MeetingAI. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}
