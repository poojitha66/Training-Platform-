'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Play, Clock, Eye, Upload } from 'lucide-react'

export default function VideosPage() {
  const searchParams = useSearchParams()
  const role = (searchParams.get('role') as 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant') || 'admin'
  const [searchTerm, setSearchTerm] = useState('')

  const videos = [
    {
      id: '1',
      title: 'Java Basics - Variables and Data Types',
      description: 'Introduction to Java programming fundamentals',
      duration: '24:35',
      views: 1247,
      course: 'Java Fundamentals',
      chapter: 'Day 1',
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'ready',
      uploadedAt: '2024-01-10',
      trainer: 'John Smith'
    },
    {
      id: '2',
      title: 'Python Data Structures - Lists and Dictionaries',
      description: 'Working with Python data structures',
      duration: '31:22',
      views: 892,
      course: 'Python for Data Science',
      chapter: 'Day 3',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'ready',
      uploadedAt: '2024-01-12',
      trainer: 'Sarah Johnson'
    },
    {
      id: '3',
      title: '.NET Core MVC Architecture',
      description: 'Understanding Model-View-Controller pattern',
      duration: '42:18',
      views: 634,
      course: '.NET Core Development',
      chapter: 'Day 5',
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'processing',
      uploadedAt: '2024-01-15',
      trainer: 'Mike Wilson'
    },
    {
      id: '4',
      title: 'React Hooks - useState and useEffect',
      description: 'Modern React development with hooks',
      duration: '28:45',
      views: 1156,
      course: 'React & TypeScript',
      chapter: 'Day 4',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'ready',
      uploadedAt: '2024-01-14',
      trainer: 'Emily Davis'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={role} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header title="Video Library" userRole={role} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            
            {(role === 'admin' || role === 'trainer') && (
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
            )}
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="lg" className="rounded-full">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                    <Badge className={getStatusColor(video.status)}>
                      {video.status}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {video.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {video.views.toLocaleString()} views
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {video.uploadedAt}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{video.course}</div>
                      <div className="text-xs text-gray-500">{video.chapter}</div>
                      <div className="text-xs text-gray-500">by {video.trainer}</div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Watch
                      </Button>
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