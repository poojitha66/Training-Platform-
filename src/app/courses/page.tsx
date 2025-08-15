'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, Users, Plus, Search, Filter } from 'lucide-react'

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const role = (searchParams.get('role') as 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant') || 'trainee'
  const [searchTerm, setSearchTerm] = useState('')

  const courses = [
    {
      id: '1',
      title: 'Java Fundamentals',
      description: 'Complete Java programming course covering basics to advanced concepts',
      language: 'Java',
      level: 'beginner',
      duration: 8,
      students: 45,
      progress: 67,
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
      trainer: 'John Smith',
      status: 'published'
    },
    {
      id: '2',
      title: 'Python for Data Science',
      description: 'Learn Python programming with focus on data analysis and machine learning',
      language: 'Python',
      level: 'intermediate',
      duration: 10,
      students: 32,
      progress: 23,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      trainer: 'Sarah Johnson',
      status: 'published'
    },
    {
      id: '3',
      title: '.NET Core Development',
      description: 'Modern web development with .NET Core and C#',
      language: '.NET',
      level: 'advanced',
      duration: 12,
      students: 28,
      progress: 89,
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
      trainer: 'Mike Wilson',
      status: 'published'
    },
    {
      id: '4',
      title: 'React & TypeScript',
      description: 'Build modern web applications with React and TypeScript',
      language: 'JavaScript',
      level: 'intermediate',
      duration: 6,
      students: 52,
      progress: 45,
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      trainer: 'Emily Davis',
      status: 'published'
    }
  ]

  const getPageTitle = () => {
    switch (role) {
      case 'admin':
        return 'All Courses'
      case 'trainer':
        return 'My Courses'
      case 'trainee':
        return 'My Courses'
      default:
        return 'Courses'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={role} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header title={getPageTitle()} userRole={role} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            
            {(role === 'admin' || role === 'trainer') && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Button>
            )}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {course.language}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration} weeks
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students}
                      </div>
                    </div>
                    
                    {role === 'trainee' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-gray-600">
                        by {course.trainer}
                      </span>
                      <Button size="sm">
                        {role === 'trainee' ? 'Continue' : 'View'}
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