'use client'

import { useSearchParams } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

export default function AnalyticsPage() {
  const searchParams = useSearchParams()
  const role = (searchParams.get('role') as 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant') || 'trainee'

  const enrollmentData = [
    { month: 'Jan', enrollments: 45, completions: 32 },
    { month: 'Feb', enrollments: 52, completions: 38 },
    { month: 'Mar', enrollments: 48, completions: 41 },
    { month: 'Apr', enrollments: 61, completions: 45 },
    { month: 'May', enrollments: 55, completions: 48 },
    { month: 'Jun', enrollments: 67, completions: 52 },
  ]

  const coursePopularity = [
    { name: 'Java', value: 35, color: '#3B82F6' },
    { name: 'Python', value: 28, color: '#10B981' },
    { name: '.NET', value: 20, color: '#F59E0B' },
    { name: 'React', value: 17, color: '#EF4444' },
  ]

  const submissionData = [
    { week: 'Week 1', submissions: 12, interviews: 8, selections: 3 },
    { week: 'Week 2', submissions: 15, interviews: 10, selections: 4 },
    { week: 'Week 3', submissions: 18, interviews: 12, selections: 5 },
    { week: 'Week 4', submissions: 14, interviews: 9, selections: 3 },
  ]

  const getAnalyticsContent = () => {
    switch (role) {
      case 'admin':
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Course Enrollments vs Completions</CardTitle>
                  <CardDescription>Monthly enrollment and completion trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={enrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="enrollments" fill="#3B82F6" name="Enrollments" />
                      <Bar dataKey="completions" fill="#10B981" name="Completions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Popularity</CardTitle>
                  <CardDescription>Distribution of students across programming languages</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={coursePopularity}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {coursePopularity.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recruitment Performance</CardTitle>
                <CardDescription>Weekly submission and selection metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={submissionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="submissions" stroke="#3B82F6" name="Submissions" />
                    <Line type="monotone" dataKey="interviews" stroke="#F59E0B" name="Interviews" />
                    <Line type="monotone" dataKey="selections" stroke="#10B981" name="Selections" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )

      case 'trainer':
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Student Progress</CardTitle>
                  <CardDescription>Completion rates across your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={enrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completions" fill="#10B981" name="Completions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Engagement</CardTitle>
                  <CardDescription>Average watch time and assessment scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average Watch Time</span>
                      <span className="font-semibold">24.5 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Assessment Score</span>
                      <span className="font-semibold">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Course Completion Rate</span>
                      <span className="font-semibold">73%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Student Satisfaction</span>
                      <span className="font-semibold">4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )

      case 'agent':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Recruitment Analytics</CardTitle>
              <CardDescription>Your submission and placement performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={submissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="submissions" stroke="#3B82F6" name="Submissions" />
                  <Line type="monotone" dataKey="interviews" stroke="#F59E0B" name="Interviews" />
                  <Line type="monotone" dataKey="selections" stroke="#10B981" name="Selections" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>My Learning Progress</CardTitle>
              <CardDescription>Your course completion and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Java Fundamentals</span>
                    <span>67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Python for Data Science</span>
                    <span>23%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>React & TypeScript</span>
                    <span>89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={role} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header title="Analytics" userRole={role} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {getAnalyticsContent()}
        </main>
      </div>
    </div>
  )
}