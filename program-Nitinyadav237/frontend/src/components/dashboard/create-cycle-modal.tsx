"use client"

import { AlertCircle, X } from "lucide-react"
import { useState } from "react"
import CreateCycleForm from "@/components/dashboard/create-cycle-form"

interface CreateCycleModalProps {
  isOpen: boolean
  onClose: () => void
  walletAddress?: string
}

export default function CreateCycleModal({
  isOpen,
  onClose,
  walletAddress = "HCjaklnPek7JA18cVtDpu7bPgoydxq54nsX5hpcVBktcM",
}: CreateCycleModalProps) {
  const [showForm, setShowForm] = useState(false)

  // Reset to welcome screen whenever modal is opened
  const handleClose = () => {
    setShowForm(false)
      isOpen=true
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div 
        className="relative w-full max-w-sm sm:max-w-md md:max-w-lg bg-card text-card-foreground p-4 sm:p-6 md:p-8"
        style={{ 
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-2xl)',
          fontFamily: 'var(--font-sans)'
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 p-1.5 text-muted-foreground hover:bg-muted/20 hover:text-foreground transition-all duration-200"
          style={{ 
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Conditional render */}
        {showForm ? (
          <CreateCycleForm   />
        ) : (
          <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
            {/* Icon */}
            <div 
              className="bg-accent/20 p-3 sm:p-4"
              style={{ 
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h2 
                className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Welcome to FundCycle
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed px-2">
                You can either create a new savings cycle as an admin, or wait to be added
                to an existing cycle as a beneficiary.
              </p>
            </div>

            {/* Create button */}
            <button
              className="w-full py-2.5 sm:py-3 text-sm sm:text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)'
              }}
              onClick={() => setShowForm(true)}
            >
              Create New Cycle
            </button>

            {/* OR divider */}
            <div className="flex items-center w-full gap-3">
              <div className="flex-grow border-t border-border" />
              <span 
                className="text-xs font-semibold text-muted-foreground bg-card px-2 py-1"
                style={{ borderRadius: 'var(--radius)' }}
              >
                OR
              </span>
              <div className="flex-grow border-t border-border" />
            </div>

            {/* Info */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Ask an admin to add you as a beneficiary to their cycle
            </p>

            {/* Wallet */}
            <div className="w-full space-y-2">
              <label className="block text-xs font-semibold text-foreground">Your Wallet:</label>
              <div 
                className="w-full border border-border bg-muted/20 p-3 text-muted-foreground break-all"
                style={{ 
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem'
                }}
              >
                {walletAddress}
              </div>
            </div>

            {/* Check PDA button */}
            <button
              className="w-full py-2 sm:py-2.5 text-sm font-semibold border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              style={{ 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              Check PDA Status
            </button>
          </div>
        )}
      </div>
    </div>
  )
}