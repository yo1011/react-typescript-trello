import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'

type Props = {}

function Layout({ }: Props) {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <div className="bg-pattern flex-1 overflow-y-scroll">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout