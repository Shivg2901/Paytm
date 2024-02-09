import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signup = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading Label={"Sign Up"} />
                <SubHeading Label={"Enter your information to create an account"} />
                <InputBox Label={"First Name"} placeholder={"John"} />
                <InputBox Label={"Last Name"} placeholder={"Doe"} />
                <InputBox Label={"Email"} placeholder={"johndoe@example.com"} />
                <InputBox Label={"Password"} placeholder={"123456"} />
                <div className="pt-4">
                    <Button Label={"Sign Up"} />
                </div>
                <BottomWarning Label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />
            </div>
        </div>
    </div>
}