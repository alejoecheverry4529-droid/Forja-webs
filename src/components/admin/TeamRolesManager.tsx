import React, { useState } from 'react';
import { 
  Shield, 
  UserCheck, 
  Lock, 
  Key, 
  Plus, 
  Check, 
  X, 
  Settings2,
  Users,
  Eye,
  DollarSign,
  FileSpreadsheet
} from 'lucide-react';
import { TeamMember, UserRole } from '../../types';

interface TeamRolesManagerProps {
  teamMembers: TeamMember[];
  activeMember: TeamMember;
  onUpdateMemberRole: (memberId: string, role: UserRole) => void;
  onTogglePermission: (memberId: string, permissionKey: keyof TeamMember['permissions']) => void;
  onAddTeamMember: (newMember: Omit<TeamMember, 'id'>) => void;
}

export const TeamRolesManager: React.FC<TeamRolesManagerProps> = ({
  teamMembers,
  activeMember,
  onUpdateMemberRole,
  onTogglePermission,
  onAddTeamMember,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('developer');
  const [department, setDepartment] = useState('Desarrollo Web 24H');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onAddTeamMember({
      name,
      email,
      role,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
      department,
      active: true,
      permissions: {
        canManageBookings: role !== 'client',
        canViewFinancials: role === 'super_admin' || role === 'admin',
        canEditClients: role === 'super_admin' || role === 'admin' || role === 'commercial',
        canManageTeam: role === 'super_admin',
        canAccessEncryptionKeys: role === 'super_admin' || role === 'admin',
        canExportReports: role === 'super_admin' || role === 'admin' || role === 'commercial'
      }
    });

    setName('');
    setEmail('');
    setShowAddModal(false);
  };

  const getRoleBadge = (r: UserRole) => {
    switch (r) {
      case 'super_admin':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">SUPER ADMIN</span>;
      case 'admin':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#4BE0E8]/20 text-[#4BE0E8] border border-[#4BE0E8]/40">ADMIN</span>;
      case 'commercial':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">ASESOR COMERCIAL</span>;
      case 'developer':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">DEV 24H</span>;
      case 'client':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-500/20 text-slate-300 border border-slate-500/40">CLIENTE</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Add Member Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#8B7FF5]" />
            <span>Control de Roles & Matriz de Permisos (RBAC)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Define accesos granulares para analíticas, clientes, solicitudes 24h y llaves criptográficas.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold text-[#070814] gradient-forja-btn shadow-[0_0_15px_rgba(75,224,232,0.3)] hover:shadow-[0_0_25px_rgba(75,224,232,0.5)] transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Usuario / Asesor</span>
        </button>
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-[#0b0f24] border border-[#1e2754] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0e142e] border-b border-[#1c2552] text-slate-400 font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Usuario</th>
                <th className="py-3 px-4">Rol Asignado</th>
                <th className="py-3 px-3 text-center">Gestionar Reservas</th>
                <th className="py-3 px-3 text-center">Ver Finanzas</th>
                <th className="py-3 px-3 text-center">Editar Clientes</th>
                <th className="py-3 px-3 text-center">Admin Equipo</th>
                <th className="py-3 px-3 text-center">Llaves Cifrado</th>
                <th className="py-3 px-3 text-center">Exportar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#151c3d] text-slate-200">
              {teamMembers.map(member => (
                <tr key={member.id} className="hover:bg-[#101533] transition-colors">
                  {/* User info */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-[#27356e]" />
                      <div>
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <span>{member.name}</span>
                          {member.id === activeMember.id && (
                            <span className="text-[10px] text-[#4BE0E8] font-mono">(Tú)</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">{member.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role dropdown */}
                  <td className="py-3.5 px-4">
                    <select
                      value={member.role}
                      onChange={e => onUpdateMemberRole(member.id, e.target.value as UserRole)}
                      className="bg-[#0e142e] border border-[#222c5e] text-slate-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#4BE0E8]"
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="admin">Administrador</option>
                      <option value="commercial">Asesor Comercial</option>
                      <option value="developer">Desarrollador 24H</option>
                      <option value="client">Cliente</option>
                    </select>
                  </td>

                  {/* Permission Toggle: canManageBookings */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => onTogglePermission(member.id, 'canManageBookings')}
                      className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer ${
                        member.permissions.canManageBookings
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-[#121838] text-slate-600 border border-[#1e2752]'
                      }`}
                    >
                      {member.permissions.canManageBookings ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    </button>
                  </td>

                  {/* Permission Toggle: canViewFinancials */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => onTogglePermission(member.id, 'canViewFinancials')}
                      className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer ${
                        member.permissions.canViewFinancials
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-[#121838] text-slate-600 border border-[#1e2752]'
                      }`}
                    >
                      {member.permissions.canViewFinancials ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    </button>
                  </td>

                  {/* Permission Toggle: canEditClients */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => onTogglePermission(member.id, 'canEditClients')}
                      className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer ${
                        member.permissions.canEditClients
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-[#121838] text-slate-600 border border-[#1e2752]'
                      }`}
                    >
                      {member.permissions.canEditClients ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    </button>
                  </td>

                  {/* Permission Toggle: canManageTeam */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => onTogglePermission(member.id, 'canManageTeam')}
                      className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer ${
                        member.permissions.canManageTeam
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-[#121838] text-slate-600 border border-[#1e2752]'
                      }`}
                    >
                      {member.permissions.canManageTeam ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    </button>
                  </td>

                  {/* Permission Toggle: canAccessEncryptionKeys */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => onTogglePermission(member.id, 'canAccessEncryptionKeys')}
                      className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer ${
                        member.permissions.canAccessEncryptionKeys
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-[#121838] text-slate-600 border border-[#1e2752]'
                      }`}
                    >
                      {member.permissions.canAccessEncryptionKeys ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    </button>
                  </td>

                  {/* Permission Toggle: canExportReports */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => onTogglePermission(member.id, 'canExportReports')}
                      className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer ${
                        member.permissions.canExportReports
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-[#121838] text-slate-600 border border-[#1e2752]'
                      }`}
                    >
                      {member.permissions.canExportReports ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b0e24] border border-[#232d64] rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-4">Agregar Nuevo Integrante al Equipo</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sofia Vergara"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#0d1127] border border-[#1e2752] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#4BE0E8]"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Correo Corporativo</label>
                <input
                  type="email"
                  required
                  placeholder="sofia@forjawebs.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#0d1127] border border-[#1e2752] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#4BE0E8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Rol</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as UserRole)}
                    className="w-full bg-[#0d1127] border border-[#1e2752] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#4BE0E8]"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Administrador</option>
                    <option value="commercial">Asesor Comercial</option>
                    <option value="developer">Desarrollador 24H</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Departamento</label>
                  <input
                    type="text"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full bg-[#0d1127] border border-[#1e2752] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#4BE0E8]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#141b3b] text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-[#070814] gradient-forja-btn font-bold cursor-pointer"
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
