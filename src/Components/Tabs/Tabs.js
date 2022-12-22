import React from 'react';
import {useTheme, withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import styles from "./styles";
import clsx from "clsx";
import SwipeableViews from "react-swipeable-views";

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const CustomTabs = React.forwardRef((props, ref) => {
    const {
        classes,
        className,
        children,
        onChange,
        value,
        onChangeIndex
    } = props;

    const theme = useTheme();

    return (
        <Box className={clsx(classes.root, className)}>
            <Toolbar>
                <Tabs
                    className={clsx(classes.fullWidth, className)}
                    value={value}
                    onChange={onChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="TASKS" {...a11yProps(0)} />
                    <Tab label="INFO" {...a11yProps(1)} />
                    <Tab label="STATISTICS" {...a11yProps(2)} />
                </Tabs>
            </Toolbar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={onChangeIndex}
            >
                {children}
            </SwipeableViews>
        </Box>
    );
});

export default withStyles(styles)(CustomTabs);