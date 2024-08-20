// pages/index.js
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faLinkedin, faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const handleKangarooClick = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const kangaroo = document.createElement('div');
        kangaroo.textContent = '🦘';
        kangaroo.style.position = 'fixed';
        kangaroo.style.left = Math.random() * window.innerWidth + 'px';
        kangaroo.style.top = window.innerHeight + 'px';
        kangaroo.style.fontSize = '3rem';
        kangaroo.style.transition = 'all 2s ease-out';
        document.body.appendChild(kangaroo);

        setTimeout(() => {
          kangaroo.style.top = -100 + 'px';
          kangaroo.style.left = (Math.random() * window.innerWidth) + 'px';
        }, 50);

        setTimeout(() => {
          document.body.removeChild(kangaroo);
        }, 2000);
      }, i * 200);
    }
  };

  return (
    <div>
      {/* Section 0: Title */}
      <section className="flex flex-col md:flex-row items-center text-center justify-center pt-10 md:pt-30">
        <div>
          <h1 className="text-4xl md:text-7xl font-bold my-4 md:my-8 text-blue-600 font-serif cursor-pointer" onClick={handleKangarooClick}>G'day, I'm Tobin</h1>
          <div className="text-xl md:text-3xl">
            <p className="mb-4">MIT PhD Candidate, 🇦🇺🇺🇸 Fulbrighter</p>
            <div className="flex items-center space-x-4 justify-center text-3xl md:text-4xl">
              <SocialLink href="https://github.com/tobinsouth" icon={faGithub} />
              <SocialLink href="https://twitter.com/tobinsouth" icon={faTwitter} />
              <SocialLink href="https://www.linkedin.com/in/tobinsouth/" icon={faLinkedin} />
              <SocialLink href="https://scholar.google.com/citations?user=r5pPBFMAAAAJ&hl=en" icon={faGoogle} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Intro */}
      <section className="flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 py-10 md:py-10">
          <div className="w-full md:w-1/2 flex justify-center md:mt-0">
            <Image
              src="/images/Tobin 2024 Face.jpg"
              alt="Tobin's Main Profile Photo"
              className="rounded-full"
              width={320}
              height={320}
            />
          </div>
          <div className="md:w-1/2 mb-10 md:mb-0 text-lg flex flex-col gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-blue-600">Security + AI + Society</h2>
            </div>
            <p>
              Tobin is a senior PhD candidate at MIT on a{' '}
              <a href="https://invest.sa.gov.au/articles/sa-student-wins-place-at-mit-and-fulbright-scholarship">
                Fulbright Future Scholarship
              </a>
              , advised by{' '}
              <a href="https://en.wikipedia.org/wiki/Alex_Pentland">Sandy Pentland</a> at the{' '}
              <a href="https://www.media.mit.edu/research/?filter=groups">MIT Media Lab</a>. Tobin's research is focused
              on building privacy, verifiability, and regulatory compliance into frontier AI from first principles.
            </p>
            <p>
              Tobin's work is at the intersection of security, AI, and society, spanning across fields from private data
              sharing to verifiable evaluations for large AI models. He has contributed to recent work on regulation of
              generative AI and is keenly interested in working on practically deployable solutions to solve privacy and
              security challenges in a changing world of technology.
            </p>
          </div>
        </section>

      {/* Section 2: About Me */}
      <section class="flex flex-col md:flex-row items-start justify-between  space-y-10 md:space-y-0 md:space-x-12 md:py-10">
          <div class="w-full md:w-1/2 text-lg flex flex-col gap-4">
                <p>
                    <b class="text-blue-600">About Me:</b> I have a fellowship with the <a href="https://www.e14.vc/">E14 VC fund</a>, helping with AI investments, and previously founded a startup (which failed, great learning experience!). 
                    I have a non-executive role on the board of the <a href="https://dti.sa.gov.au/mit-bigdata-living-lab">MIT bigdata Living Lab</a> in Adelaide and sit on the Graduate Student Council at MIT.
                    In my undergraduate, I was Valedictorian of the graduating class of Mathematics, Computer Science, and Electrical Engineering.
                </p>
                <p>            
                    Before all that, I grew up in the <a href="https://www.google.com/search?q=%22Peanut+capital+of+Australia%22">"Peanut capital of Australia"</a>, 
                    the agricultural town of <a href="https://www.google.com/maps/place/Kingaroy+QLD+4610">Kingaroy, Queensland</a>; but I consider Adelaide my real home. 
                    Don't hesitate to reach out if you have something interesting to talk about. 
                </p>
            </div>
            <div class="w-full md:w-1/2">
                <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-2">
                        <video autoPlay playsInline loop muted class="w-full rounded-lg shadow-lg" preload="auto">
                            <source src="/images/shorttobin_no_audio_compressed.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div>
                      <Image
                        src="/images/tobin_workshop.jpg"
                        alt="Tobin at a workshop"
                        className="w-full h-40 object-cover rounded-lg shadow-lg"
                        width={320}
                        height={320}
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/Tobin_dramatic_square.jpg"
                        alt="Tobin at a dramatic event"
                        className="w-full h-40 object-cover rounded-lg shadow-lg"
                        width={320}
                        height={320}
                      />
                    </div>
                </div>
            </div>
        </section>

      {/* Section 3: Recent Work */}
      <section className="py-10">
        <h2 className="text-3xl font-bold">Some Recent Work</h2>
        <div className="carousel" id="work-carousel">
          <WorkCard
            href="https://arxiv.org/abs/2402.02675"
            title="Verifiable Model Evaluations"
            description="Discover our methods for ensuring AI model integrity."
          />
          <WorkCard
            href="https://arxiv.org/abs/2311.12955"
            title="Private Retrieval Augmented Generation"
            description="Learn about our innovative RAG techniques."
          />
          <WorkCard
            href="https://cdn.governance.ai/Open_Problems_in_Technical_AI_Governance.pdf"
            title="Open Problems in Technical AI Governance"
            description="Explore key challenges in AI governance."
          />
          <WorkCard
            href="https://arxiv.org/pdf/2408.07892"
            title="Personhood Credentials"
            description="Learn about our work on protecting digital spaces."
          />
          <WorkCard
            href="https://www.networklawreview.org/computational-three"
            title="Transparency by Design for LLMs"
            description="Understanding how RAG can provide auditability and updateability for LLMs."
          />
          <WorkCard
            href="https://arxiv.org/abs/2311.13008"
            title="Zero-knowledge tax disclosures"
            description="Discover our research on privacy-preserving financial disclosures."
          />
          <WorkCard
            href="https://www.dataprovenance.org/Consent_in_Crisis.pdf"
            title="Decline of the AI Data Commons"
            description="Explore our research on the changing landscape of AI data."
          />
          <WorkCard
            href="https://mit-genai.pubpub.org/pub/uk7op8zs/release/2"
            title="Data Consent and Provenance are Broken"
            description="Discover the challenges in AI data management."
          />
          <WorkCard
            href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4688040"
            title="Plural Management"
            description="A management system for open-source teams that naturally distributed management and ownership over time."
          />
        </div>
        <div className="scroll-cue">
          Scroll for more <span className="arrow">➜</span>
        </div>
      </section>

      {/* Section 4: News */}
      <section className="">
        <h2 className="text-3xl font-bold">News Stories & Talks</h2>
        <div className="carousel" id="news-carousel">
          <NewsCard
            href="https://news.mit.edu/2024/3-questions-proving-humanity-online-0816"
            image="/images/media/MIT-3Q-personhood-01-press_0.jpg"
            source="MIT News"
            title="Privacy and Personhood online with future AI"
          />
          <NewsCard
            href="https://www.youtube.com/watch?v=zfU5P-aeYaw"
            image="/images/media/TEDx\ Screenshot.png"
            source="TEDx Boston"
            title="Reimagining ​security for AI"
          />
          <NewsCard
            href="https://www.adelaide.edu.au/alumni/news/list/2024/08/06/tobin-south"
            image="/images/media/dsc03613-resize.jpg"
            source="Adelaide Alumni Interview"
            title="A journey to MIT"
          />
          <NewsCard
            href="https://www.adelaidenow.com.au/news/future-adelaide/future-bright-sa-data-scientist-awarded-scholarship-to-study-at-mit-in-massachusetts/news-story/3e13c7d19ac17cdda1fb8b5b16257e61"
            image="/images/media/2d0e8b13a8e679d2960c4b61ba7b87a5.jpg"
            source="The Advertiser"
            title="Southern Star"
          />
          <NewsCard
            href="https://www.youtube.com/watch?v=vvobGVBTDRY"
            image="/images/media/1da4e2be88faeb7ab0a828a57dc06236.webp"
            source="Seminar Talk"
            title="The Future of Data Science with LLMs"
          />
          <NewsCard
            href="https://www.nytimes.com/2024/07/19/technology/ai-data-restrictions.html"
            image="/images/media/20roose-superJumbo.webp"
            source="New York Times"
            title="AI Data Restrictions"
          />
        </div>
        <div className="scroll-cue">
          Scroll for more <span className="arrow">➜</span>
        </div>
      </section>

      {/* Life Updates */}
      <section>
        <h2 className="text-3xl font-bold mb-5">Life Updates</h2>
        <ul className="space-y-2">
        <LifeUpdate
          date="2024, Aug"
          description="Contributed to a large project on personhood credentials with collaborators from OpenAI, Microsoft, and OpenMined."
        />
        <LifeUpdate
          date="2024, June"
          description="Went paragliding through the Alps in the south of France."
        />
        <LifeUpdate
          date="2024, May"
          description="Gave a TEDx talk at TEDx Boston on AI Security."
        />
        <LifeUpdate
          date="2024, April"
          description="Ran 🏃‍♂️ a whole marathon on my birthday for no clear reason."
        />
        <LifeUpdate
          date="2024, Jan"
          description="Presented at Davos on privacy, security, and LLMs."
        />
        <LifeUpdate
          date="2024, Jan"
          description="Contributed to the Singapore M3S program engaging with AI policy. Ate a lot of hawker food and ran 20km around the city."
        />
        <LifeUpdate
          date="2023, Dec"
          description="Awarded an MIT Generative AI grant to research end-to-end privacy for generative AI."
        />
        <LifeUpdate
          date="2023, Summer"
          description="Interned at Microsoft Research in the Cryptography and Plurality teams. Lived on a houseboat while I was there."
        />
        <LifeUpdate
          date="2023, Oct"
          description="Downloaded the whole internet as part of the new Data Provenance initiative work for transparency in pretraining data."
        />
        <LifeUpdate
          date="2023, June"
          description="Started a fellowship with the E14 VC Fund focusing on AI investments."
        />
        <LifeUpdate
          date="2023, Jan"
          description="Ran a marathon in LA with my friends and then took a road trip in a Tesla around the West Coast."
        />
        </ul>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center text-xl">
        <h3 className="py-4">Reach out if you want to talk AI, security, verifiability, or policy.</h3>
        <p>If you're looking for me elsewhere, my handle is usually @tobinsouth</p>
      </footer>

    </div>
  );
}


function SocialLink({ href, icon }) {
  return (
    <a 
      href={href}
      className="hover:text-blue-600 transition-colors duration-30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={icon}/>
    </a>
  );
}

function WorkCard({ href, title, description }) {
  return (
    <a href={href} className="card snap-start flex-shrink-0" target="_blank" rel="noopener noreferrer">
      <h3 className="text-blue-600">{title}</h3>
      <p className="work-card-description">{description}</p>
    </a>
  );
}

function NewsCard({ href, image, source, title }) {
  return (
    <a href={href} className="news-card snap-start flex-shrink-0" style={{ backgroundImage: `url(${image})` }} target="_blank" rel="noopener noreferrer">
      <div className="news-card-text">
        <h4 className="text-sm mb-1">{source}</h4>
        <h3>{title}</h3>
      </div>
    </a>
  );
}

function LifeUpdate({ date, description }) {
  return (
    <li className="flex items-start">
      <span className="font-semibold text-blue-600 w-36 flex-shrink-0">{date}</span>
      <span className="ml-4">{description}</span>
    </li>
  );
}