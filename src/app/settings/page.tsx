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
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Settings</h1>

        <div className="mb-6">
          <label
            htmlFor="apiKey"
            className="mb-2 block text-sm font-medium text-gray-700"
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
            className={`
              w-full rounded-md border border-gray-300 px-3 py-2
              focus:border-transparent focus:ring-2 focus:ring-blue-500
              focus:outline-none
            `}
            placeholder="Enter your Genius API key"
          />
          <p className="mt-2 text-sm text-gray-500">
            You can get your API key from the{' '}
            <a
              href="https://genius.com/api-clients/new"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-blue-600
                hover:text-blue-800
              `}
            >
              Genius API Client management page
            </a>
            . Fill in the form with:
          </p>
          <ul className="mt-2 list-inside list-disc text-xs text-gray-500">
            <li>App Name: plain-lyrics</li>
            <li>App Website URL: https://shipurjan.github.io/plain-lyrics/</li>
            <li>Leave Icon URL and Redirect URI blank</li>
            <li className="mt-1 font-medium text-yellow-700">
              After creating the client, copy the "Client Access Token" (not
              Client Secret!)
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className={`
              flex-1 rounded-md bg-blue-600 px-4 py-2 text-white
              hover:bg-blue-700
              focus:ring-2 focus:ring-blue-500 focus:outline-none
            `}
          >
            Save
          </button>
          <Link
            href="/"
            className={`
              flex-1 rounded-md bg-gray-200 px-4 py-2 text-center text-gray-700
              hover:bg-gray-300
              focus:ring-2 focus:ring-gray-500 focus:outline-none
            `}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
