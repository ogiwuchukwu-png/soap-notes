import { Fragment } from "react";
import Reveal from "./Reveal";
import HeroSentinel from "./HeroSentinel";
import StickyBuyBar from "./StickyBuyBar";
import SoapBar3D from "./SoapBar3D";
import primitives from "./primitives.module.css";
import styles from "./SoapNotesLanding.module.css";

const FOUNDING_BARS = [
  { name: "Agora", copy: "holds the question that started it all." },
  { name: "Eros", copy: "holds questions that awaken the desire already inside you." },
  { name: "Kairos", copy: "holds questions that lift you back into your own aliveness." },
  { name: "Logos", copy: "holds the warm memory of what you want to leave behind as legacy." },
];

const PRODUCT_CARDS = [
  {
    name: "Agora",
    sub: "The Origin Bar",
    tone: "#EFE6D2",
    copy: "Agora speaks of the mind alive in a crowd, ideas trading hands in the open air. Verbena opens up sharp green, the scent of your favorite marketplace just waking up, stalls opening, voices chattering, the buzz that keeps you loitering in all of the familiar scents and smells. Clary sage follows, clear-headed, herbaceous, finding you in the middle of the noise. Cedarwood, the base note, holds your senses steady, reminding you that you're still the person you desire to be in the midst of it all.",
    cta: "Yes, I want to begin",
  },
  {
    name: "Eros",
    sub: "No. 01 · Connection",
    tone: "#E9D2CC",
    copy: "Eros speaks of love, of affirmation, of the kind of care that comes from the people in your life you don't have to perform for. Ylang ylang opens the bar soft and floral, easing into the familiar room where you are loved before all else. Rose geranium follows next, the mid note, warm and rosy, holding its ground without asking for too much attention, just like home, where nothing else is asked of us. Cedarwood, the base note, wraps its arms around you like your favorite blanket, or your beloved grandma.",
    cta: "Yes, I want love",
  },
  {
    name: "Kairos",
    sub: "No. 02 · Adventure",
    tone: "#EFE2C6",
    copy: "Kairos speaks of aliveness, the pull toward something new. Bergamot and grapefruit open together, the sharp zest of peeling citrus with your hands. Ginger follows warm and spiced, the kind of wake-up that doesn't need coffee. Cedarwood, the base note, grounds it all, steady footing for the kind of alive you want to be when you step out.",
    cta: "Yes, I want aliveness",
  },
  {
    name: "Logos",
    sub: "No. 03 · Legacy",
    tone: "#E7DCC2",
    copy: "Logos speaks of legacy, what stays after you've left the room. Cardamom opens warm and spiced, restrained rather than loud. Vetiver follows earthy and rooted, the smell of something that doesn't move. Cedarwood, the base note, holds it down and evokes the trace of you that stays long after you've left the room.",
    cta: "Yes, I want to be remembered",
  },
];

const SOAP_LETTERS = [
  { letter: "S", label: "Scripture" },
  { letter: "O", label: "Observation" },
  { letter: "A", label: "Application" },
  { letter: "P", label: "Prayer" },
];

const VALUE_PROPS = [
  {
    title: "Handmade.",
    body: "Small custom batch production, grounded in an apothecary background — Frances, our founder, is a pharmacist by trade. No two bars are identical.",
  },
  {
    title: "Intentional.",
    body: "The scents and notes are chosen the way you might choose your favorite playlist. For mood, for nostalgic memory and all it unlocks within.",
  },
  {
    title: "Conversational.",
    body: "The questions are not decorative. They are integral to our products. The soap just gives you something to hold while you think.",
  },
];

type ProductCardData = (typeof PRODUCT_CARDS)[number];

function ProductCard({ card }: { card: ProductCardData }) {
  return (
    <article className={styles.card}>
      <figure className={`${primitives.plate} ${styles.cardFigure}`}>
        <div className={styles.cardStage}>
          <SoapBar3D mode="bar" tone={card.tone} label={card.name} sub={card.sub} />
        </div>
      </figure>
      <h3 className={styles.cardName}>{card.name}</h3>
      <p className={styles.cardSub}>{card.sub}</p>
      <p className={styles.cardBody}>{card.copy}</p>
      <div className={styles.cardFooter}>
        <span className={styles.cardPrice}>$18</span>
        <button type="button" className={`${primitives.btn} ${primitives.btnCard}`}>
          {card.cta}
        </button>
      </div>
    </article>
  );
}

export default function SoapNotesLanding() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navBrand}>Soap&nbsp;Notes</span>
        <a href="#origin" className={primitives.link}>
          How it started
        </a>
        <a href="#founding" className={primitives.link}>
          The founding set
        </a>
        <a href="#series" className={primitives.link}>
          The S.O.A.P. series
        </a>
      </nav>

      <section className={styles.hero}>
        <div>
          <h1 className={styles.heroTitle}>Soap Notes</h1>
          <p className={styles.heroSubhead}>
            Handcrafted soap wrapped in questions worth sitting with.
          </p>
          <p className={styles.heroBody}>
            Because the best conversations happen when your hands are busy and your guard is
            down.
          </p>
          <div className={styles.heroCtas}>
            <a href="#founding" className={primitives.btn}>
              Shop the founding set
            </a>
            <a href="#series" className={`${primitives.btn} ${primitives.btnSecondary}`}>
              The S.O.A.P. series
            </a>
          </div>
        </div>
        <figure className={`${primitives.plate} ${styles.heroFigure}`}>
          <div className={styles.heroStage}>
            <SoapBar3D mode="trio" />
          </div>
        </figure>
      </section>

      <HeroSentinel />

      <Reveal id="origin" className={styles.origin}>
        <div className={styles.originGrid}>
          <div>
            <span className={`${primitives.kicker} ${styles.mb16}`}>How it started</span>
            <h2 className={styles.originHeadline}>It began at a fête.</h2>
            <p className={styles.originAttribution}>— Frances, Founder</p>
          </div>
          <div>
            <p className={styles.prose}>
              Lovely, buzzing conversation, and questions that kept the room&rsquo;s mind alive
              and thinking. By the end of the night, something was clear: the right question at
              the right moment changes a room and the people in it.
            </p>
            <p className={styles.prose}>
              Soap Notes is built on that idea. Every bar carries a scent worth remembering and a
              question worth returning to. You&rsquo;ll use it in the shower or at the sink, in
              those private, quiet in-between moments. And sometimes, mid-lather: Eureka!
            </p>
            <p className={styles.originQuote}>That&rsquo;s it.</p>
          </div>
        </div>
      </Reveal>

      <Reveal id="founding" className={styles.founding}>
        <span className={`${primitives.kicker} ${styles.mb16}`}>The founding set</span>
        <h2 className={styles.foundingHeading}>Four bars, one beginning.</h2>
        <div className={styles.foundingGrid}>
          <p className={styles.foundingLede}>
            Silk amino acids finish every bar, so the lather feels like the luxury it is. Beneath
            the fragrance, a question waits, sealed until you&rsquo;re ready to open it.
          </p>
          <dl className={styles.barList}>
            {FOUNDING_BARS.map((bar, i) => (
              <Fragment key={bar.name}>
                <dt className={`${styles.barTerm} ${i > 0 ? styles.barRuled : ""}`}>
                  {bar.name}
                </dt>
                <dd className={`${styles.barDef} ${i > 0 ? styles.barRuled : ""}`}>
                  {bar.copy}
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>
        <p className={styles.foundingQuote}>Are you ready to open up?</p>
      </Reveal>

      <Reveal className={styles.cardsSection}>
        <div className={styles.agoraRow}>
          <ProductCard card={PRODUCT_CARDS[0]} />
        </div>
        <div className={styles.trioRow}>
          {PRODUCT_CARDS.slice(1).map((card) => (
            <ProductCard key={card.name} card={card} />
          ))}
        </div>
      </Reveal>

      <Reveal className={styles.trioSection}>
        <div className={styles.trioPanel}>
          <div>
            <span className={`${primitives.kicker} ${styles.mb14}`}>The complete trio</span>
            <h3 className={styles.trioHeading}>Eros, Kairos, Logos. One gift box.</h3>
            <p className={styles.trioBody}>
              Packaged in a recycled kraftboard drawer box, cream-lined interior. Each card tucked
              loose inside, so you can take the questions with you.
            </p>
            <div className={styles.trioPriceRow}>
              <span className={styles.trioPrice}>$48</span>
              <button type="button" className={primitives.btn}>
                Yes, I want it all
              </button>
            </div>
            <p className={styles.trioNote}>
              Agora sold separately — it&rsquo;s the origin piece, not part of the boxed trio.
            </p>
          </div>
          <figure className={`${primitives.plate} ${styles.trioFigure}`}>
            <div className={styles.trioStage}>
              <SoapBar3D mode="box" />
            </div>
          </figure>
        </div>
      </Reveal>

      <Reveal id="series" className={styles.series}>
        <div className={styles.seriesInner}>
          <div className={styles.seriesIntro}>
            <span className={`${primitives.kicker} ${primitives.kickerOnDark} ${styles.mb16}`}>
              A different kind of note
            </span>
            <h2 className={styles.seriesHeading}>The S.O.A.P. Series</h2>
            <p className={styles.seriesLead}>
              We&rsquo;ve recrafted soap. Not simply for getting luxuriously clean, but as a way
              of starting your day, week, month or year with a soap note.
            </p>
            <p className={styles.seriesQuote}>
              The fragrance notes are meant for your senses. The soap notes are meant for your
              spirit.
            </p>
          </div>

          <div className={styles.letters}>
            {SOAP_LETTERS.map(({ letter, label }) => (
              <div key={letter} className={styles.letter}>
                <div className={styles.letterGlyph}>{letter}</div>
                <div className={styles.letterLabel}>{label}</div>
              </div>
            ))}
          </div>

          <div className={styles.seriesProse}>
            <p className={styles.seriesParagraph}>
              Every bar holds the four notes — Scripture, Observation, Application, Prayer.
              S.O.A.P. Which note is yours stays a secret until you open it — a surprise waiting
              to awaken your senses and nourish your spirit.
            </p>
            <p className={styles.seriesParagraph}>
              Seven bars to an edition. Once they&rsquo;re gone, the next edition begins — new
              scripture, new questions, nothing repeats.
            </p>
          </div>

          <div className={styles.seriesFooter}>
            <button type="button" className={`${primitives.btn} ${primitives.btnLight}`}>
              Shop the series
            </button>
            <p className={styles.seriesNote}>Written for you, together.</p>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.props}>
        <span className={`${primitives.kicker} ${styles.mb32}`}>What Soap Notes is</span>
        <div className={styles.propsGrid}>
          {VALUE_PROPS.map((prop) => (
            <div key={prop.title} className={styles.prop}>
              <h3 className={styles.propTitle}>{prop.title}</h3>
              <p className={styles.propBody}>{prop.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={styles.closing}>
        <p className={styles.closingText}>Soap Notes. Lather in luxury. Keep the questions.</p>
      </div>

      <Reveal className={styles.email}>
        <div className={styles.emailGrid}>
          <div>
            <h2 className={styles.emailHeading}>Come back often. The questions change.</h2>
            <p className={styles.emailBody}>
              Each new bar carries new questions. New scents. New reasons to pause. Join the list
              and be the first to know when a new batch drops.
            </p>
          </div>
          <div>
            <div className={styles.emailForm}>
              <input
                className={`${primitives.input} ${styles.emailInput}`}
                type="email"
                placeholder="Your email address"
                aria-label="Your email address"
              />
              <button type="button" className={`${primitives.btn} ${styles.emailCta}`}>
                Keep me posted
              </button>
            </div>
            <p className={styles.emailNote}>No spam. Just soap notes.</p>
          </div>
        </div>
      </Reveal>

      <footer className={styles.footer}>
        <p className={styles.footerText}>Soap Notes · Handcrafted in small batches</p>
        <p className={styles.footerText}>soapnotes.store · @thesoapnotes_store · hello@soapnotes.com</p>
        <p className={styles.footerTagline}>Lather in luxury. Keep the questions.</p>
      </footer>

      <StickyBuyBar />
    </div>
  );
}
