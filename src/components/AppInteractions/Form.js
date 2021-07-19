import styled from 'styled-components'
import { TextArea } from '../TextArea'

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;

    button[type='submit'] {
        align-self: center;
    }
`

export default function Form({ formId, handleSubmit, firstElName, secondElName, firstPlaceholder, secondPlaceHolder, textElement }) {
    return (
        <FormContainer id={formId} onSubmit={handleSubmit}>
            <div>
                <input
                    required
                    type="text"
                    placeholder={firstPlaceholder}
                    name={firstElName}
                    aria-label={firstPlaceholder}
                />
            </div>
            <div>
                {
                    textElement === 'input' ?
                        <input
                            required
                            type="text"
                            placeholder={secondPlaceHolder}
                            name={secondElName}
                            aria-label={secondPlaceHolder}
                        />
                        :
                        <TextArea
                            required
                            type="text"
                            placeholder={secondPlaceHolder}
                            name={secondElName}
                            aria-label={secondPlaceHolder}
                        />
                }
            </div>
            <button type="submit" style={{ minWidth: '120px', marginTop: '10px' }}>
                Finalizar
            </button>
        </FormContainer>
    )
}
