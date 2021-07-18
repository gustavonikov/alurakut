import { useEffect, useState } from 'react'
import { Main } from '../components/Main'
import { Container } from '../components/Container'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations'

function ProfileSidebar({ githubUser }) {
	return (
		<Container as="aside">
			<img
				src={`https://github.com/${githubUser}.png`}
				alt="profile photo"
				style={{ borderRadius: '8px' }}
			/>
			<hr />

			<p>
				<a href={`https://github.com/${githubUser}`} className="containerLink">
					@{githubUser}
				</a>
			</p>
			<hr />

			<AlurakutProfileSidebarMenuDefault />
		</Container>
	)
}

export default function Home() {
	const githubUser = 'gustavonikov'
	const favoritesPersons = ['diego3g', 'omariosouto', 'peas', 'juunegreiros', 'rafaballerini', 'maykbrito']
	const [communities, setCommunities] = useState([])
	const [followers, setFollowers] = useState([])


	function handleCreateCommunity(ev) {
		ev.preventDefault()
		const formData = new FormData(ev.target)

		fetch('/api/community', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: formData.get('title'),
				imageUrl: formData.get('image'),
				slugCreator: githubUser
			})
		})
			.then((res) => res.json())
			.then((data) => {
				setCommunities([...communities, data.communityRecord])
				alert('Criado com sucesso')
				document.querySelector('#community-form').reset()
			})
			.catch((error) => alert('Ocorreu um erro ao cadastrar a comunidade.'))
		
	}

	useEffect(() => {
		fetch('https://api.github.com/users/gustavonikov/followers')
			.then((res) => res.json())
			.then((data) => { setFollowers(data) })
	}, [])

	useEffect(() => {
		fetch('https://graphql.datocms.com/', {
			method: 'POST',
			headers: {
				Authorization: '7731eee24ca4682655f836d80575de',
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				"query": `query {
				allCommunities {
				  id
				  title
				  imageUrl
				  slugCreator
				}
			}` })
		})
			.then((res) => res.json())
			.then(({ data }) => { setCommunities(data.allCommunities) })
	}, [])

	return (
		<>
			<AlurakutMenu githubUser={githubUser} />
			<Main>
				<div className="profile" style={{ gridArea: 'profile' }}>
					<ProfileSidebar githubUser={githubUser} />
				</div>
				<div className="welcome" style={{ gridArea: 'welcome' }}>
					<Container>
						<h1 className="title">
							Bem vindo(a)
						</h1>

						<OrkutNostalgicIconSet />
					</Container>

					<Container>
						<h2 className="subTitle">O que você deseja fazer?</h2>
						<form id="community-form" onSubmit={handleCreateCommunity}>
							<div>
								<input
									type="text"
									placeholder="Qual vai ser o nome da sua comunidade?"
									name="title"
									aria-label="Qual vai ser o nome da sua comunidade?"
								/>
							</div>
							<div>
								<input
									type="text"
									placeholder="Coloque uma URL para usarmos de capa"
									name="image"
									aria-label="Coloque uma URL para usarmos de capa"
								/>
							</div>

							<button>
								Criar comunidade
							</button>
						</form>
					</Container>
				</div>
				<div className="profile-relations" style={{ gridArea: 'profileRelations' }}>
					<ProfileRelationsBoxWrapper>
						<h2 className="smallTitle">
							Meus seguidores ({followers.length})
						</h2>
						<ul>
							{
								followers.filter((follower, index) => index < 9)
									.map((follower) => (
										<li key={follower.id}>
											<a href={`https://github.com/${follower.login}`}>
												<img src={follower.avatar_url} alt="profile photo" />
												<span>{follower.login}</span>
											</a>
										</li>
									))
							}
						</ul>
					</ProfileRelationsBoxWrapper>
					<ProfileRelationsBoxWrapper>
						<h2 className="smallTitle">Minhas comunidades ({communities.length})</h2>
						<ul>
							{
								communities.filter((community, index) => index < 9)
									.map((community, index) => (
										<li key={index}>
											<a href={`/community/${community.id}`}>
												<img src={community.imageUrl} alt="community photo" />
												<span>{community.title}</span>
											</a>
										</li>
									))
							}
						</ul>
					</ProfileRelationsBoxWrapper>
				</div>
			</Main>
		</>
	)
}
