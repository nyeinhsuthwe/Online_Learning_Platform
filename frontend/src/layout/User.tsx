import Navbar from '@/features/Navbar'
import { Outlet } from 'react-router'

const LayoutForUser = () => {
  return (
    <div className=' min-h-screen '>
      <Navbar/>
      <div className='px-19 py-10 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12'>
        <Outlet/>
      </div>
    </div>
  )
}

export default LayoutForUser