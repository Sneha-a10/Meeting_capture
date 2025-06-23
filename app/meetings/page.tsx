"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  Download,
  Share2,
  FileText,
  Clock,
  Users,
  Calendar,
  Mic,
  MoreHorizontal,
  Eye,
} from "lucide-react"
import Link from "next/link"

export default function MeetingsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const meetings = [
    {
      id: 1,
      title: "Q4 Strategy Planning",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "45 min",
      participants: 8,
      type: "Strategy",
      summary: "Discussed Q4 goals, budget allocation, and team restructuring plans.",
    },
    {
      id: 2,
      title: "Product Review Meeting",
      date: "2024-01-14",
      time: "10:30 AM",
      duration: "32 min",
      participants: 5,
      type: "Product",
      summary: "Reviewed new feature releases and gathered feedback from stakeholders.",
    },
    {
      id: 3,
      title: "Client Presentation",
      date: "2024-01-12",
      time: "3:15 PM",
      duration: "28 min",
      participants: 3,
      type: "Client",
      summary: "Presented project timeline and deliverables to client stakeholders.",
    },
    {
      id: 4,
      title: "Weekly Team Standup",
      date: "2024-01-11",
      time: "9:00 AM",
      duration: "22 min",
      participants: 12,
      type: "Standup",
      summary: "Team updates on current projects and blockers discussion.",
    },
    {
      id: 5,
      title: "Marketing Campaign Review",
      date: "2024-01-10",
      time: "1:45 PM",
      duration: "38 min",
      participants: 6,
      type: "Marketing",
      summary: "Analyzed campaign performance metrics and planned next quarter initiatives.",
    },
    {
      id: 6,
      title: "Budget Planning Session",
      date: "2024-01-09",
      time: "11:00 AM",
      duration: "52 min",
      participants: 4,
      type: "Finance",
      summary: "Currently processing transcript and summary...",
    },
  ]

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.type.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })


  const getTypeColor = (type: string) => {
    const colors = {
      Strategy: "bg-blue-100 text-blue-700",
      Product: "bg-purple-100 text-purple-700",
      Client: "bg-green-100 text-green-700",
      Standup: "bg-orange-100 text-orange-700",
      Marketing: "bg-pink-100 text-pink-700",
      Finance: "bg-indigo-100 text-indigo-700",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-700"
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">All Meetings</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
              <Button size="sm">
                <Mic className="w-4 h-4 mr-2" />
                New Recording
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search meetings by title or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Meetings List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              {filteredMeetings.length} Meeting{filteredMeetings.length !== 1 ? "s" : ""}
            </h2>
          </div>

          {filteredMeetings.map((meeting) => (
            <Card key={meeting.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-slate-900 text-lg">{meeting.title}</h3>
                        <Badge className={getTypeColor(meeting.type)}>{meeting.type}</Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-slate-600 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {meeting.date} at {meeting.time}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {meeting.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {meeting.participants} participants
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm">{meeting.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Link href="/transcribe">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredMeetings.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No meetings found</h3>
                <p className="text-slate-600 mb-4">
                  {searchQuery ? "Try adjusting your search terms" : "Start by recording your first meeting"}
                </p>
                <Button>
                  <Mic className="w-4 h-4 mr-2" />
                  Start Recording
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
