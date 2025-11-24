import type School from "../types/School.tsx";

type Props = {
    school: School;
};

function schoolContainer({ school }: Props) {
    return (
        <>
            <div className="h-32 w-60 bg-background1 p-4 flex flex-col relative rounded-xl shadow-xl">
                <div className="flex flex-col gap-4 text-start">
                    <school.icon />
                    <span className="font-poppins font-medium">
                        {school.name}
                    </span>
                </div>
                <p className="font-poppins font-medium text-5xl opacity-15 absolute bottom-0.5 right-4">
                    {school.acronym}
                </p>
            </div>
        </>
    );
}

export default schoolContainer;
