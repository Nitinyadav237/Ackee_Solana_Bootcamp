"use client"
import React, { useState } from 'react';
import { Users, Vault, Settings, CheckCircle, RefreshCw, X,  Plus, } from 'lucide-react';

// Central theme
const theme = {
  container: "min-h-screen relative overflow-hidden",
  containerInner: "container mx-auto p-6 max-w-6xl relative z-10",
  grid: {
    default: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
    accountDetails: "grid grid-cols-1 md:grid-cols-2 gap-8",
    actions: "grid grid-cols-1 sm:grid-cols-2 gap-4",
    cycleInfo: "grid grid-cols-2 lg:grid-cols-4 gap-6",
  },
  card: {
    base: "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg rounded-xl p-6",
    hover: "hover:shadow-xl hover:scale-105 transition-all duration-300",
  },
  button: {
    base: "bg-white dark:bg-gray-800 cursor-pointer text-gray-900 dark:text-gray-100 px-6 py-3 rounded-xl font-semibold border border-gray-200 dark:border-gray-600",
    hover: "hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm",
  },
  typography: {
    heading1: "text-4xl font-bold text-gray-900 dark:text-white",
    heading2: "text-xl font-semibold text-gray-900 dark:text-white",
    heading3: "text-lg font-semibold text-gray-900 dark:text-white",
    subtext: "text-gray-600 dark:text-gray-300 text-sm",
    label: "text-gray-600 dark:text-gray-400 text-sm",
    value: "text-lg font-semibold text-gray-900 dark:text-white",
    mono: "text-lg font-mono text-gray-900 dark:text-white",
    monoSmall: "text-sm font-mono text-gray-800 dark:text-gray-200",
    status: "bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-3 py-1 rounded-full font-medium",
  },
  iconContainer: {
    base: "w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 border border-gray-200/30",
    hover: "group-hover:scale-110 transition-transform duration-300",
  },
  statusColors: {
    paid: "text-green-500",
    position: "text-blue-500",
    default: "text-purple-500",
  },
  background: {
    glow: "absolute inset-0 overflow-hidden",
    glowBlue: "rounded-full blur-3xl animate-pulse absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10",
    glowPurple: "rounded-full blur-3xl animate-pulse absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 delay-1000",
  },
  progressBar: {
    container: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3",
    bar: "bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full",
  },
  cycleCard: {
    base: "text-center p-4 bg-gray-300 dark:bg-gray-900/50 rounded-lg",
  },
};

const AdminDashboard = () => {
  const [beneficiaryAddress, setBeneficiaryAddress] = useState('');
  const [beneficiaries, setBeneficiaries] = useState([
    {
      id: 1,
      wallet: 'HCjaMPe...pcVBktcM',
      isAdmin: true,
      status: 'Active',
      collateral: false,
      monthlyPayment: false
    }
  ]);

  const handleAddBeneficiary = () => {
    if (beneficiaryAddress.trim()) {
      const newBeneficiary = {
        id: beneficiaries.length + 1,
        wallet: beneficiaryAddress,
        isAdmin: false,
        status: 'Empty',
        collateral: false,
        monthlyPayment: false
      };
      setBeneficiaries([...beneficiaries, newBeneficiary]);
      setBeneficiaryAddress('');
    }
  };

  type StatCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string | number;
  className?: string;
};
const StatCard = ({ icon: Icon, title, value, className = "" }: StatCardProps) => (
  <div className={`group ${theme.card.base} ${theme.card.hover} ${className}`}>
    <div className={`${theme.iconContainer.base} mb-4 ${theme.iconContainer.hover}`}>
      <Icon className={`w-6 h-6 ${theme.statusColors.position}`} />
    </div>
    <div className="min-w-0 flex-1">
      <p className={`${theme.typography.subtext} font-medium mb-2`}>{title}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  </div>
);

  const emptySlots = Array.from({ length: Math.max(0, 10 - beneficiaries.length) }, (_, i) => ({
    id: beneficiaries.length + i + 1,
    wallet: '(empty slot)',
    isAdmin: false,
    status: 'Empty',
    collateral: false,
    monthlyPayment: false
  }));

  const allSlots = [...beneficiaries, ...emptySlots];

  return (
    <div className={theme.container}>
      <div className={theme.background.glow}>
        <div className={theme.background.glowBlue} />
        <div className={theme.background.glowPurple} />
      </div>

      <div className={`${theme.containerInner} max-w-7xl p-4 sm:p-6`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="min-w-0 flex-1">
            <h1 className={`${theme.typography.heading1} mb-2`}>Admin Dashboard</h1>
            <p className={`${theme.typography.subtext} font-semibold`}>
              Config: HCjqWnPe...pcVBktcM | Max: 10 | Current: {beneficiaries.length}
            </p>
          </div>
          <button className={`${theme.button.base} ${theme.button.hover} flex items-center gap-2 px-4 py-2`}>
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Vault Account */}
        <div className={`group ${theme.card.base} ${theme.card.hover} mb-8`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`${theme.iconContainer.base} ${theme.iconContainer.hover}`}>
              <Vault className={`w-6 h-6 ${theme.statusColors.position}`} />
            </div>
            <h2 className={`${theme.typography.heading2} group-hover:text-blue-600 transition-colors`}>Vault Account</h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="min-w-0 flex-1">
              <p className={`${theme.typography.label} mb-1`}>Vault Address</p>
              <p className={`${theme.typography.mono} break-all`}>9xyZ...pcVBktcM</p>
            </div>
            <div className="text-left sm:text-right flex-shrink-0">
              <p className={`${theme.typography.label} mb-1`}>Balance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">50 SOL</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={`${theme.grid.cycleInfo} mb-6 sm:mb-8`}>
          <StatCard icon={Users} title="Participants" value={`${beneficiaries.length}/10`} />
          <StatCard icon={Vault} title="Total Vault" value="50 SOL" />
          <StatCard icon={Settings} title="Current Index" value="0" />
          <StatCard icon={CheckCircle} title="Claims Done" value="0/10" />
        </div>

        <div className={`${theme.grid.default} lg:grid-cols-3 gap-6 sm:gap-8`}>
          {/* Cycle Configuration */}
          <div className="lg:col-span-2">
            <div className={`group ${theme.card.base} ${theme.card.hover}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`${theme.iconContainer.base} ${theme.iconContainer.hover}`}>
                  <Settings className={`w-6 h-6 ${theme.statusColors.position}`} />
                </div>
                <h2 className={`${theme.typography.heading2} group-hover:text-blue-600 transition-colors`}>Cycle Configuration</h2>
              </div>
              <div className={theme.grid.accountDetails}>
                <div className="min-w-0">
                  <p className={`${theme.typography.label} mb-2`}>Collateral Required</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">2 SOL</p>
                </div>
                <div className="min-w-0">
                  <p className={`${theme.typography.label} mb-2`}>Monthly Contribution</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1 SOL</p>
                </div>
                <div className="min-w-0">
                  <p className={`${theme.typography.label} mb-2`}>Payment Interval</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">30 days</p>
                </div>
                <div className="min-w-0">
                  <p className={`${theme.typography.label} mb-2`}>Withdraw %</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">85%</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className={theme.typography.label}>Progress</span>
                  <span className={theme.typography.label}>0%</span>
                </div>
                <div className={theme.progressBar.container}>
                  <div className={theme.progressBar.bar} style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Beneficiary */}
          <div>
            <div className={`group ${theme.card.base} ${theme.card.hover}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`${theme.iconContainer.base} ${theme.iconContainer.hover}`}>
                  <Plus className={`w-6 h-6 ${theme.statusColors.position}`} />
                </div>
                <h2 className={`${theme.typography.heading2} group-hover:text-blue-600 transition-colors`}>Add Beneficiary</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`${theme.typography.label} block font-medium mb-2`}>
                    Wallet Address
                  </label>
                  <input
                    type="text"
                    value={beneficiaryAddress}
                    onChange={(e) => setBeneficiaryAddress(e.target.value)}
                    placeholder="Enter wallet address..."
                    className={`${theme.button.base} w-full px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                  />
                </div>
                <button
                  onClick={handleAddBeneficiary}
                  disabled={!beneficiaryAddress.trim()}
                  className={`${theme.button.base} ${theme.button.hover} w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 text-white py-3 px-4`}
                >
                  Add Beneficiary
                </button>
                <p className={`${theme.typography.subtext} text-center`}>
                  Available slots: {10 - beneficiaries.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Actions */}
        <div className={`group ${theme.card.base} ${theme.card.hover} mt-10`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`${theme.iconContainer.base} ${theme.iconContainer.hover}`}>
              <CheckCircle className={`w-6 h-6 ${theme.statusColors.position}`} />
            </div>
            <h2 className={`${theme.typography.heading2} group-hover:text-blue-600 transition-colors`}>Available Actions</h2>
          </div>
          <div className={theme.grid.actions}>
            <button
              disabled
              className={`${theme.button.base} ${theme.button.hover} flex items-center justify-center gap-3 p-4 bg-gray-100/80`}
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Collateral Deposited</span>
            </button>
            <button
              disabled
              className={`${theme.button.base} ${theme.button.hover} flex items-center justify-center gap-3 p-4 bg-gray-100/80`}
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Monthly Payment Done</span>
            </button>
            <button
              disabled
              className={`${theme.button.base} ${theme.button.hover} flex items-center justify-center gap-3 p-4 bg-gray-100/80`}
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Collateral Withdraw</span>
            </button>
            <button
              disabled
              className={`${theme.button.base} ${theme.button.hover} flex items-center justify-center gap-3 p-4 bg-gray-100/80`}
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Monthly Withdraw Done</span>
            </button>
          </div>
        </div>

        {/* Beneficiaries Table */}
        <div className="mt-8">
          <div className={`group ${theme.card.base} ${theme.card.hover} overflow-hidden`}>
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className={`${theme.iconContainer.base} w-10 h-10 ${theme.iconContainer.hover}`}>
                  <Users className={`w-5 h-5 ${theme.statusColors.position}`} />
                </div>
                <h2 className={`${theme.typography.heading2} group-hover:text-blue-600 transition-colors`}>
                  Beneficiaries ({beneficiaries.length})
                </h2>
              </div>
            </div>

            {/* Mobile View */}
            <div className="block sm:hidden">
              {allSlots.map((beneficiary, index) => (
                <div key={index} className="border-b border-gray-200/50 dark:border-gray-700/50 p-4 last:border-b-0 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`${theme.typography.value} text-sm`}>#{index + 1}</span>
                    {beneficiary.wallet !== '(empty slot)' && !beneficiary.isAdmin && (
                      <button className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors hover:scale-105">
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className={theme.typography.label}>Wallet: </span>
                      <span className={`${beneficiary.wallet === '(empty slot)' ? 'text-gray-500 italic' : 'text-blue-600 font-mono'}`}>
                        {beneficiary.wallet}
                        {beneficiary.isAdmin && (
                          <span className="ml-2 text-gray-600 dark:text-gray-400">(Admin)</span>
                        )}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span>
                        Status: {beneficiary.status === 'Active' ? (
                          <span className={theme.typography.status}>
                            Active
                          </span>
                        ) : (
                          <span className="text-gray-500">Empty</span>
                        )}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span>Collateral: {beneficiary.collateral ? (
                        <span className={theme.statusColors.paid}>✓</span>
                      ) : (
                        <X className="w-3 h-3 text-red-500 inline" />
                      )}</span>
                      <span>Payment: {beneficiary.monthlyPayment ? (
                        <span className={theme.statusColors.paid}>✓</span>
                      ) : (
                        <X className="w-3 h-3 text-red-500 inline" />
                      )}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100/80 dark:bg-gray-800/80">
                  <tr>
                    <th className={`${theme.typography.label} text-left py-3 px-6 font-medium`}>Index</th>
                    <th className={`${theme.typography.label} text-left py-3 px-6 font-medium`}>Wallet</th>
                    <th className={`${theme.typography.label} text-left py-3 px-6 font-medium`}>Status</th>
                    <th className={`${theme.typography.label} text-left py-3 px-6 font-medium`}>Collateral</th>
                    <th className={`${theme.typography.label} text-left py-3 px-6 font-medium`}>Monthly Payment</th>
                    <th className={`${theme.typography.label} text-left py-3 px-6 font-medium`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allSlots.map((beneficiary, index) => (
                    <tr key={index} className="border-b border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-200">
                      <td className={`${theme.typography.value} py-4 px-6`}>{index + 1}</td>
                      <td className="py-4 px-6">
                        <span className={`${beneficiary.wallet === '(empty slot)' ? 'text-gray-500 italic' : 'text-blue-600 font-mono'}`}>
                          {beneficiary.wallet}
                          {beneficiary.isAdmin && (
                            <span className="ml-2 text-gray-600 dark:text-gray-400">(Admin)</span>
                          )}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {beneficiary.status === 'Active' ? (
                          <span className={theme.typography.status}>
                            Active
                          </span>
                        ) : (
                          <span className="text-gray-500">Empty</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {beneficiary.collateral ? (
                          <span className={theme.statusColors.paid}>✓</span>
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {beneficiary.monthlyPayment ? (
                          <span className={theme.statusColors.paid}>✓</span>
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {beneficiary.wallet !== '(empty slot)' && !beneficiary.isAdmin && (
                          <button className="text-red-500 hover:text-red-700 text-sm font-medium transition-all duration-200 hover:scale-105">
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;