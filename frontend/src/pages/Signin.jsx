import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";

export const Signin = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading Label={"Sign In"} />
                <SubHeading Label={"Enter your credentials to access your account"} />
                <InputBox Label={"Email"} placeholder={"johndoe@example.com"} />
                <InputBox Label={"Password"} placeholder={""} />
                <div className="pt-4">
                    <Button Label={"Sign In"} />
                </div>
                <BottomWarning Label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
            </div>
        </div>
    </div>
}