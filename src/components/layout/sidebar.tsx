'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BookOpen,
  Users,
  Video,
  BarChart3,
  Settings,
  GraduationCap,
  UserCheck,
  Calendar,
  FileText,
  Menu,
  X,
  Home
} from 'lucide-react'

interface SidebarProps {
  userRole: 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant'
}

const navigationItems = {
  admin: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Videos', href: '/videos', icon: Video },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Recruitment', href: '/recruitment', icon: UserCheck },
    { name: 'Settings', href: '/settings', icon: Settings },
  ],
  trainer: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Courses', href: '/courses', icon: BookOpen },
    { name: 'Students', href: '/students', icon: GraduationCap },
    { name: 'Live Sessions', href: '/sessions', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ],
  trainee: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Courses', href: '/courses', icon: BookOpen },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Assessments', href: '/assessments', icon: FileText },
    { name: 'Progress', href: '/progress', icon: BarChart3 },
  ],
  agent: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Daily Schedule', href: '/schedule', icon: Calendar },
    { name: 'Consultants', href: '/consultants', icon: Users },
    { name: 'Submissions', href: '/submissions', icon: FileText },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ],
  consultant: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Tasks', href: '/tasks', icon: FileText },
    { name: 'Submissions', href: '/submissions', icon: UserCheck },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
  ],
}

export function Sidebar({ userRole }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const items = navigationItems[userRole] || []

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">TrainPro</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">U</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">User</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}