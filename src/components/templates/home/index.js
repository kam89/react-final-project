import React, { useEffect, useState } from 'react';
import { Box, Container, SvgIcon, Typography } from '@mui/material';

import { currencies } from './data';
import { CurrenciesChipGroup } from 'components/molecules/CurrenciesChipGroup';
import { ReactComponent as ScopeSvg } from 'assets/scope-bro.svg';
import { CoinDetailCard } from 'components/organisms/CoinDetailCard';
import { CoinCards } from 'components/organisms/CoinCards';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true); //NOTE: change to false for real usage
  const [selectedCurrency, setSelectedCurrency] = useState(currencies.EUR);
  const [selectedCoin, setSelectedCoin] = useState();
  const coins = []; //NOTE: get data from api for real usage

  useEffect(() => {
    //NOTE: to call api for first time
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

  return (
    <Container sx={{ marginTop: 1, marginBottom: 6 }}>
      <Box
        sx={{
          height: 300,
          textAlign: 'center',
          marginBottom: 10,
        }}>
        <Box>
          <SvgIcon
            component={ScopeSvg}
            inheritViewBox
            sx={{ width: 'auto', height: 250 }}
          />
        </Box>
        <Typography variant="h3">Hello Beginner!</Typography>
        <Typography variant="body1">
          Welcome. You can start your journey from here!
        </Typography>
      </Box>

      <Typography variant="h4">Top 5 Coins</Typography>
      <CurrenciesChipGroup
        currency={selectedCurrency}
        onClick={handleSelectCurrency}
      />
      <CoinCards
        data={coins}
        isLoading={isLoading}
        currency={selectedCurrency}
        onClick={handleSelectCoin}
      />
      <CoinDetailCard data={selectedCoin} currency={selectedCurrency} />
    </Container>
  );
};
