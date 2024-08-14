import { useState, ChangeEvent } from "react"
import Button from "./Button"
import Input from "./Input"

const Login = () => {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = () => {
        const data = { email, password, confirmPassword };
        console.log(data, "handle-sign-up");
    }

    const handleSignin = () => {
        const data = { email, password };
        console.log(data, "handle-sign-in");
    }

    return (
        <div className="w-full md:w-[450px]">
            <h1 className="text-white text-center font-bold text-4xl md:text-6xl mb-10">
                {login ? "Login" : "Register"}
            </h1>
            <div className="flex flex-col gap-3 w-full bg-white p-6 min-h-[150px] rounded-xl  drop-shadow-xl">
                <Input
                    value={email}
                    name="email"
                    type="email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <Input
                    value={password}
                    name="password"
                    type="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                {!login && (
                    <Input
                        value={confirmPassword}
                        name="confirm-password"
                        type="password"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    />
                )}
                {login ? (
                    <>
                        <Button text="Login" onClick={handleSignin} />
                        <Button text="Register" onClick={() => setLogin(false)} secondary />
                    </>
                ) : (
                    <>
                        <Button text="Register" onClick={handleSignup} />
                        <Button text="Login" onClick={() => setLogin(true)} secondary />
                    </>
                )}
            </div>
        </div>
    )
}

export default Login