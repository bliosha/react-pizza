import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={464}
        viewBox="0 0 280 464"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="140" cy="140" r="130"/>
        <rect x="0" y="287" rx="10" ry="10" width="280" height="22"/>
        <rect x="0" y="406" rx="10" ry="10" width="95" height="30"/>
        <rect x="0" y="322" rx="10" ry="10" width="280" height="73"/>
        <rect x="99" y="400" rx="23" ry="23" width="163" height="41"/>
        <rect x="223" y="431" rx="0" ry="0" width="0" height="2"/>
    </ContentLoader>
)

export default Skeleton