'use client'

import { useSearchParams } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { StatsCard } from '@/components/dashboard/stats-card'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  Users, 
  Video, 
  TrendingUp, 
  GraduationCap, 
  Calendar,
  FileText,
  UserCheck,
  Clock,
  Award
} from 'lucide-react'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const role = (searchParams.get('role') as 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant') || 'trainee'

  const getDashboardData = (userRole: string) => {
    switch (userRole) {
      case 'admin':
        return {
          title: 'Admin Dashboard',
          stats: [
            { title: 'Total Users', value: '2,847', change: '+12% from last month', changeType: 'positive' as const, icon: Users },
            { title: 'Active Courses', value: '24', change: '+3 new this month', changeType: 'positive' as const, icon: BookOpen },
            { title: 'Video Hours', value: '1,247', change: '+89 hours added', changeType: 'positive' as const, icon: Video },
            { title: 'Revenue', value: '$47,892', change: '+23% from last month', changeType: 'positive' as const, icon: TrendingUp },
          ],
          activities: [
            { id: '1', type: 'course_completed' as const, description: 'New Java course published by John Trainer', timestamp: '2024-01-15T10:30:00Z' },
            { id: '2', type: 'assessment_passed' as const, description: '15 new user registrations', timestamp: '2024-01-15T09:15:00Z' },
            { id: '3', type: 'session_attended' as const, description: 'System backup completed successfully', timestamp: '2024-01-15T08:00:00Z' },
          ]
        }
      case 'trainer':
        return {
          title: 'Trainer Dashboard',
          stats: [
            { title: 'My Courses', value: '8', change: '+2 this month', changeType: 'positive' as const, icon: BookOpen },
            { title: 'Total Students', value: '156', change: '+24 new enrollments', changeType: 'positive' as const, icon: GraduationCap },
            { title: 'Live Sessions', value: '12', change: '3 scheduled today', changeType: 'neutral' as const, icon: Calendar },
            { title: 'Avg. Rating', value: '4.8', change: '+0.2 this month', changeType: 'positive' as const, icon: Award },
          ],
          activities: [
            { id: '1', type: 'session_attended' as const, description: 'Python Basics - Chapter 5 session completed', timestamp: '2024-01-15T14:30:00Z' },
            { id: '2', type: 'assessment_passed' as const, description: '23 students completed Java assessment', timestamp: '2024-01-15T11:45:00Z' },
            { id: '3', type: 'course_completed' as const, description: 'New chapter uploaded to .NET course', timestamp: '2024-01-15T09:20:00Z' },
          ]
        }
      case 'trainee':
        return {
          title: 'My Learning Dashboard',
          stats: [
            { title: 'Enrolled Courses', value: '3', change: '1 new enrollment', changeType: 'positive' as const, icon: BookOpen },
            { title: 'Completed', value: '67%', change: '+15% this week', changeType: 'positive' as const, icon: TrendingUp },
            { title: 'Study Hours', value: '24', change: '8 hours this week', changeType: 'positive' as const, icon: Clock },
            { title: 'Certificates', value: '2', change: '1 earned this month', changeType: 'positive' as const, icon: Award },
          ],
          activities: [
            { id: '1', type: 'assessment_passed' as const, description: 'Passed Python Fundamentals Quiz with 95%', timestamp: '2024-01-15T16:20:00Z' },
            { id: '2', type: 'session_attended' as const, description: 'Attended Java OOP live session', timestamp: '2024-01-15T14:00:00Z' },
            { id: '3', type: 'course_completed' as const, description: 'Completed Chapter 8: Data Structures', timestamp: '2024-01-15T10:30:00Z' },
          ]
        }
      case 'agent':
        return {
          title: 'Agent Dashboard',
          stats: [
            { title: 'Active Consultants', value: '18', change: '+3 this month', changeType: 'positive' as const, icon: Users },
            { title: 'Daily Tasks', value: '24', change: '8 pending today', changeType: 'neutral' as const, icon: FileText },
            { title: 'Submissions', value: '47', change: '+12 this week', changeType: 'positive' as const, icon: UserCheck },
            { title: 'Success Rate', value: '73%', change: '+5% this month', changeType: 'positive' as const, icon: TrendingUp },
          ],
          activities: [
            { id: '1', type: 'submission_made' as const, description: 'Assigned 5 new tasks to consultants', timestamp: '2024-01-15T15:45:00Z' },
            { id: '2', type: 'submission_made' as const, description: 'Client ABC Corp - 3 submissions made', timestamp: '2024-01-15T13:30:00Z' },
            { id: '3', type: 'submission_made' as const, description: 'Weekly performance review completed', timestamp: '2024-01-15T11:00:00Z' },
          ]
        }
      case 'consultant':
        return {
          title: 'Consultant Dashboard',
          stats: [
            { title: 'My Tasks', value: '8', change: '3 new today', changeType: 'neutral' as const, icon: FileText },
            { title: 'Submissions', value: '15', change: '+5 this week', changeType: 'positive' as const, icon: UserCheck },
            { title: 'Interviews', value: '6', change: '2 scheduled', changeType: 'positive' as const, icon: Calendar },
            { title: 'Success Rate', value: '68%', change: '+8% this month', changeType: 'positive' as const, icon: TrendingUp },
          ],
          activities: [
            { id: '1', type: 'submission_made' as const, description: 'Submitted profile to TechCorp for Senior Developer role', timestamp: '2024-01-15T17:00:00Z' },
            { id: '2', type: 'submission_made' as const, description: 'Interview scheduled with StartupXYZ', timestamp: '2024-01-15T14:15:00Z' },
            { id: '3', type: 'submission_made' as const, description: 'Profile updated with new certifications', timestamp: '2024-01-15T12:30:00Z' },
          ]
        }
      default:
        return {
          title: 'Dashboard',
          stats: [],
          activities: []
        }
    }
  }

  const dashboardData = getDashboardData(role)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={role} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header title={dashboardData.title} userRole={role} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardData.stats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={stat.icon}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <RecentActivity activities={dashboardData.activities} />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks for your role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {role === 'admin' && (
                    <>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Create New Course</div>
                        <div className="text-sm text-gray-500">Set up a new training program</div>
                      </button>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Manage Users</div>
                        <div className="text-sm text-gray-500">Add or modify user accounts</div>
                      </button>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">View Analytics</div>
                        <div className="text-sm text-gray-500">Check platform performance</div>
                      </button>
                    </>
                  )}
                  {role === 'trainer' && (
                    <>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Schedule Live Session</div>
                        <div className="text-sm text-gray-500">Create a new Zoom meeting</div>
                      </button>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Upload Video</div>
                        <div className="text-sm text-gray-500">Add new course content</div>
                      </button>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Create Assessment</div>
                        <div className="text-sm text-gray-500">Design a new quiz or test</div>
                      </button>
                    </>
                  )}
                  {role === 'trainee' && (
                    <>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Continue Learning</div>
                        <div className="text-sm text-gray-500">Resume your current course</div>
                      </button>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Take Assessment</div>
                        <div className="text-sm text-gray-500">Complete pending quizzes</div>
                      </button>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Join Live Session</div>
                        <div className="text-sm text-gray-500">Attend scheduled classes</div>
                      </button>
                    </>
                  )}
                  {role === 'agent' && (
                    <>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Assign Tasks</div>
                        <div className="text-sm text-gray-500">Distribute work to consultants</div>
                      </button>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Review Submissions</div>
                        <div className="text-sm text-gray-500">Check consultant progress</div>
                      </button>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Generate Report</div>
                        <div className="text-sm text-gray-500">Create performance analytics</div>
                      </button>
                    </>
                  )}
                  {role === 'consultant' && (
                    <>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">View My Tasks</div>
                        <div className="text-sm text-gray-500">Check assigned work</div>
                      </button>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Submit Profile</div>
                        <div className="text-sm text-gray-500">Send to new client</div>
                      </button>
                      <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Update Status</div>
                        <div className="text-sm text-gray-500">Report interview results</div>
                      </button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}