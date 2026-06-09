// app/people-at-karandaaz/layout.tsx

import React, { Suspense } from 'react'

const PeopleAtKarandaazLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Suspense>{children}</Suspense>
    </div>
  )
}

export default PeopleAtKarandaazLayout
