import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AdminPanel = () => {
  const { user, logout } = useContext(AuthContext);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [taskMessage, setTaskMessage] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('/api/submissions/all', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSubmissions(response.data);
    } catch (error) {
      console.error('Failed to load submissions', error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [user.token]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/tasks/create',
        { title, description, deadline, difficulty },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTaskMessage({ text: `✅ Task "${title}" created successfully!`, type: 'success' });
      setTitle(''); setDescription(''); setDeadline(''); setDifficulty('Beginner');
    } catch (error) {
      setTaskMessage({ text: `❌ Error: ${error.response?.data?.message || 'Failed to create task'}`, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Control Center</h2>
            <p className="text-sm text-gray-500">Manage Tasks and Submissions</p>
          </div>
          <button 
            onClick={logout} 
            className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 rounded-lg transition-colors border border-red-200"
          >
            Logout
          </button>
        </div>

        {/* Create Task Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Publish New Task</h3>
          
          <form onSubmit={handleCreateTask} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-sm" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-sm bg-white">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md mt-2">
              Create Task
            </button>
          </form>

          {taskMessage && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${taskMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {taskMessage.text}
            </div>
          )}
        </div>

        {/* Submissions Log Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-xl font-bold text-gray-800">Student Submissions Log</h3>
            <button onClick={fetchSubmissions} className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
              🔄 Refresh
            </button>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No submissions recorded yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GitHub Link</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{sub.studentId?.name || 'Unknown'}</div>
                        <div className="text-sm text-gray-500">{sub.studentId?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">{sub.taskId?.title}</div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                          {sub.taskId?.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <a href={sub.githubRepoUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-900 hover:underline font-medium">
                          View Repository
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          sub.status === 'Auto-Verified' ? 'bg-green-100 text-green-800' : 
                          sub.status === 'Failed-Verification' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;