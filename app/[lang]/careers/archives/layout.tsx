// app/careers/archives/layout.tsx

import React from 'react'

export function generateMetadata() {
  return {
    title: 'Job archived page',
    description: 'No index page',
    robots: {
      index: false,
      follow: false,
    },
  }
}
const archivesLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

export default archivesLayout
