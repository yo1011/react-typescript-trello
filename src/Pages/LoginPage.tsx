import Login from "../Components/Login"

export const LoginPage = () => {
    return (
        <div className="h-screen flex justify-center items-center p-10">
            <Login />
            <div className="h-full w-full bg-gradient-to-r from-myBlue to-myPink absolute opacity-70 top-0 -z-10" />
            <div className="h-full w-full absolute top-0 bg-pattern -z-20" />
        </div>
    )
}
