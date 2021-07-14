import styled from 'styled-components'

import { Main } from '../components/Main'
import { Container } from '../components/Container'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations'

function ProfileSidebar({ githubUser }) {
	return (
		<Container>
			<img
				src={`https://github.com/${githubUser}.png`}
				alt="profile photo"
				style={{ borderRadius: '8px' }}
			/>
		</Container>
	)
}

export default function Home() {
	const githubUser = 'gustavonikov'
	const favoritesPersons = ['diego3g', 'omariosouto', 'peas', 'juunegreiros', 'rafaballerini', 'maykbrito']

	return (
		<>
			<AlurakutMenu />
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
				</div>
				<div className="profile-relations" style={{ gridArea: 'profileRelations' }}>
					<ProfileRelationsBoxWrapper>
						<h2 className="smallTitle">
							Pessoas da comunidade ({favoritesPersons.length})
						</h2>
						<ul>
							{
								favoritesPersons.map((person) => (
									<li>
										<a href={`/users/${person}`} key={person}>
											<img src={`https://github.com/${person}.png`} alt="profile photo" />
											<span>{person}</span>
										</a>
									</li>
								))
							}
						</ul>
					</ProfileRelationsBoxWrapper>
					<Container>
						Comunidades
					</Container>
				</div>
			</Main>
		</>
	)
}
