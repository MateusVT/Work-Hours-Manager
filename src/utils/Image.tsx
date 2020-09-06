
import * as React from "react"

export type ImageProps = React.HTMLAttributes<HTMLElement> & {
    width: string
    height: string
    src: string
}

function Image(props: ImageProps) {
    const actualProps: JSX.IntrinsicElements["img"] = {
        ...props,
        src: props.src,
        style: {
            ...props.style,
            width: props.width,
            height: props.height,
        }
    }

    return <img {...actualProps} />
}

export default React.memo(Image)