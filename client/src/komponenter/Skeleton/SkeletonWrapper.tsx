import React, {PropsWithChildren} from "react";

export function SkeltonWrapper({ children }: PropsWithChildren<unknown>) {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                display: 'block',
                lineHeight: 2,
                padding: '1rem',
                marginBottom: '1rem',
                width: '100%'
            }}
        >
            {children}
        </div>
    )
}
