import React , {useEffect} from 'react'
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';


export default function RevealPresentation() {

    useEffect(() => {
        let deck = new Reveal({
            plugins: [ Markdown ]
         })

        deck.initialize();
    }, [])

  return (
    <>
        <div class="reveal">
            <div class="slides">
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
