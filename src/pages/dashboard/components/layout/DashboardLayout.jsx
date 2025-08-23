import DashboardNavbar from '../dashboard-navbar/DashboardNavbar'

const DashboardLayout = ({ children }) => {
    return (
        <div>
            <DashboardNavbar />
            <main>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout