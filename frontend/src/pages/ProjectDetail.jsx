import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import Toast, { useToast } from '../components/Toast';
import EmptyState from '../components/EmptyState';

export default function ProjectDetail({ user }) {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toasts, showToast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await api(`/api/projects/${id}`);
        setProject(data);
      } catch (err) {
        showToast(err.message, 'error');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <div className="p-8 text-[#E6EDF3]">Loading...</div>;

  if (!project) {
    return <EmptyState icon="📁" title="No project found" subtitle="That project does not exist or you do not have access." />;
  }

  return (
    <div className="max-w-[1400px] mx-auto animate-fadeIn pb-10">
      <Toast toasts={toasts} />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-[#F0F6FC] tracking-tight mb-2 truncate">{project.name}</h1>
          <p className="text-[#8B949E]">by {project.lead || 'unknown'} • {(project.members || []).length} members</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="col-span-1 bg-[#161B22] border border-[#30363D] rounded-2xl p-6">
          <h3 className="text-sm text-[#8B949E] uppercase font-black tracking-widest mb-2">Platform</h3>
          <p className="text-[#F0F6FC] font-bold">{project.platform}</p>
        </div>
        <div className="col-span-1 bg-[#161B22] border border-[#30363D] rounded-2xl p-6">
          <h3 className="text-sm text-[#8B949E] uppercase font-black tracking-widest mb-2">Type</h3>
          <p className="text-[#F0F6FC] font-bold">{project.type}</p>
        </div>
        <div className="col-span-1 bg-[#161B22] border border-[#30363D] rounded-2xl p-6">
          <h3 className="text-sm text-[#8B949E] uppercase font-black tracking-widest mb-2">Progress</h3>
          <p className="text-[#00C896] font-bold">{project.progressStatus || 'pending'}</p>
        </div>
        <div className="col-span-1 bg-[#161B22] border border-[#30363D] rounded-2xl p-6">
          <h3 className="text-sm text-[#8B949E] uppercase font-black tracking-widest mb-2">Created</h3>
          <p className="text-[#F0F6FC] font-bold">{new Date(project.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6">
        <h3 className="text-sm text-[#8B949E] uppercase font-black tracking-widest mb-3">Description</h3>
        <p className="text-[#F0F6FC]">{project.description || 'No description yet.'}</p>
      </div>
    </div>
  );
}
