import React from "react";

export const Error: React.FC<{ Error: string | null }> = ({ Error }) => {
    if (Error) {
        return (
            <React.Fragment>
                {Error && (<span className="text-red-500 text-center mt-4">{Error}</span>)}
            </React.Fragment>
        )
    }
    return null;
}