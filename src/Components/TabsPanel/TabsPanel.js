import React, {Ref} from "react";
import {Box,} from "@material-ui/core"
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles";

const TabsPanel = React.forwardRef((props, ref) => {
    const {
        classes,
        className,
        children,
        value,
        index,
        ...other
    } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </Box>
    );
});

export default withStyles(styles)(TabsPanel)