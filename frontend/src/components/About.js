const About = (props) => {
	return (
		<div className="container" id="about">
				<h2 className="bd-title my-3" id="content">About</h2>
				<p className="bd-lead fs-5">
					<ul>
						<li className="">iNotebook is a Web Application To Note Your Info.</li>
						<li className="">Features :
							<ul>
								<li>Add Your Note Anytime You Want</li>
								<li>Edit Your Note Anytime You Want</li>
								<li>Delete Your Note Anytime You Want</li>
								<li>Access Your Note From Anywhere only you want your Email and password</li>
								<li>Your Note Are Only Access To You</li>
							</ul>
						</li>
					</ul>
				</p>
				<hr style={{ height: '2px' }} />
				<h2 id="team">Team</h2>
				<ul className="fs-5">
					<li>It is Created By Solo Work</li>
				</ul>
				<hr style={{ height: '2px' }} />
				<h2 id="history">History</h2>
				<ul className="fs-5">
					<li>Development Of This Website Started On 05/08/2023</li>
					<li>Published On 10/08/2023</li>
				</ul>
				<hr style={{ height: '2px' }} />
		</div>
	)
}

export default About;