export function Appbar({ user }) {
    return <div className="flex justify-between mt-1 py-1 px-1 shadow-md">
        <div className="text-lg mt-1">
            PayTM App
        </div>
        <div className="flex justify-even items-center">
            <div className="mx-1 text-lg">Hello</div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-300">
                <span className="text-lg">{user.firsName[0]}</span>
            </div>
        </div>
    </div>

}

