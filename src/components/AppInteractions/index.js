import { useState } from 'react';
import styled, { css } from 'styled-components'
import CommunityForm from './CommunityForm'
import ScrapsForm from './ScrapsForm';
import TestimonialsForm from './TestimonialsForm';

const AppInteractionsWrapper = styled.div`
    display: flex;
    gap: 16px;
    height: 32px;
    margin-bottom: 30px;
`

const AppInteractionsButton = styled.button`
    background-color: #D9E6F6;
    color: #2E7BB4;

    &:hover {
        background-color: #C5D8EF;
    }

    ${({ active }) => active && css`
        &[id=${active}] {
            background-color: #6F92BB;
            color: #FFF;
        }
    `}
`

export default function AppInteractions({ handleCommunitySubmit, handleTestimonialSubmit }) {
    const [activeBtn, setActiveBtn] = useState('community')

    return (
        <>
            <AppInteractionsWrapper>
                <AppInteractionsButton
                    id="community"
                    type="button"
                    onClick={() => { setActiveBtn('community') }}
                    active={activeBtn}
                >
                    Criar comunidade
                </AppInteractionsButton>
                <AppInteractionsButton
                    id="testimonials"
                    type="button"
                    onClick={() => { setActiveBtn('testimonials') }}
                    active={activeBtn}
                >
                    Escrever depoimento
                </AppInteractionsButton>
                <AppInteractionsButton
                    id="scraps"
                    type="button"
                    onClick={() => { setActiveBtn('scraps') }}
                    active={activeBtn}
                >
                    Deixar um scrap
                </AppInteractionsButton>
            </AppInteractionsWrapper>
            {
                activeBtn === 'community' && <CommunityForm handleSubmit={handleCommunitySubmit} />
            } 
            {
                activeBtn === 'testimonials' && <TestimonialsForm handleSubmit={handleTestimonialSubmit} />
            } 
            {
                activeBtn === 'scraps' && <ScrapsForm handleSubmit={handleCommunitySubmit} />
            } 
        </>
    )
}
