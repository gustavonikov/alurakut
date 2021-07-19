import { useState } from 'react';
import styled, { css } from 'styled-components'
import Form from './Form';

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
                    Deixar um recado
                </AppInteractionsButton>
            </AppInteractionsWrapper>
            {
                activeBtn === 'community' &&
                <Form
                    formId="community-form"
                    handleSubmit={handleCommunitySubmit}
                    firstElName="community-title"
                    secondElName="community-image"
                    firstPlaceholder="Qual vai ser o nome da sua comunidade?"
                    secondPlaceHolder="Coloque uma URL para usarmos de capa"
                    textElement="input"
                />
            }
            {
                activeBtn === 'testimonials' &&
                <Form
                    formId="testimonials-form"
                    handleSubmit={handleTestimonialSubmit}
                    firstElName="testimonial-author"
                    secondElName="testimonial-text"
                    firstPlaceholder="Digite seu usuário do github"
                    secondPlaceHolder="Digite seu depoimento..."
                    textElement="textarea"
                />
            }
            {
                activeBtn === 'scraps' &&
                <Form
                    formId="scraps-form"
                    handleSubmit={(ev) => {
                        ev.preventDefault()
                        alert('This functionality it\'s not working yet')
                        document.querySelector('#scraps-form').reset()
                    }}
                    firstElName="scrap-author"
                    secondElName="scrap-text"
                    firstPlaceholder="Digite seu usuário do github"
                    secondPlaceHolder="Deixe aqui o seu recado..."
                    textElement="textarea"
                />
            }
        </>
    )
}
