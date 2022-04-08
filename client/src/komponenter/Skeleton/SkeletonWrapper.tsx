import React, {PropsWithChildren} from "react";

export function SkeltonWrapper({ children }: PropsWithChildren<unknown>) {
    return (
        <div
            style={{
                display: 'block',
                lineHeight: 1.2,
                padding: '0.5rem',
                width: '100%'
            }}
        >
            {children}
        </div>
    )
}
