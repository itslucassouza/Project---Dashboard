import React from 'react';

import { Container, Content, Filters } from './styles';
import ContentHeader from '../../components/ContentHeader';

import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

const List: React.FC = () => {

    const months = [
        {value: 7, label: "Julho"},
        {value: 8, label: "Agosto"},
        {value: 9, label: "Setembro"},
    ];
    const years = [
        {value: 2020, label: 2020},
        {value: 2019, label: 2019},
        {value: 2018, label: 2018},
    ];

    return(
        <Container>
        <ContentHeader title="Saidas" lineColor="#E44c4e">
        <SelectInput options={months} />
        <SelectInput options={years} />
        </ContentHeader>

        <Filters>
            <button type="button" className="tag-filter tag-filter-reccurent">
                Recorrentes
            </button>
            <button type="button" className="tag-filter tag-filter-">
                Eventuais
            </button>
        </Filters>

        <Content>
        <HistoryFinanceCard 
            tagColor="#e44c4e"
            title="Conta de Luz"
            subtitle="27/02/2021"
            amount="130,00"
        />
        </Content>
        </Container>
    );
}

export default List;