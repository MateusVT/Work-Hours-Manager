import React, { useState } from 'react';
import InternalPageHeader from '../shared/InternalPageHeader';
import { User } from '../types/Types';

export type PropsMain = {
    logout: () => void
};

function Main(props: PropsMain) {

    return (
        <div style={{ width: "100%", height: "100%", overflowY: "hidden" }}>
            <InternalPageHeader logout={() => { props.logout() }} />
            <div style={{ width: "100%", height: "90%" }}>
                <div className={"page-wrapper"}>
                    <div className="page-content">



                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Main);
