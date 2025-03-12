import React from 'react';
import Hero from '../components/Hero';
import { BookOpen, Users, MessageSquare, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Study Resources',
      description: 'Access comprehensive study materials, past papers, and mock tests for all subjects.',
      link: '/resources'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Community',
      description: 'Join a vibrant community of IIT Madras BS students and alumni.',
      link: '/forum'
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Discussion Forum',
      description: 'Engage in subject-specific discussions and get your doubts cleared.',
      link: '/forum'
    },
    {
      icon: <Newspaper className="h-6 w-6" />,
      title: 'Blog',
      description: 'Read insightful articles and experiences shared by fellow students.',
      link: '/blog'
    }
  ];

  return (
    <div>
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Everything you need to excel in your academic journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Exam Schedule Released',
                date: 'March 15, 2024',
                category: 'Announcement',
                content: 'The examination schedule for the upcoming term has been released. Check the portal for details.'
              },
              {
                title: 'New Study Materials',
                date: 'March 14, 2024',
                category: 'Resources',
                content: 'Fresh study materials for Mathematics II and Statistics II have been uploaded to the resources section.'
              },
              {
                title: 'Community Meetup',
                date: 'March 13, 2024',
                category: 'Event',
                content: 'Join us for a virtual community meetup this weekend. Connect with fellow students and share experiences.'
              }
            ].map((update, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                  {update.category}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {update.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {update.content}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {update.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}