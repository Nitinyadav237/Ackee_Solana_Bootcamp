import AdminDashboard from '@/components/dashboard/admin-dashboard'
import BeneficiaryDashboard from '@/components/dashboard/beneficairy-dashboard'

import React from 'react'

const page = () => {
  return (
<>
            ${false} ?  <BeneficiaryDashboard/>:<AdminDashboard/>
            </>
  )
}

export default page