import styled from 'styled-components'

import { Main } from '../components/Main'
import { Container } from '../components/Container'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations'
import { useEffect, useState } from 'react'

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
	const [communities, setCommunities] = useState([{
		title: 'Eu odeio acordar cedo',
		image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
	}])
	const [followers, setFollowers] = useState([])


	function handleCreateCommunity(ev) {
		ev.preventDefault()
		const formData = new FormData(ev.target)

		const community = {
			title: formData.get('title'),
			image: formData.get('image')
		}

		setCommunities([...communities, community])
	}

	useEffect(() => {
		fetch('https://api.github.com/users/gustavonikov/followers')
		.then((res) => res.json())
		.then((data) => setFollowers(data))
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
						<form onSubmit={handleCreateCommunity}>
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
							Pessoas da comunidade ({favoritesPersons.length})
						</h2>
						<ul>
							{
								favoritesPersons.map((person) => (
									<li key={person}>
										<a href={`https://github.com/${person}`}>
											<img src={`https://github.com/${person}.png`} alt="profile photo" />
											<span>{person}</span>
										</a>
									</li>
								))
							}
						</ul>
					</ProfileRelationsBoxWrapper>
					<ProfileRelationsBoxWrapper>
						<h2 className="smallTitle">Comunidades ({communities.length})</h2>
						
						<ul>
							{
								communities.map((community, index) => (
									<li key={index}>
										<a href={`/users/${community.title}`}>
											<img src={community.image} alt="community photo" />
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
