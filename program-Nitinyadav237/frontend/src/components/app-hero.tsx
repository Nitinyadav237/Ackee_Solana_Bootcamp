"use client"

import Image from "next/image"
import clsx from "clsx"
import { useState } from "react"
import CreateCycleModal from "@/components/dashboard/create-cycle-modal"

function StatCard({
  value,
  label,
  gradient,
}: {
  value: string
  label: string
  gradient: string
}) {
  return (
    <div className="text-center">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
                      rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50
                      shadow-lg hover:shadow-xl transition-all duration-300
                      transform hover:scale-105">
        <p
          className={clsx(
            "text-2xl font-bold bg-clip-text text-transparent",
            gradient
          )}
        >
          {value}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
          {label}
        </p>
      </div>
    </div>
  )
}

function GlowCircle({ className }: { className: string }) {
  return (
    <div
      className={clsx(
        "rounded-full blur-3xl animate-pulse absolute",
        className
      )}
    />
  )
}

export default function AppHero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="relative py-20">
      <CreateCycleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <GlowCircle className="top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 dark:bg-blue-500/10" />
        <GlowCircle className="bottom-1/4 right-1/4 w-48 h-48 bg-purple-200/20 dark:bg-purple-500/10 delay-1000" />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 relative z-10">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            FundCycle Protocol
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
           Decentralized group savings on Solana. Join rotating credit associations 
              with smart contract security and community-driven financial growth.
          </p>

          <div className="flex flex-col lg:flex-row gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative overflow-hidden group cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 
                               hover:from-blue-700 hover:to-purple-700 
                               text-white px-8 py-4 rounded-xl font-semibold 
                               shadow-lg hover:shadow-xl transition-all duration-300
                               transform hover:scale-105 "
            >
              Create New Cycle
            </button>
            <button className="bg-white dark:bg-gray-800 cursor-pointer text-gray-900 dark:text-gray-100 
                               px-8 py-4 rounded-xl font-semibold 
                               border border-gray-200 dark:border-gray-600
                               hover:bg-gray-50 dark:hover:bg-gray-700
                               hover:border-gray-300 dark:hover:border-gray-500
                               shadow-md hover:shadow-lg transition-all duration-300
                               backdrop-blur-sm">
              Learn How It Works
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex justify-center md:justify-end">
          <Image
            src="/hero-img.jpg"
            alt="FundCycle Illustration"
            width={500}
            height={400}
            className="rounded-xl shadow-2xl object-cover"
            priority
          />
        </div>
      </div>

      {/* Stats */}
      <div className="md:flex cursor-pointer space-y-5 gap-8 mt-8 px-4">
        <StatCard
          value="1,000+"
          label="Active Members"
          gradient="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
        />
        <StatCard
          value="50k+"
          label="SOL Circulated"
          gradient="bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400"
        />
        <StatCard
          value="100%"
          label="Secure"
          gradient="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400"
        />
      </div>
    </section>
  )
}
