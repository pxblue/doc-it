import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Grid,
    Theme,
    useTheme,
    createStyles,
    makeStyles,
} from '@material-ui/core';
import {
    InfoCard,
    Section as LandingSection,
    CardCarousel,
    CarouselCard,
    FooterLinks,
    SharedToolbar,
    ContributorsList,
} from '../components';
import { LatestReleases } from '../../docs';
import * as Colors from '@pxblue/colors';
import circles from '../assets/circles.svg';
import { useHistory } from 'react-router-dom';

import { cardData } from '../../__configuration__/landingPage/cardData';
import { Spacer } from '@pxblue/react-components';
import { ReleaseInfo } from '../../docs/release-notes';
import { currentMaintainers, contributors } from '../../__configuration__/contributors';

import developImage from '../assets/home/develop.jpg';
import designImage from '../assets/home/design.jpg';
import { Design as DesignIcon } from '../assets/icons';
import { usePageTitle } from '../hooks/usePageTitle';
import { useGoogleAnalyticsPageView } from '../hooks/useGoogleAnalyticsPageView';

import { PXBLogo } from '../assets/icons/PXBLogo';
import { Menu, DeveloperMode } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        banner: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${theme.spacing(8)}px ${theme.spacing(4)}px`,
            width: '100%',
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            backgroundImage: `url(${circles})`,
            backgroundSize: 1200,
            backgroundPosition: '-240px center',
        },
        footer: {
            zIndex: 0,
            backgroundColor: Colors.darkBlack[100],
            color: Colors.white[50],
            textAlign: 'center',
        },
    })
);

export const LandingPage: React.FC = (): JSX.Element => {
    const history = useHistory();
    const theme = useTheme();
    const classes = useStyles();
    usePageTitle('');
    useGoogleAnalyticsPageView();

    return (
        <>
            <SharedToolbar navigationIcon={<Menu />} />
            <div className={classes.banner}>
                <PXBLogo />
                <Button
                    variant={'outlined'}
                    color={'inherit'}
                    style={{ minWidth: 150, fontWeight: 600, margin: `${theme.spacing(2)}px 0 0` }}
                    onClick={(): void => {
                        history.push('overview');
                    }}
                >
                    GET STARTED
                </Button>
            </div>
            <LandingSection title={'Design and Development'} align={'left'} background={'light'}>
                <Grid container spacing={6} style={{ marginTop: theme.spacing(2) }}>
                    {cardData.map((item, ind) => (
                        <Grid key={`grid${ind}`} item xs={12} sm={6} md={4}>
                            <InfoCard
                                spacing={6}
                                source={item.image}
                                title={item.title}
                                aspectRatio={'3x2'}
                                description={item.description}
                                onClick={(): void => {
                                    if (item.path.startsWith('/')) history.push(item.path);
                                    else window.open(item.path, '_blank');
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </LandingSection>
            <LandingSection title={'Latest Updates'} align={'center'} maxWidth={750} background={'dark'}>
                <Typography style={{ marginTop: theme.spacing(2), color: Colors.gray[500] }}>
                    Get the latest updates on guidelines, components, and documentation across platforms.
                </Typography>
                {LatestReleases.slice(0, 2).map((item: ReleaseInfo) => (
                    <div key={item.title} style={{ color: Colors.gray[500], textAlign: 'left' }}>
                        <div style={{ marginTop: theme.spacing(2), display: 'flex' }}>
                            <Typography variant={'h6'} color={'primary'}>
                                {item.title}
                            </Typography>
                            <Spacer />
                            <Typography color={'inherit'}>{item.date}</Typography>
                        </div>
                        <Typography variant={'subtitle2'}>{`v${item.version}`}</Typography>
                        {item.summary}
                    </div>
                ))}
                <Button
                    variant={'outlined'}
                    color={'primary'}
                    style={{ marginTop: theme.spacing(1) }}
                    onClick={(): void => history.push('/release-notes')}
                >
                    VIEW ALL
                </Button>
            </LandingSection>

            {/* Carousel Section */}
            <CardCarousel>
                <CarouselCard
                    backgroundImage={designImage}
                    title={'Getting started as a designer'}
                    description={'We offer many resources and assets for designers getting acquainted with PX Blue.'}
                    icon={<DesignIcon fontSize={'large'} />}
                    onClick={(): void => history.push('/design/intro')}
                />
                <CarouselCard
                    backgroundImage={developImage}
                    title={'Getting started as a developer'}
                    description={'We have numerous guides and resources to prepare you for working with PX Blue.'}
                    icon={<DeveloperMode fontSize={'large'} />}
                    onClick={(): void => history.push('/development/environment')}
                />
            </CardCarousel>

            <LandingSection title={'Contributors'} background={'light'}>
                <ContributorsList
                    contributors={currentMaintainers}
                    title={'Current Maintainers'}
                    style={{ margin: `${theme.spacing(4)}px 0` }}
                />
                <ContributorsList
                    contributors={contributors}
                    title={'Other Contributors'}
                    style={{ margin: `${theme.spacing(4)}px 0` }}
                />
                <div style={{ textAlign: 'center' }}>
                    <Button
                        variant={'outlined'}
                        color={'primary'}
                        style={{ marginTop: theme.spacing(1) }}
                        onClick={(): void => history.push('/community/innersourcing')}
                    >
                        Become a Contributor!
                    </Button>
                </div>
            </LandingSection>

            {/* Footer Section */}
            <FooterLinks />
            <AppBar position={'static'} className={classes.footer} elevation={0}>
                <Toolbar variant={'dense'}>
                    <Typography variant={'caption'} align={'center'} style={{ flex: '1 1 0px' }}>
                        Copyright {new Date().getFullYear()} Eaton. Licensed under BSD-3-Clause.
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};
