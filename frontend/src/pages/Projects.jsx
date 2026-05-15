import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, getUsers, api, updateProjectReport, deleteProject } from '../api';
import Toast, { useToast } from '../components/Toast';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';

export default function Projects({ user }) {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [reportProject, setReportProject] = useState(null);
  const [reportForm, setReportForm] = useState({ progressStatus: 'in_progress', report: '' });
  const { toasts, showToast } = useToast();
  
  const [newProject, setNewProject] = useState({
    name: '',
    type: 'internal',
    platform: 'Web',
    description: '',
    assignedMemberIds: [],
  });

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.filter((item) => item.role === 'member'));
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  useEffect(() => {
    fetchProjects();
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, []);

  const navigate = useNavigate();

  const handleEditProject = (project) => {
    setIsEditing(true);
    setNewProject({
      name: project.name || '',
      type: project.type || 'internal',
      platform: project.platform || 'Web',
      description: project.description || '',
      assignedMemberIds: (project.members || []).filter(m => m.role === 'member').map(m => m.userId?._id || m.userId) || [],
      _id: project._id,
    });
    showToast(`Opening project: ${project.name}`, 'info');
    setShowModal(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && newProject._id) {
        await api(`/api/projects/${newProject._id}`, {
          method: 'PATCH',
          body: JSON.stringify(newProject),
        });
      } else {
        await api('/api/projects', {
          method: 'POST',
          body: JSON.stringify(newProject),
        });
      }
      showToast('Project created successfully');
      setShowModal(false);
      setIsEditing(false);
      setNewProject({ name: '', type: 'internal', platform: 'Web', description: '', assignedMemberIds: [] });
      fetchProjects();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleProjectReport = async (e) => {
    e.preventDefault();
    try {
      await updateProjectReport(reportProject._id, reportForm.progressStatus, reportForm.report);
      showToast('Project report updated successfully');
      setReportProject(null);
      setReportForm({ progressStatus: 'in_progress', report: '' });
      fetchProjects();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDeleteProject = async (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.name}"? This action cannot be undone.`)) {
      try {
        await deleteProject(project._id);
        showToast('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        showToast(error.message, 'error');
      }
    }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="max-w-[1400px] mx-auto animate-fadeIn pb-10">
      <Toast toasts={toasts} />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#F0F6FC] tracking-tight mb-2 uppercase">Projects</h1>
          <p className="text-[#8B949E] font-medium">Create projects, assign members, and track progress.</p>
        </div>
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-3.5 bg-[#00C896] text-[#0D1117] rounded-xl font-black hover:bg-[#00A878] transition-all duration-200 shadow-[0_0_20px_rgba(0,200,150,0.2)] flex items-center space-x-2"
          >
            <span className="text-xl">+</span>
            <span>ADD PROJECT</span>
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon="📁"
          title="No projects"
          subtitle="Initialize your first project to begin tracking progress."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/projects/${project._id}`)}
              role="button"
              tabIndex={0}
              className="cursor-pointer bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden hover:border-[#484F58] transition-all duration-300 flex flex-col group shadow-sm"
            >
              <div className="p-6 border-b border-[#30363D] bg-[#1C2128]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#30363D] flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform text-[#00C896]">
                    📂
                  </div>
                  <Badge status={project.status || 'live'} />
                </div>
                <h3 className="text-xl font-black text-[#F0F6FC] mb-2 truncate group-hover:text-[#00C896] transition-colors">
                  {project.name}
                </h3>
                <p className="text-[#8B949E] text-sm line-clamp-3 leading-relaxed font-medium min-h-[60px]">
                  {project.description || 'No description yet.'}
                </p>
              </div>

              <div className="p-6 grid grid-cols-2 gap-4 bg-[#0D1117]/50 mt-auto">
                <div>
                  <span className="block text-[10px] font-black text-[#484F58] uppercase tracking-widest mb-1">Stack</span>
                  <p className="text-[#F0F6FC] text-xs font-bold uppercase tracking-tight truncate">{project.platform}</p>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-black text-[#484F58] uppercase tracking-widest mb-1">Type</span>
                  <p className="text-[#F0F6FC] text-xs font-bold uppercase tracking-tight">{project.type}</p>
                </div>
                <div>
                  <span className="block text-[10px] font-black text-[#484F58] uppercase tracking-widest mb-1">Progress</span>
                  <p className="text-[#00C896] text-xs font-bold uppercase tracking-tight">{project.progressStatus || 'pending'}</p>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-black text-[#484F58] uppercase tracking-widest mb-1">Report</span>
                  <p className="text-[#F0F6FC] text-xs font-medium truncate">{project.report || 'No report yet'}</p>
                </div>
                <div className="col-span-2">
                  <span className="block text-[10px] font-black text-[#484F58] uppercase tracking-widest mb-1">Assigned Members</span>
                  <p className="text-[#F0F6FC] text-xs font-medium truncate">
                    {(project.members || [])
                      .filter((member) => member.role === 'member')
                      .map((member) => member.userId?.name)
                      .filter(Boolean)
                      .join(', ') || 'No member assigned'}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-[#30363D] flex items-center justify-between text-xs font-bold bg-[#161B22]">
                <div className="flex -space-x-2">
                     <div className="w-8 h-8 rounded-full bg-[#30363D] border-2 border-[#161B22] flex items-center justify-center text-[10px] text-[#8B949E]">
                      {project.lead?.slice(0,2) || 'LE'}
                     </div>
                     <button
                       type="button"
                       onClick={(e) => {
                         e.stopPropagation();
                         handleEditProject(project);
                       }}
                       title="Assign members"
                       className="w-8 h-8 rounded-full bg-[#00C896]/20 border-2 border-[#161B22] flex items-center justify-center text-[10px] text-[#00C896] hover:bg-[#00C896]/30 transition-colors"
                     >
                      +
                     </button>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setReportProject(project);
                      setReportForm({
                        progressStatus: project.progressStatus || 'in_progress',
                        report: project.report || '',
                      });
                    }}
                    className="text-[#58A6FF] font-black uppercase tracking-widest text-[10px] hover:underline"
                  >
                    Update Report
                  </button>
                  {user?.role === 'admin' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project);
                      }}
                      className="text-[#F85149] font-black uppercase tracking-widest text-[10px] hover:underline"
                    >
                      Delete
                    </button>
                  )}
                  <span className="text-[#8B949E] font-mono text-[11px]">{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title={isEditing ? 'Edit Project' : 'Create Project'} onClose={() => { setShowModal(false); setIsEditing(false); }}>
          <form onSubmit={handleCreate} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-[#8B949E] uppercase tracking-[0.2em] mb-2">Project Name</label>
              <input
                type="text"
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-[#F0F6FC] focus:outline-none focus:border-[#00C896] transition-all font-medium"
                placeholder="e.g. Apollo Mission"
                required
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-[#8B949E] uppercase tracking-[0.2em] mb-2">Description</label>
              <textarea
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-[#F0F6FC] focus:outline-none focus:border-[#00C896] min-h-[100px] transition-all font-medium"
                placeholder="Brief project overview..."
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
            </div>
            {user?.role === 'admin' && (
              <div>
                <label className="block text-[10px] font-black text-[#8B949E] uppercase tracking-[0.2em] mb-2">Assign Members</label>
                <select
                  multiple
                  className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-[#F0F6FC] focus:outline-none focus:border-[#00C896] min-h-[120px] font-medium"
                  value={newProject.assignedMemberIds}
                  onChange={(e) => setNewProject({
                    ...newProject,
                    assignedMemberIds: Array.from(e.target.selectedOptions).map((option) => option.value),
                  })}
                >
                  {users.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name} ({member.email})
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-[#8B949E] uppercase tracking-[0.2em] mb-2">Type</label>
                <select
                  className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-[#F0F6FC] focus:outline-none focus:border-[#00C896] appearance-none font-bold"
                  value={newProject.type}
                  onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                >
                  <option value="internal">Internal</option>
                  <option value="client">Client</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-[#8B949E] uppercase tracking-[0.2em] mb-2">Platform</label>
                <select
                  className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-[#F0F6FC] focus:outline-none focus:border-[#00C896] appearance-none font-bold"
                  value={newProject.platform}
                  onChange={(e) => setNewProject({ ...newProject, platform: e.target.value })}
                >
                  <option>Web</option>
                  <option>Mobile</option>
                  <option>Desktop</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#00C896] text-[#0D1117] font-black py-4 rounded-xl hover:bg-[#00A878] transition-all duration-200 mt-4 shadow-lg active:scale-95"
            >
              SAVE PROJECT
            </button>
          </form>
        </Modal>
      )}

      {reportProject && (
        <Modal title={`Report: ${reportProject.name}`} onClose={() => setReportProject(null)}>
          <form onSubmit={handleProjectReport} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-[#8B949E] uppercase tracking-[0.2em] mb-2">Progress Status</label>
              <select
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-[#F0F6FC] focus:outline-none focus:border-[#00C896] font-bold"
                value={reportForm.progressStatus}
                onChange={(e) => setReportForm({ ...reportForm, progressStatus: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-[#8B949E] uppercase tracking-[0.2em] mb-2">Report</label>
              <textarea
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-[#F0F6FC] focus:outline-none focus:border-[#00C896] min-h-[120px] transition-all font-medium"
                value={reportForm.report}
                onChange={(e) => setReportForm({ ...reportForm, report: e.target.value })}
                placeholder="Write progress notes for the project..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#00C896] text-[#0D1117] font-black py-4 rounded-xl hover:bg-[#00A878] transition-all duration-200 shadow-lg active:scale-95"
            >
              SAVE REPORT
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
