import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';


import { Container } from './styles';

const Dashboard: React.FC = () => {

    
    const options = [
        { value: 'Lucas', label: 'Lucas'},    
        { value: 'Lucas', label: 'Lucas'},    
        { value: 'Lucas', label: 'Lucas'},    
     ]

    return(
        <Container>
            <ContentHeader title="Dashboard" lineColor="#f7931b">
            <SelectInput options={options} onChange={() => {}}/>
            </ContentHeader>
        </Container>
    );
}

export default Dashboard;