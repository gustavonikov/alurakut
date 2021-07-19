import styled from 'styled-components'
import { Container } from '../Container';

export const TestimonialsWrapper = styled(Container)`
    ul {
        width: 100%;
		max-height: 800px;
		list-style: none;

        margin-bottom: 20px;
        
        li {
            display: flex;
            padding: 8px;
            margin-bottom: 10px;
            background-color: #F4F4F4;
            border-radius: 10px;

            img {
                object-fit: cover;
                background-position: center center;
                width: 70px;
                height: 70px;
                margin-right: 20px;

                border-radius: 8px;
            }

            span {
                font-weight: 600;
                color: #2E7BB4;
                margin-right: 5px;
            }

            small {
                color: #999999;
                font-size: 12px;
            }

            p {
                padding: 8px 0px;
                font-size: 14px;
            }
        }
    }

    .seeAll {
		font-size: 14px;
		color: #2E7BB4;
		text-decoration: none;
		font-weight: 800;
        display: flex;
        justify-content: center;
	}
`