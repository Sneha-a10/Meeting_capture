"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Download,
  Share2,
  Copy,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Clock,
  Users,
  FileText,
  Sparkles,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function TranscribePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(2847) // 47:27 in seconds
  const [selectedSpeaker, setSelectedSpeaker] = useState("all")

  const transcriptData = [
    {
      speaker: "John Smith",
      time: "00:02",
      text: "Good morning everyone, thank you for joining today's quarterly review meeting. Let's start by going over our key performance indicators from Q4.",
    },
    {
      speaker: "Sarah Johnson",
      time: "00:15",
      text: "Thanks John. I'm excited to share that we exceeded our revenue targets by 15% this quarter. Our customer acquisition has been particularly strong in the enterprise segment.",
    },
    {
      speaker: "Mike Chen",
      time: "00:32",
      text: "That's fantastic news Sarah. From a product perspective, we've successfully launched three major features that our customers have been requesting. The user feedback has been overwhelmingly positive.",
    },
    {
      speaker: "John Smith",
      time: "00:48",
      text: "Excellent work team. Let's dive deeper into the metrics. Sarah, can you walk us through the detailed breakdown of our customer segments?",
    },
    {
      speaker: "Sarah Johnson",
      time: "01:02",
      text: "Absolutely. Our enterprise clients now represent 60% of our total revenue, up from 45% last quarter. We've also seen a 25% increase in average contract value.",
    },
  ]

  const summary = {
    keyPoints: [
      "Q4 revenue exceeded targets by 15%",
      "Enterprise segment showing strong growth (60% of total revenue)",
      "Three major product features successfully launched",
      "25% increase in average contract value",
      "Customer feedback overwhelmingly positive",
    ],
    actionItems: [
      "Schedule follow-up meeting with enterprise clients",
      "Prepare detailed product roadmap for Q1",
      "Analyze customer feedback for feature prioritization",
      "Review pricing strategy for enterprise tier",
    ],
    participants: ["John Smith", "Sarah Johnson", "Mike Chen"],
    duration: "47 minutes",
    topics: ["Revenue Review", "Product Updates", "Customer Metrics", "Q1 Planning"],
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Q4 Strategy Planning</h1>
                <p className="text-sm text-slate-600">Transcribed on January 15, 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Audio Player */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Audio Playback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <Progress value={(currentTime / duration) * 100} className="h-2" />
                  <div className="flex items-center justify-center space-x-4">
                    <Button variant="outline" size="sm">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => setIsPlaying(!isPlaying)} size="sm" className="w-12 h-12 rounded-full">
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transcript */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Transcript</CardTitle>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedSpeaker}
                      onChange={(e) => setSelectedSpeaker(e.target.value)}
                      className="text-sm border rounded px-2 py-1"
                    >
                      <option value="all">All Speakers</option>
                      <option value="John Smith">John Smith</option>
                      <option value="Sarah Johnson">Sarah Johnson</option>
                      <option value="Mike Chen">Mike Chen</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {transcriptData
                    .filter((item) => selectedSpeaker === "all" || item.speaker === selectedSpeaker)
                    .map((item, index) => (
                      <div key={index} className="flex space-x-4 p-3 rounded-lg hover:bg-slate-50">
                        <div className="flex-shrink-0">
                          <Badge variant="outline" className="text-xs">
                            {item.time}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm text-slate-900 mb-1">{item.speaker}</div>
                          <p className="text-slate-700 text-sm leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Meeting Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Meeting Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="text-slate-600">Duration:</span>
                  <span className="ml-auto font-medium">{summary.duration}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="text-slate-600">Participants:</span>
                  <span className="ml-auto font-medium">{summary.participants.length}</span>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm mb-2">Participants</h4>
                  <div className="space-y-1">
                    {summary.participants.map((participant, index) => (
                      <div key={index} className="text-sm text-slate-600">
                        {participant}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm mb-2">Topics Discussed</h4>
                  <div className="flex flex-wrap gap-1">
                    {summary.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  AI Summary
                </CardTitle>
                <CardDescription>Key insights generated from your meeting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Key Points
                  </h4>
                  <ul className="space-y-2">
                    {summary.keyPoints.map((point, index) => (
                      <li key={index} className="text-sm text-slate-700 flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-sm mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                    Action Items
                  </h4>
                  <ul className="space-y-2">
                    {summary.actionItems.map((item, index) => (
                      <li key={index} className="text-sm text-slate-700 flex items-start">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Export to Word
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
