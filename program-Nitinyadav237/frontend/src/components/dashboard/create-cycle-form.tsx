"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface CreateCycleFormProps {
  onClose: () => void
}

export default function CreateCycleForm({ onClose }: CreateCycleFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    collateral_amount: "",
    monthly_payout: "",
    payment_interval_days: "30",
    withdraw_percent: "85",
    max_beneficiaries: "10",
  })

    const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      console.log("Creating cycle with data:", formData)
      await new Promise((r) => setTimeout(r, 1500)) // fake delay
      
      // After successful creation, redirect to dashboard
      // In a real app, you would use Next.js router here
      console.log("Redirecting to dashboard...")
      
    // redirect to /[account]/dashboard
    router.push(`/adsdasdasdasdascsc/dashboard`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 
          className="text-xl sm:text-2xl font-bold text-foreground"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Create New Cycle
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Configure your savings cycle parameters
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Collateral */}
          <div className="space-y-2">
            <label htmlFor="collateral" className="block text-sm font-semibold text-foreground">
              Collateral Amount (SOL)
            </label>
            <input
              id="collateral"
              type="number"
              step="0.1"
              min="0.1"
              value={formData.collateral_amount}
              onChange={(e) => handleInputChange("collateral_amount", e.target.value)}
              placeholder="e.g., 2.0"
              required
              className="w-full px-3 py-2 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              style={{ 
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-xs)'
              }}
            />
            <p className="text-xs text-muted-foreground">
              Amount each beneficiary must deposit as collateral
            </p>
          </div>

          {/* Monthly payout */}
          <div className="space-y-2">
            <label htmlFor="monthly" className="block text-sm font-semibold text-foreground">
              Monthly Payout (SOL)
            </label>
            <input
              id="monthly"
              type="number"
              step="0.1"
              min="0.1"
              value={formData.monthly_payout}
              onChange={(e) => handleInputChange("monthly_payout", e.target.value)}
              placeholder="e.g., 1.0"
              required
              className="w-full px-3 py-2 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              style={{ 
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-xs)'
              }}
            />
            <p className="text-xs text-muted-foreground">
              Amount each member contributes monthly
            </p>
          </div>

          {/* Interval */}
          <div className="space-y-2">
            <label htmlFor="interval" className="block text-sm font-semibold text-foreground">
              Payment Interval (Days)
            </label>
            <input
              id="interval"
              type="number"
              min="1"
              max="365"
              value={formData.payment_interval_days}
              onChange={(e) => handleInputChange("payment_interval_days", e.target.value)}
              required
              className="w-full px-3 py-2 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              style={{ 
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-xs)'
              }}
            />
            <p className="text-xs text-muted-foreground">
              How often payments are due (typically 30 days)
            </p>
          </div>

          {/* Withdraw % */}
          <div className="space-y-2">
            <label htmlFor="withdraw" className="block text-sm font-semibold text-foreground">
              Withdraw Percentage (%)
            </label>
            <input
              id="withdraw"
              type="number"
              min="50"
              max="100"
              value={formData.withdraw_percent}
              onChange={(e) => handleInputChange("withdraw_percent", e.target.value)}
              required
              className="w-full px-3 py-2 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              style={{ 
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-xs)'
              }}
            />
            <p className="text-xs text-muted-foreground">
              Percentage of vault available for withdrawal (rest stays as reserve)
            </p>
          </div>
        </div>

        {/* Maximum Beneficiaries - Full width */}
        <div className="space-y-2">
          <label htmlFor="max_beneficiaries" className="block text-sm font-semibold text-foreground">
            Maximum Beneficiaries
          </label>
          <input
            id="max_beneficiaries"
            type="number"
            min="2"
            max="50"
            value={formData.max_beneficiaries}
            onChange={(e) => handleInputChange("max_beneficiaries", e.target.value)}
            required
            className="w-full px-3 py-2 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            style={{ 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-xs)'
            }}
          />
          <p className="text-xs text-muted-foreground">
            Maximum number of participants in this cycle
          </p>
        </div>

        {/* Summary */}
        <div 
          className="border border-accent/30 bg-accent/10 p-4"
          style={{ 
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h4 className="font-bold text-muted-foreground mb-3">Cycle Summary</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Collateral Required:</span>
              <p className="font-semibold text-foreground">
                {formData.collateral_amount && formData.max_beneficiaries
                  ? (parseFloat(formData.collateral_amount) * parseInt(formData.max_beneficiaries)).toFixed(2)
                  : "0"}{" "}
                SOL
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Monthly Circulation:</span>
              <p className="font-semibold text-foreground">
                {formData.monthly_payout && formData.max_beneficiaries
                  ? (parseFloat(formData.monthly_payout) * parseInt(formData.max_beneficiaries)).toFixed(2)
                  : "0"}{" "}
                SOL
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 px-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          style={{ 
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
              <span>Creating Cycle...</span>
            </>
          ) : (
            <span>Initialize Cycle</span>
          )}
        </button>
      </div>
    </div>
  )
}