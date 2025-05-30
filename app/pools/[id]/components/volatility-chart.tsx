import { BinLiquidity } from '@meteora-ag/dlmm';
import { JupApiToken } from '@/features/tokens/useTokens';
import { Bar, BarChart, XAxis, Tooltip } from 'recharts';
import { ResponsiveContainer } from 'recharts';
import Slider from 'rc-slider';
import { useEffect, useState } from 'react';
import { TokenAmount } from '@/shared/utils/tokenAmount';
import { VolatilityStrategy } from './price-range-selector';
interface VolatilityChartProps {
  bins: BinLiquidity[];
  tokenX: JupApiToken;
  tokenY: JupApiToken;
  activeBin: number;
  tokenXAmount: string;
  tokenYAmount: string;
  onSelectedBinsChange: (bins: BinLiquidity[], selected: number) => void;
  selectedStrategy: VolatilityStrategy;
}

// ts-ignore
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1B23] p-3 min-w-[250px] rounded-md border border-[#2C2D3C] shadow-lg">
        <span className="flex justify-between">
          <span className="text-[#A1A1AA] text-[11px] font-bold">Price</span> <span className="text-[#FFFFFF] text-[12px] font-bold">{label}</span>
        </span>

        <span className="flex justify-between">
          <span className="text-[#A1A1AA] text-[11px] font-bold">{payload[0].payload.token.symbol}</span>{' '}
          <span className="text-[#FFFFFF] text-[12px] font-bold">{payload[0].payload.amount}</span>
        </span>
      </div>
    );
  }
  return null;
};

function linearDecreasingDistribution(bins: number): number[] {
  const weights: number[] = [];
  
  for (let i = 0; i < bins; i++) {
    // Линейное уменьшение от начала к концу
    const weight = 1 - (i / (bins));
    weights.push(weight);
  }
  
  // Нормализация весов, чтобы сумма была равна 1
  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map(w => w / sum);
}

function getAmount(type: VolatilityStrategy, bins: BinLiquidity[], selected: number, bin: BinLiquidity, index: number, tokenX: JupApiToken, tokenY: JupApiToken, tokenXAmount: string, tokenYAmount: string): TokenAmount {
  const isTokenX = selected <= index;
  const total = bins.reduce((acc, bin, index) => {
    if (index < selected) {
      return acc;
    }
    return acc + (1 / +bin.pricePerToken);
  }, 0);

  if (type === 'spot') {
    const pvFactor = TokenAmount.fromHumanAmount(tokenX.token, ((1 / +bin.pricePerToken) / total).toString() as `${number}`);

    const tokenYFactor = TokenAmount.fromHumanAmount(tokenY.token, selected.toString() as `${number}`);
    const amount = isTokenX
      ? TokenAmount.fromHumanAmount(tokenX.token, tokenXAmount as `${number}`).mulDownFixed(pvFactor.scale18)
      : TokenAmount.fromHumanAmount(tokenY.token, tokenYAmount as `${number}`).divDownFixed(tokenYFactor.scale18);

    return amount;
  }

  if (type === 'curve') {
    const weights = linearDecreasingDistribution(isTokenX ? bins.length - selected : selected);

    if (!isTokenX) {
      weights.reverse();
    }
    
    // Получаем вес для текущего бина
    const binPosition = isTokenX ? index - selected : index;
    console.log(binPosition, weights, tokenX);
    const weight = binPosition >= 0 ? weights[binPosition] : 0;
    
    // Создаем фактор на основе веса
    const pvFactor = TokenAmount.fromHumanAmount(tokenX.token, weight.toString() as `${number}`);

    const amount = isTokenX
      ? TokenAmount.fromHumanAmount(tokenX.token, tokenXAmount as `${number}`).mulDownFixed(pvFactor.scale18)
      : TokenAmount.fromHumanAmount(tokenY.token, tokenYAmount as `${number}`).mulDownFixed(pvFactor.scale18);
      
    return amount;
  }

  if (type === 'bidask') {
    const weights = linearDecreasingDistribution(isTokenX ? bins.length - selected : selected).reverse();

    if (!isTokenX) {
      weights.reverse();
    }
    
    // Получаем вес для текущего бина
    const binPosition = isTokenX ? index - selected : index;
    console.log(binPosition, weights, tokenX);
    const weight = binPosition >= 0 ? weights[binPosition] : 0;
    
    // Создаем фактор на основе веса
    const pvFactor = TokenAmount.fromHumanAmount(tokenX.token, weight.toString() as `${number}`);

    const amount = isTokenX
      ? TokenAmount.fromHumanAmount(tokenX.token, tokenXAmount as `${number}`).mulDownFixed(pvFactor.scale18)
      : TokenAmount.fromHumanAmount(tokenY.token, tokenYAmount as `${number}`).mulDownFixed(pvFactor.scale18);
      
    return amount;
  }

  return TokenAmount.fromHumanAmount(tokenX.token, '0');
}

export const VolatilityChart = ({ bins, tokenX, tokenY, activeBin, tokenXAmount, tokenYAmount, onSelectedBinsChange, selectedStrategy }: VolatilityChartProps) => {
  const [selected, setSelected] = useState(Math.floor(bins.length / 2));

  useEffect(() => {
    setSelected(bins.findIndex(bin => bin.binId === activeBin));
  }, [bins.length, activeBin]);

  const chartData = bins.map((bin, index) => {
    const isTokenX = selected <= index;
    const amount = getAmount(selectedStrategy, bins, selected, bin, index, tokenX, tokenY, tokenXAmount, tokenYAmount);

    const price = TokenAmount.fromHumanAmount(tokenX.token, bin.pricePerToken.toString() as `${number}`);

    return {
      name: (+bin.pricePerToken).toFixed(3),
      price: bin.pricePerToken,
      token: isTokenX ? tokenX : tokenY,
      amount: amount.toSignificant(),
      value: isTokenX ? +amount.mulDownFixed(price.scale18).toSignificant() : +amount.toSignificant(),
      index,
    };
  });

  const handleSelectedBinsChange = (selected: number) => {
    onSelectedBinsChange(bins.slice(selected, bins.length), selected);
    setSelected(selected);
  };

  return (
    <div>
      <div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              left: 16,
              right: 16,
              bottom: 10,
            }}
          >
            <XAxis 
              dataKey="name" 
              tickLine={false}
              interval='preserveEnd'
              className="text-[11px]" 
              tickMargin={0} 
              tick={(props) => {
                const { x, y, payload } = props;
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text 
                      x={0} 
                      y={0} 
                      dy={12} 
                      textAnchor="end" 
                      fill="#A1A1AA" 
                      fontSize={11}
                      transform="rotate(-30)"
                    >
                      {payload.value}
                    </text>
                  </g>
                );
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(61, 64, 98, 0.2)' }} />
            <Bar
              dataKey="value"
              fill="#3D4062"
              shape={(props: any) => {
                const { x, y, width, height, payload } = props;

                const isTokenX = selected <= payload.index;

                const fill = isTokenX ? '#6F61C0' : '#22D3EE';

                return <rect x={x} y={y} rx={4} width={width} height={height} fill={fill} className='hover:opacity-80 transition-all duration-100' />;
              }}
            />
          </BarChart>
        </ResponsiveContainer>

        {chartData && chartData.length > 0 && (
          <div className="px-4 py-2 relative bottom-[54px]">
            <Slider
              min={0}
              value={selected}
              onChange={(value) => handleSelectedBinsChange(value as number)}
              max={bins.length - 1}
              styles={{
                handle: {
                  backgroundColor: '#8884d8',
                  borderColor: '#8884d8',
                  height: 14,
                  width: 14,
                  marginLeft: 0,
                  marginTop: -5,
                },
                track: {
                  backgroundColor: '#8884d8',
                  height: 4,
                },
                rail: {
                  backgroundColor: '#3D4062',
                  height: 4,
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
