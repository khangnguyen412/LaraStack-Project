import React from "react";

/**
 * Style
 */
import "@/assets/scss/loading.scss";


export const Loading: React.FC<{ IsLoading: boolean; FlexLoading?: boolean }> = ({ IsLoading, FlexLoading  }) => {
    if (IsLoading) {
        return (
            <React.Fragment>
                {IsLoading && (
                    <div className={FlexLoading ? "flex-loading flex-col flex-col-fixed" : "flex-loading flex-col"}>
                        <div className="wrap-loader--background">
                            <div className="loader">
                                <div className="inner one"></div>
                                <div className="inner two"></div>
                                <div className="inner three"></div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
    return null;
}