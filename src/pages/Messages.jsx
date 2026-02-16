import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { mockMessages } from '../data/mockData'
import { Mail, Inbox, Trash2, Archive, Star, Search, Calendar } from 'lucide-react'

const Messages = () => {
  const { user } = useAuth()
  const [messages, setMessages] = useState(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [filter, setFilter] = useState('all')

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.read
    if (filter === 'read') return msg.read
    return true
  })

  const handleMarkAsRead = (id) => {
    setMessages(messages.map(m =>
      m.id === id ? { ...m, read: true } : m
    ))
  }

  const handleDelete = (id) => {
    if (confirm('Delete this message?')) {
      setMessages(messages.filter(m => m.id !== id))
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">Please log in to view your messages.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Mail className="h-8 w-8 text-primary-600" />
            Messages
          </h1>
          <p className="text-gray-600">Stay updated with your applications and opportunities</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'unread' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Unread
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold flex items-center gap-2">
                  <Inbox className="h-5 w-5 text-gray-400" />
                  Inbox ({filteredMessages.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map(msg => (
                    <div
                      key={msg.id}
                      onClick={() => { setSelectedMessage(msg); handleMarkAsRead(msg.id) }}
                      className={`p-4 cursor-pointer transition ${
                        selectedMessage?.id === msg.id ? 'bg-primary-50' : 'hover:bg-gray-50'
                      } ${!msg.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-medium ${!msg.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {msg.from}
                        </h3>
                        {!msg.read && <span className="w-2 h-2 bg-primary-600 rounded-full"></span>}
                      </div>
                      <p className={`text-sm ${!msg.read ? 'font-medium text-gray-800' : 'text-gray-500'} mb-1 truncate`}>
                        {msg.subject}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {msg.date}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Inbox className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No messages found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>From: {selectedMessage.from}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {selectedMessage.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => alert('Archive functionality pending!')} className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <Archive className="h-5 w-5 text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <Trash2 className="h-5 w-5 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{selectedMessage.content}</p>
                </div>

                {/* Reply Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold mb-4">Reply</h3>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    rows={4}
                    placeholder="Write your reply..."
                  />
                  <div className="flex gap-3 mt-3">
                    <button onClick={() => alert('Send Reply functionality pending!')} className="px-6 py-2 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition">
                      Send Reply
                    </button>
                    <button onClick={() => alert('Save Draft functionality pending!')} className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition">
                      Save Draft
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center text-center">
                <Mail className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a message</h3>
                <p className="text-gray-500">Choose a message from the inbox to read and reply</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages