import {createStyles, Theme} from "@material-ui/core";

const styles = (theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    fullWidth: {
        width: "100%",
    }
});

export default styles;