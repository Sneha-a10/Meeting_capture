"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
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
  Volume2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function TranscribePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedSpeaker, setSelectedSpeaker] = useState("all")
  const [volume, setVolume] = useState(1)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<any>(null)
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Load uploaded file data from sessionStorage
  useEffect(() => {
    const fileData = sessionStorage.getItem("uploadedFile")
    const storedAudioUrl = sessionStorage.getItem("audioUrl")

    if (fileData && storedAudioUrl) {
      setUploadedFile(JSON.parse(fileData))
      setAudioUrl(storedAudioUrl)
    }
  }, [])

  const transcriptData = [
    {
      speaker: "John Smith",
      time: "00:02",
      timeInSeconds: 2,
      text: "Good morning everyone, thank you for joining today's quarterly review meeting. Let's start by going over our key performance indicators from Q4.",
    },
    {
      speaker: "Sarah Johnson",
      time: "00:15",
      timeInSeconds: 15,
      text: "Thanks John. I'm excited to share that we exceeded our revenue targets by 15% this quarter. Our customer acquisition has been particularly strong in the enterprise segment.",
    },
    {
      speaker: "Mike Chen",
      time: "00:32",
      timeInSeconds: 32,
      text: "That's fantastic news Sarah. From a product perspective, we've successfully launched three major features that our customers have been requesting. The user feedback has been overwhelmingly positive.",
    },
    {
      speaker: "John Smith",
      time: "00:48",
      timeInSeconds: 48,
      text: "Excellent work team. Let's dive deeper into the metrics. Sarah, can you walk us through the detailed breakdown of our customer segments?",
    },
    {
      speaker: "Sarah Johnson",
      time: "01:02",
      timeInSeconds: 62,
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

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !audioUrl) return

    const handleLoadedMetadata = () => {
      setDuration(Math.floor(audio.duration))
      setAudioError(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(Math.floor(audio.currentTime))
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleError = () => {
      setAudioError(true)
      console.error("Audio loading error")
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [audioUrl])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio || audioError) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => setAudioError(true))
    }
    setIsPlaying(!isPlaying)
  }

  const skipBackward = () => {
    const audio = audioRef.current
    if (!audio || audioError) return

    audio.currentTime = Math.max(0, audio.currentTime - 10)
  }

  const skipForward = () => {
    const audio = audioRef.current
    if (!audio || audioError) return

    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || audioError) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * audio.duration

    audio.currentTime = newTime
    setCurrentTime(Math.floor(newTime))
  }

  const jumpToTime = (timeInSeconds: number) => {
    const audio = audioRef.current
    if (!audio || audioError) return

    audio.currentTime = timeInSeconds
    setCurrentTime(timeInSeconds)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)

    const audio = audioRef.current
    if (audio) {
      audio.volume = newVolume
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Show message if no file uploaded
  if (!uploadedFile || !audioUrl) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Audio File Found</h3>
            <p className="text-slate-600 mb-4">Please upload an audio file first to view the transcription.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back to Upload
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hidden Audio Element */}
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

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
                <h1 className="text-xl font-bold text-slate-900">{uploadedFile.name}</h1>
                <p className="text-sm text-slate-600">
                  {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB • {uploadedFile.type}
                </p>
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
                {audioError ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Audio Loading Error</h3>
                    <p className="text-slate-600">Unable to load the audio file. Please try uploading again.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{formatTime(currentTime)}</span>
                      <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
                    </div>

                    {/* Progress Bar - Clickable */}
                    <div className="relative cursor-pointer" onClick={handleProgressClick}>
                      <Progress value={duration > 0 ? (currentTime / duration) * 100 : 0} className="h-2" />
                    </div>

                    {/* Audio Controls */}
                    <div className="flex items-center justify-center space-x-4">
                      <Button variant="outline" size="sm" onClick={skipBackward} disabled={audioError}>
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={togglePlayPause}
                        size="sm"
                        className="w-12 h-12 rounded-full"
                        disabled={audioError}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={skipForward} disabled={audioError}>
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center space-x-2 justify-center">
                      <Volume2 className="w-4 h-4 text-slate-500" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        disabled={audioError}
                      />
                      <span className="text-xs text-slate-500 w-8">{Math.round(volume * 100)}%</span>
                    </div>
                  </div>
                )}
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
                      <div
                        key={index}
                        className={`flex space-x-4 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors ${
                          Math.abs(currentTime - item.timeInSeconds) < 5 ? "bg-blue-50 border-l-4 border-blue-500" : ""
                        }`}
                        onClick={() => jumpToTime(item.timeInSeconds)}
                      >
                        <div className="flex-shrink-0">
                          <Badge
                            variant="outline"
                            className={`text-xs cursor-pointer hover:bg-blue-100 ${
                              Math.abs(currentTime - item.timeInSeconds) < 5 ? "bg-blue-100" : ""
                            }`}
                          >
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
            {/* File Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  File Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="text-slate-600">Duration:</span>
                  <span className="ml-auto font-medium">{duration > 0 ? formatTime(duration) : "Loading..."}</span>
                </div>
                <div className="flex items-center text-sm">
                  <FileText className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="text-slate-600">Size:</span>
                  <span className="ml-auto font-medium">{(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="text-slate-600">Type:</span>
                  <span className="ml-auto font-medium">{uploadedFile.type}</span>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm mb-2">File Name</h4>
                  <p className="text-sm text-slate-600 break-all">{uploadedFile.name}</p>
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
