import React from "react";

import styles from "./NotFoundBlock.module.scss";



const NotFoundBlocks: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>
                hahaha
                <br/>
                NOT FOUND :(
            </h1>
            <p className={styles.description}>шо ти лисий плакі плакі</p>
        </div>
    );
};
export default NotFoundBlocks;
