export function Balance({ balance }) {
    return <div className="flex">
        <div className="flex font-bold justify-evenly p-5">
            <div className="mx-3 text-lg">
                Your Balance
            </div>

            <div className="mx-3 text-lg">
                Rs {balance}
            </div>
        </div>
    </div>
}