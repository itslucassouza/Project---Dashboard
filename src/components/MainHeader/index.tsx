import React, {useMemo} from 'react';

import emojis from '../../utils/emogis';

import Toggle from '../Toggle';

import {Container, Profile, Welcome, UserName} from './styles'

const MainHeader: React.FC = () => {

    const emoji = useMemo(() => {
        const  emojiIndex= Math.floor(Math.random() * emojis.length);
        return emojis[emojiIndex]

    },[])
        return(
            <Container>
                <Toggle />

                <Profile>
                <Welcome>Olá, {emoji} </Welcome>
                <UserName>Lucas Souza </UserName>
                </Profile>

            </Container>
        )
}

export default MainHeader;