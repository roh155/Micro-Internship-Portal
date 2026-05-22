import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setTasks(response.data);
        if (response.data.length > 0) {
          setSelectedTaskId(response.data[0]._id);
        }
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };
    fetchTasks();
  }, [user.token]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage({ text: 'Verifying repository with GitHub API...', type: 'info' });

    try {
      const response = await axios.post(
        '/api/submissions/submit',
        { studentId: user._id, taskId: selectedTaskId, githubRepoUrl: githubUrl },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMessage({ text: `✅ ${response.data.status}: ${response.data.feedback}`, type: 'success' });
      setGithubUrl(''); 
    } catch (error) {
      setMessage({ text: `❌ Error: ${error.response?.data?.message || 'Verification failed'}`, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}!</h2>
            <p className="text-sm text-gray-500">Student Workspace</p>
          </div>
          <button 
            onClick={logout} 
            className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 rounded-lg transition-colors border border-red-200"
          >
            Logout
          </button>
        </div>
        
        {/* Submission Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Submit Your Task</h3>
          
          {tasks.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">No tasks available right now. Check back later!</p>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Assigned Task</label>
                <select 
                  value={selectedTaskId} 
                  onChange={(e) => setSelectedTaskId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all shadow-sm"
                  required
                >
                  {tasks.map((task) => (
                    <option key={task._id} value={task._id}>
                      {task.title} ({task.difficulty}) - Due: {new Date(task.deadline).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Repository URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/repo-name"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md"
              >
                Submit & Auto-Verify
              </button>
            </form>
          )}

          {message && (
            <div className={`mt-6 p-4 rounded-lg border-l-4 ${
              message.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' : 
              message.type === 'error' ? 'bg-red-50 border-red-500 text-red-700' : 
              'bg-blue-50 border-blue-500 text-blue-700'
            }`}>
              <strong>System Response:</strong> {message.text}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;