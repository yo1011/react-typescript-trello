import { useState, ChangeEvent } from "react"
import Button from "./Button"
import Input from "./Input"
import { BE_signIn, BE_signUp } from "../Backend/Queries";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { authDataType } from "../Types";

const Login = () => {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [signInLoading, setSignInLoading] = useState(false);
    const goTo = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSignup = () => {
        const data = { email, password, confirmPassword };
        // BE_signUp(data, setSignUpLoading, reset, goTo, dispatch);
        auth(data, BE_signUp, setSignUpLoading)
    }

    const handleSignin = () => {
        const data = { email, password };
        // BE_signIn(data, setSignInLoading, reset, goTo, dispatch);
        auth(data, BE_signIn, setSignInLoading)
    }

    const auth = (
        data: authDataType,
        func: (
            data: authDataType,
            setLoading: React.Dispatch<React.SetStateAction<boolean>>,
            reset: () => void,
            goTo: NavigateFunction,
            dispatch,
        ) => void,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        func(data, setLoading, reset, goTo, dispatch)
    }

    const reset = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
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
                        <Button text="Login" onClick={handleSignin} loading={signInLoading} />
                        <Button text="Register" onClick={() => setLogin(false)} secondary />
                    </>
                ) : (
                    <>
                        <Button text="Register" onClick={handleSignup} loading={signUpLoading} />
                        <Button text="Login" onClick={() => setLogin(true)} secondary />
                    </>
                )}
            </div>
        </div>
    )
}

export default Login