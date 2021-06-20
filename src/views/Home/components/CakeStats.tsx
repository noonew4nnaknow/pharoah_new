import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = eggPrice.times(circSupply);
  console.log(eggPrice)

  let eggPerBlock = 0;
  if(farms && farms[0] && farms[0].eggPerBlock){
    eggPerBlock = new BigNumber(farms[0].eggPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="20px" color="#5b9bfb">
          {/* {TranslateString(534, 'Egg Stats')} */}
          GEM Stats
        </Heading>
        <Row>
          <Text fontSize="16px" color="#5b9bfb">{TranslateString(10005, 'Market Cap')}</Text>
           <CardValue fontSize="16px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" /> 
          {/* <CardValue fontSize="16px" value={0.0000} decimals={0} prefix="$" /> */}
        </Row>
        <Row>
          <Text fontSize="16px" color="#5b9bfb">{TranslateString(536, 'Total Minted')}</Text>
           {totalSupply && <CardValue fontSize="16px" value={getBalanceNumber(totalSupply)} decimals={0} />} 
          {/* {totalSupply && <CardValue fontSize="16px" value={0.0000} decimals={0} />} */}
        </Row>
        <Row>
          <Text fontSize="16px" color="#5b9bfb">{TranslateString(538, 'Total Burned')}</Text>
           <CardValue fontSize="16px" value={getBalanceNumber(burnedBalance)} decimals={0} /> 
          {/* <CardValue fontSize="16px" value={0.00} decimals={0} /> */}
        </Row>
        <Row>
          <Text fontSize="16px" color="#5b9bfb">{TranslateString(10004, 'Circulating Supply')}</Text>
           {cakeSupply && <CardValue fontSize="16px" value={cakeSupply} decimals={0} />} 
          {/* {cakeSupply && <CardValue fontSize="16px" value={0.0000} decimals={0} />} */}
        </Row>
        <Row>
          {/* <Text fontSize="16px">{TranslateString(540, 'New Gems/block')}</Text> */}
          <Text fontSize="16px" color="#5b9bfb">New GEM/block</Text>
           <Text color="#5b9bfb" bold fontSize="16px">{eggPerBlock}</Text> 
          {/* <Text bold fontSize="16px">{0.00000}</Text> */}
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
