"use client"
import React from "react"
import { User, CheckCircle, DollarSign, RefreshCw } from "lucide-react"

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
    heading1: "text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2",
    heading2: "text-xl font-semibold text-gray-900 dark:text-white",
    heading3: "text-lg font-semibold text-gray-900 dark:text-white",
    subtext: "text-gray-800 dark:text-gray-300 text-sm",
    label: "text-gray-800 dark:text-gray-400 text-sm",
    value: "text-lg font-semibold text-gray-900 dark:text-white",
    mono: "text-sm font-mono text-gray-900 dark:text-white",
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
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (

  <button
    {...props}
    className={`${theme.button.base} ${theme.button.hover}`}
  >
    {children}
  </button>
)
type StatCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string | number;
  status?: keyof typeof theme.statusColors; // 👈 added status prop, optional
};

// ✅ Status Card
const StatusCard = ({ icon: Icon, title, value, status }: StatCardProps) => (
  <div className={`group ${theme.card.base} ${theme.card.hover}`}>
    <div
      className={`${theme.iconContainer.base} mb-4 ${theme.iconContainer.hover}`}
    >
      <Icon
        className={`w-6 h-6 ${
          status ? theme.statusColors[status] : theme.statusColors.default
        }`}
      />
    </div>
    <p className={`${theme.typography.subtext} font-medium mb-2`}>{title}</p>
    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      {value}
    </p>
  </div>
);


export default function BeneficiaryDashboard() {
  return (
    <div className={theme.container}>
      {/* Glow Backgrounds */}
      <div className={theme.background.glow}>
        <div className={theme.background.glowBlue} />
        <div className={theme.background.glowPurple} />
      </div>

      <div className={theme.containerInner}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className={`${theme.typography.heading1} mb-2`}>
              Beneficiary Dashboard
            </h1>
            <p className={theme.typography.subtext}>
              Your position in the savings cycle
            </p>
          </div>
          <Button>
            <RefreshCw className="w-4 h-4 inline-block mr-2" />
            Refresh Status
          </Button>
        </div>

        {/* Status Cards */}
        <div className={`${theme.grid.default} mb-10 cursor-pointer`}>
          <StatusCard icon={User} title="Your Position" value="#0" status="position" />
          <StatusCard icon={CheckCircle} title="Collateral" value="Paid" status="paid" />
          <StatusCard icon={DollarSign} title="Monthly Payment" value="Paid" status="paid" />
        </div>

        {/* Account Details */}
        <div className={`${theme.card.base} mb-10`}>
          <h2 className={`${theme.typography.heading2} mb-6`}>
            Account Details
          </h2>
          <div className={theme.grid.accountDetails}>
            <div>
              <p className={`${theme.typography.label} mb-2`}>Cycle Config</p>
              <p className={theme.typography.value}>CONFIG123...xyz</p>
            </div>
            <div>
              <p className={`${theme.typography.label} mb-2`}>Wallet Address</p>
              <p className={`${theme.typography.value} break-all`}>
                HCjaNnPek7JA18cVtDpu7bPgoydxq54nsX5hpcVBktcM
              </p>
            </div>
            <div>
              <p className={`${theme.typography.label} mb-2`}>Status</p>
              <span className={theme.typography.status}>
                Active
              </span>
            </div>
            <div>
              <p className={`${theme.typography.label} mb-2`}>Last Payment</p>
              <p className={theme.typography.value}>7/28/2025</p>
            </div>
          </div>
        </div>

        {/* Available Actions */}
        <div className={`${theme.card.base} mb-10`}>
          <h2 className={`${theme.typography.heading2} mb-6`}>
            Available Actions
          </h2>
          <div className={theme.grid.actions}>
            <Button disabled>Collateral Deposited</Button>
            <Button disabled>Monthly Payment Done</Button>
            <Button disabled>Collateral Withdraw</Button>
            <Button disabled>Monthly Withdraw Done</Button>
          </div>
        </div>

        {/* Cycle Information */}
        <div className={theme.card.base}>
          <h2 className={`${theme.typography.heading2} mb-6`}>
            Cycle Information
          </h2>
          <div className={`${theme.grid.cycleInfo} mb-6`}>
            <div className={theme.cycleCard.base}>
              <p className={`${theme.typography.label} mb-1`}>Total Participants</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">10</p>
            </div>
            <div className={theme.cycleCard.base}>
              <p className={`${theme.typography.label} mb-1`}>Current Round</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
            </div>
            <div className={theme.cycleCard.base}>
              <p className={`${theme.typography.label} mb-1`}>Monthly Amount</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1 SOL</p>
            </div>
            <div className={theme.cycleCard.base}>
              <p className={`${theme.typography.label} mb-1`}>Collateral</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2 SOL</p>
            </div>
          </div>

          {/* Progress Timeline */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className={theme.typography.heading3}>
                Cycle Progress
              </h3>
              <span className={theme.typography.label}>Round 1 of 10</span>
            </div>
            <div className={theme.progressBar.container}>
              <div
                className={theme.progressBar.bar}
                style={{ width: "10%" }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-800 dark:text-gray-400 mt-2">
              <span>Started</span>
              <span>10% Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}