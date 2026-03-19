'use client'

import { useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import MainContent from '@/components/MainContent'
import StackedSections from '@/components/StackedSections'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export default function TeamPage() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <SmoothScrollProvider>
      <main>
        <HeroSection />
        <MainContent />
        <StackedSections />
      </main>
    </SmoothScrollProvider>
  )
}
