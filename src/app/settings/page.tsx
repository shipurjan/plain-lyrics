'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSettingsStore } from '@/stores/settings'

export default function Settings() {
  const { apiKey, setApiKey } = useSettingsStore()
  const [inputValue, setInputValue] = useState(apiKey)

  const handleSave = () => {
    setApiKey(inputValue)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

        <div className="mb-6">
          <label
            htmlFor="apiKey"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Genius API Key
          </label>
          <input
            id="apiKey"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your Genius API key"
          />
          <p className="mt-2 text-sm text-gray-500">
            You can get your API key from the{' '}
            <a
              href="https://genius.com/api-clients/new"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Genius API Client management page
            </a>
            . Fill in the form with:
          </p>
          <ul className="mt-2 text-xs text-gray-500 list-disc list-inside">
            <li>App Name: plain-lyrics</li>
            <li>App Website URL: https://shipurjan.github.io/plain-lyrics/</li>
            <li>Leave Icon URL and Redirect URI blank</li>
            <li className="font-medium text-yellow-700 mt-1">
              After creating the client, copy the "Client Access Token" (not
              Client Secret!)
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
          <Link
            href="/"
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
