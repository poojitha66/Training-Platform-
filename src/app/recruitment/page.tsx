'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Calendar, User, Building } from 'lucide-react'

export default function RecruitmentPage() {
  const searchParams = useSearchParams()
  const role = (searchParams.get('role') as 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant') || 'admin'
  const [searchTerm, setSearchTerm] = useState('')

  const submissions = [
    {
      id: '1',
      consultant: 'David Brown',
      agent: 'Emily Davis',
      client: 'TechCorp Inc.',
      position: 'Senior Java Developer',
      status: 'interview',
      submittedAt: '2024-01-15',
      salary: '$95,000',
      notes: 'Strong technical background, good communication skills'
    },
    {
      id: '2',
      consultant: 'Lisa Wilson',
      agent: 'Emily Davis',
      client: 'StartupXYZ',
      position: 'Python Data Scientist',
      status: 'submitted',
      submittedAt: '2024-01-14',
      salary: '$85,000',
      notes: 'Excellent Python skills, ML experience'
    },
    {
      id: '3',
      consultant: 'Mark Johnson',
      agent: 'Robert Smith',
      client: 'Enterprise Corp',
      position: '.NET Developer',
      status: 'selected',
      submittedAt: '2024-01-12',
      salary: '$78,000',
      notes: 'Great fit for the role, client very interested'
    },
    {
      id: '4',
      consultant: 'Anna Davis',
      agent: 'Robert Smith',
      client: 'Innovation Labs',
      position: 'React Developer',
      status: 'rejected',
      submittedAt: '2024-01-10',
      salary: '$72,000',
      notes: 'Skills mismatch, looking for more senior candidate'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800'
      case 'interview':
        return 'bg-yellow-100 text-yellow-800'
      case 'selected':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={role} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header title="Recruitment Tracking" userRole={role} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Submission
            </Button>
          </div>

          {/* Submissions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Consultant</th>
                      <th className="text-left py-3 px-4 font-medium">Position</th>
                      <th className="text-left py-3 px-4 font-medium">Client</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Salary</th>
                      <th className="text-left py-3 px-4 font-medium">Submitted</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr key={submission.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium">{submission.consultant}</div>
                              <div className="text-sm text-gray-500">by {submission.agent}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium">{submission.position}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span>{submission.client}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 font-medium">
                          {submission.salary}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{submission.submittedAt}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}