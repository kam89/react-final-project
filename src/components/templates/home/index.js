import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Player } from "@lottiefiles/react-lottie-player";
import { useDispatch, useSelector } from 'react-redux';
import { getCoinsWithGlobalAveragePrice } from 'redux/coins/thunk';
import { getCoins } from 'redux/coins/selector';

import { coins, currencies, lottieRanks, ranks, ranksColor } from './data';
import { ItemCard } from 'components/organisms/ItemCard';
import { formatAmount } from 'function';
import { Twitter } from '@mui/icons-material';
import { PriceCard } from 'components/organisms/PriceCard';

export const Home = () => {
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isColumn = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies.EUR);
  const [selectedCoin, setSelectedCoin] = useState();

  useEffect(() => {
    // to call api for first time
  }, [selectedCurrency, selectedCoin]);

  const handleSelectCoin = (coin) => {
    if (selectedCoin?.id === coin.id) return;
    setSelectedCoin(coin);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), [1000]);
  };

  const handleSelectCurrency = (value) => {
    if (selectedCurrency === value) return;
    setSelectedCurrency(value);
  };

  const handleOpenWebsite = (url) => {
    console.log(url);
  };

  const renderRank = (value) => {
    return ranks[value];
  };

  const displayExchangeName = (value) => {
    const domain = new URL(value);
    return domain.hostname;
  };

  return (
    <Container sx={{ marginTop: 1 }}>
      <Typography variant='h4'>Top 5 Coins</Typography>
      <Stack alignItems={'flex-end'}>
        <Stack
          direction='row'
          spacing={1}
        >
          {Object.values(currencies).map((currency, index) =>
            <Chip
              variant='filled'
              color={currency === selectedCurrency ? 'primary' : 'secondary'}
              key={index}
              label={currency}
              onClick={() => { handleSelectCurrency(currencies[currency]); }} />
          )}
        </Stack>
      </Stack>
      <Stack
        direction='row'
        spacing={2}
        marginTop={5}
        marginBottom={2}
        maxWidth={bigScreen ? 'xl' : 'md'}
        overflow={'auto'}
        padding={2}
      >
        {coins.map((item, index) => {
          return (
            <Card sx={{ minWidth: 240 }} key={index}>
              <CardActionArea onClick={() => handleSelectCoin(item)}>
                <CardMedia component='picture'>
                  <Player
                    autoplay
                    loop
                    src={lottieRanks[item.rank]}
                    style={{ height: 'auto', width: 250 }}
                  />
                </CardMedia>
                <Box sx={{ width: 'auto', alignItems: 'center', justifyContent: 'center', display: 'flex', top: -15, position: 'relative' }}>
                  <Badge
                    badgeContent={item.rank}
                    color='primary'
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}>
                    <CardMedia
                      component='img'
                      src={item.icon}
                      height='auto'
                      sx={{ width: 40 }}
                    />
                  </Badge>
                </Box>

                <CardContent>
                  <Box sx={{ flexDirection: 'row', display: 'inline-flex', alignItems: 'center' }}>
                    <Typography variant='h5' component='div'>{item.name}</Typography>
                    <Typography variant='body1' color='text.secondary' sx={{ marginLeft: 1 }}>({item.symbol})</Typography>
                  </Box>
                  <Box sx={{ flexDirection: 'column' }}>
                    <Typography variant='caption'>Market Cap.</Typography>
                    <Typography variant='body2' color='text.secondary'>{formatAmount(selectedCurrency, item.marketCap)}</Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Stack>
      {selectedCoin &&
        <Box>
          <Paper sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <Box
                component='img'
                src={selectedCoin.icon}
                sx={{ width: 80, height: 80 }}
              />
              <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', marginLeft: 1 }}>
                <Typography variant='h6'>{selectedCoin.name}</Typography>
                <Typography variant='body2' color='text.secondary'>{selectedCoin.symbol}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: 1, alignItems: 'center' }}>
                <Typography variant='body1'>{formatAmount(selectedCurrency, selectedCoin.price)}</Typography>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <PriceCard value={selectedCoin.priceChange1h} type="1h" />
                  <PriceCard value={selectedCoin.priceChange1d} type="1d" />
                  <PriceCard value={selectedCoin.priceChange1w} type="1w" />
                </Stack>
              </Box>
              <Avatar sx={{ backgroundColor: ranksColor[selectedCoin.rank], alignSelf: 'flex-start' }}>{renderRank(selectedCoin.rank)}</Avatar>
            </Box>
            <Divider variant='middle' />

            <Box sx={{ flexGrow: 1, marginTop: 1, marginBottom: 2 }}>
              <Grid container columns={{ xs: 1, sm: 2, md: 3, lg: 5 }} rowSpacing={1} columnSpacing={1} direction={isColumn ? 'column' : 'row'}>
                <ItemCard title="Volume" value={selectedCoin.volume} />
                <ItemCard title="Market Capitalization" value={formatAmount(selectedCurrency, selectedCoin.marketCap)} />
                <ItemCard title="Available Supply" value={selectedCoin.availableSupply} />
                <ItemCard title="Total Supply" value={selectedCoin.totalSupply} />
              </Grid>
            </Box>
            <Divider variant='middle' />

            <Stack direction='row' justifyContent="flex-start" alignItems="center" spacing={1} sx={{ marginTop: 1, flexWrap: 'wrap' }}>
              <Chip color='info' variant='filled' label={'Website'} onClick={() => handleOpenWebsite(selectedCoin.websiteUrl)} />
              <Chip color='info' variant='filled' label={'Twitter'} icon={<Twitter />} onClick={() => handleOpenWebsite(selectedCoin.twitterUrl)} />
              {selectedCoin.exp.map((exp, index) => <Chip color='info' variant='filled' label={displayExchangeName(exp)} onClick={() => handleOpenWebsite(exp)} key={index} />)}
            </Stack>
          </Paper>
        </Box >
      }

    </Container >
  );
};