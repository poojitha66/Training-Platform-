import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/lib/utils'

interface Activity {
  id: string
  type: 'course_completed' | 'assessment_passed' | 'session_attended' | 'submission_made'
  description: string
  timestamp: string
  status?: 'success' | 'warning' | 'info'
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getStatusColor = (type: Activity['type']) => {
    switch (type) {
      case 'course_completed':
        return 'default'
      case 'assessment_passed':
        return 'default'
      case 'session_attended':
        return 'secondary'
      case 'submission_made':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDateTime(activity.timestamp)}
                </p>
              </div>
              <Badge variant={getStatusColor(activity.type)}>
                {activity.type.replace('_', ' ')}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}