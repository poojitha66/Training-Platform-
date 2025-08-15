'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, Award, CheckCircle, AlertCircle, Play } from 'lucide-react'

export default function AssessmentsPage() {
  const searchParams = useSearchParams()
  const role = (searchParams.get('role') as 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant') || 'trainee'

  const assessments = [
    {
      id: '1',
      title: 'Java Fundamentals Quiz',
      course: 'Java Fundamentals',
      chapter: 'Day 3',
      questions: 15,
      timeLimit: 30,
      passingScore: 70,
      attempts: 1,
      maxAttempts: 3,
      score: 85,
      status: 'passed',
      dueDate: '2024-01-20',
      completedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: '2',
      title: 'Python Data Types Assessment',
      course: 'Python for Data Science',
      chapter: 'Day 2',
      questions: 20,
      timeLimit: 45,
      passingScore: 75,
      attempts: 0,
      maxAttempts: 2,
      score: null,
      status: 'pending',
      dueDate: '2024-01-18',
      completedAt: null
    },
    {
      id: '3',
      title: 'React Components Test',
      course: 'React & TypeScript',
      chapter: 'Day 5',
      questions: 12,
      timeLimit: 25,
      passingScore: 80,
      attempts: 2,
      maxAttempts: 3,
      score: 65,
      status: 'failed',
      dueDate: '2024-01-22',
      completedAt: '2024-01-14T16:45:00Z'
    },
    {
      id: '4',
      title: '.NET Core Concepts Quiz',
      course: '.NET Core Development',
      chapter: 'Day 4',
      questions: 18,
      timeLimit: 40,
      passingScore: 70,
      attempts: 0,
      maxAttempts: 3,
      score: null,
      status: 'available',
      dueDate: '2024-01-25',
      completedAt: null
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'available':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'available':
        return <Play className="h-4 w-4 text-blue-600" />
      default:
        return <BookOpen className="h-4 w-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={role} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header title="Assessments" userRole={role} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                    <p className="text-2xl font-bold text-gray-900">{assessments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Passed</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {assessments.filter(a => a.status === 'passed').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {assessments.filter(a => a.status === 'pending' || a.status === 'available').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Average Score</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(assessments.filter(a => a.score).reduce((acc, a) => acc + a.score!, 0) / assessments.filter(a => a.score).length) || 0}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assessments List */}
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(assessment.status)}
                      
                      <div>
                        <h3 className="font-semibold text-lg">{assessment.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>{assessment.course}</span>
                          <span>•</span>
                          <span>{assessment.chapter}</span>
                          <span>•</span>
                          <span>{assessment.questions} questions</span>
                          <span>•</span>
                          <span>{assessment.timeLimit} minutes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge className={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </Badge>
                        {assessment.score !== null && (
                          <div className="text-sm mt-1">
                            Score: <span className={assessment.score >= assessment.passingScore ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                              {assessment.score}%
                            </span>
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          Due: {formatDate(assessment.dueDate)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Attempts: {assessment.attempts}/{assessment.maxAttempts}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        {assessment.status === 'available' && (
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Start Assessment
                          </Button>
                        )}
                        {assessment.status === 'failed' && assessment.attempts < assessment.maxAttempts && (
                          <Button size="sm" variant="outline">
                            Retake
                          </Button>
                        )}
                        {assessment.status === 'passed' && (
                          <Button size="sm" variant="outline">
                            View Results
                          </Button>
                        )}
                        {assessment.status === 'pending' && (
                          <Button size="sm">
                            Continue
                          </Button>
                        )}
                      </div>
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