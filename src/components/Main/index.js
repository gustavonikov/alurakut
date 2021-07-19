import styled from 'styled-components'

export const Main = styled.main`
    width: 100%;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    padding: 16px;
    grid-gap: 10px;

    .profile {
    display: none;

    @media (min-width: 860px) {
        display: block;
    }
    }

    @media (min-width: 860px) {
    max-width: 1123px;
    display: grid;
    grid-template-areas: 
        'profile welcome profileRelations';
    grid-template-columns: 160px 1fr 325px;
    }
`