import React from 'react';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import color from 'color';
import { IconType } from '../../../__types__';
import { unCamelCase } from '../../shared';
import { useSelectedIcon } from '../../contexts/selectedIconContextProvider';

type IconGridProps = {
    icons: IconType[];
    onIconSelected: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
const useIconGridStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.primary,
        minHeight: 137,
        maxWidth: 137,
        margin: 'auto',
    },
    selected: {
        background: color(theme.palette.primary.main)
            .fade(0.9)
            .string(),
        color: theme.palette.primary.main,
    },
    label: {
        width: '100%',
        textAlign: 'center',
        wordBreak: 'break-word',
        marginTop: theme.spacing(1),
    },
}));
const Icons: React.FC<IconGridProps> = (props) => {
    const { icons, onIconSelected } = props;
    const { selectedIcon: selected } = useSelectedIcon();
    const classes = useIconGridStyles();

    return (
        <Grid container spacing={2}>
            {icons.map((icon) => {
                const isSelected = selected && selected.name === icon.name && selected.isMaterial === icon.isMaterial;
                return (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        lg={2}
                        xl={1}
                        key={`${icon.name}_${icon.isMaterial ? 'material' : 'pxblue'}`}
                        onClick={onIconSelected}
                        title={icon.name}
                    >
                        <div className={clsx(classes.wrapper, { [classes.selected]: isSelected })}>
                            <icon.Icon style={{ fontSize: 36 }} />
                            <Typography
                                variant="subtitle2"
                                className={classes.label}
                                color={isSelected ? 'primary' : 'textPrimary'}
                            >
                                {unCamelCase(icon.name)}
                            </Typography>
                        </div>
                    </Grid>
                );
            })}
        </Grid>
    );
};
export const IconGrid = React.memo(Icons);