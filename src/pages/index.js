import { useEffect, useState } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../lib/AlurakutCommons'
import { Main } from '../components/Main'
import { Container } from '../components/Container'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations'
import AppInteractions from '../components/AppInteractions'
import { TestimonialsWrapper } from '../components/Testimonials'

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

export default function Home(props) {
	const githubUser = props.githubUser
	const [communities, setCommunities] = useState(props.communities)
	const [testimonials, setTestimonials] = useState(props.testimonials)

	function handleCreateCommunity(ev) {
		ev.preventDefault()
		const formData = new FormData(ev.target)

		fetch('/api/community', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: formData.get('community-title'),
				imageUrl: formData.get('community-image'),
				slugCreator: githubUser
			})
		})
			.then((res) => res.json())
			.then((data) => {
				setCommunities([...communities, data.communityRecord])
				alert('Criado com sucesso')
				document.querySelector('#community-form').reset()
			})
			.catch((error) => alert(`Ocorreu um erro ao cadastrar a comunidade: ${error.name}`))

	}

	function handleCreateTestimonial(ev) {
		ev.preventDefault()
		const formData = new FormData(ev.target)

		const testimonialDate = format(new Date(), 'd MMM, yy', {
			locale: ptBR,
		})

		fetch('/api/testimonial', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				testimonialAuthor: formData.get('testimonial-author'),
				testimonialText: formData.get('testimonial-text'),
				testimonialDate
			})
		})
			.then((res) => res.json())
			.then((data) => {
				setTestimonials([...testimonials, data.testimonialsRecord])
				alert('Criado com sucesso')
				document.querySelector('#testimonials-form').reset()
			})
			.catch((error) => alert(`Ocorreu um erro ao cadastrar a comunidade: ${error.name}`))

	}

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
						<AppInteractions handleCommunitySubmit={handleCreateCommunity} handleTestimonialSubmit={handleCreateTestimonial} />
					</Container>

					<TestimonialsWrapper>
						<h2 className="subTitle">Depoimentos de {githubUser}</h2>
						<ul>
							{
								testimonials.filter((testimonial, index) => index < 6)
									.map((testimonial, index) => (
										<li key={index}>
											<img src={`https://github.com/${testimonial.testimonialAuthor}.png`} alt="" />
											<div>
												<div>
													<span>{testimonial.testimonialAuthor}</span><small> - {testimonial.testimonialDate}</small>
												</div>
												<p>{testimonial.testimonialText}</p>
											</div>
										</li>
									))
							}

						</ul>
						<a href="#" className="seeAll">Ver todos</a>
					</TestimonialsWrapper>
				</div>
				<div style={{ gridArea: 'profileRelations' }}>
					<ProfileRelationsBoxWrapper>
						<h2 className="smallTitle">
							Meus seguidores ({props.followers.length})
						</h2>
						<ul>
							{
								props.followers.filter((follower, index) => index < 9)
									.map((follower) => (
										<li key={follower.id}>
											<a href={`https://github.com/${follower.login}`}>
												<img src={follower.avatar_url} alt="profile photo" />
												<span>{follower.login}</span>
											</a>
										</li>
									))
							}
							<a href="#" className="seeAll">Ver todos</a>
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

							<a href="#" className="seeAll">Ver todos</a>
						</ul>
					</ProfileRelationsBoxWrapper>
				</div>
			</Main>
		</>
	)
}

export async function getServerSideProps(ctx) {
	const cookies = nookies.get(ctx)
	const token = cookies.USER_TOKEN

	const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
		headers: {
			Authorization: token
		}
	})
		.then((res) => res.json())

	if (!isAuthenticated) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			}
		}
	}

	const { githubUser } = jwt.decode(token)

	const followers = await fetch(`https://api.github.com/users/${githubUser}/followers`)
		.then((res) => res.json())


	const communityData = await fetch('https://graphql.datocms.com/', {
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

	const communities = communityData.data.allCommunities

	const testimonialsData = await fetch('https://graphql.datocms.com/', {
		method: 'POST',
		headers: {
			Authorization: '7731eee24ca4682655f836d80575de',
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			"query": `query {
				allTestimonials {
					id
					testimonialAuthor
					testimonialText,
					testimonialDate
				}
		}` })
	})
		.then((res) => res.json())

	const testimonials = testimonialsData.data.allTestimonials

	return {
		props: {
			githubUser,
			followers,
			communities,
			testimonials
		},
	}
}
