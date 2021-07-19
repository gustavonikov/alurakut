import styled from 'styled-components'
import Form from "./Form";

const TestimonialsTextArea = styled.textarea`
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10px;

    resize: vertical;

    min-height: 150px;
    max-height: 300px;

    outline: none;

    ::placeholder {
        color: #333333;
        opacity: 1;
    }
`

export default function TestimonialsForm({ handleSubmit }) {
    return (
        <Form id="testimonials-form" onSubmit={handleSubmit}>
            <div>
                <input
                    required
                    type="text"
                    placeholder="Qual seu usuário do github?"
                    name="testimonial-author"
                    aria-label="Qual seu usuário do github?"
                />
            </div>
            <div>
                <TestimonialsTextArea
                    required
                    type="text"
                    placeholder="Digite seu depoimento..."
                    name="testimonial-text"
                    aria-label="Digite seu depoimento..."
                />
            </div>

            <button type="submit" style={{ minWidth: '120px', marginTop: '10px' }}>
                Finalizar
            </button>
        </Form>
    )
}
