import { Link } from "react-router-dom";

export function BottomWarning({ Label, buttonText, to }) {
    return <div className="py-2 text-sm flex justify center">
        <div>
            {Label}
        </div>
        <Link to={to} className="cursor-pointer pl-1 pointer underline">
            {buttonText}
        </Link>
    </div>
}