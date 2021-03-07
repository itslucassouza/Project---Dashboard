import React, { useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import WalletBox from '../../components/WalletBox';
import MensageBox from '../../components/MensageBox';
import PieChartBox from '../../components/PieChartBox';

import SelectInput from '../../components/SelectInput';
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMounths from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';


import { Container, Content, } from './styles';

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

     const years = useMemo(() => {
         let uniqueYears: number[] = [];

         [...expenses, ...gains].forEach(item => {
             const date = new Date(item.date);
             const year = date.getFullYear();

             if(!uniqueYears.includes(year)){
                 uniqueYears.push(year)
             }
         });

         return uniqueYears.map(year => {
             return{
                 value: year,
                 label: year,
             }
            });
        }, []);

    const months = useMemo(() => {
        return listOfMounths.map((month, index) => {
            return{
                value: index + 1,
                label: month
            }
        });
    },[])

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try{
                    total += Number(item.amount )
                }catch {
                    throw new Error ('Invalid amount! Amount MUST BE NUMBER.')
                }
            }  
        });

        return total;
    }, [monthSelected, yearSelected])


    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try{
                    total += Number(item.amount )
                }catch {
                    throw new Error ('Invalid amount! Amount MUST BE NUMBER.')
                }
            }  
        });

        return total;
    }, [monthSelected, yearSelected])

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    }, [totalGains, totalExpenses])

    const mensage = useMemo(() => {
        if(totalBalance < 0){
            return{
                title: "Que triste",
                description: "Neste mes, você gastou mais do que deveria",
                footerText: "verifique seus gastos e tente melhorar",
                icon: sadImg,
            }
        }else if(totalBalance === 0){
            return {
                title: "Uffa",
                description: "Neste mes, você gastou exatamente o que ganhou",
                footerText: "tenha cuidado no proximo mês",
                icon: happyImg,
            }
        }else {
            return{
                title: "Muito bem",
                description: "Sua carteria está positiva",
                footerText: "continue assim, considere investir o seu saldo",
                icon: happyImg,
            }
        }
    }, [totalBalance])

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = (totalGains / total) * 100;
        const percentExpenses = (totalExpenses / total) * 100;

        const data = [
            {
                name: "Entradas",
                value: totalExpenses,
                percent: Number(percentGains.toFixed(1)),
                color: '#E44c4E',
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: Number(percentExpenses.toFixed(1)),
                color: '#F79931B',
            }
        ];

        return data;
    }, [totalGains, totalExpenses])


     const handleMonthSelected = (month: String) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth)
        }catch(error) {
            throw new Error('invalid month value. Is accept  0 -24')
        }
     }

     const handleYearSelecteed = (year: string) => {
        try{
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }
        catch(error) {
            throw new Error('invalid year value. is accept integer numbers ')
        }
     }


    return(
        <Container>
            <ContentHeader title="Dashboard" lineColor="#f7931b">
            <SelectInput 
        options={months} 
        onChange={(e)=> handleMonthSelected(e.target.value)} 
        defaultValue={monthSelected} />

        <SelectInput options={years} 
        onChange={(e) => handleYearSelecteed(e.target.value)} 
        defaultValue={yearSelected} />
            </ContentHeader>

            <Content>
                <WalletBox 
                 title="Saldo"
                 color="#4E41F0"
                 amount={totalBalance}
                 footerlabel="Atualizado com base nas entradas e Saídas"
                 icon="dolar"
                
                />
                <WalletBox 
                 title="Entradas"
                 color="#F7931B"
                 amount={totalGains}
                 footerlabel="Atualizado com base nas entradas e Saídas"
                 icon="arrowUp"
                
                />
                <WalletBox 
                 title="saídas"
                 color="#E44C4E"
                 amount={totalExpenses}
                 footerlabel="Atualizado com base nas entradas e Saídas"
                 icon="arrowDown"
                />

                <MensageBox 
                    title={mensage.title}
                    description={mensage.description}
                    footerText={mensage.footerText}
                    icon={mensage.icon}
                />
                <PieChartBox data={relationExpensesVersusGains}/>
            </Content>
        </Container>    
    );
}

export default Dashboard;