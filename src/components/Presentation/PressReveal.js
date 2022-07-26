import React , {useEffect} from 'react'
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import RevealMarkdown  from 'reveal.js/plugin/markdown/markdown.js';


export default function RevealPresentation() {

    useEffect(() => {
        let deck = new Reveal({
            plugins: [ Markdown , RevealMarkdown ]
         })

        deck.initialize({
            center: true,
            loop: true
        });

        deck.configure({ 
            autoSlide: 5000,
            loop: true
        });
    }, [])

  return (
    <>
        <div className="reveal">
            <div className="slides">
                <section>Horizontal Slide</section>
                <section>
                <section>Vertical Slide 1</section>
                <section>Vertical Slide 2</section>
                </section>
            </div>
		</div>
    </>
  )
}
