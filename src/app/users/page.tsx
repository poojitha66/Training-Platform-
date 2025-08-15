'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, MoreHorizontal, Mail, Phone } from 'lucide-react'

export default function UsersPage() {
  const searchParams = useSearchParams()
  const role = (searchParams.get('role') as 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant') || 'admin'
  const [searchTerm, setSearchTerm] = useState('')

  const users = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@trainpro.com',
      role: 'trainer',
      organization: 'TechCorp',
      status: 'active',
      lastActive: '2024-01-15',
      courses: 3,
      students: 45
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@trainpro.com',
      role: 'trainer',
      organization: 'TechCorp',
      status: 'active',
      lastActive: '2024-01-14',
      courses: 2,
      students: 32
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@trainpro.com',
      role: 'trainee',
      organization: 'TechCorp',
      status: 'active',
      lastActive: '2024-01-15',
      coursesEnrolled: 2,
      progress: 67
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@trainpro.com',
      role: 'agent',
      organization: 'TechCorp',
      status: 'active',
      lastActive: '2024-01-15',
      consultants: 8,
      submissions: 24
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@trainpro.com',
      role: 'consultant',
      organization: 'TechCorp',
      status: 'inactive',
      lastActive: '2024-01-10',
      submissions: 12,
      interviews: 6
    }
  ]

  const getRoleColor = (userRole: string) => {
    switch (userRole) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'trainer':
        return 'bg-blue-100 text-blue-800'
      case 'trainee':
        return 'bg-green-100 text-green-800'
      case 'agent':
        return 'bg-orange-100 text-orange-800'
      case 'consultant':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={role} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header title="User Management" userRole={role} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">User</th>
                      <th className="text-left py-3 px-4 font-medium">Role</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Last Active</th>
                      <th className="text-left py-3 px-4 font-medium">Stats</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {user.lastActive}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            {user.role === 'trainer' && (
                              <>
                                <div>{user.courses} courses</div>
                                <div className="text-gray-500">{user.students} students</div>
                              </>
                            )}
                            {user.role === 'trainee' && (
                              <>
                                <div>{user.coursesEnrolled} enrolled</div>
                                <div className="text-gray-500">{user.progress}% progress</div>
                              </>
                            )}
                            {user.role === 'agent' && (
                              <>
                                <div>{user.consultants} consultants</div>
                                <div className="text-gray-500">{user.submissions} submissions</div>
                              </>
                            )}
                            {user.role === 'consultant' && (
                              <>
                                <div>{user.submissions} submissions</div>
                                <div className="text-gray-500">{user.interviews} interviews</div>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
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