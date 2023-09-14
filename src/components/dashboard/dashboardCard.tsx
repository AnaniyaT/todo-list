
interface DashboardCardProps {
    title: string;
    value: number | string;
    color?: "green" | "blue" | "purple";
    backgroundColor?: "green" | "blue" | "purple";
}

function DashboardCard( props: DashboardCardProps ) {
    const textColors : Record<string, string> = { 
        "blue" : "text-blue-400 ", 
        "green" : "text-green-400 ", 
        "purple" : "text-purple-400 ", 
        "default" : "text-gray-400 " 
    };

    const backgroundColors : Record<string, string> = {
        "blue" : "bg-blue-100 ",
        "green" : "bg-green-200 ",
        "purple" : "bg-purple-200 ",
        "default" : "bg-gray-100 "
    };
    return (
        <div 
            className={backgroundColors[props.color ?? "default"] + `rounded-lg shadow-md flex flex-col justify-center 
            items-center sm:px-10 px-4 py-10 relative hover:scale-105 transition-all`}
        >
            <h1 className={textColors[props.color ?? "default "] + " text-5xl font-semibold z-10"}>{props.value}</h1>
            <h2 className="text-base pt-2 text-gray-500 whitespace-nowrap font-semibold z-10">{props.title}</h2>
        </div>
    );
}

export default DashboardCard;