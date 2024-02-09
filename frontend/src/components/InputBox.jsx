export function InputBox({ Label, placeholder }) {
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {Label}
        </div>
        <input placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200"></input>
    </div>
}