"use client"

import type React from "react"
import { useState, useRef, useEffect} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Upload, FileText, Zap, Users } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recordingTimer, setRecordingTimer] = useState<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (recordingTimer) {
        clearInterval(recordingTimer)
      }
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop()
      }
    }
  }, [recordingTimer, mediaRecorder])
  
  const handleStartRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)
    const chunks: BlobPart[] = []

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data)
      }
    }

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/wav' })
      const file = new File([blob], `recording-${Date.now()}.wav`, { type: 'audio/wav' })
      
      // Automatically upload the recorded file
      setUploadedFile(file)
      uploadFileToLocal(file)
      
      // Stop all tracks to release microphone
      stream.getTracks().forEach(track => track.stop())
    }

    recorder.start()
    setMediaRecorder(recorder)
    setIsRecording(true)
    setRecordingTime(0)

    // Start timer
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
    setRecordingTimer(timer)

    } catch (error) {
     console.error('Error accessing microphone:', error)
      alert('Could not access microphone. Please check permissions.')
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop()
   }
  
  if (recordingTimer) {
    clearInterval(recordingTimer)
    setRecordingTimer(null)
  }
  
  setIsRecording(false)
  setMediaRecorder(null)
}

  const handleFileSelect = (file: File) => {
    // Validate file type
    const allowedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/mp3",
      "audio/m4a",
      "audio/aac",
      "video/mp4",
      "video/avi",
      "video/mov",
      "video/wmv",
      "video/webm",
    ]

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid audio or video file (MP3, WAV, MP4, etc.)")
      return
    }

    // Check file size (max 100MB)
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      alert("File size must be less than 100MB")
      return
    }

    setUploadedFile(file)
    uploadFileToLocal(file)
  }

  // New function to upload file to local system
  const uploadFileToLocal = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("file", file)

      // Simulate progress while uploading
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (response.ok) {
        const result = await response.json()
        setUploadProgress(100)

        // Show success message
        // alert(`File saved successfully to: ${result.filePath}`)

        // Optional: Reset after success
        setTimeout(() => {
          setIsUploading(false)
          setUploadProgress(0)
        }, 2000)
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload file. Please try again.")
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
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
              <span className="text-slate-600">Guest Mode</span>
            </nav>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
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
          <p className="text-xl text-slate-600 mb-4 max-w-2xl mx-auto">
            Automatically transcribe and summarize your meetings with AI-powered precision. Never miss important details
            again.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-blue-800 text-sm">
              <strong>Guest Mode:</strong> Try our features without signing up! Your session data won't be saved.{" "}
              <Link href="/login" className="underline hover:text-blue-600">
                Sign in
              </Link>{" "}
              to save your meetings.
            </p>
          </div>

          {/* Quick Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <Card
              className={`border-2 transition-all cursor-pointer group ${
                isDragOver
                  ? "border-blue-500 bg-blue-50"
                  : uploadedFile
                    ? "border-green-400 bg-green-50"
                    : "border-dashed border-slate-300 hover:border-blue-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={!isUploading ? triggerFileInput : undefined}
            >
              <CardContent className="p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*,video/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                {isUploading ? (
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">Uploading to Local System...</h3>
                    <div className="space-y-2">
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-sm text-slate-600">{uploadProgress}% complete</p>
                    </div>
                    <p className="text-xs text-slate-500">Saving your file locally...</p>
                  </div>
                ) : uploadedFile ? (
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">File Saved Locally</h3>
                    <p className="text-sm text-slate-600 mb-2">{uploadedFile.name}</p>
                    <p className="text-xs text-slate-500">{(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                    <Button
                      className="mt-4"
                      size="sm"
                      onClick={() => {
                        setUploadedFile(null)
                        setUploadProgress(0)
                      }}
                    >
                      Upload Another File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload
                      className={`w-12 h-12 mx-auto mb-4 transition-colors ${
                        isDragOver ? "text-blue-500" : "text-slate-400 group-hover:text-blue-500"
                      }`}
                    />
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {isDragOver ? "Drop your file here" : "Upload Recording"}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {isDragOver ? "Release to upload" : "Drop your audio or video file here or click to browse"}
                    </p>
                    <p className="text-xs text-slate-500">Supports MP3, WAV, MP4, MOV (max 100MB)</p>
                    <p className="text-xs text-green-600 font-medium">
                      Files will be saved to your local uploads folder
                    </p>
                    <Button className="mt-4" size="sm">
                      Choose File
                    </Button>
                  </div>
                )}
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
                    <Mic
                      className={`w-6 h-6 transition-colors ${
                        isRecording ? "text-white" : "text-slate-400 group-hover:text-blue-500"
                      }`}
                    />
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
    </div>
  )
}
