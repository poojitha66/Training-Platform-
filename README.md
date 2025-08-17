# TrainPro - Enterprise Training & Recruitment Platform

A comprehensive enterprise-grade platform for managing training programs and recruitment processes, built with modern web technologies.

## 🚀 Features

### 🧑‍🏫 Training Management
- **Course Creation**: Create and manage programming language courses (Java, Python, .NET, etc.)
- **Daily Chapters**: Structured learning with video content, notes, and assessments
- **Live Sessions**: Auto-scheduling and managing Zoom live sessions
- **Progress Tracking**: Monitor student progress, assessments, and certifications
- **Trainer Assignment**: Assign trainers to specific courses

### 🎥 Video Management
- **Video Upload**: Upload, transcode, and store recorded videos
- **Auto-Generation**: Automatic chapter generation, thumbnails, and transcriptions
- **Cloud Storage**: Integration with AWS S3 or Azure Blob storage
- **Streaming**: Video streaming with watch tracking and chapter navigation

### 👥 Role-Based Access Control
- **Admin**: Full platform access and management
- **Trainer**: Content management, live sessions, student assessment
- **Trainee**: Course enrollment, session attendance, assessment completion
- **Agent**: Daily recruitment schedule and submission management
- **Consultant**: Submission tracking and interview updates

### 🧑‍💼 Recruitment Tracking
- **Schedule Management**: Agents manage daily schedules and consultant assignments
- **Submission Tracking**: Track consultant submissions with status updates
- **Performance Metrics**: Measure agent and consultant performance

### 📊 Analytics & Dashboards
- **Training Dashboard**: Course completion rates, trainer performance
- **Recruitment Dashboard**: Agent submission statistics, success rates
- **Video Analytics**: Watch data, engagement metrics, drop-off rates
- **System Dashboard**: Platform KPIs, uptime, active users, storage usage

### 🔐 Enterprise Integrations
- **Zoom Integration**: Auto-create meetings, manage recordings, track attendance
- **Cloud Storage**: AWS S3 and Azure Blob support
- **Authentication**: JWT and enterprise SSO (OAuth2/LDAP)
- **Notifications**: Email and SMS notifications
- **Reporting**: Exportable reports in PDF/CSV formats

## 🛠 Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL), Row Level Security
- **Authentication**: Supabase Auth with role-based access
- **UI Components**: Custom components with Headless UI
- **Charts**: Recharts for analytics
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A Supabase account and project
- (Optional) AWS S3 or Azure Blob storage account
- (Optional) Zoom developer account for integration

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd trainpro-platform
   npm install
   ```

2. **Set up Supabase**
   - Click the "Connect to Supabase" button in the top right
   - Follow the setup wizard to configure your database
   - The database schema will be automatically created

3. **Start Development**
   ```bash
   npm run dev
   ```

4. **Access the Platform**
   - Open http://localhost:3000
   - Use the demo accounts to explore different roles

## 👤 Demo Accounts

The platform includes demo accounts for testing:

- **Admin**: admin@trainpro.com
- **Trainer**: trainer@trainpro.com  
- **Trainee**: trainee@trainpro.com
- **Agent**: agent@trainpro.com
- **Consultant**: consultant@trainpro.com

Password for all demo accounts: `demo123`

## 🏗 Architecture

### Database Schema
- **Multi-tenant**: Organization-based data isolation
- **Role-based**: Comprehensive permission system
- **Scalable**: Optimized for 1000+ concurrent users
- **Secure**: Row Level Security (RLS) policies

### Key Data Models
- Users (with roles and organizations)
- Courses and Chapters
- Assessments and Results
- Videos and Progress Tracking
- Zoom Sessions
- Recruitment Submissions
- Analytics and Reports

### Security Features
- HTTPS enforcement
- Password hashing
- Encrypted video storage
- Multi-tenant data isolation
- Comprehensive audit trails

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional integrations
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_api_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AZURE_STORAGE_CONNECTION_STRING=your_azure_connection_string
```

### Zoom Integration Setup
1. Create a Zoom app in the Zoom Marketplace
2. Get your API credentials
3. Configure webhook endpoints for meeting events
4. Set up OAuth for user authentication

### Cloud Storage Setup
**AWS S3:**
1. Create an S3 bucket
2. Configure CORS for video uploads
3. Set up CloudFront for CDN delivery

**Azure Blob:**
1. Create a storage account
2. Configure blob containers
3. Set up CDN for global delivery

## 📈 Deployment

### Recommended Deployment Options

1. **Vercel** (Recommended for Next.js)
   ```bash
   npm run build
   vercel deploy
   ```

2. **AWS Amplify**
   - Connect your Git repository
   - Configure build settings
   - Deploy automatically on push

3. **Docker**
   ```bash
   docker build -t trainpro .
   docker run -p 3000:3000 trainpro
   ```

### Production Considerations
- Configure CDN for video delivery
- Set up monitoring and logging
- Implement backup strategies
- Configure SSL certificates
- Set up load balancing for high traffic

## 🔌 API Integration

### Zoom API Integration
```typescript
// Example: Create a Zoom meeting
const createZoomMeeting = async (chapterData) => {
  const response = await fetch('/api/zoom/meetings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chapterData)
  })
  return response.json()
}
```

### Video Upload Integration
```typescript
// Example: Upload video to cloud storage
const uploadVideo = async (file) => {
  const formData = new FormData()
  formData.append('video', file)
  
  const response = await fetch('/api/videos/upload', {
    method: 'POST',
    body: formData
  })
  return response.json()
}
```

## 📊 Analytics & Reporting

The platform provides comprehensive analytics:

- **Training Metrics**: Completion rates, engagement scores
- **Recruitment Metrics**: Submission success rates, interview conversion
- **Video Analytics**: Watch time, drop-off points, engagement
- **System Metrics**: Performance, uptime, resource usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

## 🗺 Roadmap

- [ ] Mobile app development
- [ ] Advanced AI-powered recommendations
- [ ] Integration with more video platforms
- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] API marketplace for third-party integrations