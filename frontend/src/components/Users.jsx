import { useState } from "react";
import { Button } from "./Button";


export const Users = () => {
    [users, setUsers] = useState({
        firstName: "Shivansh",
        lastName: "Gupta",
        _id: 1
    })

    return <div>
        <div className="text-sm text-left py-2 font-bold mx-3 text-xl">
            Users
        </div>
        <input placeholder={"Search users..."} className="w-full h-10 px-2 py-1 border rounded border-slate-200 mx-3"></input>
        <div>
            {users.map(user => { <User user={user} /> })}
        </div>
    </div>
}

function User({ user }) {
    return <div className="flex justify-between p-3">
        <div className="flex items-center">
            <div className="rounded-full bg-slate-300 w-12 h-12 flex items-center justify-center text-xl font-bold">
                {user.firstName[0]}
            </div>
            <div className="font-semibold text-xl ml-3">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div className="mt-4">
            <Button Label={"Send Money"} />
        </div>

    </div>

}

