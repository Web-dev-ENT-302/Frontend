import MainNavbar from "./main-navbar/MainNavbar"


const MainLayout = ({ children }) => {
    return (
        <div>
            <MainNavbar />
            <main>
                {children}
            </main>
        </div>
    )
}

export default MainLayout