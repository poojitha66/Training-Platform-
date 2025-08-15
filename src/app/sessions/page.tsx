'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Calendar, Clock, Users, Video, ExternalLink } from 'lucide-react'

export default function SessionsPage() {
  const searchParams = useSearchParams()
  const role = (searchParams.get('role') as 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant') || 'trainer'
  const [searchTerm, setSearchTerm] = useState('')

  const sessions = [
    {
      id: '1',
      title: 'Java OOP Concepts - Live Session',
      course: 'Java Fundamentals',
      chapter: 'Day 5',
      scheduledAt: '2024-01-16T14:00:00Z',
      duration: 60,
      attendees: 23,
      maxAttendees: 30,
      status: 'scheduled',
      meetingUrl: 'https://zoom.us/j/123456789',
      recordingUrl: null
    },
    {
      id: '2',
      title: 'Python Data Analysis Workshop',
      course: 'Python for Data Science',
      chapter: 'Day 8',
      scheduledAt: '2024-01-16T16:00:00Z',
      duration: 90,
      attendees: 18,
      maxAttendees: 25,
      status: 'scheduled',
      meetingUrl: 'https://zoom.us/j/987654321',
      recordingUrl: null
    },
    {
      id: '3',
      title: 'React Hooks Deep Dive',
      course: 'React & TypeScript',
      chapter: 'Day 6',
      scheduledAt: '2024-01-15T15:00:00Z',
      duration: 75,
      attendees: 19,
      maxAttendees: 20,
      status: 'completed',
      meetingUrl: 'https://zoom.us/j/456789123',
      recordingUrl: 'https://zoom.us/rec/share/abc123'
    },
    {
      id: '4',
      title: '.NET Core API Development',
      course: '.NET Core Development',
      chapter: 'Day 10',
      scheduledAt: '2024-01-17T13:00:00Z',
      duration: 120,
      attendees: 0,
      maxAttendees: 15,
      status: 'scheduled',
      meetingUrl: 'https://zoom.us/j/789123456',
      recordingUrl: null
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'live':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={role} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header title="Live Sessions" userRole={role} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search sessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            
            {(role === 'admin' || role === 'trainer') && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            )}
          </div>

          {/* Sessions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sessions.map((session) => (
              <Card key={session.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                      <CardDescription>
                        {session.course} • {session.chapter}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(session.status)}>
                      {session.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{formatDateTime(session.scheduledAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{session.duration} min</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {session.attendees}/{session.maxAttendees} attendees
                        </span>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(session.attendees / session.maxAttendees) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      {session.status === 'completed' && session.recordingUrl ? (
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          View Recording
                        </Button>
                      ) : (
                        <div />
                      )}
                      
                      {session.status === 'scheduled' && (
                        <Button size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Join Meeting
                        </Button>
                      )}
                      
                      {session.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}