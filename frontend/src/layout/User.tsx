import Navbar from '@/features/Navbar'
import { Outlet } from 'react-router'

const LayoutForUser = () => {
  return (
    <div className=' min-h-screen '>
      <Navbar/>
      <div className='px-19 py-10 '>
        <Outlet/>
      </div>
    </div>
  )
}

export default LayoutForUser