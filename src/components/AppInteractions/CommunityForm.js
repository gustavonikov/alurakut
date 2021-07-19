import Form from "./Form";

export default function CommunityForm({ handleSubmit }) {
    return (
        <Form id="community-form" onSubmit={handleSubmit}>
            <div>
                <input
                    required
                    type="text"
                    placeholder="Qual vai ser o nome da sua comunidade?"
                    name="community-title"
                    aria-label="Qual vai ser o nome da sua comunidade?"
                />
            </div>
            <div>
                <input
                    required
                    type="text"
                    placeholder="Coloque uma URL para usarmos de capa"
                    name="community-image"
                    aria-label="Coloque uma URL para usarmos de capa"
                />
            </div>

            <button type="submit" style={{ minWidth: '120px', marginTop: '10px' }}>
                Finalizar
            </button>
        </Form>
    )
}
