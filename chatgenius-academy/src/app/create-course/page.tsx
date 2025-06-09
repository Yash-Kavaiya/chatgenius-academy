'use client';

import { useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import Navbar from '@/components/Navbar';

export default function CreateCoursePage() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    thumbnail: '',
    lessons: []
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to your database
    console.log('Course data:', courseData);
    // For now, just show success message
    alert('Course created successfully!');
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
              <p className="mt-2 text-gray-600">
                Build and publish your course to share knowledge with students worldwide.
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <nav aria-label="Progress">
                <ol className="flex items-center">
                  {[
                    { id: 1, name: 'Course Details' },
                    { id: 2, name: 'Content' },
                    { id: 3, name: 'Publish' }
                  ].map((step, stepIdx) => (
                    <li key={step.name} className={`${stepIdx !== 2 ? 'pr-8 sm:pr-20' : ''} relative`}>
                      <div className="flex items-center">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          currentStep >= step.id 
                            ? 'bg-blue-600 text-white' 
                            : 'border-2 border-gray-300 text-gray-500'
                        }`}>
                          {currentStep > step.id ? (
                            <svg className="w-6 h-6\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24">
                              <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-sm font-medium">{step.id}</span>
                          )}
                        </div>
                        <span className="ml-4 text-sm font-medium text-gray-500">{step.name}</span>
                      </div>
                      {stepIdx !== 2 && (
                        <div className="absolute top-5 right-0 hidden h-0.5 w-full bg-gray-200 sm:block" />
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Form */}
            <div className="bg-white shadow rounded-lg">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {currentStep === 1 && (
                  <>
                    <div>
                      <label htmlFor="title\" className="block text-sm font-medium text-gray-700">
                        Course Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your course title"
                        value={courseData.title}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Course Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        rows={4}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Describe what students will learn in this course"
                        value={courseData.description}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category
                        </label>
                        <select
                          name="category"
                          id="category"
                          required
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={courseData.category}
                          onChange={handleInputChange}
                        >
                          <option value="">Select a category</option>
                          <option value="programming">Programming</option>
                          <option value="design">Design</option>
                          <option value="business">Business</option>
                          <option value="marketing">Marketing</option>
                          <option value="photography">Photography</option>
                          <option value="music">Music</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          min="0"
                          step="0.01"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="0.00"
                          value={courseData.price}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                        Course Thumbnail URL
                      </label>
                      <input
                        type="url"
                        name="thumbnail"
                        id="thumbnail"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="https://example.com/image.jpg"
                        value={courseData.thumbnail}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Course Content</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900">Add Lessons</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Start adding lessons, videos, and materials to your course
                        </p>
                        <button
                          type="button"
                          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Add First Lesson
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Review & Publish</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-2">{courseData.title}</h4>
                      <p className="text-gray-600 mb-4">{courseData.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Category: {courseData.category}</span>
                        {courseData.price && <span>Price: ${courseData.price}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Publish Course
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}