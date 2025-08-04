import DashboardNavbar from './dashboard-navbar/DashboardNavbar'

const DashboardLayout = ({ children }) => {
    return (
        <div>
            <DashboardNavbar />
            <main className='container lg:px-[1.5rem]'>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout