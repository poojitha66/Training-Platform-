'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Video, BookOpen, Users, Plus } from 'lucide-react'

export default function SchedulePage() {
  const searchParams = useSearchParams()
  const role = (searchParams.get('role') as 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant') || 'trainee'

  const scheduleItems = [
    {
      id: '1',
      type: 'live-session',
      title: 'Java OOP Concepts - Live Session',
      course: 'Java Fundamentals',
      time: '2024-01-16T14:00:00Z',
      duration: 60,
      instructor: 'John Smith',
      status: 'upcoming'
    },
    {
      id: '2',
      type: 'assessment',
      title: 'Python Basics Quiz',
      course: 'Python for Data Science',
      time: '2024-01-16T16:30:00Z',
      duration: 30,
      instructor: 'Sarah Johnson',
      status: 'upcoming'
    },
    {
      id: '3',
      type: 'live-session',
      title: 'React Hooks Workshop',
      course: 'React & TypeScript',
      time: '2024-01-17T15:00:00Z',
      duration: 90,
      instructor: 'Emily Davis',
      status: 'upcoming'
    },
    {
      id: '4',
      type: 'task',
      title: 'Submit 3 profiles to TechCorp',
      client: 'TechCorp Inc.',
      time: '2024-01-16T09:00:00Z',
      priority: 'high',
      status: 'pending'
    },
    {
      id: '5',
      type: 'interview',
      title: 'Technical Interview - Senior Developer',
      client: 'StartupXYZ',
      time: '2024-01-17T11:00:00Z',
      duration: 60,
      status: 'scheduled'
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'live-session':
        return <Video className="h-4 w-4" />
      case 'assessment':
        return <BookOpen className="h-4 w-4" />
      case 'task':
        return <Users className="h-4 w-4" />
      case 'interview':
        return <Calendar className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'live-session':
        return 'bg-blue-100 text-blue-800'
      case 'assessment':
        return 'bg-green-100 text-green-800'
      case 'task':
        return 'bg-orange-100 text-orange-800'
      case 'interview':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'scheduled':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }

  const getPageTitle = () => {
    switch (role) {
      case 'agent':
        return 'Daily Schedule'
      case 'consultant':
        return 'My Schedule'
      default:
        return 'Schedule'
    }
  }

  const filteredItems = scheduleItems.filter(item => {
    if (role === 'trainee') {
      return ['live-session', 'assessment'].includes(item.type)
    }
    if (role === 'agent' || role === 'consultant') {
      return ['task', 'interview'].includes(item.type)
    }
    return true
  })

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={role} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header title={getPageTitle()} userRole={role} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">Today's Schedule</h2>
              <p className="text-sm text-gray-600">January 16, 2024</p>
            </div>
            
            {(role === 'agent' || role === 'trainer') && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            )}
          </div>

          {/* Schedule Items */}
          <div className="space-y-4">
            {filteredItems.map((item) => {
              const dateTime = formatDateTime(item.time)
              
              return (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(item.type)}
                          <Badge className={getTypeColor(item.type)}>
                            {item.type.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            {item.course && (
                              <span>{item.course}</span>
                            )}
                            {item.client && (
                              <span>{item.client}</span>
                            )}
                            {item.instructor && (
                              <span>with {item.instructor}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-sm">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{dateTime.time}</span>
                          </div>
                          {item.duration && (
                            <div className="text-xs text-gray-500 mt-1">
                              {item.duration} minutes
                            </div>
                          )}
                        </div>
                        
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        
                        <Button size="sm">
                          {item.type === 'live-session' ? 'Join' : 
                           item.type === 'assessment' ? 'Take Quiz' :
                           item.type === 'task' ? 'View Task' : 'Details'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredItems.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No items scheduled</h3>
                <p className="text-gray-500">Your schedule is clear for today.</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}