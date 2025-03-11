function ReportCard( {
    title,
    description,
    value,
    isAmountProperty,}: {
    title: string,
    description: string,
    value: string,
    isAmountProperty: boolean,

}){
    return (
        <div className="bg-gray-100 p-5 border border-gray-200 flex flex-col gap-3">
            <h1 className="text-sm font-bold">
                {title}
            </h1>
            <p className="text-sm text-gray-500">
                {description}
            </p>
            <h1 className="text-4xl font-bold">
                {isAmountProperty ? `₹${value}` : value}
            </h1>
            
        </div>
    )
}

export default ReportCard;