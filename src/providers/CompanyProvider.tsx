'use client'

import { CompanyInfo } from '@/payload-types'
import { createContext, useContext } from 'react'

// Define a default/empty state to prevent crashes
const defaultCompanyInfo = {} as CompanyInfo

const CompanyContext = createContext<CompanyInfo>(defaultCompanyInfo)

export const CompanyProvider: React.FC<{
  companyInfo: CompanyInfo | null
  children: React.ReactNode
}> = ({ companyInfo, children }) => {
  return (
    <CompanyContext.Provider value={companyInfo || defaultCompanyInfo}>
      {children}
    </CompanyContext.Provider>
  )
}

export const useCompanyInfo = () => {
  return useContext(CompanyContext)
}
